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
def appointment_register_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear {info['name']} \n\nYour appointment was successfully.\nThank you.\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid


@shared_task
def appointment_paid_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear {info['name']} \n\nYour payment for the appointment was successfully.\nSee you.\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid


@shared_task
def appointment_completed_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear {info['name']} \n\nYour appointment was completed.\nThank you for coming.\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid

@shared_task
def appointment_canceled_task(info):
    client = Client(account_sid, auth_token)
    message = f"\n Dear {info['name']} \n\nYour appointment was canceled.\nIt will be reschedule soon.\n\n"

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid