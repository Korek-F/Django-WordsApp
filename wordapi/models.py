from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Word(models.Model):
    STATUS_CHOICES = (
        ("BRAK", "Nie wybrano"),
        ("NIEZNAM", "Nie znam"),
        ("KOJARZE", "Kojarzę"),
        ("ZNAM", "Znam"),
    )
    
    word_en = models.CharField(max_length=60,  null=True)
    word_pl = models.CharField(max_length=60, null=True)
    status = models.CharField(choices=STATUS_CHOICES, default=None, max_length=255, null=True)
    #STATUS_CHOICES[0][0]
    def __str__(self):
        return self.word_en

#class User(AbstractUser):
#   gender = models.BooleanField(default=True)