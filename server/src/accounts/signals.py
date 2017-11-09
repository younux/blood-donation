from django.dispatch import receiver
from django.db import models
from .models import Profile


# this is commented because I moved the signal receivers (handlers) to models.py
# The best place is signals.py but there are not many signal receivers
# so in models.py they are more visible and next to the sender class


# @receiver(models.signals.post_delete, sender=Profile)
# def auto_delete_address_with_profile(sender, instance, *args, **kwargs):
#     """
#         After deleting a profile we should delete its address
#
#         # If this receiver call gets dupliceted, use dispatch_uid arg
#         @receiver(models.signals.post_delete, sender=Profile, dispatch_uid="put an identifier")
#         see https://docs.djangoproject.com/en/1.11/topics/signals/
#     """
#     try :
#         if instance.address :
#             instance.address.delete()
#     except :
#         pass
#
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
#
