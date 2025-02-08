import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {
  validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  validYTUPattern = /^[a-zA-Z0-9._%+-]+@(std\.)?yildiz\.edu\.tr$/;
  
  constructor() { }

  isEmailValid(control: AbstractControl): ValidationErrors | null{
    const email: string = control.value;
    if (!email || control.hasError('email')){
      return null;
    }
    debugger
    if(!this.validEmailPattern.test(email)){
      return {invalidEmail: true}
    }
  
    return this.validYTUPattern.test(email) ? null : { invalidPattern: true };
  }
}
