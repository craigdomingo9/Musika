from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,status
from django.db.models import Q
from analytics.models import ProductAnalytics
from django.shortcuts import get_object_or_404




# Create your views here.
class ItemSearchView(APIView):
    serializer_class = ProductSerializer

    def get(self,request):
        query = request.query_params.get('q', None)
        keywords = query.split()
        filters = models.Q()

        for keyword in keywords:
            filters |= models.Q(description__icontains=keyword) | models.Q(name__icontains=keyword) | models.Q(category__name__icontains=keyword) | models.Q(catalog__name__icontains=keyword) | models.Q(business__name__icontains=keyword) | models.Q(business__description__icontains=keyword)
            
            
            return Response(
                ProductSerializer(
                    Product.objects.filter(filters),
                    many=True
                ).data
            )


class ReviewList(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        reviews = product.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ReviewDetail(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ReviewDetail(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, product_id, review_id):
        product = get_object_or_404(Product, id=product_id)
        review = get_object_or_404(Review, id=review_id, product=product)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CatalogListView(generics.ListCreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer


class CatalogCreateView(generics.CreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogCreateSerializer


class CatalogRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer


class BusinessCatalogsListView(generics.RetrieveAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer

    def get(self,request, **kwargs):
        business = kwargs["business"]
        return Response(
            CatalogSerializer(
                Catalog.objects.b_catalogs(business),
                many=True
            ).data
        )


class FeaturedProductsListView(APIView):
    def get(self,request):
        
        return Response(
            ProductSerializer(
                Product.objects.featured(),
                many=True
            ).data
        )


class SaleProductsListView(APIView):
    def get(self,request):
        
        return Response(
            ProductSerializer(
                Product.objects.sale(),
                many=True
            ).data
        )


class ExploreProductsListView(APIView):
    def get(self,request):
        
        return Response(
            ProductSerializer(
                Product.objects.explore(),
                many=True
            ).data
        )


class ExploreProductsByCategoryListView(APIView):
    def get(self,request,**kwargs):
        category = kwargs["category"]

        return Response(
            ProductSerializer(
                Product.objects.explore(category=category),
                many=True
            ).data
        )


class SimilarProductsListView(APIView):
    def get(self,request,**kwargs):
        id = kwargs["id"]
        
        return Response(
            ProductSerializer(
                Product.objects.similar(id),
                many=True
            ).data
        )


class ProductRetrieveView(APIView):
    def get(self,request,**kwargs):
        product = kwargs["product"]
        
        return Response(
            ProductSerializer(
                Product.objects.get_product(product)
            ).data
        )


class BusinessProductsListView(APIView):
    def get(self,request,**kwargs):
        business = kwargs["business"]
        
        return Response(
            ProductSerializer(
                Product.objects.b_products(business),
                many=True
            ).data
        )


class ProductByCatalogListView(APIView):
    def get(self,request,**kwargs):
        catalog = kwargs["catalog"]

        return Response(
            ProductSerializer(
                Product.objects.c_products(catalog),
                many=True
            ).data
        )


class ProductCreateView(APIView):
    def post(self,request):
        serializer = ProductCreateSerializer(data=request.data)

        if serializer.is_valid():
            product = serializer.save()
            ProductAnalytics.objects.create(product=product)
            return Response({"id":product.id,"detail": "Product was created successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Failed to create product. Try Again."}, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUpdateSerializer


class ProductDestroyView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductImageCreateView(generics.CreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageCreateSerializer


class ProductImageDeleteView(generics.DestroyAPIView):
    queryset = ProductImage
    serializer_class = ProductImageSerializer




