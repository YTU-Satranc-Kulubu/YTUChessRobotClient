import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../models/ui-models/user-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  isMobile: boolean = false;
  user: User = {
    id: 0,
    name: '',
    surname: '',
    userName: '',
    email: '',
    password: '',
    isDeleted: false,
  };
  gender: string = "";
  constructor() {}
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
  onUpdate(){

  }
  onDelete(){
    
  }
}
