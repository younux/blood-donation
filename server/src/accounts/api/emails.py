from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings


def send_activation_email(profile_obj, uidb64, token, domain):
    """
        Send actiation email to the given profile.

        The email contains the url with uidb64 and token
    """
    # prepare template context
    context = { 'first_name' : profile_obj.first_name,
                'last_name': profile_obj.last_name,
                'domain' : domain,
                'relative_route' : settings.ACCOUNT_ACTIVATION_ROUTE,
                'uidb64' : uidb64,
                'token' : token,
                'timeout_days' : settings.PASSWORD_RESET_TIMEOUT_DAYS,
                }
    from_email = settings.DEFAULT_FROM_EMAIL
    subject = 'Blood Donation Platform: Account Activation Email'
    body = render_to_string('accounts/account_verification_email.html', context = context)
    recipient_list = [profile_obj.email]
    # Send mail
    email_message = EmailMessage(subject, body, from_email, recipient_list)
    email_message.send(fail_silently=False)


def send_password_reset_email(profile_obj, uidb64, token, domain):
    """
        Send password reset email to the given profile.

        The email contains the url with uidb64 and token
    """
    # prepare template context
    context = { 'first_name' : profile_obj.first_name,
                'last_name': profile_obj.last_name,
                'domain' : domain,
                'relative_route': settings.PASSWORD_RESET_ROUTE,
                'uidb64' : uidb64,
                'token' : token,
                'timeout_days' : settings.PASSWORD_RESET_TIMEOUT_DAYS,
                }
    from_email = settings.DEFAULT_FROM_EMAIL
    subject = 'Blood Donation Platform: Password Reset Email'
    body = render_to_string('accounts/password_reset_email.html', context = context)
    recipient_list = [profile_obj.email]
    # Send mail
    email_message = EmailMessage(subject, body, from_email, recipient_list)
    email_message.send(fail_silently=False)




