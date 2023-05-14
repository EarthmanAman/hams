import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_notification.settings')
import django
django.setup()

import pika
import json
from django.conf import settings

from appointment.tasks import (
    appointment_canceled_task, 
    appointment_completed_task, 
    appointment_paid_task, 
    appointment_register_task,
    doctor_appointment_notification_task,
)

# Connection parameters
url = settings.RABBITMQ_BROKER_URL

# Create a connection to RabbitMQ server
parameters = pika.URLParameters(url)
connection = pika.BlockingConnection(parameters)

# Create a channel
channel = connection.channel()

# Declare a queue
queue_name = 'appointment_notifications'
channel.queue_declare(queue_name)

# Define a callback function to handle incoming messages
def callback(ch, method, properties, body):
    content_type = properties.content_type
    body = json.loads(body)
    if  content_type == "appointment_register":
        appointment_register_task.delay(body)
        doctor_appointment_notification_task.delay(body)
    elif content_type == "appointment_paid":
        appointment_paid_task.delay(body)
    elif content_type == "appointment_completed":
        appointment_completed_task.delay(body)
    elif content_type == "appointment_canceled":
        appointment_canceled_task.delay(body)
    
    ch.basic_ack(delivery_tag = method.delivery_tag)

# Consume messages from the queue
channel.basic_consume(queue_name, callback)

# Start consuming messages
print('Waiting for messages...')
channel.start_consuming()
