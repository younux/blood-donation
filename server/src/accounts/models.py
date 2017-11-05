from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.utils import timezone


# Create your models here.

class Address(models.Model):
    """
        Address model
    """
    street      = models.CharField(verbose_name = "Street", max_length=1024)
    city        = models.CharField(verbose_name= "City", max_length=64)
    country     = models.CharField(verbose_name = "Country", max_length=64)
    zip_code    = models.CharField(verbose_name = "Zip code", max_length=5)

    class Meta:
        verbose_name        = "Address"
        verbose_name_plural = "Addresses"

    def __str__(self):
        return self.street + " - " + self.city

class Profile(AbstractUser):
    """
        Profile model that extends AbstractUser with fields related to our application.

        See https://docs.djangoproject.com/fr/1.11/topics/auth/customizing/#auth-custom-user For using AbstractUser
    """
    # Blood Types
    O_POS = 'O+'
    O_NEG = 'O-'
    A_POS = 'A+'
    A_NEG = 'A-'
    B_POS = 'B+'
    B_NEG = 'B-'
    AB_POS = 'AB+'
    AB_NEG = 'AB-'
    BLOOD_TYPE_CHOICES = (
        (O_NEG, 'O-'),
        (O_POS, 'O+'),
        (A_NEG, 'A-'),
        (A_POS, 'A+'),
        (B_NEG, 'B-'),
        (B_POS, 'B+'),
        (AB_NEG, 'AB-'),
        (AB_POS, 'AB+'),
    )

    # The additional attributes we wish to include.
    phone_number        = models.CharField(verbose_name="Phone number", max_length=20)
    address             = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    birth_date          = models.DateField(verbose_name="Birth date", null=True)
    blood_type          = models.CharField(verbose_name="Blood type", max_length=10, choices=BLOOD_TYPE_CHOICES)
    email_notification  = models.BooleanField(verbose_name="Email notification", default=False)
    sms_notification    = models.BooleanField(verbose_name="SMS notification", default=False)

    class Meta:
        verbose_name        = "Profile"
        verbose_name_plural = "Profiles"

    # Override the __unicode__() method to return out something meaningful!
    #  Remember if you use Python 2.7.x, define __unicode__ too!
    def __str__(self):
        return self.username

    def update_last_login(self):
        """
        updates the last_login date for the profile logging in.
        """
        self.last_login = timezone.now()
        self.save(update_fields=['last_login'])

@receiver(models.signals.post_delete, sender=Profile)
def auto_delete_address_with_Profile(sender, instance, *args, **kwargs):
    """
        After deleting a profile we should delete its address
    """
    try :
        if instance.address :
            instance.address.delete()
    except :
        pass



