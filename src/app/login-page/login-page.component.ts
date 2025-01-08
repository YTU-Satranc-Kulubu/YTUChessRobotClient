import { Component, NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgIf, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = "";
  password: string = "";
  errorMessage: string | null = null;
  constructor(private languageService: LanguageService, private translate: TranslateService) {}
  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  onLogin(){
    this.errorMessage = null;
    if(this.email.match("") || this.password.match("")){
      this.setErrorMessage('login-page.empty-field-err');
    }
  }

  setErrorMessage(errorMessage: string): void {
    this.translate.get(errorMessage).subscribe((translation: string) => {
      this.errorMessage = translation;
    });
  }
}
