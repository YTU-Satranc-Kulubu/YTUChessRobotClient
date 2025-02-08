import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/ui-models/user-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { emailValidator, emailPatternAsyncValidator } from '../validators/email-validator';
import { userNameAsyncValidator } from '../validators/user-name-validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, TranslateModule, ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  newUser: User = {
    id: 0,
    name: '',
    surname: '',
    userName: '',
    email: '',
    password: '',
    isDeleted: false,
  };
  confirmPassword: string = '';
  isMobile: boolean = false;
  registerForm: FormGroup;
    
  
  constructor(private fb: FormBuilder,  private translate: TranslateService) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required], [userNameAsyncValidator]],
      email: ['', [Validators.required, emailValidator()], [emailPatternAsyncValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]],
    });   
  }
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });
  }
  ngOnDestroy() {
    window.removeEventListener('resize', () => {
      this.checkIfMobile();
    });
  }
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
  onRegister(){
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
  setErrorMessage(errorMessage: string): void {
    this.translate.get(errorMessage).subscribe((translation: string) => {
      this.errorMessage = translation;
    });
  }
}
