from __future__ import absolute_import, unicode_literals
from django.core.mail import send_mail
from celery import shared_task
from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()
# Your Account SID and Auth Token from console.twilio.com
account_sid = "ACbca27343716894de4a14fb24505a7fb6"
auth_token = "fe7b3d794c2c7c4a9257db1ba83cb9fb"


@shared_task
def user_doctor_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear Dr {info['name']} \n\nYou have been successfully registered into HAMS system. Welcome aboard doctor\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid

@shared_task
def user_patient_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear {info['name']} \n\nYou have been successfully registered into HAMS system. Welcome aboard.\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid


@shared_task
def sms_verification_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear Dr {info['name']} \n\n Please verify your account. \nYour verification code is {info['uuid']}\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid

@shared_task
def email_verification_task(info):
    message = f"\n Dear {info['name']} \n\n Please verify your account. Your verification code is {info['uuid']}\n\n"
    
    subject = "EMAIL VERIFICATION"
    send_mail(
        subject= subject,
        from_email="hashimathman.info@gmail.com",
        message=message,
        recipient_list=[info["email"]],
        fail_silently=False,
    )

@shared_task
def appoinment_create_task(info):
    doctor = info["doctor"]
    patient = info["patient"]
    message = f"\n Dear Dr {doctor['name']} \n\n A Patient by the name {patient['name']}, phone number {patient['phone_no']} has booked an appointment with you on {info['date']}\n\n Thank you."
    
    subject = f"{patient['name']} APPOINTMENT"
    send_mail(
        subject= subject,
        from_email="hashimathman.info@gmail.com",
        message=message,
        recipient_list=[doctor["email"]],
        fail_silently=False,
    )
