import { Injectable } from '@angular/core';
import { Square } from '../../models/common-models/square-model';
import { Checker } from '../../models/common-models/checker-model';

@Injectable({
  providedIn: 'root'
})
export class ThreadCheckService {

  constructor() { }

  CheckPawn(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): Checker{
    if(checkWhitePieces){
      if(squareToCheck.row + 1 <= 7 && squareToCheck.col - 1 >= 0 && (matrix[squareToCheck.row + 1][squareToCheck.col - 1] == 1 || matrix[squareToCheck.row + 1][squareToCheck.col - 1] == 2)){
        return {row: squareToCheck.row + 1, col: squareToCheck.col - 1, isCheck: true};
      }

      if(squareToCheck.row + 1 <= 7 && squareToCheck.col + 1 <= 7 && (matrix[squareToCheck.row + 1][squareToCheck.col + 1] == 1 || matrix[squareToCheck.row + 1][squareToCheck.col + 1] == 2)){
        return {row: squareToCheck.row + 1, col: squareToCheck.col + 1, isCheck: true};
      }
    }
    else{
      if(squareToCheck.row - 1 >= 0 && squareToCheck.col - 1 >= 0 && (matrix[squareToCheck.row - 1][squareToCheck.col - 1] == 8 || matrix[squareToCheck.row - 1][squareToCheck.col - 1] == 9)){
        return {row: squareToCheck.row - 1, col: squareToCheck.col - 1, isCheck: true};
      }

      if(squareToCheck.row - 1 >= 0 && squareToCheck.col + 1 <= 7 && (matrix[squareToCheck.row - 1][squareToCheck.col + 1] == 8 || matrix[squareToCheck.row - 1][squareToCheck.col + 1] == 9)){
        return {row: squareToCheck.row - 1, col: squareToCheck.col + 1, isCheck: true};
      }
    }
    
    return {row: -1, col: -1, isCheck: false};
  }

  CheckKnight(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): Checker{
    const knightPoint: number = checkWhitePieces ? 3 : 10;
    const squares: Array<Square> = [
      {row: squareToCheck.row - 2, col: squareToCheck.col + 1},
      {row: squareToCheck.row - 1, col: squareToCheck.col + 2},
      {row: squareToCheck.row + 1, col: squareToCheck.col + 2},
      {row: squareToCheck.row + 2, col: squareToCheck.col + 1},
      {row: squareToCheck.row - 2, col: squareToCheck.col - 1},
      {row: squareToCheck.row - 1, col: squareToCheck.col - 2},
      {row: squareToCheck.row + 1, col: squareToCheck.col - 2},
      {row: squareToCheck.row + 2, col: squareToCheck.col - 1}
    ];
    for(const square of squares){
      if(this.CheckSquare(square) && matrix[square.row][square.col] == knightPoint){
        return {row: square.row, col: square.col, isCheck: true};
      }
    }

    return {row: -1, col: -1, isCheck: false};
  }

