from django.urls import path
from .views import (
    SpecialityView,
    DoctorDetailView,
    CreatePatientView, PatientDetailView, 
    CreateDoctorSpecialityView, DocterSpecialityDetailView,
)

app_name = "hams_users"
urlpatterns = [

    #SPECIALITY
    path("specialities/", SpecialityView.as_view(), name="specialities"),
    #DOCTOR
    path("doctor/<int:pk>/", DoctorDetailView.as_view(), name="doctor_view"),
    # DOCTER SPECIALITY
    path("doctor/speciality/create/", CreateDoctorSpecialityView.as_view(), name="docter_speciality_create"),
    path("doctor/speciality/<int:pk>/", DocterSpecialityDetailView.as_view(), name="docter_speciality_detail"),


    path("patient/create/", CreatePatientView.as_view(), name="patient_create"),
    path("patient/<int:pk>/", PatientDetailView.as_view(), name="patient_detail"),
]