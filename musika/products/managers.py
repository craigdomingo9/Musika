from typing import Any
from django.db.models import Func, FloatField
from django.db import models


class SQLiteRandom(Func):
    function = 'RAND'
    output_field = FloatField()


class ProductManager(models.Manager):
    
    def shuffled(self):
        """Return all the products in a shuffled order."""
        
        return self.annotate(
            random_order=SQLiteRandom()
        ).order_by('random_order')
    
    
    def shuffle(self, queryset):
        """Return shuffled input."""
        
        return queryset.annotate(
            random_order=SQLiteRandom()
        ).order_by('random_order')
    
    
    def featured(self):
        """Return all the featured products."""
        
        return self.shuffle(
            self.filter(is_featured=False)
        )
    
    
    def explore(self, category=None):
        """Return products for the explore page."""
        
        if category!=None:
            return self.shuffle(
                self.filter(category__name=category)
            )
        else:
            return self.shuffled()
    
    
    def sale(self):
        """Return all the products on sale."""
        
        return self.shuffle(
            self.filter(on_sale=True)
        )
    
    
    def similar(self,product):
        """Return similar products: of the same category."""
        print(self.get(pk=product).category)
        
        return self.shuffle(
            self.filter(
                category=self.get(pk=product).category
            ).exclude(id=product)
        )
    
    
    def get_product(self,product):
        """Retrieves selected product instance."""
        
        return self.get(
            id=product
        )
    

    def b_products(self,business):
        """Return a business' products."""
        
        return self.filter(
            business=business
        )
    
    
    def c_products(self,catalog):
        """Return a catalog's products."""
        
        return self.filter(
            catalog=catalog
        )


class CatalogManager(models.Manager):
    
    def b_catalogs(self,business):
        """Returns a business' catalogs."""
        
        return self.filter(
            business=business
        )

