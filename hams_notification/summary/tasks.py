from __future__ import absolute_import, unicode_literals
from django.core.mail import send_mail
from celery import shared_task
from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()
# Your Account SID and Auth Token from console.twilio.com
account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")


@shared_task
def doctor_summary_task(info):
    message = f"\n Dear {info['name']} \n\n Below are your appointments for today\n\n"
    message += "Name\tTime"
    for appointment in info["appointments"]:
        message += f"{appointment.patient}\t{appointment.date}"
    
    message += "\nHave a nice day Doctor\nBest regards"
    subject = "TODAY APPOINTMENTS"
    send_mail(
        subject= subject,
        from_email="hashimathman.info@gmail.com",
        message=message,
        recipient_list=[info["email"]],
        fail_silently=False,
    )


@shared_task
def patient_quarterly_summary_task(info):
    message = f"\n Dear {info['name']} \n\n Below are your appointments for today\n\n"
    message += "Name\tTime"
    for appointment in info["appointments"]:
        message += f"{appointment.patient}\t{appointment.date}"
    
    message += "\nHave a nice day Doctor\nBest regards"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=f"+254798352592",
        from_="+16206791392",
        body=message
        )
    return message.sid
    


