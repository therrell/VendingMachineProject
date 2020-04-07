from rest_framework.routers import DefaultRouter
from machines.views import VendingMachineViewSet

router = DefaultRouter()
router.register(r'', VendingMachineViewSet, 'mach')
urlpatterns = router.urls
