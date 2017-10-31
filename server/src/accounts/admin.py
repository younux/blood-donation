from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Address, Profile
# Register your models here.


class ProfileAdmin(UserAdmin):
    """
        This class add specific fields to UserAdmin fieldsets.

        It will adds a section "Blood donation platform specific fields" to the profile in backend admin dashboard
        "Blood donation platform specific fields" contains fields that are related to this application that were
        appended to the AbstractUser.
    """
    fieldsets = UserAdmin.fieldsets + (
                                        ('Blood donation platform specific fields', {
                                            'fields': ('phone_number', 'address', 'birth_date',
                                                        'blood_type', 'email_notification', 'sms_notification',
                                                         )
                                        }),
                                    )

# Regestring the models in the backend admin dashboard
admin.site.register(Address)
admin.site.register(Profile, ProfileAdmin)

