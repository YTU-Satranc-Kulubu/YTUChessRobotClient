import { Injectable } from '@angular/core';
import { Square } from '../../models/common-models/square-model';
import { PawnService } from './pawn.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { RookService } from './rook.service';
import { QueenService } from './queen.service';
import { KingService } from './king.service';
import { Board } from '../../models/common-models/board-model';
import { Move } from '../../models/common-models/move-model';

@Injectable({
  providedIn: 'root'
})
export class PossibleMovesService {

  constructor(private pawnService: PawnService, private knightService: KnightService, private bishopService: BishopService,
    private rookService: RookService, private QueenService: QueenService, private kingService: KingService) { }

  GetPossibleMoves(pieceToMove: Square, board: Board): Array<Move> {
    var possibleMoves: Array<Move> = [];
    switch (board.matrix[pieceToMove.row][pieceToMove.col]){
      case 1:
      case 2:
      case 8:
      case 9:
        possibleMoves = this.pawnService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
      case 3:
      case 10:
        possibleMoves = this.knightService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
      case 4:
      case 11:
        possibleMoves = this.bishopService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
      case 5:
      case 12:
        possibleMoves = this.rookService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
      case 6:
      case 13:
        possibleMoves = this.QueenService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
      case 7:
      case 14:
        possibleMoves = this.kingService.GetPossibleMoves(pieceToMove, board, board.matrix[pieceToMove.row][pieceToMove.col] < 8);
        break;
    }
    return possibleMoves;
  }
}
