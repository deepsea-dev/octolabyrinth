import { Maze } from "./Maze"

export type HostPollGameResponse = {
  maze: Maze,
  playerNames: string[],
  started: boolean,
  distances: (string|number)[][],
  timeUntilNextElimination: number,
}