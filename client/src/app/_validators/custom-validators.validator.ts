/**
 * Created by younes.benhoumich on 20/09/2017.
 */

import {FormGroup, FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {

  static phoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^(0|\+212|00212)[1-9][0-9]{8}$/.test(c.value);
    const message = {
      'phoneNumber': {
        'message': 'The phone number must be valid (0X-XX-XX-XX-XX or +212 X-XX-XX-XX-XX or 00212 X-XX-XX-XX-XX where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static zipCode(c: FormControl): ValidationErrors {
    const isValidZipCode = /^[0-9]{5}$/.test(c.value);
    const message = {
      'zipCode': {
        'message': 'The zip code is not valid (XXXXX where X is a digit)'
      }
    };
    return isValidZipCode ? null : message;
  }

  static email(c: FormControl): ValidationErrors {
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailReg.test(c.value);
    const message = {
      'email': {
        'message': 'This email address is not valid'
      }
    };
    return isValidEmail ? null : message;
  }

}
