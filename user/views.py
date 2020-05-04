from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import viewsets
from machines.models import Likes, Takes
from machines.serializers import LikesSerializer, TakesSerializer

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestView(APIView):
    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

#user view for frontend displan
class UserLikesViewSet(viewsets.ModelViewSet):

    queryset = Likes.objects.all()

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user_id=user.id)
        return queryset

    serializer_class = LikesSerializer

class UserTakesViewSet(viewsets.ModelViewSet):
    queryset = Takes.objects.all()

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user_id=user.id)
        return queryset

    serializer_class = TakesSerializer
