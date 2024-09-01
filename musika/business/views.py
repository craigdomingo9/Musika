from .models import *
from .serializers import *
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class BusinessesListCreateView(generics.ListCreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessCreateSerializer



class BusinessCreateView(APIView):
    serializer_class = BusinessCreateSerializer

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        data = request.data

        print(data)

        if serializer.is_valid():
            business = Business.objects.create(
                name=data["name"],
                description=data["description"],
                categories=data["categories"],
                logo=data["logo"],
                phone_number=data["phone_number"],
                email=data["email"],
            )
            response = Response({
                "detail":"Business was created successfully.",
                "business_code":business.code,
                "business_email":business.email
                },
                status=status.HTTP_201_CREATED)
            return response
        else:
            return Response({"detail": "Invalid request"},status=status.HTTP_400_BAD_REQUEST)



class BusinessesRetrieveUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class SubscriptionsListCreateView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionsSerializer

class SubscriptionsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    lookup_field = "business"
    serializer_class = SubscriptionsSerializer

class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationCreateView(APIView):
    queryset = Location.objects.all()
    serializer_class = LocationCreateSerializer

    def post(self,request,**kwargs):

        data = request.data

        code = kwargs["code"]
        business = Business.objects.filter(code=code).first()
        print(business)

        data["business"] = business.pk

        serializer = self.serializer_class(data=request.data)

        print(data)

        if serializer.is_valid():
            serializer.save()

            return Response({"detail":"Location was set up successfully."},status=status.HTTP_201_CREATED)
        return Response({"detail": "Location set up failed."},status=status.HTTP_400_BAD_REQUEST)


class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
