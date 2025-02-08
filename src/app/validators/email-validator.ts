import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function emailPatternAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validYTUPattern = /^[a-zA-Z0-9._%+-]+@(std\.)?yildiz\.edu\.tr$/;
    const email = control.value;

    if (!email || control.hasError('email')) {
        return of(null);
    }

    if(!validEmailPattern.test(email)){
        return of({invalidEmail: true})
    }
    
    return validYTUPattern.test(email) ? of(null) : of({ invalidPattern: true });
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const email = control.value;
    
        if (!email) {
            return { required: true };
        }
    
        if (!email.includes('@')) {
            return { invalidEmail: true };
        }
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) ? null : { invalidEmail: true };
    };
}
