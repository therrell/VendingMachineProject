from rest_framework import serializers
from .models import *


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
        fields = ('productName', 'productType', 'price')


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('buildingID', 'buildingName', 'buildingLocation', 'city')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('id', 'productName')

class TakesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Takes
        fields = ('id', 'crnID')

class IncludesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Includes
        fields = ('id', 'vmID', 'productName')

class IncludesProductInfoSerializer(serializers.Serializer):
    vmID = serializers.IntegerField(required=True)
    productName = serializers.CharField(max_length=200, required=True)
    productType = serializers.CharField(max_length=200, required=True)
    productPrice = serializers.DecimalField(max_digits=5, decimal_places=2, required=True)
    class Meta:
        fields = ('vmID', 'productName', 'productType', 'productPrice')

class PopularEnrlVMSerializer(serializers.Serializer):
    buildingID = serializers.IntegerField(required=True)
    vmID = serializers.IntegerField(required=True)
    VMLocation = serializers.CharField(max_length=200, required=True)
    VMstatus = serializers.CharField(max_length=200, required=True)
    VMtype = serializers.CharField(max_length=200, required=True)
    class Meta:
        fields = ('buildingID', 'vmID', 'VMLocation', 'VMstatus', 'VMtype')

class PopularLikesVMSerializer(serializers.Serializer):
    buildingID = serializers.IntegerField(required=True)
    vmID = serializers.IntegerField(required=True)
    VMLocation = serializers.CharField(max_length=200, required=True)
    VMstatus = serializers.CharField(max_length=200, required=True)
    VMtype = serializers.CharField(max_length=200, required=True)
    class Meta:
        fields = ('buildingID', 'vmID', 'VMLocation', 'VMstatus', 'VMtype')

class PopularDistanceVMSerializer(serializers.Serializer):
    buildingID = serializers.IntegerField(required=True)
    vmID = serializers.IntegerField(required=True)
    VMLocation = serializers.CharField(max_length=200, required=True)
    VMstatus = serializers.CharField(max_length=200, required=True)
    VMtype = serializers.CharField(max_length=200, required=True)
    class Meta:
        fields = ('buildingID', 'vmID', 'VMLocation', 'VMstatus', 'VMtype')

class PopularityIndexSerializer(serializers.Serializer):
    buildingID = serializers.IntegerField(required=True)
    vmID = serializers.IntegerField(required=True)
    VMLocation = serializers.CharField(max_length=200, required=True)
    VMstatus = serializers.CharField(max_length=200, required=True)
    VMtype = serializers.CharField(max_length=200, required=True)
    class Meta:
        fields = ('buildingID', 'vmID', 'VMLocation', 'VMstatus', 'VMtype')

class DistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Distance
        fields = ('buildingID', 'distance')
