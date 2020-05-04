from django.contrib import admin
import machines.models as mm

# Register your models here.

admin.site.register(mm.VendingMachine)
admin.site.register(mm.CRN)
admin.site.register(mm.Building)
admin.site.register(mm.Product)
admin.site.register(mm.Likes)
admin.site.register(mm.Takes)
admin.site.register(mm.Includes)

admin.site.register(mm.Distance)
