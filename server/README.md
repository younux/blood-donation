# blood_donation_platform

## This is the backend of the blood donation platform built using Python 3.6.1, Django and Django REST framework.

### To use it :

1. Download (clone) the project to your chosen directory

1. Go to that direcotory :
`$ cd path_to_your_project_directory`

1. Create a new python 3 virtual environment :
`$ virtualenv . -p python3`

1. Activate the virtual environment :
`$ source bin/activate`

1. Intsall the dependencies given in the requirements.txt file :
`$ pip install -r requirements.txt`

1. Then launch the server locally :

        $ cd src

        $ python manage.py makemigrations

        $ python manage.py migrate

        $ python manage.py createsuperuser  (if you want to create a superuser)

        $ python manage.py runserver

1. To quit the virtual environment :
`$ deactivate`


## Note that the app is still under development


# Django Dev tricks : 
 
## Override django error messages in django rest framework serializers and use custom code messages (same trick works for django forms):

The error_messages argument lets you override the default messages that the field will raise. 

Pass in a dictionary with keys matching the error messages you want to override. For example :

    extra_kwargs = {
     "blood_type": {"error_messages":
                        {"invalid_choice": "Give yourself a good blood type",
                         }
                },
    }
    

 
To get the key (name : invalid_choice, blank, max_length ...) of the error message you want to override :

   1. In the built-in Field classes, each Field defines the error message keys it uses :
       https://docs.djangoproject.com/en/1.11/ref/forms/fields/#built-in-field-classes
       and see Error message keys section of each field. (these are django forms doc, and django rest framework
           serializers are similar to django forms). So the error message keys are the same.

   2. Or you can see source code of Field classes : https://docs.djangoproject.com/fr/1.11/_modules/django/db/models/fields/#Field
     and search for default_error_messages`
