#TODO
 1. Implement camelCase undersocre_case conversion in parser and renderer https://github.com/vbabiy/djangorestframework-camel-case

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
