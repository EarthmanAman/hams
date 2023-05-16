from __future__ import absolute_import, unicode_literals
from celery import shared_task

from .producer import appointment_create


@shared_task
def appointment_create_task(info):
    
    return appointment_create("appointment_create", info)
