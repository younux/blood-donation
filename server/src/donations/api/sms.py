from django.conf import settings
from django.template.loader import render_to_string

from twilio.rest import Client

from accounts.models import User


def notify_by_sms(donation_obj):
    """
        Send sms notification to all active users that have the same city as the donation object
        and the same blood type as the donation object.
    """
    # Prepare the queryset
    user_qs = User.objects.all_active().filter(address__city = donation_obj.city,
                                        blood_type = donation_obj.applicant.blood_type,
                                        sms_notification = True,
                                        ).exclude(username = donation_obj.applicant.username)

    # Send sms if there are some people to notify
    if user_qs.exists() :
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
        # loop over users to send sms
        for user in user_qs :
            # pass user related parameters to template context
            context['last_name'] = user.last_name
            context['first_name'] = user.first_name
            # prepare user related sms args
            body = render_to_string('donations/notification_sms.html', context = context)
            recipient = user.phone_number
            # Send sms
            message = client.messages.create(
                to=recipient,
                body=body,
                from_=twilio_phone_number)
