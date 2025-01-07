import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit{
  gameId: string | null = null;
  rows = Array(8).fill(0); // 8 satır
  cols = Array(8).fill(0); // 8 sütun
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
  selectedCell: { row: number; col: number } | null = null;
  draggedPiece: { row: number, col: number, piece: string } | null = null;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // URL'deki GameId parametresini al
    this.gameId = this.route.snapshot.paramMap.get('GameId');
    console.log('GameId:', this.gameId);

    // get the game info

    if (3 == 3){
      this.initializeBlackBoard();
    }
  }

  onCellClick(row: number, col: number): void {
    console.log(`Clicked cell: Row ${row}, Col ${col}`);
    this.selectedCell = { row, col };
  }

  initializeBlackBoard(){
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

  onDragStart(row: number, col: number, piece: string): void {
    this.draggedPiece = { row, col, piece };
  }

  onDragOver(event: Event): void {
    event.preventDefault(); // Bırakma işlemini mümkün kılmak için gerekli
  }

  onDrop(row: number, col: number): void {
    if (this.draggedPiece) {
      console.log(`Taş ${this.draggedPiece.piece} Row ${this.draggedPiece.row}, Col ${this.draggedPiece.col} => Row ${row}, Col ${col}`);
      // Burada taşın bırakılacağı kareyi güncelleyebilirsiniz
      this.pieces[this.draggedPiece.row][this.draggedPiece.col] = ''; // Eski konumu boşalt
      this.pieces[row][col] = this.draggedPiece.piece; // Yeni konumu doldur
      this.draggedPiece = null; // Taşı sıfırla
    }
  }
}
