from django.db import models

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
