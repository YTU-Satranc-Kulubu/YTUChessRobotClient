import { Injectable } from '@angular/core';
import { Square } from '../../../../shared/models/common-models/square-model';
import { Board } from '../../../../shared/models/common-models/board-model';
import { Move } from '../../../../shared/models/common-models/move-model';
import { ThreadCheckService } from './thread-check.service';

@Injectable({
  providedIn: 'root'
})
export class PawnService {

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
    if(isWhitePlaying && (colDiff == 1 || colDiff == -1) && (rowDiff == 1 || (rowDiff == 0 && pieceToMove.row == 3 && board.matrix[checker.row][checker.col] == 9))){  // normal veya geçerken al ile alabilir
      const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
      if(type == 0){
        if(colDiff == 1){  // sola giderek alıcak
          if(rowDiff == 1){  // normal al
            return {row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: checker.row == 0 ? "Upgrade" : ""}
          }
          else{  // geçerken al
            return {row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: `Enpassant ${checker.row}, ${checker.col}`}
          }
        }
        else{  // sağa giderk al
          if(rowDiff == 1){  // normal al
            return {row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: checker.row == 0 ? "Upgrade" : ""}
          }
          else{  // geçerken al
            return {row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: `Enpassant ${checker.row}, ${checker.col}`}
          }
        }
      }
    }
    else if(!isWhitePlaying && (colDiff == 1 || colDiff == -1) && (rowDiff == -1 || (rowDiff == 0 && pieceToMove.row == 4 && board.matrix[checker.row][checker.col] == 2)) ){
      const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
      if(type == 0){
        if(colDiff == 1){  // sola giderek alıcak
          if(rowDiff == -1){  // normal al
            return {row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: checker.row == 7 ? "Upgrade" : ""}
          }
          else{  // geçerken al
            return {row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: `Enpassant ${checker.row}, ${checker.col}`}
          }
        }
        else{  // sağa giderk al
          if(rowDiff == -1){  // normal al
            return {row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: checker.row == 7 ? "Upgrade" : ""}
          }
          else{  // geçerken al
            return {row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: `Enpassant ${checker.row}, ${checker.col}`}
          }
        }
      }
    }

