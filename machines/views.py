from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from django.contrib.auth.models import User, Group
from .serializers import *
from rest_framework import permissions, generics
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication


#might want to change viewing all items in db to permissions.IsAdmin
class VendingMachineViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['buildingID__buildingName']

class CRNViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = CRN.objects.all()
    serializer_class = CRNSerializer


class ProductViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BuildingViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = Building.objects.all()
    serializer_class = BuildingSerializer


#likes and takes need updated views for individual users
class LikesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer


class TakesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = Takes.objects.all()
    serializer_class = TakesSerializer

class IncludesViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    queryset = Includes.objects.all()
    serializer_class = IncludesSerializer

class IncludesProductInfoViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    
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
