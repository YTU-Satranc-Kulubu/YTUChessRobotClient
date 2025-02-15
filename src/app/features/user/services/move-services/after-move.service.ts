import { Injectable } from '@angular/core';
import { Game } from '../../../../shared/models/ui-models/game-model';
import { Move } from '../../../../shared/models/common-models/move-model';
import { Square } from '../../../../shared/models/common-models/square-model';
import { ThreadCheckService } from './thread-check.service';
import { Checker } from '../../../../shared/models/common-models/checker-model';
import { Board } from '../../../../shared/models/common-models/board-model';

@Injectable({
  providedIn: 'root'
})
export class AfterMoveService {

  constructor(private threadCheckService: ThreadCheckService) { }

  UpdateGame(game: Game, pieceToMove: Square, moveToPlay: Move){
    const moveNotation: string = this.GetNotation(game.board, pieceToMove, moveToPlay);
    game.board.isChecked = false;  // şah çekilme durumunu temizle
    if(moveToPlay.message != ""){  // Mesaj = "Upgrade", "Enpassant row,col", "ShortCastle", "Long Castle", "White King Moved", "Black King Moved" olabilir
      if(moveToPlay.message == "Enpassant"){
        const eatenPiecesCoordinates = moveToPlay.message.split(' ')[1].split(',');
        this.HandleEnpessant(game.board, eatenPiecesCoordinates);
      }
      else if(moveToPlay.message.includes("Castle")){
        this.HandleCastle(game.board, moveToPlay, moveNotation);
      }
      else if(moveToPlay.message.includes("King Moved")){
        this.HandleKingMoved(game.board, pieceToMove, moveToPlay);
      }
      else if(moveToPlay.message.includes("Rooks First Move")){
        this.HandleRooksFirstMove(game.board, moveToPlay.message);
      }
    }

    if(game.board.matrix[moveToPlay.row][moveToPlay.col] != 0){
      this.HandlePieceEating(game.board, pieceToMove, moveToPlay);
    }

    if(game.board.matrix[pieceToMove.row][pieceToMove.col] == 2){
      game.board.matrix[pieceToMove.row][pieceToMove.col] = 1;
      game.board.whitePushed2Pawn = {row: -1, col: -1};
    }
    else if(game.board.matrix[pieceToMove.row][pieceToMove.col] == 9){
      game.board.matrix[pieceToMove.row][pieceToMove.col] = 1;
      game.board.blackPushed2Pawn = {row: -1, col: -1};
    }

    game.board.matrix[moveToPlay.row][moveToPlay.col] = game.board.matrix[pieceToMove.row][pieceToMove.col];
    game.board.matrix[pieceToMove.row][pieceToMove.col] = 0;

    this.HandleAfterPlayProcesses(game, pieceToMove, {row: moveToPlay.row, col: moveToPlay.col}, moveNotation);
  }

  private GetNotation(board: Board, pieceToMove: Square, moveToPlay: Move): string{
    var notation: string = "";
    const piece: number = board.matrix[pieceToMove.row][pieceToMove.col];
    if(piece <= 2 || piece == 8 || piece == 9){
      if(board.matrix[moveToPlay.row][moveToPlay.col] != 0){
        notation = this.GetColName(pieceToMove.col) + "x" + this.GetColName(moveToPlay.col) + this.GetRowNumber(moveToPlay.row);
      }
      else{
        const newColName: string = this.GetColName(moveToPlay.col);
        const oldColName: string = this.GetColName(pieceToMove.col);
        if(oldColName != newColName){
          notation = oldColName + newColName + this.GetRowNumber(moveToPlay.row);
        }
        else{
          notation = newColName + this.GetRowNumber(moveToPlay.row);
        }
      }
    }
    else{
      if(board.matrix[moveToPlay.row][moveToPlay.col] != 0){
        notation = this.GetPieceName(piece) + "x" + this.GetColName(moveToPlay.col) + this.GetRowNumber(moveToPlay.row);
      }
      else{
        notation = this.GetPieceName(piece) + this.GetColName(moveToPlay.col) + this.GetRowNumber(moveToPlay.row);
      }
    }
    return notation;
  }

  private GetColName(col: number): string{
    return String.fromCharCode(97 + col);
  }

  private GetRowNumber(row: number): string{
    return (8 - row).toString();
  }

  private GetPieceName(piece: number){
    switch (piece){
      case 3:
      case 10:
        return "A";
      case 4:
      case 11:
        return "F";
      case 5:
      case 12:
        return "K";
      case 6:
      case 13:
        return "V";
      case 7:
      case 14:
        return "S";
    }
    return "";  // buraya düşmez
  }

