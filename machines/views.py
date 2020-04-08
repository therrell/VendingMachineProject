from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import VendingMachine, CRN
<<<<<<< HEAD
from .serializers import VendingMachineSerializer, CRNSerializer
from rest_framework import generics
from rest_framework import viewsets
=======
from .serializers import VendingMachineSerializer
from rest_framework import generics
from django.db import connection
>>>>>>> 00128d9c3399a7b8fc74cbcb362108f2219bc25c
# Create your views here.

class VendingMachineViewSet(viewsets.ModelViewSet):
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer

class CRNViewSet(viewsets.ModelViewSet):
    queryset = CRN.objects.all()
    serializer_class = CRNSerializer

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

def addCRN(request):
    if request.method == "POST":
        crn = CRN(request.POST)
        with connection.cursor() as cursor:
            # need to update "request.crn.crnid" wrt frontend
            cursor.execute("SELECT * FROM CRN WHERE CRN.CrnId = %s", [str(request.crn.crnid)])
            row = cursor.fetchall()
            # if not exist
            if len(row) == 0:
                cursor.execute("INSERT INTO CRN(CrnId, Subject, Number, BuildingId) VALUES(%s, %s, %s, %s)", [request.crn.id, crn.data['Subject'], crn.data['Number'], crn.data['BuildingId']])

    # probably need to return a render or redirect to some url

def deleteCRN(request):
    with connection.cursor() as cursor:
        # need to update "request.crn.crnid" wrt frontend
        cursor.execute("SELECT CrnId FROM CRN WHERE CRN.CrnId = %s", [str(request.crn.crnid)])
        row = cursor.fetchall()
        cursor.execute("DELETE FROM CRN WHERE CRN.CrnId = %s", [row[0]])
        cursor.execute("DELETE FROM Takes WHERE Takes.CrnId = %s", [row[0]])
        
    # probably need to return a render or redirect to some url

def updateCRN(request):
    if request.method == "POST":
        crn = CRN(request.POST)
        with connection.cursor() as cursor:
            # need to update "request.crn.crnid" wrt frontend
            cursor.execute("SELECT CrnId FROM CRN WHERE CRN.CrnId = %s", [str(request.crn.crnid)])
            row = cursor.fetchall()
            if len(row) == 0:
                print("CRN does not exist. Please add a CRN.")
            else:
                if crn.data['Subject']:
                    cursor.execute("UPDATE CRN SET CRN.Subject = %s WHERE CRN.CrnId = %s", [crn.data['Subject'], row[0]])
                if crn.data['Number']:
                    cursor.execute("UPDATE CRN SET CRN.Number = %s WHERE CRN.CrnId = %s", [crn.data['Number'], row[0]])
                if crn.data['BuildingId']:
                    cursor.execute("UPDATE CRN SET CRN.BuildingId = %s WHERE CRN.CrnId = %s", [crn.data['BuildingId'], row[0]])

    # probably need to return a render or redirect to some url