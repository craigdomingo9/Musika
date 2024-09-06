from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import *




# Create your views here.
class BusinessAnalyticsListView(generics.ListAPIView):
    queryset = BusinessAnalytics.objects.all()
    serializer_class = BusinessAnalyticsSerializer

class BusinessAnalyticsRetrieveView(generics.RetrieveAPIView):
    queryset = BusinessAnalytics.objects.all()
    serializer_class = BusinessAnalyticsSerializer



class ProductAnalyticsListView(generics.ListAPIView):
    queryset = ProductAnalytics.objects.all()
    serializer_class = ProductAnalyticsSerializer

class ProductAnalyticsProductRetrieveView(generics.RetrieveAPIView):
    queryset = ProductAnalytics.objects.all()
    serializer_class = ProductAnalyticsSerializer

class ProductViewsAddView(generics.CreateAPIView):
    queryset = ProductViews.objects.all()
    serializer_class = ProductViewsAddSerializer

class ProductBagAddsAddView(generics.CreateAPIView):
    queryset = ProductBagAdds.objects.all()
    serializer_class = ProductBagAddSerializer

class BusinessPageViewAddView(generics.CreateAPIView):
    queryset = BusinessPageViews.objects.all()
    serializer_class = BusinessPageViewsSerializer

class ProductAnalyticsForBusinessView(APIView):
    queryset = ProductAnalytics.objects.all()
    
    def get(self,request,**kwargs):
        analytics = self.queryset.filter(product__business__code=kwargs["pk"])
        serializer = ProductAnalyticsForBusinessSerializer(analytics,many=True).data
        return Response(serializer)
