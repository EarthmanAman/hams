from django.shortcuts import render

from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView,
    ListCreateAPIView, ListAPIView,
)

from .models import Patient, DoctorSpeciality, Doctor, Speciality
from .serializers import PatientCreateSer, DoctorSpecialitySer, DoctorSer, SpecialitySer


#SPECIALITY

class SpecialityView(ListAPIView):
    serializer_class = SpecialitySer
    queryset = Speciality.objects.all()
# DOCTOR
class DoctorDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = DoctorSer
    queryset = Doctor.objects.all()

# SPECIALITY
class CreateDoctorSpecialityView(ListCreateAPIView):
    serializer_class = DoctorSpecialitySer
    queryset = DoctorSpeciality.objects.all()

class DocterSpecialityDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = DoctorSpecialitySer
    queryset = DoctorSpeciality.objects.all()

#PATIENT
class CreatePatientView(ListCreateAPIView):
    serializer_class = PatientCreateSer
    queryset = Patient.objects.all()

class PatientDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = PatientCreateSer
    queryset = Patient.objects.all()