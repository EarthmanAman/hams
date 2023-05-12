from django.contrib import admin

from . models import (
    Disease,
    Test,
    Diagnosis,
    DiagnosedDisease,
    Prescription,
    DiagnosisTest,
)

admin.site.register(Disease)
admin.site.register(Test)
admin.site.register(Diagnosis)
admin.site.register(DiagnosedDisease)
admin.site.register(Prescription)
admin.site.register(DiagnosisTest)