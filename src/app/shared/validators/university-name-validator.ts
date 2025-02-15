import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function universityNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value){
      return null;
    }

    var isAlreadyRegistered: boolean = false;

    // go to backend

    if(isAlreadyRegistered){
        return { inUse: true };
    }

    return null;
  };
}
