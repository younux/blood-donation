from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from accounts.models import User


def notify_by_email(donation_obj):
    """
        Send email notification to all active users that have the same city as the donation object
        and the same blood type as the donation object.
    """
    # Prepare the queryset
    user_qs = User.objects.all_active().filter(address__city = donation_obj.city,
                                        blood_type = donation_obj.applicant.blood_type,
                                        email_notification = True,
                                        ).exclude(username = donation_obj.applicant.username)

    # Send mail if there are some people to notify
    if user_qs.exists() :
        # prepare template context
        context = { 'applicant_last_name' : donation_obj.applicant.last_name,
                    'applicant_first_name': donation_obj.applicant.first_name,
                    'blood_type' : donation_obj.applicant.blood_type,
                    'city' : donation_obj.city,
                    'phone_number' : donation_obj.phone_number
                    }
        # prepare eamil args
        from_email = settings.DEFAULT_FROM_EMAIL
        subject = 'Blood Donation : Notification Email'
        # loop over users to send email
        for user in user_qs :
            # pass user related parameters to template context
            context['last_name'] = user.last_name
            context['first_name'] = user.first_name
            # prepare user related email args
            body = render_to_string('donations/notification_email.html', context = context)
            recipient_list = [user.email]
            # Send mail
            email_message = EmailMessage(subject, body, from_email, recipient_list)
            email_message.send(fail_silently=False)