    return null;
  }

  private GetNormalMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move>{
    var normalMoves: Array<Move> = [];
    const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
    if(isWhitePlaying){
      switch(type){
        case 0:  // açmazda değil
          switch(pieceToMove.row){  // özel durumlar
            case 3:                 // geçerken al yapma ihtimali var
              if(pieceToMove.col > 0 && board.matrix[pieceToMove.row][pieceToMove.col - 1] == 9){  // solda 2 sürülmüş siyah piyon var
                normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: `Enpassant ${pieceToMove.row},${pieceToMove.col - 1}`});
              }
              if(pieceToMove.col < 7 && board.matrix[pieceToMove.row][pieceToMove.col + 1] == 9){  // sağda 2 sürülmüş siyah piyon var
                normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: `Enpassant ${pieceToMove.row},${pieceToMove.col + 1}`});
              }
              break;
            case 6:                 // 2 kare ilerleme ihtimali var
              if(board.matrix[pieceToMove.row - 2][pieceToMove.col] == 0 && board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0){
                normalMoves.push({row: pieceToMove.row - 2, col: pieceToMove.col, message: ""});
              }
              break;
          }

          this.GetEatingMoves(board.matrix, pieceToMove, isWhitePlaying).forEach(move => {
            normalMoves.push(move);
          });
          if(board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0){  // 1 kare ilerleme
            normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col, message: pieceToMove.row - 1 == 0 ? "Upgrade" : ""});
          }
          break;
        case 1:  // soldan açmazda
        case 2:  // sağdan açmazda
        case 5:  // sağ alttan açmazda
        case 8:  // sol alttan açmazda
          break;
        case 3:  // üstten açmazda
        case 4:  // alttan açmazda
          if(pieceToMove.row == 6 && board.matrix[pieceToMove.row - 2][pieceToMove.col] == 0 && board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0){  // 2 kare ilerleme
            normalMoves.push({row: pieceToMove.row - 2, col: pieceToMove.col, message: ""});
          }
          if(pieceToMove.row != 1 && board.matrix[pieceToMove.row - 1][pieceToMove.col] == 0){  // 1 kare ilerleme
            normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col, message: ""});
          }
          break;
        case 6:  // sağ üstten açmazda
          if(board.matrix[pieceToMove.row - 1][pieceToMove.col + 1] >= 8){
            normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: ""});
          }
          break;
        case 7: // sol üstten açmazda
          if(board.matrix[pieceToMove.row - 1][pieceToMove.col - 1] >= 8){
            normalMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: ""});
          }
          break;
      }
    }
    else{
      switch(type){
        case 0:  // açmazda değil
          switch(pieceToMove.row){  // özel durumlar
            case 1:                 // 2 kare ilerleme ihtimali var
              if(board.matrix[pieceToMove.row + 2][pieceToMove.col] == 0 && board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0){
                normalMoves.push({row: pieceToMove.row + 2, col: pieceToMove.col, message: ""});
              }
              break;
            case 4:                 // geçerken al yapma ihtimali var
              if(pieceToMove.col > 0 && board.matrix[pieceToMove.row][pieceToMove.col - 1] == 2){  // solda 2 sürülmüş beyaz piyon var
                normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: `Enpassant ${pieceToMove.row},${pieceToMove.col - 1}`});
              }
              if(pieceToMove.col < 7 && board.matrix[pieceToMove.row][pieceToMove.col + 1] == 2){  // sağda 2 sürülmüş beyaz piyon var
                normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: `Enpassant ${pieceToMove.row},${pieceToMove.col + 1}`});
              }
              break;
          }

          this.GetEatingMoves(board.matrix, pieceToMove, isWhitePlaying).forEach(move => {
            normalMoves.push(move);
          });
          if(board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0){  // 1 kare ilerleme
            normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col, message: pieceToMove.row - 1 == 0 ? "Upgrade" : ""});
          }
          break;
        case 1:  // soldan açmazda
        case 2:  // sağdan açmazda
        case 6:  // sağ üstten açmazda
        case 7: // sol üstten açmazda
          break;
        case 3:  // üstten açmazda
        case 4:  // alttan açmazda
          if(pieceToMove.row == 1 && board.matrix[pieceToMove.row + 2][pieceToMove.col] == 0 && board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0){  // 2 kare ilerleme
            normalMoves.push({row: pieceToMove.row + 2, col: pieceToMove.col, message: ""});
          }
          if(pieceToMove.row != 6 && board.matrix[pieceToMove.row + 1][pieceToMove.col] == 0){  // 1 kare ilerleme
            normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col, message: ""});
          }
          break;
        case 5:  // sağ alttan açmazda
          if(board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] != 0 && board.matrix[pieceToMove.row + 1][pieceToMove.col + 1] <= 7){
            normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: ""});
          }
          break;
        case 8:  // sol alttan açmazda
          if(board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] != 0 && board.matrix[pieceToMove.row + 1][pieceToMove.col - 1] <= 7){
            normalMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: ""});
          }
          break;
      }
    }
    return normalMoves;
  }

  private GetEatingMoves(matrix: number[][], pieceToMove: Square, isWhitePlaying: boolean): Array<Move>{
    var eatingMoves: Array<Move> = [];
    const mess: string = isWhitePlaying ? (pieceToMove.row == 1 ? "Upgrade" : "") : (pieceToMove.row == 6 ? "Upgrade" : "");
    if(isWhitePlaying){
      if(pieceToMove.col > 0 && matrix[pieceToMove.row - 1][pieceToMove.col - 1] >= 8){  // solda siyah taş var
        eatingMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col - 1, message: mess});
      }
      if(pieceToMove.col < 7 && matrix[pieceToMove.row - 1][pieceToMove.col + 1] >= 8){  // sağda siyah taş var
        eatingMoves.push({row: pieceToMove.row - 1, col: pieceToMove.col + 1, message: mess});
      }
    }
    else{
      if(pieceToMove.col > 0 && matrix[pieceToMove.row + 1][pieceToMove.col - 1] != 0 && matrix[pieceToMove.row + 1][pieceToMove.col - 1] <= 7){  // solda beyaz taş var
        eatingMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col - 1, message: mess});
      }
      if(pieceToMove.col < 7 && matrix[pieceToMove.row + 1][pieceToMove.col + 1] != 0 && matrix[pieceToMove.row + 1][pieceToMove.col - 1] <= 7){  // sağda beyaz taş var
        eatingMoves.push({row: pieceToMove.row + 1, col: pieceToMove.col + 1, message: mess});
      }
    }
    return eatingMoves;
  }
}
