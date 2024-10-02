from .models import *
from .serializers import *
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from analytics.models import BusinessAnalytics


# Create your views here.
class BusinessesListCreateView(generics.ListCreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessCreateSerializer


class BusinessCreateView(APIView):
    serializer_class = BusinessCreateSerializer

    def post(self,request):
        data = request.data
        serializer = self.serializer_class(data=data)


        if serializer.is_valid():
            business = serializer.save()
            Subscription.objects.create(
                business=business,
                plan=SubscriptionPlan.objects.get(name="Basic"),
                interval="quarterly",
            )
            BusinessAnalytics.objects.create(business=business)
            
            
            response = Response({
                "detail":"Business was created successfully.",
                "business_code":business.code,
                "business_email":business.email
                },
                status=status.HTTP_201_CREATED)
            return response
        else:
            print(serializer.errors)
            return Response({"detail": "Invalid request. Please try again."},status=status.HTTP_400_BAD_REQUEST)


class BusinessesUpdateView(APIView):
    queryset = Business.objects.all()
    serializer_class = BusinessUpdateSerializer
    
    def put(self, request,**kwargs):
        data = request.data
        
        business = Business.objects.get(pk=kwargs["pk"])
        
        if not business:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(business, data=request.data, partial=True)
        
        if serializer.is_valid():
            print("-------------------------")
            serializer.save()
            return Response({"detail": "Profile was updated successfully."}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"detail": "Profile update failed!."}, status=status.HTTP_400_BAD_REQUEST)
        
    



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
