from rest_framework.routers import DefaultRouter
from machines.views import CRNViewSet, VendingMachineViewSet, ProductViewSet


router = DefaultRouter()
router.register('courses', CRNViewSet, 'course')
router.register('machines', VendingMachineViewSet, 'machine')
router.register('products', ProductViewSet, 'product')
