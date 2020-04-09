from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

# Create your views here.

class VendingMachineViewSet(viewsets.ModelViewSet):
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer

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

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

class TakesViewSet(viewsets.ModelViewSet):
    queryset = Takes.objects.all()
    serializer_class = TakesSerializer

class IncludesViewSet(viewsets.ModelViewSet):
    queryset = Includes.objects.all()
    serializer_class = IncludesSerializer

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
