import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.value.password;
    const confirmPassword = control.value;

    if(!confirmPassword){
      return null;
    }

    if (password !== confirmPassword) {
      return { passDoNotMatch: true };
    }

    return null;
  };
}
