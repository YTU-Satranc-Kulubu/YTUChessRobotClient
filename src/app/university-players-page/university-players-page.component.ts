import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-university-players-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './university-players-page.component.html',
  styleUrl: './university-players-page.component.css'
})
export class UniversityPlayersPageComponent {
  universityName: string = "Yıldız Teknik Üniversitesi";
  universityPlayers: Array<{userName: string, totalPoint: number}> = [{userName: "AMD", totalPoint: 3}];
}
