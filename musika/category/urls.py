from django.urls import path
from .views import *

urlpatterns = [
    path("",CategoryListCreateView.as_view()),
    path("<int:pk>",CategoryRetrieveUpdateDestroyView.as_view()),
]
