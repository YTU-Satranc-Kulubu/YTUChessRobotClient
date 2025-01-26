import { Injectable } from '@angular/core';
import { Square } from '../../models/common-models/square-model';
import { Move } from '../../models/common-models/move-model';
import { Board } from '../../models/common-models/board-model';
import { ThreadCheckService } from './thread-check.service';

@Injectable({
  providedIn: 'root'
})
export class RookService {

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
      if(rowDiff == 0 || colDiff == 0){
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
      var mess = "";
      switch (type){
        case 0:  // sağ, sol, üst ve alt kontrol edilecek
        if(isWhitePlaying){
          if(pieceToMove.row == 7 && pieceToMove.col == 7 && !board.isWhiteShortRookMoved){
            mess = "White Short Rook First Move";
          }
          else if(pieceToMove.row == 7 && pieceToMove.col == 0 && !board.isWhiteLongRookMoved){
            mess = "White Long Rook First Move";
          }

          i = pieceToMove.row;
          j = pieceToMove.col - 1;
          while(j >= 0){  // sol
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              j = -2;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              j = -2;
            }
            j--;
          }

          i = pieceToMove.row;
          j = pieceToMove.col + 1;
          while(j <= 7){  // sağ
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              j = 9;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              j = 9;
            }
            j++;
          }

          i = pieceToMove.row - 1;
          j = pieceToMove.col;
          while(i >= 0){  // üst
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              i = -2;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = -2;
            }
            i--;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col;
          while(i <= 7){  // alt
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] >= 8){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              i = 9;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] <= 7){  // kendi taşı var
              i = 9;
            }
            i++;
          }
        }
        else{
          if(pieceToMove.row == 0 && pieceToMove.col == 7 && !board.isBlackShortRookMoved){
            mess = "Black Short Rook First Move";
          }
          else if(pieceToMove.row == 0 && pieceToMove.col == 0 && !board.isBlackLongRookMoved){
            mess = "Black Long Rook First Move";
          }

          i = pieceToMove.row;
          j = pieceToMove.col - 1;
          while(j >= 0){  // sol
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              j = -2;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              j = -2;
            }
            j--;
          }

          i = pieceToMove.row;
          j = pieceToMove.col + 1;
          while(j <= 7){  // sağ
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              j = 9;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              j = 9;
            }
            j++;
          }

          i = pieceToMove.row - 1;
          j = pieceToMove.col;
          while(i >= 0){  // üst
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              i = -2;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = -2;
            }
            i--;
          }

          i = pieceToMove.row + 1;
          j = pieceToMove.col;
          while(i <= 7){  // alt
            if(board.matrix[i][j] == 0){
              normalMoves.push({row: i, col: j, message: mess});
            }
            else if(board.matrix[i][j] <= 7){  // rakip taş var
              normalMoves.push({row: i, col: j, message: mess});
              i = 9;  // devam etmeye gerek yok
            }
            else if(board.matrix[i][j] >= 8){  // kendi taşı var
              i = 9;
            }
            i++;
          }
        }
        break;
        case 1:
          if(isWhitePlaying){
            i = pieceToMove.row;
            j = pieceToMove.col - 1;
            while(j >= 0){  // sol
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] >= 8){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                j = -2;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] <= 7){  // kendi taşı var
                j = -2;
              }
              j--;
            }
          }
          else{
            i = pieceToMove.row;
            j = pieceToMove.col - 1;
            while(j >= 0){  // sol
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] <= 7){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                j = -2;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] >= 8){  // kendi taşı var
                j = -2;
              }
              j--;
            }
          }
          break;
        case 2:
          if(isWhitePlaying){
            i = pieceToMove.row;
            j = pieceToMove.col + 1;
            while(j <= 7){  // sağ
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] >= 8){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                j = 9;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] <= 7){  // kendi taşı var
                j = 9;
              }
              j++;
            }
          }
          else{
            i = pieceToMove.row;
            j = pieceToMove.col + 1;
            while(j <= 7){  // sağ
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] <= 7){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                j = 9;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] >= 8){  // kendi taşı var
                j = 9;
              }
              j++;
            }
          }
          break;
        case 3:
          if(isWhitePlaying){
            i = pieceToMove.row - 1;
            j = pieceToMove.col;
            while(i >= 0){  // üst
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] >= 8){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                i = -2;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] <= 7){  // kendi taşı var
                i = -2;
              }
              i--;
            }
          }
          else{
            i = pieceToMove.row - 1;
            j = pieceToMove.col;
            while(i >= 0){  // üst
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] <= 7){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                i = -2;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] >= 8){  // kendi taşı var
                i = -2;
              }
              i--;
            }
          }
          break;
        case 4:
          if(isWhitePlaying){
            i = pieceToMove.row + 1;
            j = pieceToMove.col;
            while(i <= 7){  // alt
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] >= 8){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                i = 9;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] <= 7){  // kendi taşı var
                i = 9;
              }
              i++;
            }
          }
          else{
            i = pieceToMove.row + 1;
            j = pieceToMove.col;
            while(i <= 7){  // alt
              if(board.matrix[i][j] == 0){
                normalMoves.push({row: i, col: j, message: mess});
              }
              else if(board.matrix[i][j] <= 7){  // rakip taş var
                normalMoves.push({row: i, col: j, message: mess});
                i = 9;  // devam etmeye gerek yok
              }
              else if(board.matrix[i][j] >= 8){  // kendi taşı var
                i = 9;
              }
              i++;
            }
          }
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          break;
      }
      return normalMoves;
    }
}
