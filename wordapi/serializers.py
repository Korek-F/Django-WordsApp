from rest_framework import serializers
from .models import ProfileWord

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileWord
        fields="__all__"
        depth = 1
    