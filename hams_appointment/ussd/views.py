from django.shortcuts import render

import africastalking

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
username = 'sandbox'
api_key = '6fe7e279eac0f58a5fae001fa2d3d46e0a784525653a06c258716f251525472a'
africastalking.initialize(username, api_key)
ussd = africastalking.USSD



@csrf_exempt
def ussd_handler(request):
    # Retrieve user input from the request
    session_id = request.POST.get("sessionId")
    phone_number = request.POST.get("phoneNumber")
    service_code = request.POST.get("serviceCode")
    text = request.POST.get("text")

    # Split the user's input into individual commands
    commands = text.split('*')
    command = commands[0].strip().lower()

    if command == '':
        # Initial USSD screen, prompt for full name
        response = "CON Welcome to the registration service.\nPlease enter your full name:"
    elif command == '1':
        # Prompt for email address
        response = "CON Please enter your email address:"
    elif command == '2':
        # Prompt for phone number
        response = "CON Please enter your phone number:"
    elif command == '3':
        # Prompt for password
        response = "CON Please enter your password:"
    elif command == '4':
        # Prompt for password confirmation
        response = "CON Please confirm your password:"
    elif command == '5':
        # Perform user registration
        full_name = commands[1].strip()
        email = commands[2].strip()
        phone_number = commands[3].strip()
        password = commands[4].strip()
        confirm_password = commands[5].strip()

        # Validate password and confirm_password match
        if password != confirm_password:
            response = "END Passwords do not match."
        else:
            # Create a new user object
            user = User(username=email, email=email, first_name=full_name)
            user.set_password(password)

            try:
                # Save the user to the database
                user.save()
                response = "END User registration successful."
            except ValidationError as e:
                response = f"END Registration failed: {str(e)}"
    else:
        # Invalid command
        response = "END Invalid command. Please try again."

    # Return the USSD response
    return HttpResponse(response, content_type='text/plain')