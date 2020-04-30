from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


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


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('buildingID', 'buildingName', 'buildingLocation', 'city')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('username', 'productName')

class TakesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Takes
        fields = ('username', 'crnID')

class IncludesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Includes
        fields = ('vmID', 'productName')

class IncludesProductInfoSerializer(serializers.Serializer):
    vmID = serializers.IntegerField(required=True)
    productName = serializers.CharField(max_length=200, required=True)
    productType = serializers.CharField(max_length=200, required=True)
    productPrice = serializers.DecimalField(max_digits=5, decimal_places=2, required=True)
    class Meta:
        fields = ('vmID', 'productName', 'productType', 'productPrice')
