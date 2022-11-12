import { randomBytes } from 'crypto';
import Player from './Player';

class Game {
  id: string;
  players: Record<string, Player>;
  player_directions_finished: boolean;
  constructor(id: string) {
    this.id = id;
    this.players = {};
    this.player_directions_finished = false;
  }

  addPlayer(id: string, nickname: string) {
    let playerID;
    do {
      playerID = randomBytes(2).toString('hex');
    } while (this.players[playerID] !== undefined);

    this.players[playerID] = new Player(playerID, nickname);
    return playerID;
  }

  processPlayerDirections() {
    return; //todo
  }
}

export default Game;