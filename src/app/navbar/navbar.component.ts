import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { RouterLink } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgIf, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentLanguage: string = '';
  isMobile = false;
  constructor(private languageService: LanguageService) {}
  ngOnInit(): void {
    this.currentLanguage = this.languageService.getSavedLang() || 'tr';
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
  changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.languageService.setLanguage(target.value);
      this.currentLanguage = target.value;
    }
  }
}
