import { randomBytes } from 'crypto';
import Player from './Player';

class Game {
  id: string;
  players: Record<string, Player>;
  constructor(id: string) {
    this.id = id;
    this.players = {};
  }

  addPlayer(id: string, nickname: string) {
    let playerID;
    do {
      playerID = randomBytes(2).toString('hex');
    } while (this.players[playerID] !== undefined);

    this.players[playerID] = new Player(playerID, nickname);
    return playerID;
  }
}

export default Game;