import { randomBytes } from 'crypto';
import { GameStatus } from './models/GameStatus';
import Player from './Player';
import { Maze } from './models/Maze';
import { generateMazeGrid } from './MazeGenerator';

class Game {
  id: string;
  players: Record<string, Player>;
  isStarted: boolean;
  maze: Maze;
  constructor(id: string) {
    this.id = id;
    this.players = {};
    this.isStarted = false;
    this.maze = {grid: generateMazeGrid(35)};
  }

  addPlayer(id: string, nickname: string) {
    let playerID;
    do {
      playerID = randomBytes(2).toString('hex');
    } while (this.players[playerID] !== undefined);

    this.players[playerID] = new Player(playerID, nickname);
    return playerID;
  }

  getStatus(): GameStatus {
    return {
      maze: this.maze,
      playerNames: Object.values(this.players).map(p => p.getNickname()),
      started: this.isStarted,
    };
  }
}

export default Game;