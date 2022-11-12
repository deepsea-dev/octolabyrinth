import { randomBytes } from 'crypto';
import Game from './Game';

class GameManager {
  games: Record<string, Game> = {};
  constructor() {
    this.games = {};
  }

  addGame() {
    const id = randomBytes(2).toString('hex');
    this.games[id] = new Game(id);
    return id;
  }

  getGame(id: string) {
    return;
  }
}

export default GameManager;