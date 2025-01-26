import { Injectable } from '@angular/core';
import { Square } from '../../models/common-models/square-model';
import { Move } from '../../models/common-models/move-model';
import { Board } from '../../models/common-models/board-model';
import { ThreadCheckService } from './thread-check.service';

@Injectable({
  providedIn: 'root'
})
export class KingService {

  constructor(private threadCheckService: ThreadCheckService) { }

  GetPossibleMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move> {
    const possibleMoves: Array<Move> = [];
    const squaresToCheck: Array<Square> = [];
    if(isWhitePlaying){
      // özel hamleler
      if(pieceToMove.row == 7 && pieceToMove.col == 4 && !board.isChecked && !board.isWhiteKingMoved){  // rok atma durumu
        if(!board.isWhiteShortRookMoved && board.matrix[7][6] == 0 && board.matrix[7][5] == 0){  // kısa rok kalesi oynamamış ve aradaki kareler boş
          squaresToCheck.push({row: 7, col:6});
          squaresToCheck.push({row: 7, col:5});
          if(!this.IsUnderThread(board.matrix, squaresToCheck, isWhitePlaying)){
            possibleMoves.push({row: 7, col: 6, message: "Short Castle"})
          }
        }
        
        if(!board.isWhiteLongRookMoved && board.matrix[7][3] == 0 && board.matrix[7][2] == 0 && board.matrix[7][1] == 0){  // uzun rok kalesi oynamamış ve aradaki kareler boş
          squaresToCheck.push({row: 7, col:3});
          squaresToCheck.push({row: 7, col:2});
          squaresToCheck.push({row: 7, col:1});
          if(!this.IsUnderThread(board.matrix, squaresToCheck, isWhitePlaying)){
            possibleMoves.push({row: 7, col: 2, message: "Long Castle"})
          }
        }
      }

      // normal hamleler
      // sağ
      if(pieceToMove.col + 1 <= 7 && 
        ((board.matrix[pieceToMove.row][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row][pieceToMove.col + 1] >= 8) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row, col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
      // sol
      if(pieceToMove.col - 1 >= 0 && 
        ((board.matrix[pieceToMove.row][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row][pieceToMove.col - 1] >= 8) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row, col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // üst
      if(pieceToMove.row - 1 >= 0 && 
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col] >= 8) &&
        !this.IsUnderThread(board.matrix, [{row: pieceToMove.row -1 , col: pieceToMove.col}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col, message: "White King Moved"})      
      }
      // alt
      if(pieceToMove.row + 1 <= 7 && 
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col] >= 8) &&
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row +1 , col: pieceToMove.col}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col, message: "White King Moved"})      
      }
      // sol üst
      if(pieceToMove.row - 1 >= 0 && pieceToMove.col - 1 >= 0 &&
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col - 1] >= 8) &&
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row - 1 , col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // sol alt
      if(pieceToMove.row + 1 <= 7 && pieceToMove.col - 1 >= 0 &&
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] >= 8) &&
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row + 1 , col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // sağ alt
      if(pieceToMove.row + 1 <= 7 && pieceToMove.col + 1 <= 7 &&
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] >= 8) &&
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row + 1 , col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
      // sağ üst
      if(pieceToMove.row - 1 >= 0 && pieceToMove.col + 1 <= 7 &&
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col + 1] >= 8) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row - 1 , col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
    }
    else{
      // özel hamleler
      if(pieceToMove.row == 0 && pieceToMove.col == 4 && !board.isChecked && !board.isBlackKingMoved){  // rok atma durumu
        if(!board.isBlackShortRookMoved && board.matrix[0][6] == 0 && board.matrix[0][5] == 0){  // kısa rok kalesi oynamamış ve aradaki kareler boş
          squaresToCheck.push({row: 0, col:6});
          squaresToCheck.push({row: 0, col:5});
          if(!this.IsUnderThread(board.matrix, squaresToCheck, isWhitePlaying)){
            possibleMoves.push({row: 0, col: 6, message: "Short Castle"})
          }
        }
        
        if(!board.isBlackLongRookMoved && board.matrix[0][3] == 0 && board.matrix[0][2] == 0 && board.matrix[0][1] == 0){  // uzun rok kalesi oynamamış ve aradaki kareler boş
          squaresToCheck.push({row: 0, col:3});
          squaresToCheck.push({row: 0, col:2});
          squaresToCheck.push({row: 0, col:1});
          if(!this.IsUnderThread(board.matrix, squaresToCheck, isWhitePlaying)){
            possibleMoves.push({row: 0, col: 2, message: "Long Castle"})
          }
        }
      }

      // normal hamleler
      // sağ
      if(pieceToMove.col + 1 <= 7 && 
        ((board.matrix[pieceToMove.row][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row][pieceToMove.col + 1] <= 7) && 
        !this.IsUnderThread(board.matrix, [{row: pieceToMove.row, col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
      // sol
      if(pieceToMove.col - 1 >= 0 && 
        ((board.matrix[pieceToMove.row][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row][pieceToMove.col - 1] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row, col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // üst
      if(pieceToMove.row - 1 >= 0 && 
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row -1 , col: pieceToMove.col}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col, message: "White King Moved"})      
      }
      // alt
      if(pieceToMove.row + 1 <= 7 && 
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row +1 , col: pieceToMove.col}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col, message: "White King Moved"})      
      }
      // sol üst
      if(pieceToMove.row - 1 >= 0 && pieceToMove.col - 1 >= 0 &&
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col - 1] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row - 1 , col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // sol alt
      if(pieceToMove.row + 1 <= 7 && pieceToMove.col - 1 >= 0 &&
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row + 1 , col: pieceToMove.col - 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: "White King Moved"})      
      }
      // sağ alt
      if(pieceToMove.row + 1 <= 7 && pieceToMove.col + 1 <= 7 &&
        ((board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] <= 7) &&
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row + 1 , col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
      // sağ üst
      if(pieceToMove.row - 1 >= 0 && pieceToMove.col + 1 <= 7 &&
        ((board.matrix[pieceToMove.row - 1][pieceToMove.col + 1] == 0 || board.matrix[pieceToMove.row - 1][pieceToMove.col + 1] <= 7) && 
          !this.IsUnderThread(board.matrix, [{row: pieceToMove.row - 1 , col: pieceToMove.col + 1}], isWhitePlaying))){  // kare boş ya da korunmasız rakip taş var
        possibleMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: "White King Moved"})      
      }
    }
    return possibleMoves;
  }

  private IsUnderThread(matrix: number[][], squares: Square[], isWhitePlaying: boolean): boolean {
    var counter: number = 0;
    squares.forEach(square => {
      if(!this.threadCheckService.CheckPawn(matrix, square, !isWhitePlaying).isCheck && !this.threadCheckService.CheckKnight(matrix, square, !isWhitePlaying).isCheck &&
        !this.threadCheckService.CheckBishop(matrix, square, !isWhitePlaying).isCheck && !this.threadCheckService.CheckRook(matrix, square, !isWhitePlaying).isCheck &&
        !this.threadCheckService.CheckQueen(matrix, square, !isWhitePlaying).isCheck && this.threadCheckService.CheckKing(matrix, square, !isWhitePlaying)){
          counter++;
        }
    });
    
    if(counter == squares.length){
      squares = [];
      return false;
    }
    squares = [];
    return true;
  }
}
