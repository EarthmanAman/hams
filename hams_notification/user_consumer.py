import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_notification.settings')
import django
django.setup()

import pika
import json
from django.conf import settings

from user.tasks import user_doctor_task, user_patient_task

# Connection parameters
url = settings.RABBITMQ_BROKER_URL

# Create a connection to RabbitMQ server
parameters = pika.URLParameters(url)
connection = pika.BlockingConnection(parameters)

# Create a channel
channel = connection.channel()

# Declare a queue
queue_name = 'user_notifications'
channel.queue_declare(queue_name)

# Define a callback function to handle incoming messages
def callback(ch, method, properties, body):
    content_type = properties.content_type
    body = json.loads(body)
    print(body)
    if  content_type == "doctor_create":
        user_doctor_task.delay(body)
    elif content_type == "patient_create":
        user_patient_task.delay(body)
    
    ch.basic_ack(delivery_tag = method.delivery_tag)

# Consume messages from the queue
channel.basic_consume(queue_name, callback)

# Start consuming messages
print('Waiting for messages...')
channel.start_consuming()
