import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router){}

  goToUniversityPage(universityName: string){
    const universityId = this.getUniversityId(universityName);
    this.router.navigate([`/university/${universityId}`]);
  }

  private getUniversityId(universityName: string): number {
    return 1;
  }
}
