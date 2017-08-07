from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver

# Create your models here.

class Address(models.Model):
    street      = models.CharField(verbose_name = "Street", max_length=1024)
    city        = models.CharField(verbose_name= "City", max_length=64)
    country     = models.CharField(verbose_name = "Country", max_length=64)
    zip_code    = models.CharField(verbose_name = "Zip code", max_length=5)

    class Meta:
        verbose_name        = "Address"
        verbose_name_plural = "Addresses"

    def __str__(self):
        return self.street + " - " + self.city

class UserProfile(models.Model):
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

    # This line is required. Links UserProfile to a User model instance.
    # For its fields see https://docs.djangoproject.com/fr/1.11/ref/contrib/auth/#user-model
    user                = models.OneToOneField(User, on_delete=models.CASCADE)
    # The additional attributes we wish to include.
    phone_number        = models.CharField(verbose_name="Phone number", max_length=10)
    address             = models.OneToOneField(Address, on_delete=models.CASCADE)
    birth_date          = models.DateField(verbose_name="Birth date")
    blood_type          = models.CharField(verbose_name="Blood type", max_length=10, choices=BLOOD_TYPE_CHOICES)
    email_notification  = models.BooleanField(verbose_name="Email notification", default=False)
    sms_notification    = models.BooleanField(verbose_name="SMS notification", default=False)

    # Override the __unicode__() method to return out something meaningful!
    #  Remember if you use Python 2.7.x, define __unicode__ too!
    def __str__(self):
        return self.user.username

# After deleting a userprofile we should delete its address and its user
@receiver(models.signals.post_delete, sender=UserProfile)
def auto_delete_address_and_user_with_UserProfile(sender, instance, *args, **kwargs):
    if instance.address :
        instance.address.delete()
    if instance.user :
        instance.user.delete()


