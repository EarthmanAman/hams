import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_notification.settings')
import django
django.setup()

import pika
import json
from django.conf import settings

from user.tasks import (
    appoinment_create_task, user_doctor_task, 
    user_patient_task, sms_verification_task, email_verification_task,
    update_user_task,password_change_task,daily_reminder_task,
)


# Connection parameters
url = settings.RABBITMQ_BROKER_URL

# Create a connection to RabbitMQ server
parameters = pika.URLParameters(url)
connection = pika.BlockingConnection(parameters)

# Create a channel
channel = connection.channel()

# Declare a queue
queue_name = 'verification_notifications'
channel.queue_declare(queue_name)

# Define a callback function to handle incoming messages
def callback(ch, method, properties, body):
    content_type = properties.content_type
    body = json.loads(body)
    print(body)
    if  content_type == "sms_verification":
        sms_verification_task.delay(body)
    elif content_type == "email_verification":
        email_verification_task.delay(body) 
    elif content_type == "doctor_create_appointment":
        user_doctor_task.delay(body)
    elif content_type == "appointment_create":
        appoinment_create_task.delay(body)
    elif content_type == "update_user":
        update_user_task.delay(body)
    
    elif content_type == "password_change":
        password_change_task.delay(body)
    elif content_type == "daily_reminder":
        daily_reminder_task.delay(body)
    
    
    ch.basic_ack(delivery_tag = method.delivery_tag)

# Consume messages from the queue
channel.basic_consume(queue_name, callback)

# Start consuming messages
print('Waiting for messages...')
channel.start_consuming()
