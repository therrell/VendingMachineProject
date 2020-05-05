from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from django.contrib.auth.models import User, Group
from .serializers import *
from rest_framework import permissions, generics
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.response import Response


#might want to change viewing all items in db to permissions.IsAdmin
class VendingMachineViewSet(viewsets.ModelViewSet):

    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['buildingID__buildingName']

class CRNViewSet(viewsets.ModelViewSet):
    queryset = CRN.objects.all()
    serializer_class = CRNSerializer


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BuildingViewSet(viewsets.ModelViewSet):

    queryset = Building.objects.all()
    serializer_class = BuildingSerializer


#likes and takes view for admin api
class LikesViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

class TakesViewSet(viewsets.ModelViewSet):

    queryset = Takes.objects.all()
    serializer_class = TakesSerializer


class IncludesViewSet(viewsets.ModelViewSet):

    queryset = Includes.objects.all()
    serializer_class = IncludesSerializer

class IncludesProductInfoViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = IncludesProductInfoSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''
        SELECT mi.vmID_id as vmID, mp.productName as productName, mp.productType as productType, mp.price as productPrice
        FROM machines_includes AS mi
        LEFT OUTER JOIN machines_product AS mp
        ON mi.productName = mp.productName
        WHERE vmID_id = %s;''', [self.request.GET['vmid']])
        return query_set

class PopularEnrlVMViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = PopularEnrlVMSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''select vm.buildingID_id as buildingID, vm.vmID as vmID, vm.VMLocation as VMLocation, vm.status as VMstatus, vm.type as VMtype
        from machines_vendingmachine as vm
        join
        (select crn.buildingID_id as buidlingID, sum(enrollment.cnt) as building_enrl_cnt
        from machines_crn as crn
        join
        (select crnID_id, count(user_id_id) as cnt
        from machines_takes
        group by crnID_id) as enrollment
        on crn.crnID = enrollment.crnID_id
        group by crn.buildingID_id) as building_enrl
        on vm.buildingID_id = building_enrl.buidlingID
        where status = 'WO'
        order by building_enrl.building_enrl_cnt desc''')
        return query_set

class PopularLikesVMViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = PopularLikesVMSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''
        select vm.buildingID_id as buildingID, vm.vmID as vmID, vm.VMLocation as VMLocation, vm.status as VMstatus, vm.type as VMtype
        from
        (SELECT vmID_id, productName
        FROM machines_includes
        WHERE productName IN
        (SELECT productName_id
        FROM machines_likes)) as vm_likes
        join machines_vendingmachine as vm
        on vm_likes.vmID_id = vm.vmID
        where vm.status = 'WO'
        group by vmID_id
        order by (count(distinct productName)) desc''')
        return query_set

class PopularDistanceVMViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = PopularDistanceVMSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''
        select vm.buildingID_id as buildingID, vm.vmID as vmID, vm.VMLocation as VMLocation, vm.status as VMstatus, vm.type as VMtype
        from
        (SELECT distinct buildingID_id, distance
        FROM vending_machine.machines_distance
        where distance < 10) as vm_distance
        join
        machines_vendingmachine as vm
        on vm_distance.buildingID_id = vm.buildingID_id
        order by distance''')
        return query_set

class PopularityIndexViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = PopularityIndexSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''
        select vm_distance.buildingID_id as buildingID, enrl_like.vmID as vmID, enrl_like.VMLocation as VMLocation, enrl_like.VMstatus as VMstatus, enrl_like.VMtype as VMtype
        from
        (select likes.buildingID, likes.vmID as vmID, likes.VMLocation as VMLocation, likes.VMstatus as VMstatus, likes.VMtype as VMtype, likes.likes_cnt as likes_cnt, enrl.enrl_cnt as enrl_cnt
        from
        (select vm.buildingID_id as buildingID, vm.vmID as vmID, vm.VMLocation as VMLocation, vm.status as VMstatus, vm.type as VMtype, count(distinct productName) as likes_cnt
        from
        (SELECT vmID_id, productName
        FROM machines_includes
        WHERE productName IN
        (SELECT productName_id
        FROM machines_likes)) as vm_likes
        join machines_vendingmachine as vm
        on vm_likes.vmID_id = vm.vmID
        where vm.status = 'WO'
        group by vmID_id
        order by likes_cnt desc) as likes
        join
        (select vm.vmID as vmID, building_enrl.building_enrl_cnt as enrl_cnt
        from machines_vendingmachine as vm
        join
        (select crn.buildingID_id as buidlingID, sum(enrollment.cnt) as building_enrl_cnt
        from machines_crn as crn
        join
        (select crnID_id, count(distinct user_id_id) as cnt
        from machines_takes
        group by crnID_id) as enrollment
        on crn.crnID = enrollment.crnID_id
        group by crn.buildingID_id) as building_enrl
        on vm.buildingID_id = building_enrl.buidlingID
        where status = 'WO'
        order by building_enrl_cnt desc) as enrl
        on enrl.vmID = likes.vmID) as enrl_like
        join
        (SELECT distinct buildingID_id, distance FROM vending_machine.machines_distance
        where distance < 10) as vm_distance
        on enrl_like.buildingID = vm_distance.buildingID_id
        order by (enrl_like.likes_cnt * enrl_like.enrl_cnt / vm_distance.distance) desc''')
        return query_set

class DistanceViewSet(viewsets.ModelViewSet):
    queryset = Distance.objects.all()
    serializer_class = DistanceSerializer

def index(request):
    return HttpResponse("Hello, world.")

def VendingMachine(request):
    return HttpResponse("This is the vending machine page")

def Building(request):
    return HttpResponse("This is the Building page")

def Product(request):
    return HttpResponse("This is the Product page")

def Likes(request):
    return HttpResponse("This is the Likes page")

def Takes(request):
    return HttpResponse("This is the Takes page")

def Includes(request):
    return HttpResponse("This is the Includes page")
