import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { RouterLink } from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, TranslateModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
}
