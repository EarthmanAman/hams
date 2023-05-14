from django.db import models

from abstract.models import DteCrModAbs
from accounts.models import User


class Speciality(DteCrModAbs):
    '''
    A model to hold the speciality of a doctor

    Attributes:
        name (str) -> name of the speciality
    '''

    name    = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name

class Doctor(DteCrModAbs):
    '''
    A model to hold the information of a doctor

    Attributes:
        user (One to One key) -> to User model from accounts app
        license_no (str)   -> license number of doctor
        fee (decimal) -> fees to see the doctor

    '''
    user        = models.OneToOneField(User, on_delete=models.PROTECT)
    license_no  = models.CharField(max_length=50)
    fee         = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.user.first_name + ' :- ' + self.license_no


class DoctorSpeciality(DteCrModAbs):
    '''
    A helper model to resolve many to many relationship between doctors and speciality
    Because on doctor can be a speciality in various fields

    Attributes:
        doctor (foreign key) -> to Doctor model
        speciality (foreign key) -> to Speciality
    '''

    doctor      = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    speciality  = models.ForeignKey(Speciality, on_delete=models.CASCADE)


class Patient(DteCrModAbs):

    '''
    A model to hold the information of a Patient. A user is associate with man patient.
    Was set that way to allow users add their childrens.

    Attributes:
        user (One to One key) -> to User model from accounts app
        patient_type (str)   -> either self or child
        first_name (str) -> If its a child because he(she) will not have an account
        last_name (str) -> If its a child because he(she) will not have an account
        dob (date) -> Date of birth if its a child because he(she) will not have an account

    '''

    PATIENT_TYPE = (
        ('self', 'SELF'),
        ('child', 'CHILD'),
    )

    user            = models.ForeignKey(User, on_delete=models.PROTECT)
    patient_type    = models.CharField(max_length=10, choices=PATIENT_TYPE)
    first_name      = models.CharField(max_length=50, null=True)
    last_name       = models.CharField(max_length=50, null=True)
    dob             = models.DateField(blank=True, null=True)

    def __str__(self) -> str:
        return str(self.user.first_name) + ' :- ' + self.patient_type
