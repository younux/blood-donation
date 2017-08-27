# TODO 
User postgreSQL in development instead of SQLLite.

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
    

Here is ana example of Profile model in JSON format (after rendering) :
    
    {
        "username": "user3",
        "email": "user3@gmail.com",
        "firstName": "user3",
        "lastName": "user3",
        "phoneNumber": "0626682675",
        "address": {
            "street": "8 Avenue de Mars",
            "city": "Paris",
            "country": "France",
            "zipCode": "75000"
        },
        "birthDate": "2017-08-01",
        "bloodType": "A+",
        "emailNotification": true,
        "smsNotification": false
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

Here is an example of Donation model in JSON format (after rendering) :
    
    {
        "createdOn": "2017-08-27T14:43:20.747354Z",
        "applicant": {
            "username": "user1",
            "email": "user1@gmail.com",
            "firstName": "user1",
            "lastName": "user1",
            "phoneNumber": "0626682675",
            "address": {
                "street": "derb 2",
                "city": "Marrakech",
                "country": "Maroc",
                "zipCode": "45000"
            },
            "birthDate": "2017-08-01",
            "bloodType": "O-",
            "emailNotification": true,
            "smsNotification": false
        },
        "bloodType": "O-",
        "deadline": "2017-08-31T12:02:00Z",
        "description": "description here",
        "city": "Marrakech",
        "phoneNumber": "0626682675",
        "status": "URG"
    }


 ## Notes
 
 The Django backend is using Python PEP 8 code style, hence it is using under_score_case naming
 convention. We have implemented a Parser and a Renderer to do the conversion from **under_score_case** to
 **camelCase** and vice versa when sending or receiving **JSON** data to convert JSON data keys naming
 convention. **This is working only for JSON data.**
 
 **So it is mandatory to use "Content-Type : application/json" in the http header so as the backend
 uses JSON Renderer and Parser we have implemented** 

 