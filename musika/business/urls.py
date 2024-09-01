from django.urls import path
from .views import *

urlpatterns = [
    path("", BusinessesListCreateView.as_view()),
    path("create/", BusinessCreateView.as_view()),
    path("<str:pk>/", BusinessesRetrieveUpdateView.as_view()),
    path("subscriptions/",SubscriptionsListCreateView.as_view()),
    path("subscription/<str:business>",SubscriptionsRetrieveUpdateDestroyView.as_view()),
    path("locations/", LocationListCreateView.as_view()),
    path("locations/create/b=<str:code>", LocationCreateView.as_view()),
    path("location/<int:pk>/",LocationRetrieveUpdateDestroyView.as_view()),
]



