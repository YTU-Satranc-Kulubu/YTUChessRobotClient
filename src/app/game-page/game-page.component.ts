import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit{
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // URL'deki GameId parametresini al
    this.gameId = this.route.snapshot.paramMap.get('GameId');
    console.log('GameId:', this.gameId);
  }
}
