from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)

from . models import User, Patient, Doctor

class UserSer(ModelSerializer):

    class Meta:
        model = User
        field = "__all__"

class PatientSer(ModelSerializer):
    user = SerializerMethodField()
    class Meta:
        model = Patient
        field = [
            "id",
            "user",
            "patient_type",
            "first_name",
            "last_name"
        ]
    
    def get_user(self, obj):
        return UserSer(obj.user).data

class DoctorSer(ModelSerializer):
    user = SerializerMethodField()
    class Meta:
        model = Doctor
        fields = [
            "id",
            "user",
            "license_no",
            "fee"
        ]
    
    def get_user(self, obj):
        return UserSer(obj.user).data