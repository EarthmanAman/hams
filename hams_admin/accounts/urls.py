
from django.urls import path

from . views import UserCreateView, UserUpdateView

app_name = 'accounts'
urlpatterns = [
    
    path('register/', UserCreateView.as_view()),
    path('update/<int:pk>/', UserUpdateView.as_view()),
]
