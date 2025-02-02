import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-best-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './best-page.component.html',
  styleUrl: './best-page.component.css'
})
export class BestPageComponent implements OnInit {
  bestPlayers: Array<{userName: string, totalPoint: number}> = [{userName: "AMD", totalPoint: 2}];
  bestUniversities: Array<{universityName: string, totalPoint: number}> = [{universityName: "AMD", totalPoint: 2}];
  isPlayerView: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const lastSegment = urlSegments[urlSegments.length - 1]?.path;
      this.isPlayerView = lastSegment === 'player';
    });
  }

  goToUniversityPage(universityName: string){
    const universityId = this.getUniversityId(universityName);
    this.router.navigate([`/university/${universityId}`]);
  }

  private getUniversityId(universityName: string): number {
    return 1;
  }
}
