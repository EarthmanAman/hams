from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import User, Doctor
from .producer import doctor_create, update_user


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


@shared_task
def users_to_appointment_user_update_task(info):
    pk = int(info["id"])
    user = User.objects.filter(user_id=pk)
    if user.exists():
        user = user.last()
        user.username = info["username"]
        user.first_name = info["first_name"]
        user.last_name = info["last_name"]
        user.email = info["email"]
        user.phone_no = info["phone_no"]
        user.save()
    # doctor = info["doctor"]
    # doctor = Doctor.objects.create(user=user, license_no=doctor["license_no"], fee=doctor["fee"])

    # info = {
    #     "name":f"{user.first_name} {user.last_name}"
    # }
    update_user("update_user", info)
