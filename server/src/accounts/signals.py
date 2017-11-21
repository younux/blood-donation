from django.dispatch import receiver
from django.db import models
from .models import User


# this is commented because I moved the signal receivers (handlers) to models.py
# The best place is signals.py but there are not many signal receivers
# so in models.py they are more visible and next to the sender class


# @receiver(models.signals.post_delete, sender=User)
# def auto_delete_address_with_user(sender, instance, *args, **kwargs):
#     """
#         After deleting a user we should delete its address
#
#         # If this receiver call gets dupliceted, use dispatch_uid arg
#         @receiver(models.signals.post_delete, sender=User, dispatch_uid="put an identifier")
#         see https://docs.djangoproject.com/en/1.11/topics/signals/
#     """
#     try :
#         if instance.address :
#             instance.address.delete()
#     except :
#         pass
#
# @receiver(models.signals.post_save, sender=User)
# def auto_send_email_to_created_user(sender, instance, created, *args, **kwargs):
#     """
#         Sends a verification email to the new registered user
#
#         # If this receiver call gets dupliceted, use dispatch_uid arg
#         @receiver(models.signals.post_save, sender=User, dispatch_uid="put an identifier")
#         see https://docs.djangoproject.com/en/1.11/topics/signals/
#     """
#     if created:
#         print("auto_send_email_to_created_user")
#         try :
#             pass
#         except :
#             pass
#
