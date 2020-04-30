from django.shortcuts import render, redirect
from django.http import HttpResponse
# from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_auth.registration.views import RegisterView
# Create your views here.


class CustomRegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomRegisterSerializer

class VendingMachineViewSet(viewsets.ModelViewSet):
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['buildingID__buildingName']

class CRNViewSet(viewsets.ModelViewSet):
    queryset = CRN.objects.all()
    serializer_class = CRNSerializer

    #@action(detail=True, )

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
    # filter_backends = [filters.SearchFilter]
    # search_fields = ['buildingName']

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set

class TakesViewSet(viewsets.ModelViewSet):
    queryset = Takes.objects.all()
    serializer_class = TakesSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set

class IncludesViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = IncludesProductInfoSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.raw('''
        SELECT mi.vmID_id as vmID, mp.productName as productName, mp.productType as productType, mp.price as productPrice
        FROM machines_includes AS mi
        LEFT OUTER JOIN machines_product AS mp
        ON mi.productName_id = mp.productName
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
