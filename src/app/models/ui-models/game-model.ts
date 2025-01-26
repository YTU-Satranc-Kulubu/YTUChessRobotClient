import { Board } from "../common-models/board-model";

export interface Game {
    board: Board,
    whiteMoves: Array<String>,
    blackMoves: Array<String>
}