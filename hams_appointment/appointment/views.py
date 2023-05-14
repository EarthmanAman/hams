from django.shortcuts import render

from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from .models import Appointment

from . serializers import (
    AppointmentSer, AppointmentDetSer
)

class AppointmentCreateView(CreateAPIView):
    serializer_class = AppointmentSer
    queryset = Appointment.objects.all()

class AppointmentDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentDetSer
    queryset = Appointment.objects.all()