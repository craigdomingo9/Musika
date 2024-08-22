from django.urls import path,include
from .views import *

urlpatterns = [
    path("bs/", BusinessesListCreateView.as_view()),
    path("bs/<str:pk>/", BusinessesRetrieveUpdateView.as_view()),
    path("<str:code>/products/", BusinessesProductsRetrieveView.as_view()),
    path("<str:code>/catalogs/", BusinessesCatalogsRetrieveView.as_view()),
    path("subscriptions/",SubscriptionsListCreateView.as_view()),
    path("subscription/<str:business>",SubscriptionsRetrieveUpdateDestroyView.as_view()),
    path("locations/", LocationListCreateView.as_view()),
    path("location/<int:pk>/",LocationRetrieveUpdateDestroyView.as_view()),
    path("categories/",CategoryListCreateView.as_view()),
    path("category/<int:pk>",CategoryRetrieveUpdateDestroyView.as_view()),
    path("catalogs/",CatalogListCreateView.as_view()),
    path("catalog/<int:pk>/",CatalogRetrieveUpdateDestroyView.as_view()),
    path("products/",ProductListView.as_view()),
    path("products/sale=<int:on_sale>&homepage=<int:onHomepage>/",ProductListCreateView.as_view()),
    path("products/category=<str:category>/",ProductByCategoryListView.as_view()),
    path("products/catalog=<str:catalog>/",ProductByCatalogListView.as_view()),
    path("product/<int:pk>/",ProductRetrieveUpdateDestroyView.as_view()),
    path("similar-products/id=<int:id>&category=<int:category>",SimilarProductsListView.as_view()),
    path("product-images/",ProductImageListCreateView.as_view()),
    path("product-image/<int:pk>",ProductImageRetrieveUpdateDestroyView.as_view()),
    path("product-variants/",ProductVariantListCreateView.as_view()),
    path("product-variant/<int:pk>",ProductVariantRetrieveUpdateDestroyView.as_view()),
]
