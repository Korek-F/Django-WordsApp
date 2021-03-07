from django.contrib import admin
from .models import Word, Profile, ProfileWord
# Register your models here.
admin.site.register(Word)
admin.site.register(Profile)
admin.site.register(ProfileWord)