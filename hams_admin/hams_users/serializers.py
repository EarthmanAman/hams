from rest_framework.serializers import (
    ModelSerializer, SerializerMethodField
)



from .models import Doctor, Patient, DoctorSpeciality, Speciality


# From User

class DoctorFromUserSer(ModelSerializer):
    specialities = SerializerMethodField()
    class Meta:
        model = Doctor
        fields = [
            "id",
            "license_no",
            "fee",
            "specialities"
        ]
    def get_specialities(self, obj):
        return DoctorSpecialityFromUserSer(obj.doctorspeciality_set.all(), many=True).data

class DoctorSpecialityFromUserSer(ModelSerializer):
    speciality = SerializerMethodField()
    class Meta:
        model = DoctorSpeciality
        fields = [
            "id",
            "doctor",
            "speciality",
        ]
    
    def get_speciality(self, obj):
        return SpecialityFromUserSer(obj.speciality).data

class SpecialityFromUserSer(ModelSerializer):
    class Meta:
        model = Speciality
        fields = [
            "id",
            "name",
        ]

#MAIN
class DoctorSer(ModelSerializer):

    class Meta:
        model = Doctor
        fields = [
            "id",
            "license_no",
            "fee",
        ]

class DoctorDetSer(ModelSerializer):
    user = SerializerMethodField()
    class Meta:
        model = Doctor
        fields = [
            "id",
            "user",
            "license_no",
            "fee",
        ]
    
    def get_user(self, obj):
        from accounts.serializers import UserCreateSer
        return UserCreateSer(obj.user).data

class DoctorSpecialitySer(ModelSerializer):

    class Meta:
        model = DoctorSpeciality
        fields = [
            "id",
            "doctor",
            "speciality",
        ]


class DoctorSpecialityDetSer(ModelSerializer):
    doctor = SerializerMethodField()
    class Meta:
        model = DoctorSpeciality
        fields = [
            "id",
            "doctor",
            "speciality",
        ]

    def get_doctor(self, obj):
        return DoctorDetSer(obj.doctor).data

class SpecialitySer(ModelSerializer):
    doctors = SerializerMethodField()
    class Meta:
        model = Speciality
        fields = [
            "id",
            "name",
            "doctors",
        ]
    
    def get_doctors(self, obj):
        return DoctorSpecialityDetSer(obj.doctorspeciality_set.all(), many=True).data

class PatientSer(ModelSerializer):

    class Meta:
        model = Patient
        fields = [
            "id",
            "patient_type",
            "first_name",
            "last_name",
            "dob"
        ]


class PatientCreateSer(ModelSerializer):

    class Meta:
        model = Patient
        fields = [
            "id",
            "user",
            "patient_type",
            "first_name",
            "last_name",
            "dob"
        ]

