from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ["id","name","description","image","has_products"]
    
    def get_has_products(self,obj):
        return obj.has_products



class CatalogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalog
        fields = ["id","name","description","created_at","updated_at","category"]
        depth = 1

class CatalogCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalog
        fields = ["business","name","description","category"]


class ProductCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["name","catalog","category","business","description","price","on_sale","sale_price","inventory_quantity"]
    

class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['id','image']

class ProductImageCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['product','image']
    

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","catalog","business","category","images","variant","description","price","on_sale","sale_price","inventory_quantity","created_at"]
        depth = 1


class ProductUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","description","price","on_sale","sale_price","inventory_quantity"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        return Review.objects.create(**validated_data)


class ProductVariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductVariant
        fields = "__all__"



