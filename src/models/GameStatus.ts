import { Maze } from "./Maze"

export type GameStatus = {
  maze: Maze,
  playerNames: string[],
  started: boolean,
  distances: (string | number)[][],
  timeUntilNextElimination: number,
  finished: boolean,
  winner: string,
  winningPlayers: string[]
}