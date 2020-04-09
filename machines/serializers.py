from rest_framework import serializers
from .models import VendingMachine, CRN, Product

class VendingMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendingMachine
        fields = ('buildingID', 'vmID', 'VMLocation', 'status', 'type')

class CRNSerializer(serializers.ModelSerializer):
    class Meta:
        model = CRN
        fields = ('crnID', 'subject', 'number', 'buildingID')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('productID', 'productName', 'productType', 'price')
