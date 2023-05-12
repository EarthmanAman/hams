from django.db import models

class DteCrModAbs(models.Model):
    """An abstract model to hold the date created and date modified fields

    Attributes:
        dte_created (datetime): date created it will be auto field by django
        dte_modified (datetime) : date modified it wil be auto filled by django
    """    
    dte_created     = models.DateTimeField(auto_now_add=True, null=True)
    dte_modified    = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True