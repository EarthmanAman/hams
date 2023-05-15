from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)

from . models import User, Patient, Doctor

class UserSer(ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

class UserDetSer(ModelSerializer):
    doctor = SerializerMethodField()
    patients = SerializerMethodField()
    class Meta:
        model = User
        fields = [
            "id",
            "user_id",
            "first_name",
            "last_name",
            "email",
            "phone_no",
            "doctor",
            "patients",
        ]
    def get_doctor(self, obj):
        
        try:
            doctor = obj.doctor
            return DoctorDetSer(doctor).data
        except:
            return None
        
    def get_patients(self, obj):
        
        return PatientDetSer(obj.patient_set.all(), many=True).data

class PatientSer(ModelSerializer):
    user = SerializerMethodField()
    class Meta:
        model = Patient
        fields = [
            "id",
            "user",
            "patient_type",
            "first_name",
            "last_name",
            "dob",
        ]
    
    def get_user(self, obj):
        return UserSer(obj.user).data


class PatientDetSer(ModelSerializer):
    appointments = SerializerMethodField()
    class Meta:
        model = Patient
        fields = [
            "id",
            "patient_type",
            "first_name",
            "last_name",
            "dob",
            "appointments",
        ]
    
    def get_appointments(self, obj):
        from appointment.serializers import AppointmentDetSer

        return AppointmentDetSer(obj.appointment_set.all(), many=True).data
    

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

class DoctorDetSer(ModelSerializer):
    appointments = SerializerMethodField()
    class Meta:
        model = Doctor
        fields = [
            "id",
            "appointments",
            "license_no",
            "fee"
        ]
    
    def get_appointments(self, obj):
        from appointment.serializers import AppointmentDetSer
        return AppointmentDetSer(obj.appointment_set.all(), many=True).data
    
