from rest_framework import serializers
from .models import *


class CatalogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalog
        fields = ["id","name","description","created_at","updated_at","category"]
        depth = 1

class CatalogCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalog
        fields = ["business","name","description","category"]


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"

class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['id','image']

class ProductImageCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ['product','image']
    

class ProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","catalog","business","images","variant","description","price","on_sale","sale_price","inventory_quantity","created_at"]
        depth = 1

class ProductUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","description","price","on_sale","sale_price","inventory_quantity"]


class ProductsByCatalogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","images","variant","description","price","on_sale","sale_price","inventory_quantity"]
        depth = 1

class BusinessProductsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id","name","images","description","price","on_sale","sale_price","inventory_quantity","created_at"]
        depth = 1


class ProductVariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductVariant
        fields = "__all__"



