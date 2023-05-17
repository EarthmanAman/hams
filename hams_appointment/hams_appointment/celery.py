from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_appointment.settings')

app = Celery('hams_appointment')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = 'Africa/Nairobi'
# app.conf.beat_schedule = {
#     'daily_reminder':{
#         'task': 'appointment.tasks.daily_reminder_task',
#         'schedule': crontab(),
#     }
# }
app.autodiscover_tasks()