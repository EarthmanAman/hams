from __future__ import absolute_import, unicode_literals
from celery import shared_task
import datetime
from .producer import appointment_create
from . models import Appointment


@shared_task
def appointment_create_task(info):
    
    return appointment_create("appointment_create", info)


@shared_task
def daily_reminder_task():
    from . models import Doctor
    for doctor in Doctor.objects.all():
        appointments = doctor.appointment_set.all()
        apps = []
        for appointment in appointments:
            info = {
                "patient": appointment.patient.user.first_name + " " + appointment.patient.user.last_name,
                "time": appointment.date.time
            }
            apps.append(info)
        appointment_create("daily_reminder", {"apps":apps, "name":doctor.user.first_name, "email":doctor.user.email})