  private HandleEnpessant(board: Board, eatenPiecesCoordinates: string[]){
    const row: number = Number.parseInt(eatenPiecesCoordinates[0]);
    const col: number = Number.parseInt(eatenPiecesCoordinates[1]);
    if(board.matrix[row][col] == 2){
      board.whitePushed2Pawn = {row: -1, col: -1};
      board.whitesPoints--;
    }
    else if(board.matrix[row][col] == 9){
      board.blackPushed2Pawn = {row: -1, col: -1};
      board.blacksPoints--;
    }

    board.matrix[row][col] = 0;
  }

  private HandleCastle(board: Board, moveToPlay: Move, moveNotation: string){
    if(moveToPlay.message.includes("Short")){
      if(moveToPlay.row == 7){  // beyaz rok atıcak
        board.isWhiteKingMoved = true;
        board.isWhiteShortRookMoved = true;
        board.matrix[7][7] = 0;
        board.matrix[7][5] = 5;
        board.whiteKing = {row: 7, col: 6};
      }
      else{
        board.isBlackKingMoved = true;
        board.isBlackShortRookMoved = true;
        board.matrix[0][7] = 0;
        board.matrix[0][5] = 5;
        board.blackKing = {row: 0, col: 6};
      }
      moveNotation = "o-o";
    }
    else{
      if(moveToPlay.row == 7){  // beyaz rok atıcak
        board.isWhiteKingMoved = true;
        board.isWhiteLongRookMoved = true;
        board.matrix[7][0] = 0;
        board.matrix[7][3] = 5;
        board.whiteKing = {row: 7, col: 2};
      }
      else{
        board.isBlackKingMoved = true;
        board.isBlackLongRookMoved = true;
        board.matrix[0][0] = 0;
        board.matrix[0][3] = 5;
        board.blackKing = {row: 0, col: 2};
      }
      moveNotation = "o-o-o";
    }
  }

  private HandleKingMoved(board: Board, pieceToMove: Square, moveToPlay: Move){
    if(board.matrix[pieceToMove.row][pieceToMove.col] == 7){
      board.whiteKing = {row: moveToPlay.row, col: moveToPlay.col};
      if(!board.isWhiteKingMoved){
        board.isWhiteKingMoved = true;
      }
    }
    else{
      board.blackKing = {row: moveToPlay.row, col: moveToPlay.col};
      if(!board.isBlackKingMoved){
        board.isBlackKingMoved = true;
      }
    }
  }

  private HandleRooksFirstMove(board: Board, message: string){
    if(message.includes("Short")){
      if(!board.isWhiteShortRookMoved && message.includes("White")){
        board.isWhiteShortRookMoved = true;
      }
      else if(!board.isBlackShortRookMoved && message.includes("Black")){
        board.isBlackShortRookMoved = true;
      }
    }
    else{
      if(!board.isWhiteLongRookMoved && message.includes("White")){
        board.isWhiteLongRookMoved = true;
      }
      else if(!board.isBlackLongRookMoved && message.includes("Black")){
        board.isBlackLongRookMoved = true;
      }
    }
  }

  private HandlePieceEating(board: Board, pieceToMove: Square, moveToPlay: Move){
    if(board.matrix[pieceToMove.row][pieceToMove.col] <= 7){
      switch (board.matrix[moveToPlay.row][moveToPlay.col]){
        case 8:
          board.blacksPoints--;
          break;
        case 9:
          board.blacksPoints--;
          board.blackPushed2Pawn = {row: -1, col: -1};
          break;
        case 10:
        case 11:
          board.blacksPoints -= 3;
          break;
        case 12:
          board.blacksPoints -= 5;
          break;
        case 13:
          board.blacksPoints -= 9;
          break;
      }
    }
    else{
      switch (board.matrix[moveToPlay.row][moveToPlay.col]){
        case 1:
          board.whitesPoints--;
          break;
        case 2:
          board.whitesPoints--;
          board.whitePushed2Pawn = {row: -1, col: -1};
          break;
        case 3:
        case 4:
          board.whitesPoints -= 3;
          break;
        case 5:
          board.whitesPoints -= 5;
          break;
        case 6:
          board.whitesPoints -= 9;
          break;
      }
    }
  }

