# blood-donation-platform  
  
## Profile data model (Profile)

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
Profile model extends Django AbstractUser model. For more information see : https://docs.djangoproject.com/fr/1.11/topics/auth/customizing/#auth-custom-user

    +====================================+
    |          Profile (model)           |
    +====================================+
    | username (CharField)               |
    +------------------------------------+
    | email (emailField)                 |
    +------------------------------------+
    | password (CharField)               |
    +------------------------------------+
    | first_name (CharField)             |
    +------------------------------------+
    | last_name (CharField)              |
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
        "username": "user3",
        "email": "user3@gmail.com",
        "password": "xxxx",
        "first_name": "user3",
        "last_name": "user3",
        "phone_number": "0626682675",
        "address": {
            "street": "8 Avenue de Mars",
            "city": "Paris",
            "country": "France",
            "zip_code": "75000"
        },
        "birth_date": "2017-08-12",
        "blood_type": "O-",
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
        "created_on": "2017-08-27T10:27:56.325217Z",
        "applicant": {
            "username": "user1",
            "email": "user1@gmail.com",
            "first_name": "user1",
            "last_name": "user1",
            "phone_number": "0626682675",
            "address": {
                "street": "200 Avenue de Mars",
                "city": "Paris",
                "country": "France",
                "zip_code": "75000"
            },
            "birth_date": "2017-08-11",
            "blood_type": "O-",
            "email_notification": false,
            "sms_notification": false
        },
        "blood_type": "O-",
        "deadline": "2019-02-12T22:23:00Z",
        "description": "e\"\"",
        "city": "r\"d\"",
        "phone_number": "0626682675",
        "status": "URG"
    }


 