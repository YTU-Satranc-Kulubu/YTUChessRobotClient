import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-university-players-page',
  standalone: true,
  imports: [NgFor, RouterLink, TranslateModule, NgIf],
  templateUrl: './university-players-page.component.html',
  styleUrl: './university-players-page.component.css'
})
export class UniversityPlayersPageComponent implements OnInit, OnDestroy {
  universityName: string = "Yıldız Teknik Üniversitesi";
  universityPlayers: Array<{userName: string, totalPoint: number}> = [{userName: "AMD", totalPoint: 3}];
  isMobile: boolean = false;
  isUniPlayer: boolean = true;
  isUniAdmin: boolean = true;
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

  onJoinRequest(){

  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
