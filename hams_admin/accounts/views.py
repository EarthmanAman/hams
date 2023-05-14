from decimal import Decimal
import uuid
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
	CreateAPIView,
	ListAPIView,
	RetrieveUpdateDestroyAPIView,
)
from rest_framework.status import (
	HTTP_400_BAD_REQUEST,
	HTTP_201_CREATED,
	HTTP_200_OK,
	)
from hams_users.models import Doctor, Patient
from .models import User
from .serializers import UserCreateSer, UserDetSer

from .tasks import sms_verification, email_verification

class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data
        uuid_str = str(uuid.uuid4())[:7]
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            user = serializer.save(save=False)
            user= User.objects.get(username=data["username"])
            user.uuid = uuid_str
            user.save()

            print(data["doctor"])
            if data["doctor"] == "true":
                license_no = data.get("license_no", None)
                fee = data.get("fee", None)
                user1 = Doctor.objects.create(user=user, license_no=license_no, fee=Decimal(fee))
            else:
                user1 = Patient.objects.create(user=user, patient_type="self")
            
            info = {
                "name": user.first_name + " " + user.last_name,
                "email": user.email,
                "phone_no": user.phone_no,
                "uuid": user.uuid,
            }
            if data["sms"] == True:
                sms_verification.delay(info)
            else:
                email_verification.delay(info)
            return Response({"status":HTTP_201_CREATED, "message":"Registration was successfully but first verify your account"})
        else:
            errors = serializer.errors
            return Response({
				"status_code": HTTP_400_BAD_REQUEST,
	      		"errors":errors,
	     
	        })


class UserUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetSer
    queryset = User.objects.all()
    
class VerifyAccount(APIView):

    def post(self, request, *args, **kwargs):
        uuid = request.data