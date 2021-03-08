from django.contrib import admin
from .models import Word, Profile, ProfileWord
# Register your models here.

admin.site.register(Profile)
admin.site.register(ProfileWord)

@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ("word_pl","word_en")
    search_fields = ("word_pl","word_en")