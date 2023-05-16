from django.db import models
from abstract.models import DteCrModAbs

class User(DteCrModAbs):
    user_id     = models.IntegerField(unique=True)
    first_name  = models.CharField(max_length=50)
    last_name   = models.CharField(max_length=50)
    username    = models.CharField(max_length=50, unique=True)
    email       = models.EmailField(unique=True)
    phone_no    = models.BigIntegerField()

    def __str__(self) -> str:
        return self.first_name


class Doctor(DteCrModAbs):
    '''
    A model to hold the information of a doctor

    Attributes:
        user (One to One key) -> to User model
        license_no (str)   -> license number of doctor
        fee (decimal) -> fees to see the doctor

    '''
    user        = models.OneToOneField(User, on_delete=models.PROTECT)
    license_no  = models.CharField(max_length=50)
    fee         = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.user.first_name + ' :- ' + self.license_no



class Patient(DteCrModAbs):
    '''
    A model to hold the information of a Patient. A user is associate with man patient.
    Was set that way to allow users add their childrens.

    Attributes:
        user (One to One key) -> to User model
        patient_type (str)   -> either self or child
        first_name (str) -> If its a child because he(she) will not have an account
        last_name (str) -> If its a child because he(she) will not have an account
        dob (date) -> Date of birth if its a child because he(she) will not have an account

    '''

    PATIENT_TYPE = (
        ('self', 'SELF'),
        ('child', 'CHILD'),
    )

    user            = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    patient_type    = models.CharField(max_length=10, choices=PATIENT_TYPE, default="false")
    first_name      = models.CharField(max_length=50, null=True, blank=True)
    last_name       = models.CharField(max_length=50, null=True, blank=True)
    phone_no        = models.BigIntegerField(blank=True, null=True)
    email           = models.EmailField(default="example@gmail.com")
    dob             = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return  ' :- ' + self.patient_type
