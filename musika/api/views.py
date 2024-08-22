from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from django.db.models import F, Func, Value

# Create your views here.
class BusinessesListCreateView(generics.ListCreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

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

class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CatalogListCreateView(generics.ListCreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

class CatalogRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.shuffled().all()
    serializer_class = ProductsSerializer

    def get(self,request,*args,**kwargs):
        onsale = kwargs["on_sale"]
        if onsale == 0:
            if kwargs["onHomepage"] == 1:
                products_on_sale = self.queryset.filter(on_sale=False)
            else:
                products_on_sale = self.queryset.all()
        elif onsale == 1:
            products_on_sale = self.queryset.filter(on_sale=True)
        

        return Response(self.serializer_class(products_on_sale,many=True).data)

class BusinessesProductsRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    
    def get(self, request, *args, **kwargs):
        code = kwargs["code"]
        data = self.serializer_class(self.queryset.filter(business_id=code).order_by("created_at"),many=True).data
        return Response(data)

class BusinessesCatalogsRetrieveView(generics.RetrieveAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

    def get(self,request,*args, **kwargs):
        code = kwargs["code"]
        data = self.serializer_class(self.queryset.filter(business__code=code),many=True).data
        return Response(data)

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.shuffled().all()
    serializer_class = ProductsSerializer


class SimilarProductsListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer

    def get(self,request,*args,**kwargs):
        id = kwargs["id"]
        category = Category.objects.get(id=kwargs["category"])

        similar_products = Product.objects.shuffled().filter(category__name=category).exclude(id=id)

        s_similar_products = ProductsSerializer(similar_products,many=True)

        return Response(s_similar_products.data)

class ProductByCategoryListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer

    def get(self,request,*args,**kwargs):
        category = kwargs["category"]

        products_by_category = Product.objects.shuffled().filter(category__name=category)
        s_products_by_category = ProductsSerializer(products_by_category,many=True)

        return Response(s_products_by_category.data)

class ProductByCatalogListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer

    def get(self,request,*args,**kwargs):
        catalog = kwargs["catalog"]

        products_by_catalog = Product.objects.filter(catalog__id=catalog)
        s_products_by_catalog = ProductsSerializer(products_by_catalog,many=True)

        return Response(s_products_by_catalog.data)

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer

class ProductImageListCreateView(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ProductImageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ProductVariantListCreateView(generics.ListCreateAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer

class ProductVariantRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer


