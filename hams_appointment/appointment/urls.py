from django.urls import path
from .views import AppointmentCreateView, AppointmentDetView

app_name = "hams_appointment"

urlpatterns = [
    path("create/", AppointmentCreateView.as_view(), name="appointment_create"),
    path("<int:pk>/", AppointmentDetView.as_view(), name="appointment_detail"),
]