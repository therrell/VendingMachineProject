from rest_framework import serializers
from .models import *
from rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):

    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'name': self.validated_data.get('name', ''),
        }

class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email','name','date_of_birth')
        read_only_fields = ('email')

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
        fields = ('username')

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
