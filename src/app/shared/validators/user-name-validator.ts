import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

function isBadWord(userName: string): boolean {
    const badWords = ['badword1', 'badword2', 'badword3'];
    return badWords.some(word => userName.includes(word));
}

export function userNameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const userName = control.value;
    if (!userName) {
        return of(null);
    }

    if(isBadWord(userName)){
        return of({ badWord: true });
    }

    // backend e bak
    return of(null);
}



