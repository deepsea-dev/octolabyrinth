import { Maze } from "./Maze"

export type HostPollGameResponse = {
  maze: Maze,
  playerNames: string[],
  started: boolean,
  distances: (string|number)[][],
  timeUntilNextElimination: number,
  finished: boolean,
  winner: string,
  winningPlayers: string[]
}