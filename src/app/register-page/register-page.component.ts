import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/ui-models/user-model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { emailValidator, emailPatternAsyncValidator } from '../validators/email-validator';
import { userNameAsyncValidator } from '../validators/user-name-validator';
import { passwordMatchValidator } from '../validators/password-match-validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, TranslateModule, ReactiveFormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  registerForm: FormGroup; 
  
  constructor(private fb: FormBuilder,  private translate: TranslateService) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required], [userNameAsyncValidator]],
      email: ['', [Validators.required, emailValidator()], [emailPatternAsyncValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator()]],
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
}
