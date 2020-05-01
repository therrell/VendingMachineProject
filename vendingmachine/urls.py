from django.contrib import admin
from django.urls import path, include
from .router import router
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('user/', include('user.urls')),
    ]
