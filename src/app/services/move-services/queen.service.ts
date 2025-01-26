import { Injectable } from '@angular/core';
import { Square } from '../../models/common-models/square-model';
import { Move } from '../../models/common-models/move-model';
import { Board } from '../../models/common-models/board-model';
import { ThreadCheckService } from './thread-check.service';
import { BishopService } from './bishop.service';
import { RookService } from './rook.service';

@Injectable({
  providedIn: 'root'
})
export class QueenService {

  constructor(private threadCheckService: ThreadCheckService, private bishopService: BishopService, private rookService: RookService) { }

  GetPossibleMoves(pieceToMove: Square, board: Board, isWhitePlaying: boolean): Array<Move> {
      var posibleMoves: Array<Move> = [];
      const type: number = this.threadCheckService.IsMovable(board.matrix, pieceToMove, isWhitePlaying ? board.whiteKing : board.blackKing, isWhitePlaying);
      switch (type){
        case 0:
          posibleMoves = this.bishopService.GetPossibleMoves(pieceToMove, board, isWhitePlaying);
          this.rookService.GetPossibleMoves(pieceToMove, board, isWhitePlaying).forEach(move => {
            posibleMoves.push(move);
          });
          break;
        case 1:
        case 2:
        case 3:
        case 4:
          posibleMoves = this.rookService.GetPossibleMoves(pieceToMove, board, isWhitePlaying);
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          posibleMoves = this.bishopService.GetPossibleMoves(pieceToMove, board, isWhitePlaying);
          break;
      }
      return posibleMoves;
    }
}
