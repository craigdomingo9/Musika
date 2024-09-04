from django.urls import path
from .views import *

urlpatterns = [
    path("",ProductListView.as_view()),
    path("sale=<int:on_sale>&homepage=<int:onHomepage>/",ProductListCreateView.as_view()),
    path("<int:pk>/",ProductRetrieveUpdateDestroyView.as_view()),
    path("similar-products/id=<int:id>&category=<int:category>",SimilarProductsListView.as_view()),
    path("product-images/",ProductImageListCreateView.as_view()),
    path("product-image/<int:pk>",ProductImageRetrieveUpdateDestroyView.as_view()),
    path("product-variants/",ProductVariantListCreateView.as_view()),
    path("product-variant/<int:pk>",ProductVariantRetrieveUpdateDestroyView.as_view()),
    
    path("b/<str:code>/", BusinessesProductsRetrieveView.as_view()),
    
    path("category/<str:category>/",ProductByCategoryListView.as_view()),

    path("catalogs/",CatalogListCreateView.as_view()),
    path("catalogs/<int:pk>/",CatalogRetrieveUpdateDestroyView.as_view()),
    path("catalogs/business/<str:code>/", BusinessesCatalogsRetrieveView.as_view()),
    path("catalog/<int:catalog>/",ProductByCatalogListView.as_view()),
]

