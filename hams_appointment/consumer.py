import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hams_appointment.settings')
import django
django.setup()

import pika
import json
from django.conf import settings

from hams_users.tasks import users_to_appointment_doctor_task, users_to_appointment_user_update_task

# Connection parameters
url = settings.RABBITMQ_BROKER_URL

# Create a connection to RabbitMQ server
parameters = pika.URLParameters(url)
connection = pika.BlockingConnection(parameters)

# Create a channel
channel = connection.channel()

# Declare a queue
queue_name = 'user_to_appointment'
channel.queue_declare(queue_name)

# Define a callback function to handle incoming messages
def callback(ch, method, properties, body):
    content_type = properties.content_type
    body = json.loads(body)
    print(body)
    if  content_type == "doctor_create":
        users_to_appointment_doctor_task.delay(body)
    if  content_type == "user_update":
        users_to_appointment_user_update_task.delay(body)
    # elif content_type == "email_verification":
    #     email_verification_task.delay(body)
    
    ch.basic_ack(delivery_tag = method.delivery_tag)

# Consume messages from the queue
channel.basic_consume(queue_name, callback)

# Start consuming messages
print('Waiting for messages...')
channel.start_consuming()
