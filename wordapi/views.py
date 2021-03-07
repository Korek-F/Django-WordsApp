from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Word, Profile, ProfileWord
from .serializers import WordSerializer
from django.db.models import Q
import random
from rest_framework import generics
from rest_framework import permissions
from django.http import JsonResponse
from django.views.generic.base import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
# Create your views here.

@api_view(["GET"])
def apiOverview(request):
    api_urls={
        'get'
    }
    return Response(api_urls)

@api_view(["GET"])
def getWord(request):
    user = request.user.profile
    words = ProfileWord.objects.filter(~Q(status="ZNAM")).filter(owner=user)
    try:
        word = random.choice(words)
        serializers = WordSerializer(word, many=False)
        return Response(serializers.data)
    except: 
        words = ProfileWord.objects.all()
        word = random.choice(words)
        serializers = WordSerializer(word, many=False)
        return Response(serializers.data)

def mainPage(request):
    return render(request, 'wordapi/index.html')

@api_view(["UPDATE"])
def updateStatus(request,pk):
    word = ProfileWord.objects.get(id=pk)
    serializer = WordSerializer(instance=word, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)


    return Response(serializer.data)
import string
def validate(password):
    letters = set(string.ascii_letters)
    digits = set(string.digits)
    pwd = set(password)
    return not (pwd.isdisjoint(letters) or pwd.isdisjoint(digits))

class RegisterView(View):
    def get(self, request):
        return render(request, 'wordapi/register.html')
    
    def post(self, request):
        name = request.POST["name"]
        email = request.POST["email"]
        password = request.POST["password"]

        if not User.objects.filter(username=name).exists():
            if not validate(password) and len(password)<7:
                return render(request, 'wordapi/register.html')
            user = User.objects.create_user(username=name, email=email)
            user.set_password(password)
            user.save()
            profile = Profile(user=user)
            words = Word.objects.all()
            profile.save()
            for word in words:
                word1 = ProfileWord(word_en=word)
                word1.owner = profile
                word1.save()
                profile.words.add(word1)
            profile.save()
            return redirect("login_view")
        return render(request, 'wordapi/register.html')

class LoginView(View):
    def get(self, request):
        return render(request, "wordapi/login_view.html")
    def post(self, request):
        name = request.POST["name"]
        password = request.POST["password"]
        user = authenticate(request, username=name, password=password)
        if User is not None:
            auth_login(request, user)
            return redirect("main")
        else:
            return render(request, "wordapi/login_view.html")

class WordListView(View):
    def get(self, request):
        user = request.user.profile
        words = ProfileWord.objects.filter(owner=user)
        return render(request, "wordapi/word_list.html", {'words':words})
    

