from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status



# Create your views here.
class CatalogListCreateView(generics.ListCreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer


class CatalogCreateView(APIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogCreateSerializer

    def post(self,request):
        data = {
            "business": request.data["business"],
            "name": request.data["name"],
            "description": request.data["description"],
            "category": request.data["category"]
        }
        print(data)
        serializer = CatalogCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            
            return Response({"detail": "Catalog was created successfully."}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"detail": "Failed to create catalog. Try Again."}, status=status.HTTP_400_BAD_REQUEST)

class ProductCreateView(APIView):
    queryset = Product.objects.all()
    
    def post(self,request):
        serializer = ProductCreateSerializer(data=request.data)

        if serializer.is_valid():
            product = serializer.save()
            return Response({"id":product.id,"detail": "Product was created successfully."}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"detail": "Failed to create product. Try Again."}, status=status.HTTP_400_BAD_REQUEST)




class CatalogRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer


class BusinessesCatalogsRetrieveView(generics.RetrieveAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

    def get(self,request,*args, **kwargs):
        code = kwargs["code"]
        data = self.serializer_class(self.queryset.filter(business__code=code),many=True).data
        return Response(data)


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
        print(category)

        products_by_category = Product.objects.shuffled().filter(category__name=category)
        s_products_by_category = ProductsSerializer(products_by_category,many=True)

        return Response(s_products_by_category.data)

class BusinessesProductsRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    
    def get(self, request, **kwargs):
        code = kwargs["code"]
        data = self.serializer_class(self.queryset.filter(business_id=code).order_by("created_at"),many=True).data
        return Response(data)


class ProductByCatalogListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsByCatalogSerializer

    def get(self,request,**kwargs):
        catalog = kwargs["catalog"]

        products_by_catalog = Product.objects.filter(catalog__id=catalog)
        s_products_by_catalog = ProductsByCatalogSerializer(products_by_catalog,many=True)
        
        return Response(s_products_by_catalog.data)

class ProductRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer


class ProductUpdateView(APIView):
    def put(self, request):
        product = Product.objects.get(id=request.data["id"])
        
        print(request.data)

        if not product:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductUpdateSerializer(product, data=request.data,partial=True)

        if serializer.is_valid():
            print("-------------------------")
            serializer.save()
            return Response({"detail": "Product was updated successfully."}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({"detail": "profile update failed!."}, status=status.HTTP_400_BAD_REQUEST)

class ProductImageListCreateView(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

class ProductImageCreateView(generics.CreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageCreateSerializer


class ProductImageDeleteView(generics.DestroyAPIView):
    queryset = ProductImage
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


