import { randomBytes } from 'crypto';
import { GameStatus } from './models/GameStatus';
import Player from './Player';

class Game {
  id: string;
  players: Record<string, Player>;
  isStarted: boolean;
  constructor(id: string) {
    this.id = id;
    this.players = {};
    this.isStarted = false;
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
      maze: {grid: [[1,0],[0,1]]},
      playerNames: Object.values(this.players).map(p => p.getNickname()),
      started: this.isStarted,
    };
  }
}

export default Game;