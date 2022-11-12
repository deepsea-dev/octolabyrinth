import { Maze } from "./Maze"

export type GameStatus = {
  maze: Maze,
  playerNames: string[],
  started: boolean
}