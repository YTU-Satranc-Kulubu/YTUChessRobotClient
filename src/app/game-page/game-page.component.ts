import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  gameId: string | null = null;
  time: string = '05:00'; // Başlangıç süresi
  private timer: any;
  isPlayerWhite: boolean = true; // Beyaz oyuncu başlıyor
  rows = Array(8).fill(0); // 8 satır
  cols = Array(8).fill(0); // 8 sütun
  whiteMoves: string[] = [];
  blackMoves: string[] = [];
  pieces: string[][] = [
    ['rook-black', 'knight-black', 'bishop-black', 'queen-black', 'king-black', 'bishop-black', 'knight-black', 'rook-black'],
    ['pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white'],
    ['rook-white', 'knight-white', 'bishop-white', 'queen-white', 'king-white', 'bishop-white', 'knight-white', 'rook-white'],
  ];
  pieceToMove: { row: number; col: number } = { row: -1, col: -1 };
  moveToSquare: { row: number; col: number } = { row: -1, col: -1 };
  currentPlayer: 'white' | 'black' = 'white'; // Sıra hangi oyuncuda?

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // URL'deki GameId parametresini al
    this.gameId = this.route.snapshot.paramMap.get('GameId');
    console.log('GameId:', this.gameId);
    this.whiteMoves = ["e4", "Af3", "Fb5", "Fxc6", "0-0"];
    this.blackMoves = ["e5", "Ac6", "a6", "bxc6", "Af6"];
    // get the game info

    if (!this.isPlayerWhite) {
      this.initializeBlackBoard();
    }
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer); // Component destroy olduğunda timer'ı temizle
    }
  }

  onCellHoldStart(row: number, col: number): void {
    if (this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")) {
      this.pieceToMove = { row, col };
    }
  }

  onClick(row: number, col: number): void {
    if (this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")) {   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = { row, col };
      console.log(`Kendi taşına tıkladı [${row}][${col}]`);
    } else if (this.pieceToMove.row != -1) {  // seçili taş var, hamle yapılacak kare seçiliyor
      this.moveToSquare = { row, col };
      console.log(`Hamle yapılacak kareye tıkladı [${row}][${col}]`);
    }
  }

  onDragStart(row: number, col: number, piece: string): void {
    if (this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")) {   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = { row, col };
      console.log(`Kendi taşına sürüklemeye başladı [${row}][${col}]`);
    }
  }

  onDragOver(event: Event): void {
    event.preventDefault(); // Bırakma işlemini mümkün kılmak için gerekli
  }

  onDrop(row: number, col: number): void {
    if (this.pieceToMove.row != -1) { // seçili taş var
      if (this.pieceToMove.row == row && this.pieceToMove.col == col) {
        this.pieceToMove = { row: -1, col: -1 };
        this.moveToSquare = { row: -1, col: -1 };
        console.log("Aldığı yere bıraktı");
      } else {
        this.moveToSquare = { row, col };
        console.log(`Hamle yapılacak kareye bıraktı [${row}][${col}]`);
      }
    }
  }

  startTimer(): void {
    let minutes = Number(this.time.split(':')[0]);
    let seconds = Number(this.time.split(':')[1]);

    this.timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.timer); // Zaman bittiğinde timer'ı durdur
        } 
        else {
          minutes--;
          seconds = 59;
        }
      } 
      else {
        seconds--;
      }

      this.time = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

      if (minutes === 0 && seconds === 0) {
       // maçı bitir
      }
    }, 1000);
  }

  formatTime(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  initializeBlackBoard() {
    this.pieces = [
      ['rook-white', 'knight-white', 'bishop-white', 'king-white', 'queen-white', 'bishop-white', 'knight-white', 'rook-white'],
      ['pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white', 'pawn-white'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black', 'pawn-black'],
      ['rook-black', 'knight-black', 'bishop-black', 'king-black', 'queen-black', 'bishop-black', 'knight-black', 'rook-black'],
    ];
  }
}
