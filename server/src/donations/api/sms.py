from django.conf import settings
from django.template.loader import render_to_string

from twilio.rest import Client

from accounts.models import Profile


def notify_by_sms(donation_obj):
    """
        Send sms notification to all active profiles that have the same city as the donation object
        and the same blood type as the donation object.
    """
    # Prepare the queryset
    profile_qs = Profile.objects.all_active().filter(address__city = donation_obj.city,
                                        blood_type = donation_obj.applicant.blood_type,
                                        sms_notification = True,
                                        ).exclude(username = donation_obj.applicant.username)

    # Send sms if there are some people to notify
    if profile_qs.exists() :
        # prepare template context
        context = { 'applicant_last_name' : donation_obj.applicant.last_name,
                    'applicant_first_name': donation_obj.applicant.first_name,
                    'blood_type' : donation_obj.applicant.blood_type,
                    'city' : donation_obj.city,
                    'phone_number' : donation_obj.phone_number
                    }
        # prepare Twilio client
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token = settings.TWILIO_AUTH_TOKEN
        twilio_phone_number = settings.TWILIO_PHONE_NUMBER
        client = Client(account_sid, auth_token)
        # loop over profiles to send sms
        for profile in profile_qs :
            # pass profile related parameters to template context
            context['last_name'] = profile.last_name
            context['first_name'] = profile.first_name
            # prepare profile related sms args
            body = render_to_string('donations/notification_sms.html', context = context)
            recipient = profile.phone_number
            # Send sms
            message = client.messages.create(
                to=recipient,
                body=body,
                from_=twilio_phone_number)
