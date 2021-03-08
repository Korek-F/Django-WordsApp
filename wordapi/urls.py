from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('overview', views.apiOverview, name="overview"),
    path('get-word', views.getWord, name="get-word"),
    path('update-status/<int:pk>', views.updateStatus, name="update-status"),
    path('', views.mainPage, name="main"),
    path('register', views.RegisterView.as_view(), name="register"),
    path('login_view', views.LoginView.as_view(), name="login_view"),
    path('word_list', views.WordListView.as_view(), name="word_list"),
    path('restart_words', views.restart_words, name="restart_words"),
    path('add_word', views.AddWord.as_view(), name="add_word"),
    path('find_word/<str:name>', views.find_word, name="find_word"),
]

