import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function leaderValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value){
        return null;
    }
  
    var isAvailable: boolean = false;
  
    // go to backend (cevaplar: kullanıcı yok, evet, hayır)

    if(isAvailable){
        return { notAvailable: true };
    }
  
    return null;
  };
}
