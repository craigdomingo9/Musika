from django.urls import path,include

urlpatterns = [
    path("business/",include("business.urls")),
    path("category/",include("category.urls")),
    path("products/",include("products.urls")),
    path("profiles/",include("profiles.urls")),
]
