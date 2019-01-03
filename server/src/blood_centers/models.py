from django.db import models
from accounts.models import Address
from django.dispatch import receiver


# Create your models here.


class BloodCenter(models.Model):
    """
        Blood Center model
    """
    name        = models.CharField(verbose_name = "Name", max_length=256)
    address     = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    latitude    = models.FloatField(verbose_name="Latitude")
    longitude   = models.FloatField(verbose_name="Longitude")

    class Meta:
        verbose_name        = "Blood Center"
        verbose_name_plural = "Blood Centers"

    def __str__(self):
        return self.name + " - " + self.address.city

# Signal receivers :

@receiver(models.signals.post_delete, sender=BloodCenter)
def auto_delete_address_with_blood_center(sender, instance, *args, **kwargs):
    """
        After deleting a blood center we should delete its address

        # If this receiver call gets dupliceted, use dispatch_uid arg
        @receiver(models.signals.post_delete, sender=BloodCenter, dispatch_uid="put an identifier")
        see https://docs.djangoproject.com/en/1.11/topics/signals/
    """
    print("auto_delete_address_with_blood_center")
    try :
        if instance.address :
            instance.address.delete()
    except :
        pass