  private HandleAfterPlayProcesses(game: Game, oldSqaure: Square, newSquare: Square, moveNotation: string){
    // 2 sürülmüş piyon temizliği
    if(game.board.whitePushed2Pawn.row != -1){
      game.board.whitePushed2Pawn = {row: -1, col: -1};
    }
    if(game.board.blackPushed2Pawn.row != -1){
      game.board.blackPushed2Pawn = {row: -1, col: -1};
    }
    // yeni 2 sürülmüş piyon var mı kontrolü
    if(game.board.matrix[newSquare.row][newSquare.col] == 1 && newSquare.row == oldSqaure.row - 2){
      game.board.matrix[newSquare.row][newSquare.col] = 2;
      game.board.whitePushed2Pawn = {row: newSquare.row, col: newSquare.col};
    }
    else if(game.board.matrix[newSquare.row][newSquare.col] == 8 && newSquare.row == oldSqaure.row + 2){
      game.board.matrix[newSquare.row][newSquare.col] = 9;
      game.board.blackPushed2Pawn = {row: newSquare.row, col: newSquare.col};
    }

    //şah çekme işlemlerini sıfırla
    game.board.isChecked = false;
    game.board.whiteCheckerOne = {row: -1, col: -1};
    game.board.whiteCheckerTwo = {row: -1, col: -1};
    game.board.blackCheckerOne = {row: -1, col: -1};
    game.board.blackCheckerTwo = {row: -1, col: -1};

    if(game.board.matrix[newSquare.row][newSquare.col] != 7 && game.board.matrix[newSquare.row][newSquare.col] != 14){
      this.HandleIsCheckControl(game.board, game.board.matrix[newSquare.row][newSquare.col] >= 8);
    }

    if(game.board.isChecked){
      moveNotation += "+";
    }

    // notasyonu ekle
    game.board.matrix[newSquare.row][newSquare.col] <= 7 ? game.whiteMoves.push(moveNotation) : game.blackMoves.push(moveNotation);
  }

  private HandleIsCheckControl(board: Board, checkWhitePieces: boolean){
    const checkerQueen: Checker = this.threadCheckService.CheckQueen(board.matrix, board.whiteKing, checkWhitePieces);
    const checkerRook: Checker = this.threadCheckService.CheckRook(board.matrix, board.whiteKing, checkWhitePieces);
    const checkerBishop: Checker = this.threadCheckService.CheckBishop(board.matrix, board.whiteKing, checkWhitePieces);
    const checkerKnight: Checker = this.threadCheckService.CheckKnight(board.matrix, board.whiteKing, checkWhitePieces);
    const checkerPawn: Checker = this.threadCheckService.CheckPawn(board.matrix, board.whiteKing, checkWhitePieces);
    var isFirstCheckerFound: boolean = false;
    var isSecondCheckerFound: boolean = false;
    if(!checkWhitePieces){
      if(checkerQueen.isCheck){
        board.isChecked = true;
        board.whiteCheckerOne = {row: checkerQueen.row, col: checkerQueen.col};
        isFirstCheckerFound = true;
      }

      if(checkerKnight.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.whiteCheckerTwo = {row: checkerKnight.row, col: checkerKnight.col};
          isSecondCheckerFound = true;
        }
        else{
          board.whiteCheckerOne = {row: checkerKnight.row, col: checkerKnight.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerBishop.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.whiteCheckerTwo = {row: checkerBishop.row, col: checkerBishop.col};
          isSecondCheckerFound = true;
        }
        else{
          board.whiteCheckerOne = {row: checkerBishop.row, col: checkerBishop.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerRook.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.whiteCheckerTwo = {row: checkerRook.row, col: checkerRook.col};
          isSecondCheckerFound = true;
        }
        else{
          board.whiteCheckerOne = {row: checkerRook.row, col: checkerRook.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerPawn.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.whiteCheckerTwo = {row: checkerPawn.row, col: checkerPawn.col};
          isSecondCheckerFound = true;
        }
        else{
          board.whiteCheckerOne = {row: checkerPawn.row, col: checkerPawn.col};
          isFirstCheckerFound = true;
        }
      }
    }
    else{
      if(checkerQueen.isCheck){
        board.isChecked = true;
        board.blackCheckerOne = {row: checkerQueen.row, col: checkerQueen.col};
        isFirstCheckerFound = true;
      }

      if(checkerKnight.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.blackCheckerTwo = {row: checkerKnight.row, col: checkerKnight.col};
          isSecondCheckerFound = true;
        }
        else{
         board.blackCheckerOne = {row: checkerKnight.row, col: checkerKnight.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerBishop.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.blackCheckerTwo = {row: checkerBishop.row, col: checkerBishop.col};
          isSecondCheckerFound = true;
        }
        else{
          board.blackCheckerOne = {row: checkerBishop.row, col: checkerBishop.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerRook.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.blackCheckerTwo = {row: checkerRook.row, col: checkerRook.col};
          isSecondCheckerFound = true;
        }
        else{
          board.blackCheckerOne = {row: checkerRook.row, col: checkerRook.col};
          isFirstCheckerFound = true;
        }
      }

      if(!isSecondCheckerFound && checkerPawn.isCheck){
        board.isChecked = true;
        if(isFirstCheckerFound){
          board.blackCheckerTwo = {row: checkerPawn.row, col: checkerPawn.col};
          isSecondCheckerFound = true;
        }
        else{
          board.blackCheckerOne = {row: checkerPawn.row, col: checkerPawn.col};
          isFirstCheckerFound = true;
        }
      }
    }
  }
}
