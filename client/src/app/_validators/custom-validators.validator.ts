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


}
