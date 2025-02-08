import { Component, NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { EmailValidatorService } from '../services/email-validator.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = "";
  password: string = "";
  errorMessage: string | null = null;
  isMobile: boolean = false;
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private translate: TranslateService, private emailValidatorService: EmailValidatorService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidatorService.isEmailValid.bind(this.emailValidatorService)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
  onLogin(){
    this.errorMessage = null;
    if(!this.email.trim() && !this.password.trim()){
      this.setErrorMessage('public.empty-field-err');
    }
  }

  setErrorMessage(errorMessage: string): void {
    this.translate.get(errorMessage).subscribe((translation: string) => {
      this.errorMessage = translation;
    });
  }
}
