import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  StartGame(color: string, time: string) {
    if (color.match("Random")){
      const randomNumber = Math.random() < 0.5 ? 1 : 2;
      color = randomNumber == 1 ? "White" : "Black";
    }
    // call the page with color and time
  }
}
