from django.db import models
from products.models import Product
from profiles.models import Profile
from business.models import Business


# Create your models here.
class BusinessAnalytics(models.Model):
    business = models.OneToOneField(Business,primary_key=True,on_delete=models.CASCADE,related_name="business_analytics")
    
    class Meta:
        verbose_name_plural = "Business Analytics"
    
    def __str__(self) -> str:
        return f"Analytics for {self.business.name}"


class BusinessPageViews(models.Model):
    business = models.ForeignKey(BusinessAnalytics,on_delete=models.CASCADE,related_name="business_page_views")
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name="business_page_views")
    view_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Business Page Views"
    
    def __str__(self) -> str:
        return f"View Analytics for {self.business.business.name}"




class ProductAnalytics(models.Model):
    product = models.OneToOneField(Product,primary_key=True,on_delete=models.CASCADE,related_name="product_analytics")

    class Meta:
        verbose_name_plural = "Product Analytics"
    
    def __str__(self) -> str:
        return f"Analytics for {self.product.name}"
    
    @property
    def product_details(self):
        return Product.objects.get(id=self.product.id)


class ProductViews(models.Model):
    product = models.ForeignKey(ProductAnalytics,on_delete=models.CASCADE,related_name="product_views")
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    view_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Product Views"
    
    def __str__(self) -> str:
        return f"View Analytics for {self.product.product.name}"


class ProductBagAdds(models.Model):
    product = models.ForeignKey(ProductAnalytics,on_delete=models.CASCADE,related_name="product_bag_adds")
    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    bag_add_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Product Bag Adds"
    
    def __str__(self) -> str:
        return f"Bag Add Analytics for {self.product.product.name}"




