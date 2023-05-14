from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView, RetrieveUpdateDestroyAPIView
)
from .models import (
    Diagnosis, DiagnosedDisease,
    DiagnosisTest, Prescription
)

from .serializers import (
    DiagnosisCreateSer, DiagnosisTestSer, DiagnosisDiseaseSer, PrescriptionSer,
    DiagnosisDetSer, DiagnosisTestDetSer, DiagnosisDiseaseDetSer,
)

# DIAGNOSIS
class DiagnosisCreateView(CreateAPIView):
    serializer_class = DiagnosisCreateSer
    queryset = Diagnosis.objects.all()

class DiagnosisDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = DiagnosisDetSer
    queryset = Diagnosis.objects.all()

# DIAGNOSIS TEST
class DiagnosisTestCreateView(CreateAPIView):
    serializer_class = DiagnosisTestSer
    queryset = DiagnosisTest.objects.all()

class DiagnosisTestDetView(RetrieveUpdateDestroyAPIView):
    serializer_class = DiagnosisTestDetSer
    queryset = DiagnosisTest.objects.all()

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