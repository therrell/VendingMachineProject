from django.shortcuts import render
from django.http import HttpResponse
from .models import VendingMachine
from .serializers import VendingMachineSerializer
from rest_framework import generics
# Create your views here.

class VendingMachineListCreate(generics.ListCreateAPIView):
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer

def index(request):
    return HttpResponse("Hello, world.")

def VendingMachine(request):
    return HttpResponse("This is the vending machine page")

def CRN(request):
    return HttpResponse("This is the CRN page")

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
