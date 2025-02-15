import { Injectable } from '@angular/core';
import { Square } from '../../../../shared/models/common-models/square-model';
import { Move } from '../../../../shared/models/common-models/move-model';
import { Board } from '../../../../shared/models/common-models/board-model';
import { ThreadCheckService } from './thread-check.service';

@Injectable({
  providedIn: 'root'
})
export class KnightService {

  constructor(private threadCheckService: ThreadCheckService) { }

  GetPossibleMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move> {
    var possibleMoves: Array<Move> = [];
    if(board.isChecked){
      if(isWhitePlaying ? board.blackCheckerTwo.row == -1 : board.whiteCheckerTwo.row == -1){  // çifte şah yok
        possibleMoves = this.GetBlockingMoves(pieceToMove, board, isWhitePlaying);
        const eatingCheckerMove: Move | null = this.GetEatingCheckerMove(pieceToMove, board, isWhitePlaying);
        if(eatingCheckerMove != null){
          possibleMoves.push(eatingCheckerMove);
        }
      }
      return possibleMoves;
    }
    
    possibleMoves = this.GetNormalMoves(pieceToMove, board, isWhitePlaying);
    return possibleMoves;
  }

  private GetBlockingMoves(pieceToMove: Square, board:Board, isWhitePlaying: boolean): Array<Move>{
    const blockingMoves: Array<Move> = [];
    const checker: Square = isWhitePlaying ? board.blackCheckerOne : board.whiteCheckerOne;
    const  normalMoves: Array<Move> = this.GetNormalMoves(pieceToMove, board, isWhitePlaying);
    const type: number = this.threadCheckService.TraceToKing(board.matrix, checker, isWhitePlaying ? board.whiteKing : board.blackKing);
    switch (type) {
      case 1:  // soldan şah çekiliyor
        normalMoves.forEach(move => {
          if(move.row == checker.row && move.col > checker.col){
            blockingMoves.push(move);
          }
        });
        break;
      case 2:  // sağdan
        normalMoves.forEach(move => {
          if(move.row == checker.row && move.col < checker.col){
            blockingMoves.push(move);
          }
        });
        break;
      case 3:  // üstten
        normalMoves.forEach(move => {
          if(move.row > checker.row && move.col == checker.col){
            blockingMoves.push(move);
          }
        });
        break;
      case 4:  // alttan
        normalMoves.forEach(move => {
          if(move.row < checker.row && move.col == checker.col){
            blockingMoves.push(move);
          }
        });
        break;
      case 5:  // sağ alttan
        normalMoves.forEach(move => {
          const rowDiff: number = move.row - checker.row;
          const colDiff: number = move.col - checker.col;
          if((rowDiff == colDiff || rowDiff == -colDiff) && rowDiff < 0 && colDiff < 0){
            blockingMoves.push(move);
          }
        });
        break;
      case 6:  // sağ üstten
        normalMoves.forEach(move => {
          const rowDiff: number = move.row - checker.row;
          const colDiff: number = move.col - checker.col;
          if((rowDiff == colDiff || rowDiff == -colDiff) && rowDiff > 0 && colDiff < 0){
            blockingMoves.push(move);
          }
        });
        break;
      case 7:  // sol üstten
        normalMoves.forEach(move => {
          const rowDiff: number = move.row - checker.row;
          const colDiff: number = move.col - checker.col;
          if((rowDiff == colDiff || rowDiff == -colDiff) && rowDiff > 0 && colDiff > 0){
            blockingMoves.push(move);
          }
        });
        break;
      case 8:  // sol alttan
        normalMoves.forEach(move => {
          const rowDiff: number = move.row - checker.row;
          const colDiff: number = move.col - checker.col;
          if((rowDiff == colDiff || rowDiff == -colDiff) && rowDiff < 0 && colDiff > 0){
            blockingMoves.push(move);
          }
        });
        break;
    }
    return blockingMoves;
  }

  private GetEatingCheckerMove(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Move | null{
    const checker: Square = isWhitePlaying ? board.blackCheckerOne : board.whiteCheckerOne;
    const rowDiff: number = pieceToMove.row - checker.row;
    const colDiff: number = pieceToMove.col - checker.col;
    if(((rowDiff == 2 || rowDiff === -2) && (colDiff == 1 || colDiff == -1)) || ((rowDiff == 1 || rowDiff === -1) && (colDiff == 2 || colDiff == -2))){
      const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
      if(type == 0){
        return {row: checker.row, col: checker.col, message: ""};
      }
    }

    return null;
  }

  private GetNormalMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move>{
    var normalMoves: Array<Move> = [];
    const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
    const squares: Array<Square> = [
      { row: pieceToMove.row - 2, col: pieceToMove.col + 1 },
      { row: pieceToMove.row - 1, col: pieceToMove.col + 2 },
      { row: pieceToMove.row + 1, col: pieceToMove.col + 2 },
      { row: pieceToMove.row + 2, col: pieceToMove.col + 1 },
      { row: pieceToMove.row - 2, col: pieceToMove.col - 1 },
      { row: pieceToMove.row - 1, col: pieceToMove.col - 2 },
      { row: pieceToMove.row + 1, col: pieceToMove.col - 2 },
      { row: pieceToMove.row + 2, col: pieceToMove.col - 1 }
    ];
    if(type == 0){
      if(isWhitePlaying){
        squares.forEach(square => {
          if(this.IsSquareValid(square) && (board.matrix[square.row][square.col] >= 8 || board.matrix[square.row][square.col] == 0)){
            normalMoves.push({row: square.row, col: square.col, message: ""});
          }
        });
      }
      else{
        squares.forEach(square => {
          if(this.IsSquareValid(square) && board.matrix[square.row][square.col] <= 7){
            normalMoves.push({row: square.row, col: square.col, message: ""});
          }
        });
      }
    }
    return normalMoves;
  }

  private IsSquareValid(square: Square): boolean{
    return square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7;
  }
}
