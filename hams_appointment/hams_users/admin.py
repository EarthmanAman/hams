from django.contrib import admin

from .models import User, Doctor, Patient

admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(User)