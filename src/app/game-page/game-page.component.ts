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
  isPlayerWhite: boolean = true;
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
  pieceToMove: { row: number; col: number } = {row: -1, col: -1};
  moveToSquare: { row: number; col: number } = {row: -1, col: -1};
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // URL'deki GameId parametresini al
    this.gameId = this.route.snapshot.paramMap.get('GameId');
    console.log('GameId:', this.gameId);

    // get the game info

    if (!this.isPlayerWhite){
      this.initializeBlackBoard();
    }
  }

  onCellHoldStart(row: number, col: number): void {
    if (this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")){
      this.pieceToMove = { row, col };
    }
  }

  onClick(row: number, col: number): void {
    if(this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")){   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = {row, col};
      console.log(`Kendi taşına tıkladı [${row}][${col}]`);
    }
    else if(this.pieceToMove.row != -1){  // seçili taş var, hamle yapılacak kare seçiliyor
      this.moveToSquare = {row, col};
      console.log(`Hamle yapılacak kareye tıkladı [${row}][${col}]`);
       // hamle geçerli mi vs.
    }
  }
  
  onDragStart(row: number, col: number, piece: string): void {
    if(this.pieces[row][col].includes(this.isPlayerWhite ? "white" : "black")){   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = {row, col};
      console.log(`Kendi taşına sürüklemeye başladı [${row}][${col}]`);
    }
  }

  onDragOver(event: Event): void {
    event.preventDefault(); // Bırakma işlemini mümkün kılmak için gerekli
  }

  onDrop(row: number, col: number): void {
    if(this.pieceToMove.row != -1){ // seçili taş var
      if(this.pieceToMove.row == row && this.pieceToMove.col == col){
        this.pieceToMove = {row: -1, col: -1};
        this.moveToSquare = {row: -1, col: -1};
        console.log("Aldığı yere bıraktı");
      }
      else{
        this.moveToSquare = {row, col};
        console.log(`Hamle yapılacak kareye bıraktı [${row}][${col}]`);
        // hamle geçerli mi vs.
        //this.pieces[this.pieceToMove.row][this.pieceToMove.col] = ''; // Eski konumu boşalt
        //this.pieces[row][col] = this.pieceToMove.piece; // Yeni konumu doldur
        //this.pieceToMove = {row: -1, col: -1, piece: ''}; // Taşı sıfırla
      }
    }
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
}
