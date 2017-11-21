from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Address, User
# Register your models here.


class UserAdmin(UserAdmin):
    """
        This class add specific fields to UserAdmin fieldsets.

        It will adds a section "Blood donation platform specific fields" to the user in backend admin dashboard
        "Blood donation platform specific fields" contains fields that are related to this application that were
        appended to the AbstractUser.
    """
    fieldsets = UserAdmin.fieldsets + (
                                        ('Blood donation platform specific fields', {
                                            'fields': ( 'gender', 'birth_date',
                                                        'phone_number', 'address',
                                                        'blood_type', 'email_notification',
                                                        'sms_notification',
                                                         )
                                        }),
                                    )

# Regestring the models in the backend admin dashboard
admin.site.register(Address)
admin.site.register(User, UserAdmin)

