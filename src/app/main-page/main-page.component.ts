import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
