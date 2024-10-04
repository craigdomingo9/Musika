from django.urls import path
from .views import *


urlpatterns = [
    
    
    path("category/",CategoryListCreateView.as_view()),
    path("category/<int:pk>",CategoryRetrieveUpdateDestroyView.as_view()),
    
    
    path("featured/",FeaturedProductsListView.as_view()),
    path("sale/",SaleProductsListView.as_view()),
    path("similar/<int:id>/",SimilarProductsListView.as_view()),
    path("explore/",ExploreProductsListView.as_view()),
    path("explore/<str:category>/",ExploreProductsByCategoryListView.as_view()),
    path('search/', ItemSearchView.as_view(), name='item-search'),
    
    
    path('products/<int:product_id>/reviews/', ReviewList.as_view(), name='review-list'),
    path('products/<int:product_id>/reviews/<int:review_id>/', ReviewDetail.as_view(), name='review-detail'),


    path("b/<str:business>/", BusinessProductsListView.as_view()),



    path("create/",ProductCreateView.as_view()),
    path("images/create/",ProductImageCreateView.as_view()),
    path("images/delete/<int:pk>/",ProductImageDeleteView.as_view()),
    path("delete/<int:pk>/",ProductDestroyView.as_view()),
    path("<int:product>/",ProductRetrieveView.as_view()),
    path("update/<int:pk>/",ProductUpdateView.as_view()),
    
    

    path("catalogs/",CatalogListView.as_view()),
    path("catalogs/create/",CatalogCreateView.as_view()),
    path("catalogs/<int:pk>/",CatalogRetrieveUpdateDestroyView.as_view()),
    
    path("catalogs/b/<str:business>/", BusinessCatalogsListView.as_view()),
    path("catalog/<int:catalog>/",ProductByCatalogListView.as_view()),
]

