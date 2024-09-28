from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer,ProfileUpdateSerializer
from authentications.models import Credentials
from .models import Profile



# Create your views here.
class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileCreateView(APIView):
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        credentials = Credentials.objects.filter(email=data["email"]).first()
        profile = Profile.objects.create(
            credentials=credentials,
            first_name=data["first_name"],
            last_name=data["last_name"],
            phone_number=data["phone_number"],
            profile_picture=data["profile_picture"],
            address=data["address"],
            city=data["city"],
        )

        if profile:
            return Response({"detail": "Profile was created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Profile was not created."}, status=status.HTTP_400_BAD_REQUEST)




class ProfileUpdateView(APIView):
    def put(self, request):
        email = request.data.get("credentials")
        profile_data = request.data

        credentials = Credentials.objects.filter(email=email).first()
        profile_data["credentials"] = credentials

        # Find the profile by credentials
        profile = Profile.objects.filter(credentials=email).first()

        if not profile:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileUpdateSerializer(profile, data=profile_data, partial=True)

        if serializer.is_valid():
            print("-------------------------")
            serializer.save()
            return Response({"detail": "Profile was updated successfully."}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"detail": "Profile update failed!."}, status=status.HTTP_400_BAD_REQUEST)



class ProfileRetrieveView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

