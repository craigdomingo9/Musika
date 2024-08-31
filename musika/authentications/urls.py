# urls.py
from django.urls import path
from .views import SignUpView,LoginView,LogoutView,VerifyTokenView

urlpatterns = [
    path('verify-token/', VerifyTokenView.as_view(), name='verify-token'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]