import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private languageService: LanguageService) {}
  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.languageService.setLanguage(target.value);
    }
  }
}
