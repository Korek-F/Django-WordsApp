from django.db import models
from django.contrib.auth.models import User


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

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(blank=True, null=True, max_length=40)
    last_name = models.CharField(blank=True, null=True, max_length=40)

    def __str__(self):
        return self.user.username
    