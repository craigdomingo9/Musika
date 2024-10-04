from django.db import models
from business.models import *
from .managers import ProductManager,CatalogManager
from profiles.models import Profile




# Create your models here.


"""   Category   """
class Category(models.Model):
    name = models.CharField(max_length=50,blank=False)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='./images/categories',blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['name']
        verbose_name_plural = "Categories"
    
    def __str__(self) -> str:
        return self.name
    
    @property
    def has_products(self):
        has_products = Product.objects.filter(category=self.id).exists()
        return has_products
    


"""   Catalog   """
class Catalog(models.Model):
    business = models.ForeignKey(Business,related_name="catalog", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = CatalogManager()

    def __str__(self) -> str:
        return self.name


"""   Product   """
class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE)
    business = models.ForeignKey(Business,related_name="products", on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    on_sale = models.BooleanField(default=False,blank=True)
    is_featured = models.BooleanField(default=False,blank=True)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2,blank=True,null=True)
    inventory_quantity = models.PositiveIntegerField(default=1,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProductManager()

    def __str__(self) -> str:
        return self.name



"""   Product Reviews   """
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.IntegerField()  # Rating out of 5
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.author.username} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"


"""   Product Image   """
class ProductImage(models.Model):
    product = models.ForeignKey(Product,related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./images/product_images')
    alt_text = models.CharField(max_length=100,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.product.name
    


class ProductVariant(models.Model):
    product = models.ForeignKey(Product,related_name="variant", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./images/product_images/variants')
    description = models.CharField(max_length=200,default="",blank="True")
    attribute_name = models.CharField(max_length=100)
    attribute_value = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.product.name
