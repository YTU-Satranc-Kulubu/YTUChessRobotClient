import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [NgOptimizedImage, TranslateModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent implements OnInit, OnDestroy{
  isMobile: boolean = false;

  constructor(private router: Router) { }

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

  StartGameRobot(color: string, time: string) {
    if (color.match("Random")){
      const randomNumber = Math.random() < 0.5 ? 1 : 2;
      color = randomNumber == 1 ? "White" : "Black";
    }
    
    // initialize the game with service then go to /play/GameId url
    this.router.navigateByUrl("/play-robot/1");
  }
  
  StartGameUser(time: string) {  
    // initialize the game with service then go to /play/GameId url
    this.router.navigateByUrl("/play-user/1");
  }
}
