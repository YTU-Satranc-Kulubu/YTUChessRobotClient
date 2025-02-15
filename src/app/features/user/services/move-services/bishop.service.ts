import { Injectable } from '@angular/core';
import { Square } from '../../../../shared/models/common-models/square-model';
import { Move } from '../../../../shared/models/common-models/move-model';
import { Board } from '../../../../shared/models/common-models/board-model';
import { ThreadCheckService } from './thread-check.service';

@Injectable({
  providedIn: 'root'
})
export class BishopService {

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
    if(rowDiff == colDiff || rowDiff == -colDiff){  // şah çeken taş çaprazda
      const normalMoves = this.GetNormalMoves(pieceToMove, board, isWhitePlaying);
      for(const move of normalMoves){
        if(move.row == checker.row && move.col == checker.col){
            return move;
        }
      }
    }

    return null;
  }

  private GetNormalMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move>{
    var normalMoves: Array<Move> = [];
    const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
    var i: number = 0;
    var j: number = 0;
    switch (type){
      case 0:  // 4 çaprazda kontrol edileccek
        if(isWhitePlaying){
          i = pieceToMove.row - 1;
          j = pieceToMove.col - 1;
          while(i >= 0 && j >= 0){  // sol üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = -2;
            }
            i--;
            j--;
          }

          i = pieceToMove.row - 1;
          j = pieceToMove.col + 1;
          while(i >= 0 && j <= 7){  //sağ üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = -2;
            }
            i--;
            j++;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col - 1;
          while(i <= 7 && j >= 0){  // sol alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = 9;
            }
            i++;
            j--;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col + 1;
          while(i <= 7 && j <= 7){  // sağ alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = 9;
            }
            i++;
            j++;
          }
        }
        else{
          i = pieceToMove.row - 1;
          j = pieceToMove.col - 1;
          while(i >= 0 && j >= 0){  // sol üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = -2;
            }
            i--;
            j--;
          }

          i = pieceToMove.row - 1;
          j = pieceToMove.col + 1;
          while(i >= 0 && j <= 7){  //sağ üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = -2;
            }
            i--;
            j++;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col - 1;
          while(i <= 7 && j >= 0){  // sol alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = 9;
            }
            i++;
            j--;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col + 1;
          while(i <= 7 && j <= 7){  // sağ alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = 9;
            }
            i++;
            j++;
          }
        }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        break;
      case 5:
        if(isWhitePlaying){
          i = pieceToMove.row + 1;
          j = pieceToMove.col + 1;
          while(i <= 7 && j <= 7){  // sağ alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = 9;
            }
            i++;
            j++;
          }
        }
        else{
          i = pieceToMove.row + 1;
          j = pieceToMove.col + 1;
          while(i <= 7 && j <= 7){  // sağ alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = 9;
            }
            i++;
            j++;
          }
        }
        break;
      case 6:
        if(isWhitePlaying){
          i = pieceToMove.row - 1;
          j = pieceToMove.col + 1;
          while(i >= 0 && j <= 7){  //sağ üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = -2;
            }
            i--;
            j++;
          }
        }
        else{
          i = pieceToMove.row - 1;
          j = pieceToMove.col + 1;
          while(i >= 0 && j <= 7){  //sağ üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = -2;
            }
            i--;
            j++;
          }
        }
        break;
      case 7:
        if(isWhitePlaying){
          i = pieceToMove.row - 1;
          j = pieceToMove.col - 1;
          while(i >= 0 && j >= 0){  // sol üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = -2;
            }
            i--;
            j--;
          }
        }
        else{
          i = pieceToMove.row - 1;
          j = pieceToMove.col - 1;
          while(i >= 0 && j >= 0){  // sol üst çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = -2;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = -2;
            }
            i--;
            j--;
          }
        }
        break;
      case 8:
        if(isWhitePlaying){
          i = pieceToMove.row + 1;
          j = pieceToMove.col - 1;
          while(i <= 7 && j >= 0){  // sol alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = 9;
            }
            i++;
            j--;
          }
        }
        else{
          i = pieceToMove.row + 1;
          j = pieceToMove.col - 1;
          while(i <= 7 && j >= 0){  // sol alt çapraz
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: ""});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: ""});
              i = 9;  // gerisine bakmaya gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = 9;
            }
            i++;
            j--;
          }
        }
        break;
    }

    return normalMoves;
  }
}
