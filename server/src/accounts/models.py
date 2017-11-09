from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils import timezone
from django.dispatch import receiver


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


class ProfileManager(UserManager):
    """
        ProfileManager

        Extends UserManager
    """
    def create_profile(self, *args, **kwargs):
        """
            Creates a new inactive Profile
        """
        return super(ProfileManager, self).create_user(is_active=False, *args, **kwargs)

    def all_active(self, *args, **kwargs):
        """
            Returns a query set with all active users
        """
        return super(ProfileManager, self).all(*args, **kwargs).filter(is_active=True)


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

    # Gender Choices
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
    )

    # The additional attributes we wish to include.
    gender              = models.CharField(verbose_name="Gender", max_length=1, choices=GENDER_CHOICES, default=OTHER)
    phone_number        = models.CharField(verbose_name="Phone number", max_length=20)
    address             = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    birth_date          = models.DateField(verbose_name="Birth date", null=True)
    blood_type          = models.CharField(verbose_name="Blood type", max_length=10, choices=BLOOD_TYPE_CHOICES)
    email_notification  = models.BooleanField(verbose_name="Email notification", default=False)
    sms_notification    = models.BooleanField(verbose_name="SMS notification", default=False)

    class Meta:
        verbose_name        = "Profile"
        verbose_name_plural = "Profiles"

    # Custom Managers
    # The default objects manager is UserManager as Profile extends AbstractUser
    # I changed this default objects manager to ProfileManager that extends it and add
    # specific app behaviours (filter deleted and inactive Profiles)
    objects = ProfileManager()

    # Override the __unicode__() method to return out something meaningful!
    #  Remember if you use Python 2.7.x, define __unicode__ too!
    def __str__(self):
        return self.username

    def update_last_login(self):
        """
            updates the last_login date for the profile logging in.
        """
        self.last_login = timezone.now()
        self.save()

    def activate_profile(self):
        """
            Activate Profile

            Sets is_active to True and save the Profile
        """
        self.is_active = True
        self.save()

# Signal receivers :

@receiver(models.signals.post_delete, sender=Profile)
def auto_delete_address_with_profile(sender, instance, *args, **kwargs):
    """
        After deleting a profile we should delete its address

        # If this receiver call gets dupliceted, use dispatch_uid arg
        @receiver(models.signals.post_delete, sender=Profile, dispatch_uid="put an identifier")
        see https://docs.djangoproject.com/en/1.11/topics/signals/
    """
    print("auto_delete_address_with_profile")
    try :
        if instance.address :
            instance.address.delete()
    except :
        pass

# @receiver(models.signals.post_save, sender=Profile)
# def auto_send_email_to_created_profile(sender, instance, created, *args, **kwargs):
#     """
#         Sends a verification email to the new registered profile
#
#         # If this receiver call gets dupliceted, use dispatch_uid arg
#         @receiver(models.signals.post_save, sender=Profile, dispatch_uid="put an identifier")
#         see https://docs.djangoproject.com/en/1.11/topics/signals/
#     """
#     if created:
#         print("auto_send_email_to_created_profile")
#         try :
#             pass
#         except :
#             pass



