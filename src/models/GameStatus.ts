import { Maze } from "./Maze"

export type GameStatus = {
  maze: Maze,
  playerNames: string[],
  started: boolean,
  distances: (string | number)[][],
  timeUntilNextElimination: number
}