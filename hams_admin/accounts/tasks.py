from __future__ import absolute_import, unicode_literals
from celery import shared_task

from .producer import verification


@shared_task
def sms_verification(info):
    
    return verification("sms_verification", info)

@shared_task
def email_verification(info):
    
    return verification("email_verification", info)

@shared_task
def user_to_appointment_task(info):
    
    return verification("user_to_appointment", info)
