from django.shortcuts import render

import africastalking

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


username = 'sandbox'
api_key = '6fe7e279eac0f58a5fae001fa2d3d46e0a784525653a06c258716f251525472a'
africastalking.initialize(username, api_key)
ussd = africastalking.USSD



@csrf_exempt
def ussd_handler(request):
    if request.method == 'POST':
        session_id = request.POST.get('sessionId')
        service_code = request.POST.get('serviceCode')
        phone_number = request.POST.get('phoneNumber')
        text = request.POST.get('text')

        response = ""

        if text == "":
            response = "CON Welcome to HAMS. To book your appointment first enter the following info separated by commas\nfirst name, last name \n"
            # response .= "1. My Account \n"

        else:
            first_name, last_name = text.split(",")
            response = f"Which doctor do you want an appointment with?"

        return HttpResponse(response)