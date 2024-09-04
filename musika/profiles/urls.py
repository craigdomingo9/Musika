from django.urls import path
from .views import *

urlpatterns = [
    path("",ProfileListView.as_view()),
    path("create",ProfileCreateView.as_view()),
    path("edit",ProfileUpdateView.as_view()),
    path("<str:pk>",ProfileRetrieveView.as_view()),
]

