import { Square } from "./square-model";

export interface Board {
    matrix: number[][],
    isChecked: boolean,
    isMate: boolean,
    isWhiteKingMoved: boolean,
    isBlackKingMoved: boolean,
    isWhiteShortRookMoved: boolean,
    isWhiteLongRookMoved: boolean,
    isBlackShortRookMoved: boolean,
    isBlackLongRookMoved: boolean,
    whiteKing: Square,
    blackKing: Square,
    whiteCheckerOne: Square,
    whiteCheckerTwo: Square,
    blackCheckerOne: Square,
    blackCheckerTwo: Square,
    whitePushed2Pawn: Square,
    blackPushed2Pawn: Square,
    whitesPoints: number,
    blacksPoints: number,
}