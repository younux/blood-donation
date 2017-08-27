from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Address, Profile
# Register your models here.


# Adding Specific fields to UserAdmin fieldsets
class ProfileAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
                                        ('Blood donation platform specific fields', {
                                            'fields': ('phone_number', 'address', 'birth_date',
                                                        'blood_type', 'email_notification', 'sms_notification',
                                                         )
                                        }),
                                    )

admin.site.register(Address)
admin.site.register(Profile, ProfileAdmin)

