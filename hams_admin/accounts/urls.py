
from django.urls import path

from . views import UserCreateView, UserUpdateView, VerifyAccount, CustomAuthToken, ChangePasswordView

app_name = 'accounts'
urlpatterns = [
    
    path('register/', UserCreateView.as_view()),
    path("login/", CustomAuthToken.as_view(), name="login"),
    path('update/<int:pk>/', UserUpdateView.as_view(), name="update"),
    path('verify/', VerifyAccount.as_view(), name="verify"),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name="change_password"),
]
