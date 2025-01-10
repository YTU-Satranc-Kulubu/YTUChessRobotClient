import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgIf, RouterLink],
  templateUrl: './admin-login-page.component.html',
  styleUrl: './admin-login-page.component.css'
})
export class AdminLoginPageComponent {
  email: string = "";
  password: string = "";
  emailCode: string = "";
  errorMessage: string | null = null;
  isMobile: boolean = false;
  didCredentialsPassed: boolean = false;
  constructor(private translate: TranslateService) {}

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
    else{
      // başarılı mı kontrolü
      this.didCredentialsPassed = true;
    }
  }
  onVerify(){
    this.errorMessage = null;
    if(!this.emailCode.trim()){
      this.setErrorMessage('public.empty-field-err');
    }
    else{
      // email code başarılı mı kontrolü
    }
  }
  setErrorMessage(errorMessage: string): void {
    this.translate.get(errorMessage).subscribe((translation: string) => {
      this.errorMessage = translation;
    });
  }
}
