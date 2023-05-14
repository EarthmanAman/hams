from django.urls import path

from .views import (
    DiagnosisCreateView, DiagnosisTestCreateView, DiagnosisDiseaseCreateView, PrescriptionCreateView,
    DiagnosisDetView, DiagnosisTestDetView, DiagnosisDiseaseDetView, PrescriptionDetView,
)

app_name = "diagnosis"

urlpatterns = [

    #Diagnosis
    path("create/", DiagnosisCreateView.as_view(), name="diagnosis_create"),
    path("<int:pk>/", DiagnosisDetView.as_view(), name="diagnosis_detail"),

    # Diagnosis Test
    path("test/create/", DiagnosisTestCreateView.as_view(), name="diagnosis_test_create"),
    path("test/<int:pk>/", DiagnosisTestDetView.as_view(), name="diagnosis_test_detail"),

    # Diagnosis Disease 
    path("disease/create/", DiagnosisDiseaseCreateView.as_view(), name="diagnosis_disease_create"),
    path("disease/<int:pk>/", DiagnosisDiseaseDetView.as_view(), name="diagnosis_disease_detail"),

    #Prescription
    path("prescription/create/", PrescriptionCreateView.as_view(), name="prescription_create"),
    path("prescription/<int:pk>/", PrescriptionDetView.as_view(), name="prescription_detail"),
]