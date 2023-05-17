from django.contrib import admin

from . models import (
    Speciality,
    Doctor,
    DoctorSpeciality,
    Patient,
)

admin.site.register(Doctor)
# admin.site.register(DoctorSpeciality)
# admin.site.register(Patient)
# admin.site.register(Speciality)