import pika
import json
from django.conf import settings

url = settings.RABBITMQ_BROKER_URL
params = pika.URLParameters(url)

def verification(method, body):
    # Create a connection to RabbitMQ
    connection = pika.BlockingConnection(params)

    # Properties
    properties = pika.BasicProperties(method)
    # Create a channel
    channel = connection.channel()

    # Declare a queue
    channel.queue_declare(queue='verification_notifications')
    body = json.dumps(body)
    # Publish the message to the queue
    channel.basic_publish(
        exchange='',
        routing_key='verification_notifications',
        body=body,
        properties=properties
    )

    # Close the connection
    connection.close()
