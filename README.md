# blood-donation-platform  
  
## Profile data model (Profile)

### User model (built-in django model)
The table below includes only fields we are using, to see all existing User fields, see https://docs.djangoproject.com/en/1.11/ref/contrib/auth/

    +========================+
    |      User (model)      |
    +========================+
    | username (CharField)   |
    +------------------------+
    | email (emailField)     |
    +------------------------+
    | password (CharField)   |
    +------------------------+
    | first_name (CharField) |
    +------------------------+
    | last_name (CharField)  |
    +------------------------+

### Address model 

    +======================+
    |   Address (model)    |
    +======================+
    | street (CharField)   |
    +----------------------+
    | city (CharField)     |
    +----------------------+
    | country (CharField)  |
    +----------------------+
    | zip_code (CharField) |
    +----------------------+

### Profile model

    +====================================+
    |          Profile (model)           |
    +====================================+
    | user (User model)                  |
    +------------------------------------+
    | phone_number (CharField)           |
    +------------------------------------+
    | address (Address model)            |
    +------------------------------------+
    | birth_date (DateField)             |
    +------------------------------------+
    | blood_type  (CharField, choices)   |
    +------------------------------------+
    | email_notification  (BooleanField) |
    +------------------------------------+
    | sms_notification  (BooleanField)   |
    +------------------------------------+

Here is ana example of Profile model in JSON format :
    
    {
        "user": {
            "username": "",
            "email": "",
            "password": "",
            "first_name": "",
            "last_name": ""
        },
        "phone_number": "",
        "address": {
            "street": "",
            "city": "",
            "country": "",
            "zip_code": ""
        },
        "birth_date": null,
        "blood_type": null,
        "email_notification": false,
        "sms_notification": false
    }
  
## Donation data model (Donation)
    
    +==============================+
    |       Donation (model)       |
    +==============================+
    | created_on (DateTimeField)   |
    +------------------------------+
    | applicant (Profile model)    |
    +------------------------------+
    | deadline (DateTimeField)     |
    +------------------------------+
    | description (TextField)      |
    +------------------------------+
    | city  (CharField)            |
    +------------------------------+
    | phone_number  (CharField)    |
    +------------------------------+
    | status  (CharField, choices) |
    +------------------------------+

Here is an example of Donation model in JSON format :
    
       {
           "created_on": "2017-08-17T21:00:05.820257Z",
           "applicant": {
               "user": {
                   "username": "alex",
                   "email": "alex@gmail.com",
                   "first_name": "alex",
                   "last_name": "lokim"
               },
               "phone_number": "12222",
               "address": {
                   "street": "baker street",
                   "city": "London",
                   "country": "England",
                   "zip_code": "23908"
               },
               "birth_date": "2017-08-18",
               "blood_type": "O-",
               "email_notification": false,
               "sms_notification": false
           },
           "deadline": "2017-08-18T20:55:41Z",
           "description": "mydesc",
           "city": "Marra",
           "phone_number": "0626682675",
           "status": "URG"
       }


 