import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { emailValidator, emailPatternAsyncValidator } from '../validators/email-validator';

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
  isMobile: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()], [emailPatternAsyncValidator]],
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
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
