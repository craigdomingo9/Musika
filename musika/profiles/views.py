from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProfileSerializer
from .models import Profile



# Create your views here.
class ProfileCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileRetriveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

