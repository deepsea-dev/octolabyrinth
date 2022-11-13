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
    const game = this.games[id];
    if (game === undefined) {
      throw Error('Game id does not exist');
    }
    return game;
  }

  processTeams(id: string) {
    this.games[id].processTeams();
  }

  doesGameExist(id: string) {
    try {
      return this.getGame(id) !== undefined;
    } catch (error) {
      return false;
    }
  }

  addPlayer(id: string, nickname: string) {
    if (!this.doesGameExist(id)) {
      throw Error('The game you are trying to add a player to does not exist');
    }

    // Return player id after adding them to the game
    return this.games[id].addPlayer(id, nickname);
  }

  startGame(id: string) {
    this.games[id].start();
  }

  getPlayersMoves(gameId: string, playerId: string): string[] {
    return this.games[gameId].players.get(playerId)?.moves || [];
  }

  getPlayersTeam(gameId: string, playerId: string): string {
    const teamcolours = ['red', 'blue', 'green', 'purple'];

    return teamcolours[parseInt(this.games[gameId].players.get(playerId)?.teamId || '0')];
  }

  tryMove(gameId: string, playerId: string, move: string) {
    if (!this.games[gameId].players.has(playerId)) return;

    this.games[gameId].tryMove(gameId, playerId, move);
  }
}

export default GameManager;