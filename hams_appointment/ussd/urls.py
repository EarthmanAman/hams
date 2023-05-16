from django.urls import path

from . views import ussd_handler

app_name = "ussd"

urlpatterns = [
    path("", ussd_handler, name="ussd")
]