import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PossibleMovesService } from '../services/move-services/possible-moves.service';
import { Board } from '../models/common-models/board-model';
import { Move } from '../models/common-models/move-model';
import { Game } from '../models/ui-models/game-model';
import { AfterMoveService } from '../services/move-services/after-move.service';
import { Square } from '../models/common-models/square-model';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  clientViewMatrix: number[][] = [];
  game: Game = {
    board: {
      matrix: [
        [12, 10, 11, 13, 14, 11, 10, 12],
        [8,  8,  8,  8,  8,  8,  8,  8 ],
        [0,  0,  0,  0,  0,  0,  0,  0 ],
        [0,  0,  0,  0,  0,  0,  0,  0 ],
        [0,  0,  0,  0,  0,  0,  0,  0 ],
        [0,  0,  0,  0,  0,  0,  0,  0 ],
        [1,  1,  1,  1,  1,  1,  1,  1 ],
        [5,  3,  4,  6,  7,  4,  3,  5 ],
        ],
      isChecked: false,
      isMate: false,
      isWhiteKingMoved: false,
      isBlackKingMoved: false,
      isWhiteShortRookMoved: false,
      isWhiteLongRookMoved: false,
      isBlackShortRookMoved: false,
      isBlackLongRookMoved: false,
      whiteKing: {row: 7, col :4},
      blackKing: {row: 0, col :4},
      whiteCheckerOne: {row: -1, col : -1},
      whiteCheckerTwo: {row: -1, col : -1},
      blackCheckerOne: {row: -1, col : -1},
      blackCheckerTwo: {row: -1, col : -1},
      whitePushed2Pawn: {row: -1, col: -1},
      blackPushed2Pawn: {row: -1, col: -1},
      whitesPoints: 39,
      blacksPoints: 39,
    },
    whiteMoves: [],
    blackMoves: []
  }

  possibleMoves: Array<Move> = [];

  isMobile: boolean = false
  gameId: string | null = null;
  time: string = '03:00'; // Başlangıç süresi
  private timer: any;
  isPlayerWhite: boolean = true; // Beyaz oyuncu başlıyor
  rows = Array(8).fill(0); // 8 satır
  cols = Array(8).fill(0); // 8 sütun
  whiteMoves: string[] = [];
  blackMoves: string[] = [];
  pieceToMove: Square = {row: -1, col: -1};
  currentPlayer: 'white' | 'black' = 'white'; // Sıra hangi oyuncuda?

  constructor(private route: ActivatedRoute, private possibleMovesService: PossibleMovesService, private afterMoveService: AfterMoveService) {}

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.checkIfMobile();
    });
    // URL'deki GameId parametresini al
    this.gameId = this.route.snapshot.paramMap.get('GameId');
    console.log('GameId:', this.gameId);
    this.whiteMoves = ["e4", "Af3", "Fb5", "Fxc6", "0-0"];
    this.blackMoves = ["e5", "Ac6", "a6", "bxc6", "Af6"];
    // get the game info

    if (this.isPlayerWhite) {
      this.clientViewMatrix = this.game.board.matrix;
    }
    else{
      this.initializeBlackBoard();
    }
    this.startTimer();
  }
  ngOnDestroy() {
    window.removeEventListener('resize', () => {
      this.checkIfMobile();
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  onClick(row: number, col: number): void {
    if (this.game.board.matrix[row][col] != 0 && ((this.isPlayerWhite && this.game.board.matrix[row][col] <= 7) || (!this.isPlayerWhite && this.game.board.matrix[row][col] >= 8))) {   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = { row, col };
      this.possibleMoves = this.possibleMovesService.GetPossibleMoves(this.pieceToMove, this.game.board);
    } 
    else if (this.pieceToMove.row != -1) {
      const moveToPlay: Move | null = this.getMove(row, col);
      if(moveToPlay != null){
        this.afterMoveService.UpdateGame(this.game, this.pieceToMove, moveToPlay);
        this.possibleMoves = [];
        this.pieceToMove = { row: -1, col: -1 };
      }
    }
  }

  onDragStart(row: number, col: number): void {
    if (this.game.board.matrix[row][col] != 0 && ((this.isPlayerWhite && this.game.board.matrix[row][col] <= 7) || (!this.isPlayerWhite && this.game.board.matrix[row][col] >= 8))) {   // kendi taşının olduğu bir kareye mi tıkladı
      this.pieceToMove = { row, col };
      this.possibleMoves = this.possibleMovesService.GetPossibleMoves(this.pieceToMove, this.game.board); 
    }
  }

  onDragOver(event: Event): void {
    event.preventDefault(); // Bırakma işlemini mümkün kılmak için gerekli
  }

  onDrop(row: number, col: number): void {
    if (this.pieceToMove.row != -1) {
      if (this.pieceToMove.row == row && this.pieceToMove.col == col) {
        this.pieceToMove = { row: -1, col: -1 };
        this.possibleMoves = [];
      } 
      else {
        const moveToPlay: Move | null = this.getMove(row, col);
        if(moveToPlay != null){
          if(moveToPlay.message == "Upgrade"){
            this.HandleUpgrade();
          }

          this.afterMoveService.UpdateGame(this.game, this.pieceToMove, moveToPlay);
          this.possibleMoves = [];
          this.pieceToMove = { row: -1, col: -1 };
        }
      }
    }
  }

  private HandleUpgrade(){

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

  private getMove(row: number, col: number): Move | null{
    for(const move of this.possibleMoves){
      if(move.row == row && move.col == col){
        return move;
      }
    }
    return null;
  }

  isMovePossible(row: number, col: number): boolean {
    return this.possibleMoves.some(move => move.row === row && move.col === col);
  }

  initializeBlackBoard() {
    this.clientViewMatrix = [
      [5,  3,  4,  7,  6,  4,  3,  5 ],
      [1,  1,  1,  1,  1,  1,  1,  1 ],
      [0,  0,  0,  0,  0,  0,  0,  0 ],
      [0,  0,  0,  0,  0,  0,  0,  0 ],
      [0,  0,  0,  0,  0,  0,  0,  0 ],
      [0,  0,  0,  0,  0,  0,  0,  0 ],
      [8,  8,  8,  8,  8,  8,  8,  8 ],
      [12, 10, 11, 14, 13, 11, 10, 12],
    ];
  }
}