  CheckBishop(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): Checker{
    const bishopPoint: number = checkWhitePieces ? 4 : 11;
    var i: number = 0;
    var j: number = 0;
    i = squareToCheck.row - 1;
    j = squareToCheck.col - 1;
    while(i >= 0 && j >= 0){  // sol üst çapraz
      if(matrix[i][j] == bishopPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
      j--;
    }

    i = squareToCheck.row - 1;
    j = squareToCheck.col + 1;
    while(i >= 0 && j <= 7){  // sağ üst çapraz
      if(matrix[i][j] == bishopPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
      j++;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col - 1;
    while(i <= 7 && j >= 0){  // sol alt çapraz
      if(matrix[i][j] == bishopPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
      j--;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col + 1;
    while(i <= 7 && j <= 7){  // sağ alt çapraz
      if(matrix[i][j] == bishopPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
      j++;
    }

    return {row: -1, col: -1, isCheck: false};
  }

  CheckRook(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): Checker{
    const rookPoint: number = checkWhitePieces ? 5 : 12;
    var i: number = squareToCheck.row;
    var j: number = squareToCheck.col - 1;
    while(j >= 0){  // sol
      if(matrix[i][j] == rookPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      j--;
    }

    i = squareToCheck.row;
    j = squareToCheck.col + 1;
    while(j <= 7){  // sağ
      if(matrix[i][j] == rookPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      j++;
    }

    i = squareToCheck.row - 1;
    j = squareToCheck.col;
    while(i >= 0){  // üst
      if(matrix[i][j] == rookPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col;
    while(i <= 7){  // alt
      if(matrix[i][j] == rookPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
    }
    
    return {row: -1, col: -1, isCheck: false};
  }

  CheckQueen(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): Checker{
    // fil özelliği
    const queenPoint: number = checkWhitePieces ? 6 : 13;
    var i: number = 0;
    var j: number = 0;
    i = squareToCheck.row - 1;
    j = squareToCheck.col - 1;
    while(i >= 0 && j >= 0){  // sol üst çapraz
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
      j--;
    }

    i = squareToCheck.row - 1;
    j = squareToCheck.col + 1;
    while(i >= 0 && j <= 7){  // sağ üst çapraz
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
      j++;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col - 1;
    while(i <= 7 && j >= 0){  // sol alt çapraz
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
      j--;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col + 1;
    while(i <= 7 && j <= 7){  // sağ alt çapraz
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
      j++;
    }
    // kale özelliği
    i = squareToCheck.row;
    j= squareToCheck.col - 1;
    while(j >= 0){  // sol
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      j--;
    }

    i = squareToCheck.row;
    j = squareToCheck.col + 1;
    while(j <= 7){  // sağ
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      j++;
    }

    i = squareToCheck.row - 1;
    j = squareToCheck.col;
    while(i >= 0){  // üst
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i--;
    }

    i = squareToCheck.row + 1;
    j = squareToCheck.col;
    while(i <= 7){  // alt
      if(matrix[i][j] == queenPoint){
        return {row: i, col: j, isCheck: true};
      }
      else if(matrix[i][j] != 0){  // arayı kesen taş var
        break;
      }
      i++;
    }
    
    return {row: -1, col: -1, isCheck: false};
  }

  CheckKing(matrix: number[][], squareToCheck: Square, checkWhitePieces: boolean): boolean{
    const squares: Array<Square> = [
      {row: squareToCheck.row - 1, col: squareToCheck.col - 1},
      {row: squareToCheck.row - 1, col: squareToCheck.col},
      {row: squareToCheck.row - 1, col: squareToCheck.col + 1},
      {row: squareToCheck.row, col: squareToCheck.col - 1},
      {row: squareToCheck.row + 1, col: squareToCheck.col - 1},
      {row: squareToCheck.row + 1, col: squareToCheck.col},
      {row: squareToCheck.row + 1, col: squareToCheck.col + 1},
      {row: squareToCheck.row, col: squareToCheck.col + 1}
    ];

    if(checkWhitePieces){
      for(const square of squares){
        if(this.CheckSquare(square) && matrix[square.row][square.col] == 7){
          return false;
        }
      }
    }
    else{
      for(const square of squares){
        if(this.CheckSquare(square) && matrix[square.row][square.col] == 14){
          return false;
        }
      }
    }
    return true;
  }

/*
 Returns:
	0 -> Hareket ettirilebilir
	1 -> Soldan açmazda
	2 -> Sağdan açmazda
	3 -> Üstten açmazda
	4 -> Alttan açmazda
	5 -> Sağ alttan açmazda
	6 -> Sağ üstten açmazda
	7 -> Sol üstten açmazda
	8 -> Sol alttan açmazda
*/
  IsMovable(matrix: number[][], pieceToMove: Square, king: Square, isWhitePlaying: boolean) : number{
    var piece: Square = {row: pieceToMove.row, col: pieceToMove.col};  // referans ile asıl değeri değiştirmemek için kopya kullanıyoruz 
    const type: number = this.TraceToKing(matrix, piece, king);
    if(isWhitePlaying){
      switch (type){
        case 0:
          return 0;
        case 1:  // taş şahın solunda
          piece.col--;
          while(piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 12 || matrix[piece.row][piece.col] == 13){  // kale veya vezir var
                return 1;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.col--;
          }
          break;
        case 2:  // sağında
          piece.col++;
          while(piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 12 || matrix[piece.row][piece.col] == 13){  // kale veya vezir var
                return 2;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.col++;
          }
          break;
        case 3:  // üstünde
          piece.row--;
          while(piece.row >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 12 || matrix[piece.row][piece.col] == 13){  // kale veya vezir var
                return 3;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row--;
          }
          break;
        case 4:  // altında
          piece.row++;
          while(piece.row >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 12 || matrix[piece.row][piece.col] == 13){  // kale veya vezir var
                return 4;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row++;
          }
          break;
        case 5:  // sağ alt çaprazında
          piece.row++;
          piece.col++;
          while(piece.row <= 7 && piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 11 || matrix[piece.row][piece.col] == 13){  // fil veya vezir
                return 5;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row++;
            piece.col++;
          }
          break;
        case 6:  // sağ üst çaprazda
          piece.row--;
          piece.col++;
          while(piece.row >= 0 && piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 11 || matrix[piece.row][piece.col] == 13){  // fil veya vezir
                return 6;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row--;
            piece.col++;
          }
          break;
        case 7:  // sol üst çaprazda
          piece.row--;
          piece.col--;
          while(piece.row >= 0 && piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 11 || matrix[piece.row][piece.col] == 13){  // fil veya vezir
                return 7;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row--;
            piece.col--;
          }
          break;
        case 8:
          piece.row++;
          piece.col--;
          while(piece.row <= 7 && piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // siyah taş var
              if(matrix[piece.row][piece.col] == 11 || matrix[piece.row][piece.col] == 13){  // fil veya vezir
                return 8;
              }
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // kendi taşı var
              return 0;
            }
            piece.row++;
            piece.col--;
          }
          break;
      }
    }
    else{
      switch (type){
        case 0:
          return 0;
        case 1:  // taş şahın solunda
          piece.col--;
          while(piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 5 || matrix[piece.row][piece.col] == 6){  // kale veya vezir
                return 1;
              }
              return 0;
            }
            piece.col--;
          }
          break;
        case 2:  // sağında
          piece.col++;
          while(piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 5 || matrix[piece.row][piece.col] == 6){  // kale veya vezir
                return 2;
              }
              return 0;
            }
            piece.col++;
          }
          break;
        case 3:  // üstünde
          piece.row--;
          while(piece.row >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 5 || matrix[piece.row][piece.col] == 6){  // kale veya vezir
                return 3;
              }
              return 0;
            }
            piece.row--;
          }
          break;
        case 4:  // altında
          piece.row++;
          while(piece.row <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 5 || matrix[piece.row][piece.col] == 6){  // kale veya vezir
                return 4;
              }
              return 0;
            }
            piece.row++;
          }
          break;
        case 5:  // sağ alt çaprazında
          piece.row++;
          piece.col++;
          while(piece.row <= 7 && piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 4 || matrix[piece.row][piece.col] == 6){  // fil veya vezir
                return 5;
              }
              return 0;
            }
            piece.row++;
            piece.col++;
          }
          break;
        case 6:  // sağ üst çaprazda
          piece.row--;
          piece.col++;
          while(piece.row >= 0 && piece.col <= 7){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 4 || matrix[piece.row][piece.col] == 6){  // fil veya vezir
                return 6
              }
              return 0;
            }
            piece.row--;
            piece.col++;
          }
          break;
        case 7:  // sol üst çaprazda
          piece.row--;
          piece.col--;
          while(piece.row >= 0 && piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 4 || matrix[piece.row][piece.col] == 6){  // fil veya vezir
                return 7;
              }
              return 0;
            }
            piece.row--;
            piece.col--;
          }
          break;
        case 8:
          piece.row++;
          piece.col--;
          while(piece.row <= 7 && piece.col >= 0){
            if(matrix[piece.row][piece.col] >= 8){  // kendi taşı var
              return 0;
            }
            else if(matrix[piece.row][piece.col] != 0 && matrix[piece.row][piece.col] <= 7){  // beyaz taş var
              if(matrix[piece.row][piece.col] == 4 || matrix[piece.row][piece.col] == 6){  // fil veya vezir
                return 8;
              }
              return 0;
            }
            piece.row++;
            piece.col--;
          }
          break;
      }
    }
    return 0;
  }
  
