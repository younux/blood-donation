from django.db import models
from accounts.models import User

# Create your models here.

class Donation(models.Model):
    """
        Donation model
    """
    # Donation Status
    URG = "Urgent"
    CLD = "Closed"
    EXP = "Expired"
    DONATION_STATUS = (
        (URG, 'Urgent'),
        (CLD, 'Closed'),
        (EXP, 'Expired'),
    )

    created_on      = models.DateTimeField(verbose_name="Creation date", auto_now_add=True)
    applicant       = models.ForeignKey(User, verbose_name="Applicant", on_delete=models.CASCADE)
    deadline        = models.DateTimeField(verbose_name="Deadline")
    description     = models.TextField(verbose_name="Description")
    city            = models.CharField(verbose_name= "City", max_length=64)
    country         = models.CharField(verbose_name = "Country", max_length=64)
    phone_number    = models.CharField(verbose_name="Phone number", max_length=20)
    status          = models.CharField(verbose_name="Status", max_length=20, choices=DONATION_STATUS)

    def __str__(self):
        return "Donation - "+ self.applicant.username + " - " + self.applicant.blood_type

    def get_blood_type(self):
        return self.applicant.blood_type
