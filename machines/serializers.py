from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from .models import VendingMachine
from .models import User

class VendingMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendingMachine
        fields = ('buildingID', 'vmID', 'VMLocation', 'status', 'type')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'userID')

#need to assign user id on registration
class UserRegisterSerializer(RegisterSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'userID')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'userID': self.validated_data.get('userID', ''),
        }

    def save(self, request):
        print(request)
        adapter = get_adapter()
        user = adapter.new_user(adapter)
        self.cleaned_data = self.get_cleaned_data()
        user.userID = self.cleaned_data.get('userID')
        adapter.save_user(request, user, self)
        return user
