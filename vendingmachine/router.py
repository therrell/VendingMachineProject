from rest_framework.routers import DefaultRouter
from machines.views import *
from user.views import *


router = DefaultRouter()
router.register('courses', CRNViewSet, 'course')
router.register('machines', VendingMachineViewSet, 'machine')
router.register('products', ProductViewSet, 'product')
router.register('buildings', BuildingViewSet, 'building')

router.register('likes', LikesViewSet, 'like')
router.register('takes', TakesViewSet, 'take')

router.register('includes', IncludesViewSet, 'include')
router.register('includesinfo', IncludesProductInfoViewSet, 'include-info')

router.register('userlikes', UserLikesViewSet, 'like')
router.register('usertakes', UserTakesViewSet, 'take')

router.register('popularenrlvms', PopularEnrlVMViewSet, 'popular-enrl-vm')
router.register('popularlikesvms', PopularLikesVMViewSet, 'popular-likes-vm')
router.register('populardistancevms', PopularDistanceVMViewSet, 'popular-likes-vm')
router.register('popularityindex', PopularityIndexViewSet, 'popularity-index')

router.register('distance', DistanceViewSet, 'building-distance')
