from django.urls import path
from .views import ProfileCreateView,ProfileRetriveUpdateView

urlpatterns = [
    path("",ProfileCreateView.as_view()),
    path("<str:pk>",ProfileRetriveUpdateView.as_view()),
]

