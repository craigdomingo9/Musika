from django.urls import path,include

urlpatterns = [
    path("analytics/",include("analytics.urls")),
    path("business/",include("business.urls")),
    path("category/",include("category.urls")),
    path("products/",include("products.urls")),
    path("profiles/",include("profiles.urls")),
]
