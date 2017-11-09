from django.apps import AppConfig


class AccountsConfig(AppConfig):
    name = 'accounts'

    # uncomment when using signals.py
    # def ready(self):
    #
    #     # import signal receivers
    #     import accounts.signals
