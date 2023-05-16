from django.db import models

from abstract.models import DteCrModAbs
from hams_users.models import Doctor, Patient


class Appointment(DteCrModAbs):
    '''
    A model holding appointment information

    Attributes:
        doctor (foreign key) -> to Doctor model from hams_users app
        patient (foreign key) -> to Patient model from hams_users app
        date (datetime) -> date and time of the appointment
        afp (bool) -> Appointment Fee Paid
        service_fee (decimal) -> If any appointment fee
    '''
    doctor          = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    patient         = models.ForeignKey(Patient, on_delete=models.PROTECT)
    date            = models.DateTimeField()
    afp             = models.BooleanField(default=False)
    service_fee     = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    completed       = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.patient.__str__() + ' :- ' + self.doctor.__str__() + ' :- ' + str(self.date)
    
    def save(self, *args, **kwargs):

        from . tasks import appointment_create_task

        super().save(*args, **kwargs)
        doctor = self.doctor
        patient = self.patient
        
        info = {
            "doctor": {
                "name": doctor.user.first_name,
                "email": doctor.user.email,
            },
            "patient": {
                "name": patient.user.first_name + " " + patient.user.last_name,
                "phone_no": patient.user.phone_no,
            },
            "date": self.date,
            # "amount": self.room.rent,
        }

        appointment_create_task.delay(info)