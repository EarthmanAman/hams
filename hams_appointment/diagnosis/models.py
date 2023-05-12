from django.db import models

from abstract.models import DteCrModAbs
from appointment.models import Appointment

class Disease(DteCrModAbs):
    name    = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

class Test(DteCrModAbs):
    name    = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name

class Diagnosis(DteCrModAbs):

    appointment     = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    description     = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.appointment.__str__() + ' :- ' + self.description

class DiagnosedDisease(DteCrModAbs):
    diagnosis   = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    disease     = models.ForeignKey(Disease, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.diagnosis.__str__() +  ' :- ' + self.disease.__str__()


class Prescription(DteCrModAbs):
    diagnosed_disease   = models.ForeignKey(DiagnosedDisease, on_delete=models.CASCADE)
    
    name                = models.CharField(max_length=100)
    description         = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class DiagnosisTest(DteCrModAbs):
    diagnosis   = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    test        = models.ForeignKey(Test, on_delete=models.PROTECT)

    def __str__(self) -> str:
        return self.test.__str__() +  ' :- ' + self.diagnosis.__str__()
