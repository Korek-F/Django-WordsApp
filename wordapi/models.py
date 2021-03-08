from django.db import models
from django.contrib.auth.models import User


class Word(models.Model):
    word_en = models.CharField(max_length=60,  null=True)
    word_pl = models.CharField(max_length=60, null=True)
    public = models.BooleanField(default=True)
    #STATUS_CHOICES[0][0]
    def __str__(self):
        return self.word_en 

class ProfileWord(models.Model):
    owner = models.ForeignKey("Profile", null=True, on_delete=models.CASCADE)
    word_en = models.ForeignKey("Word", null=True, on_delete=models.CASCADE)

    STATUS_CHOICES = (
        ("BRAK", "Nie wybrano"),
        ("NIEZNAM", "Nie znam"),
        ("KOJARZE", "Kojarzę"),
        ("ZNAM", "Znam"),
    )

    status = models.CharField(choices=STATUS_CHOICES, default=None, max_length=255, null=True)
    class Meta:
        ordering = ['-status']

    def __str__(self):
        return self.owner.user.username+" "+str(self.word_en.word_en)
class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    first_name = models.CharField(blank=True, null=True, max_length=40)
    last_name = models.CharField(blank=True, null=True, max_length=40)
    words = models.ManyToManyField("ProfileWord", related_name='+',blank=True)

    def __str__(self):
        return self.user.username

