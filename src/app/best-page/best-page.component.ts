import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-best-page',
  standalone: true,
  imports: [NgFor],
  templateUrl: './best-page.component.html',
  styleUrl: './best-page.component.css'
})
export class BestPageComponent {
  bestPlayers: Array<{userName: string, totalPoint: number}> = [{userName: "AMD", totalPoint: 2}];
  bestUniversities: Array<{universityName: string, totalPoint: number}> = [{universityName: "AMD", totalPoint: 2}];
}
