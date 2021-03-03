from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Word
from .serializers import WordSerializer
from django.db.models import Q
import random
from rest_framework import generics
from rest_framework import permissions
from django.http import JsonResponse
# Create your views here.

@api_view(["GET"])
def apiOverview(request):
    api_urls={
        'get'
    }
    return Response(api_urls)

@api_view(["GET"])
def getWord(resquest):
    words = Word.objects.all()
    words = Word.objects.filter(~Q(status="ZNAM"))
    try:
        word = random.choice(words)
        serializers = WordSerializer(word, many=False)
        return Response(serializers.data)
    except: 
        words = Word.objects.all()
        word = random.choice(words)
        serializers = WordSerializer(word, many=False)
        return Response(serializers.data)

def mainPage(request):
    return render(request, 'wordapi/index.html')

@api_view(["UPDATE"])
def updateStatus(request,pk):
    word = Word.objects.get(id=pk)
    serializer = WordSerializer(instance=word, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)


    return Response(serializer.data)


    
