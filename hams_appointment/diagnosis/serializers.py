from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)


from .models import Diagnosis, Prescription, DiagnosedDisease, AppointmentTest, Disease, Test


class DiseaseSer(ModelSerializer):

    class Meta:
        model = Disease
        fields = "__all__"

class TestSer(ModelSerializer):

    class Meta:
        model = Test
        fields = "__all__"

# AppointmentTest

class AppointmentTestSer(ModelSerializer):

    class Meta:
        model = AppointmentTest
        fields = "__all__"

class AppointmentTestDetSer(ModelSerializer):
    test = SerializerMethodField()
    class Meta:
        model = AppointmentTest
        fields = [
            "id",
            "test"
        ]

    def get_test(self, obj):
        return TestSer(obj.test).data

# DIAGNOSIS 
class DiagnosisCreateSer(ModelSerializer):

    class Meta:
        model = Diagnosis
        fields = "__all__"


class DiagnosisDetSer(ModelSerializer):
    # tests = SerializerMethodField()
    diseases = SerializerMethodField()
    class Meta:
        model = Diagnosis
        fields = [
            "id",
            "description",
            # "tests",
            "diseases",
        ]
    
    # def get_tests(self, obj):
    #     return AppointmentTestDetSer(obj.AppointmentTest_set.all(), many=True).data

    def get_diseases(self,obj):
        return DiagnosisDiseaseDetSer(obj.diagnoseddisease_set.all(), many=True).data


# DIAGNOSIS DISEASE
class DiagnosisDiseaseSer(ModelSerializer):

    class Meta:
        model = DiagnosedDisease
        fields = "__all__"

class DiagnosisDiseaseDetSer(ModelSerializer):
    disease = SerializerMethodField()
    prescriptions = SerializerMethodField()
    class Meta:
        model = DiagnosedDisease
        fields = [
            "id",
            "disease",
            "prescriptions",
        ]
    
    def get_disease(self, obj):
        return DiseaseSer(obj.disease).data

    def get_prescriptions(self, obj):
        return PrescriptionSer(obj.prescription_set.all(), many=True).data

#PRESCRIPTION

class PrescriptionSer(ModelSerializer):

    class Meta:
        model = Prescription
        fields = "__all__"