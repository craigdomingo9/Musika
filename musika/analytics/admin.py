from django.contrib import admin
from .models import ProductAnalytics,ProductViews,ProductBagAdds,BusinessAnalytics,BusinessPageViews



# Business Analytics
admin.site.register(BusinessAnalytics)
admin.site.register(BusinessPageViews)

# Business Analytics
admin.site.register(ProductAnalytics)
admin.site.register(ProductViews)
admin.site.register(ProductBagAdds)