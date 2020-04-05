from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('$/', views.VendingMachine, name='VendingMachine'),
    path('$/', views.CRN, name='CRN'),
    path('$/', views.Building, name='Building'),
    path('$/', views.Product, name='Product'),
    path('$/', views.Likes, name='Likes'),
    path('$/', views.Takes, name='Takes'),
    path('$/', views.Includes, name='Includes')
]
