from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import User, Doctor
from .producer import doctor_create


@shared_task
def users_to_appointment_doctor_task(info):
    user = User.objects.create(
        user_id=info["id"],
        username=info["username"],
        first_name=info["first_name"],
        last_name=info["last_name"],
        email=info["email"],
        phone_no=info["phone_no"],
    )

    doctor = info["doctor"]
    doctor = Doctor.objects.create(user=user, license_no=doctor["license_no"], fee=doctor["fee"])

    info = {
        "name":f"{user.first_name} {user.last_name}"
    }
    doctor_create("doctor_create_appointment", info)
