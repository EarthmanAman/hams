from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)

from diagnosis.serializers import DiagnosisDetSer

from . models import Appointment 

class AppointmentSer(ModelSerializer):

    class Meta:
        model = Appointment
        fields = "__all__"


class AppointmentDetSer(ModelSerializer):
    diagnosis =  SerializerMethodField()
    class Meta:
        model = Appointment
        fields = [
            "id",
            "afp",
            "service_fee",
            "diagnosis",

        ]
    def get_diagnosis(self, obj):
        return DiagnosisDetSer(obj.diagnosis_set.all(), many=True).data