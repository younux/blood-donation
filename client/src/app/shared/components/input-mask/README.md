#Summary :
The is a directive that allows using a mask to control the input
of the user.

Inspired by 
https://www.primefaces.org/primeng/#/inputmask

##Inputs :

###mask :
The way to define a mask is through an array.

Each element in the array has to be either a string (of length
one : one character) or a regular expression. Each string is a 
fixed character in the mask and each regular expression is a placeholder
that accepts user input.

The regular expression will be used to test user input and either 
allow it or reject it.

For example, a mask for a U.S. phone number such as (555) 392-4932, could be:

['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

That means the user can enter only a number between 1 and 9 in the first placeholder, 
and only a digit in the placeholders after that.

Any valid regular expressions should work.

###placeholderChar :

The placeholder character represents the fillable spot in the mask.
The default placeholder character is underscore : _

###autoClear :

boolean that indicates whether to clear the incomplete value 
on blur or not. default is true.


##Outputs

###onCompleteHostValue :
This output emits a string containing the host value when user completes the mask.

It can be used to bind it to a callback to invoke on when user completes the mask.

###onCompleteUnmaskedValue :
This output emits a string containing the unmasked value when user completes the mask.

It can be used to bind it to a callback to invoke on when user completes the mask.




##Example : 

In component controller (componentName.component.ts) :
    
    maskArray = ['(', '+', /\d/, /\d/, ')', '-', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
                                
    printUnmaskedValue(unamskedValue: string) {
      console.log("Unmasked value  : ", unamskedValue);
    }
  
    printHostValue(HostValue: string) {
      console.log("Host value  : ", HostValue);
    }
     
In component template (componentName.component.html) :
 
    <input type="text" 
          #inputMaskDir=inputMaskDirective appInputMask  [mask]="maskArray"
          (onCompleteUnmaskedValue)="printUnmaskedValue($event)"
          (onCompleteHostValue)="printHostValue($event)"/>

The tmeplate binding to the directive (#inputMaskDir=inputMaskDirective) is used to
have access to the directive and especially to 'completed' attribute which is a 
boolean indicating if all the unmasked values are filled correctly. For example 
it can be used to disable a button if the input is not correctly filled :

      <input type="text" class="form-control" id="phoneNumber" name="phoneNumber"
             autocomplete="off"
             placeholder="Phone number..." formControlName="phoneNumber"
             #inputMaskDir=inputMaskDirective appInputMask  [mask]="phoneMask"
             (onCompleteUnmaskedValue)="unmaskedPhoneNumber = $event"/>

      <button [disabled]="!inputMaskDir.completed"  type="button"
              (click)="sendVerificationSMS($event)" class="btn btn-prim">
        Send Verification SMS
      </button>


When the user completes typing, for example (+33)-6-26-68-26-77 the console shows

    Unmasked value  :  33636683675
    Host value  :  (+33)-6-26-68-26-77
