import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  currentLanguage: string = '';
  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.currentLanguage = this.languageService.getSavedLang() || 'tr';
  }
  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.languageService.setLanguage(target.value);
      this.currentLanguage = target.value;
    }
  }
}
