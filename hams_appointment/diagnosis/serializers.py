from rest_framework.serializers import (
    ModelSerializer, 
	SerializerMethodField,
)

from .models import Diagnosis, Prescription, DiagnosedDisease, DiagnosisTest, Disease, Test


class DiseaseSer(ModelSerializer):

    class Meta:
        model = Disease
        fields = "__all__"

class TestSer(ModelSerializer):

    class Meta:
        model = Test
        fields = "__all__"

# DiagnosisTest

class DiagnosisTestSer(ModelSerializer):

    class Meta:
        model = DiagnosisTest
        fields = "__all__"

class DiagnosisTestDetSer(ModelSerializer):
    test = SerializerMethodField()
    class Meta:
        model = DiagnosisTest
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
    tests = SerializerMethodField()
    diseases = SerializerMethodField()
    class Meta:
        model = Diagnosis
        fields = [
            "id",
            "description",
            "tests",
            "diseases",
        ]
    
    def get_tests(self, obj):
        return DiagnosisTestDetSer(obj.diagnosistest_set.all(), many=True).data

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