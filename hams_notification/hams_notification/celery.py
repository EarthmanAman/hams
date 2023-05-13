from __future__ import absolute_import, unicode_literals

import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_notification.settings')

app = Celery('hams_notification')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()