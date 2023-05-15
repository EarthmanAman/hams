
from django.urls import path

from . views import UserCreateView, UserUpdateView, VerifyAccount, CustomAuthToken

app_name = 'accounts'
urlpatterns = [
    
    path('register/', UserCreateView.as_view()),
    path("login/", CustomAuthToken.as_view(), name="login"),
    path('update/<int:pk>/', UserUpdateView.as_view()),
    path('verify/', VerifyAccount.as_view()),
]
