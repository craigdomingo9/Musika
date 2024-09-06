from django.urls import path
from .views import *

urlpatterns = [
    path("business",BusinessAnalyticsListView.as_view(),name="business-analytics"),
    path("business/views/add",BusinessPageViewAddView.as_view(),name="business-analytics"),
    path("business/<str:pk>",BusinessAnalyticsRetrieveView.as_view()),
    path("products",ProductAnalyticsListView.as_view(),name="product-analytics"),
    path("products/b/<str:pk>",ProductAnalyticsForBusinessView.as_view(),name="product-analytics"),
    path("products/<int:pk>",ProductAnalyticsProductRetrieveView.as_view(),name="product-analytics"),
    path("products/views/add",ProductViewsAddView.as_view(),name="product-analytics"),
    path("products/bag/add",ProductBagAddsAddView.as_view(),name="product-analytics"),
]


