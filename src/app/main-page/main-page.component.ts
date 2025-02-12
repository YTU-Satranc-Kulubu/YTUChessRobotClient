import { Component, OnDestroy, OnInit } from '@angular/core';
import  {NgOptimizedImage } from "@angular/common";
import { RouterLink } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, TranslateModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;

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
}
