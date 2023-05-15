from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
)
from .models import (
    Diagnosis, DiagnosedDisease,
    AppointmentTest, Prescription, Test
)

from .serializers import (
    DiagnosisCreateSer, AppointmentTestSer, DiagnosisDiseaseSer, PrescriptionSer,
    DiagnosisDetSer, AppointmentTestDetSer, DiagnosisDiseaseDetSer, TestSer
)


class TestList(ListAPIView):
    serializer_class = TestSer
    queryset = Test.objects.all()
# DIAGNOSIS
class DiagnosisCreateView(CreateAPIView):
    serializer_class = DiagnosisCreateSer
    queryset = Diagnosis.objects.all()

class DiagnosisDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = DiagnosisDetSer
    queryset = Diagnosis.objects.all()

# DIAGNOSIS TEST
class AppointmentTestCreateView(CreateAPIView):
    serializer_class = AppointmentTestSer
    queryset = AppointmentTest.objects.all()

class AppointmentTestDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentTestDetSer
    queryset = AppointmentTest.objects.all()

# DIAGNOSIS DISEASE
class DiagnosisDiseaseCreateView(CreateAPIView):
    serializer_class = DiagnosisDiseaseSer
    queryset = DiagnosedDisease.objects.all()

class DiagnosisDiseaseDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = DiagnosisDiseaseDetSer
    queryset = DiagnosedDisease.objects.all()


# PRESCRIPTION
class PrescriptionCreateView(CreateAPIView):
    serializer_class = PrescriptionSer
    queryset = Prescription.objects.all()

class PrescriptionDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = PrescriptionSer
    queryset = Prescription.objects.all()