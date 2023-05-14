import random
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from rest_framework.serializers import (
	EmailField,
	CharField,
	HyperlinkedIdentityField,
	ModelSerializer, 
	SerializerMethodField,
	ListField,
	Serializer,

	ValidationError,	
	)
from drf_extra_fields.fields import Base64ImageField

from hams_users.serializers import DoctorFromUserSer, PatientSer
from . models import User

class ChangePasswordSerializer(Serializer):
	model = User

	"""
	Serializer for password change endpoint.
	"""
	old_password = CharField(required=True)
	new_password = CharField(required=True)

class UserCreateSer(ModelSerializer):
    """
        Description
        -------------
            * Serializer for the User Model
            * Handle creation of users

        Variables
        ----------
            * email
            * email2

        Fields
        ---------
            username
            email
            email2
            first_name
            last_name
            password

        Methods
        --------
            * def validate_email2(self, value) = validate if email are equal
            * def create(self, data) = handle creation

    """
    password = CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    confirm_password = CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    avatar = Base64ImageField(required=False)
    class Meta:
        model = User
        fields = [
            'username', 
            'email',
            'first_name',
            'last_name',
            'dob',
            'password',
            'confirm_password',
            "avatar",
            "phone_no",
            "uuid",

        ]
        extra_kwargs = {'password':
            {"write_only":True}, 'confirm_password':
            {"write_only":True},
        }
	
    def validate_confirm_password(self, value):
        data = self.get_initial()
        password = data.get('password')
        confirm_password = value

        if password != confirm_password:
            raise ValidationError("Password Must Match.")
        if len(password) < 6:
            raise ValidationError("Password Must be more than 6 characters")

        return value
    def create(self, validated_data):
        username = validated_data.get("username", None)
        email = validated_data.get("email", None)
        dob = validated_data.get("dob", None)
        avatar = validated_data.get("avatar", None)
        password = validated_data.get("password", None)
        phone_no = validated_data.get("phone_no", None)
        first_name = validated_data.get("first_name", " ")
        last_name = validated_data.get("last_name", " ")
        user = User(username=username, first_name=first_name, last_name=last_name, email=email, dob=dob, avatar=avatar, phone_no=phone_no)
        user.set_password(password)
        user.save()
        return validated_data


class UserDetSer(ModelSerializer):
    doctor = SerializerMethodField()
    patients = SerializerMethodField()
    class Meta:
        model =  User
        fields = [
            'username', 
            'email',
            'first_name',
            'last_name',
            'dob',
            "avatar",
            "phone_no",
            "doctor",
            "patients"
        ]
    
    def get_doctor(self, obj):
        try:
            return DoctorFromUserSer(obj.doctor).data
        except:
            return None
    
    def get_patients(self, obj):
        return PatientSer(obj.patient_set.all(), many=True).data
