from django.urls import path

from . views import UserDetView

app_name = "hams_users"

urlpatterns = [
    path("<int:user_id>/", UserDetView.as_view(), name="user_details")
]