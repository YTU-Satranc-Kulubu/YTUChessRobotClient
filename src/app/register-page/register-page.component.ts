import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/ui-models/user-model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, TranslateModule, FormsModule, NgIf],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
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
  constructor(private translate: TranslateService) {}
  onRegister(){
    this.errorMessage = null;
    if(!this.newUser.name.trim() || !this.newUser.surname.trim() || !this.newUser.userName.trim() || !this.newUser.email.trim() ||
      !this.newUser.password.trim() || !this.confirmPassword.trim()){
        this.setErrorMessage('public.empty-field-err');
    }
    else if(this.newUser.password != this.confirmPassword){
      this.setErrorMessage('register-page.pass-doesnt-match-err');
    }
    else{
      // add user
    }  
  }
  setErrorMessage(errorMessage: string): void {
    this.translate.get(errorMessage).subscribe((translation: string) => {
      this.errorMessage = translation;
    });
  }
}
