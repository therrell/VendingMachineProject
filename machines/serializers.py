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
        fields = ('productID', 'productName', 'productType', 'price')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userID')

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('buildingID', 'buildingName', 'buildingLocation', 'city')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('userID', 'productID')

class TakesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Takes
        fields = ('userID', 'crnID')

class IncludesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Takes
        fields = ('vmID', 'productID')
