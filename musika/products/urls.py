from django.urls import path
from .views import *


urlpatterns = [
    path("",ProductListView.as_view()),
    path("sale=<int:on_sale>&homepage=<int:onHomepage>/",ProductListCreateView.as_view()),
    path("similar-products/id=<int:id>&category=<int:category>",SimilarProductsListView.as_view()),
    path("product-images/",ProductImageListCreateView.as_view()),
    path("product-image/<int:pk>",ProductImageRetrieveUpdateDestroyView.as_view()),
    path("product-variants/",ProductVariantListCreateView.as_view()),
    path("product-variant/<int:pk>",ProductVariantRetrieveUpdateDestroyView.as_view()),
    
    path("b/<str:code>/", BusinessesProductsRetrieveView.as_view()),
    


    path("images/create/",ProductImageCreateView.as_view()),
    path("images/delete/<int:pk>/",ProductImageDeleteView.as_view()),
    path("<int:pk>/",ProductRetrieveDestroyView.as_view()),
    path("update/",ProductUpdateView.as_view()),
    


    path("category/<str:category>/",ProductByCategoryListView.as_view()),

    path("catalogs/",CatalogListCreateView.as_view()),
    path("catalogs/create/",CatalogCreateView.as_view()),

    path("catalogs/<int:pk>/",CatalogRetrieveUpdateDestroyView.as_view()),
    path("catalogs/b/<str:code>/", BusinessesCatalogsRetrieveView.as_view()),
    path("catalog/<int:catalog>/",ProductByCatalogListView.as_view()),
]

