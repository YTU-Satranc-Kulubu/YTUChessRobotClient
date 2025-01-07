import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  constructor(private router: Router) { }
  StartGame(color: string, time: string) {
    if (color.match("Random")){
      const randomNumber = Math.random() < 0.5 ? 1 : 2;
      color = randomNumber == 1 ? "White" : "Black";
    }
    
    // initialize the game with service then go to /play/GameId url
    this.router.navigateByUrl("/play/1");
  }
}
