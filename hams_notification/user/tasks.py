from __future__ import absolute_import, unicode_literals

from celery import shared_task
from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()
# Your Account SID and Auth Token from console.twilio.com
account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")


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