/*
 Returns:
	0 -> Şahtan aranan taşa yol yok
	1 -> Taş şahın solunda
	2 -> Taş şahın sağında
	3 -> Taş şahın üstünde
	4 -> Taş şahın altında
	5 -> Taş şahın sağ alt çaprazında
	6 -> Taş şahın sağ üst çaprazında
	7 -> Taş şahın sol üst çaprazında
	8 -> Taş şahın sol alt çaprazında
*/
  TraceToKing(matrix: number[][], pieceToTrack: Square, king: Square) : number{
    var piece: Square = {row: pieceToTrack.row, col: pieceToTrack.col};  // referans ile asıl değeri değiştirmemek için kopya kullanıyoruz
    const rowDiff: number = piece.row - king.row;
    const colDiff: number = piece.col - king.col;
    const isDiffEqual: boolean = rowDiff == colDiff || rowDiff == -colDiff;  // mutlak olarak eşit olmalı
    if(piece.row == king.row && piece.col < king.col){  // şahın solunda
      piece.col++;
      while(piece.col <= king.col){
        if(piece.col == king.col){
          return 1;
        }
        else if(matrix[piece.row][piece.col] != 0){
          return 0;
        }
        piece.col++;
      }
    }
    else if(piece.row == king.row && piece.col > king.col){  // şahın sağında
      piece.col--;
      while(piece.col >= king.col){
        if(piece.col == king.col){
          return 2;
        }
        else if(matrix[piece.row][piece.col] != 0){
          return 0;
        }
        piece.col--;
      }
    }
    else if(piece.row < king.row && piece.col == king.col){  // şahın üstünde
      piece.row++;
      while(piece.row <= king.row){
        if(piece.row == king.row){
          return 3;
        }
        else if(matrix[piece.row][piece.col] != 0){
          return 0;
        }
        piece.row++;
      }
    }
    else if(piece.row > king.row && piece.col == king.col){  // şahın altında
      piece.row--;
      while(piece.row >= king.row){
        if(piece.row == king.row){
          return 4;
        }
        else if(matrix[piece.row][piece.col] != 0){
          return 0;
        }
        piece.row--;
      }
    }
    else if(isDiffEqual){  // şahın çaprazında
      if(rowDiff > 0 && colDiff > 0){  // sağ alt çaprazda
        piece.row--;
        piece.col--;
        while(piece.row >= king.row){
          if(piece.row == king.row){
            return 5;
          }
          else if(matrix[piece.row][piece.col] != 0){
            return 0;
          }
          piece.row--;
          piece.col--;
        }
      }
      else if(rowDiff < 0 && colDiff > 0){  // sağ üst çaprazda
        piece.row++;
        piece.col--;
        while(piece.row <= king.row){
          if(piece.row == king.row){
            return 6;
          }
          else if(matrix[piece.row][piece.col] != 0){
            return 0;
          }
          piece.row++;
          piece.col--;
        }
      }
      else if(rowDiff < 0 && colDiff < 0){  // sol üst çaprazda
        piece.row++;
        piece.col++;
        while(piece.row <= king.row){
          if(piece.row == king.row){
            return 7;
          }
          else if(matrix[piece.row][piece.col] != 0){
            return 0;
          }
          piece.row++;
          piece.col++;
        }
      }
      else if(rowDiff > 0 && colDiff < 0){  // sol alt çaprazda
        piece.row--;
        piece.col++;
        while(piece.row >= king.row){
          if(piece.row == king.row){
            return 8;
          }
          else if(matrix[piece.row][piece.col] != 0){
            return 0;
          }
          piece.row--;
          piece.col++;
        }
      }
    }
    return 0;
  }

  private CheckSquare(square: Square): boolean{
    return square.row >= 0 && square.col >= 0 && square.row <= 7 && square.col <= 7;
  }
}
