from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)

from diagnosis.serializers import DiagnosisDetSer, AppointmentTestDetSer
from hams_users.serializers import PatientSer
from . models import Appointment 

class AppointmentSer(ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentDetSer(ModelSerializer):
    diagnosis =  SerializerMethodField()
    patient = SerializerMethodField()
    date = SerializerMethodField()
    time = SerializerMethodField()
    tests = SerializerMethodField()
    class Meta:
        model = Appointment
        fields = [
            "id",
            "afp",
            "service_fee",
            "date",
            "time",
            "diagnosis",
            "patient",
            "completed",
            "tests",

        ]
    def get_diagnosis(self, obj):
        return DiagnosisDetSer(obj.diagnosis_set.all(), many=True).data
    def get_patient(self, obj):
        return PatientSer(obj.patient).data

    def get_date(self, obj):
        return obj.date.date()

    def get_time(self, obj):
        return obj.date.time()
    def get_tests(self, obj):
        return AppointmentTestDetSer(obj.appointmenttest_set.all(), many=True).data