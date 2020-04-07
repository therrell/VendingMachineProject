from rest_framework.routers import DefaultRouter
from machines.views import CRNViewSet

router = DefaultRouter()
router.register(r'', CRNViewSet, 'crn')
urlpatterns = router.urls
