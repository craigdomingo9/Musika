# models.py
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from django.db import models
import uuid



class Credentials(AbstractBaseUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'


class Token(models.Model):
    key = models.CharField(max_length=40, primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(Credentials, related_name='auth_tokens', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['user']
        verbose_name_plural = "Tokens"

    def __str__(self):
        return self.key
