from django.conf import settings
from django.template.loader import render_to_string

from twilio.rest import Client

def send_phone_verification_sms(recipent_phone_number, code):
    """
        send sms to recipent_phone_number with body as content
    """
    # prepare Twilio client
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    twilio_phone_number = settings.TWILIO_PHONE_NUMBER
    client = Client(account_sid, auth_token)
    # preparing body
    context = {'phone_to_verify': recipent_phone_number,
               'code': code,
               'timeout': (settings.CACHES['default']['TIMEOUT']/60),
               }
    body = render_to_string('accounts/phone_verification_sms.html', context=context)
    # Send sms
    message = client.messages.create(
        to=recipent_phone_number,
        body=body,
        from_=twilio_phone_number)
