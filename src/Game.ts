import { randomBytes } from 'crypto';
import Player from './Player';

const MAX_PLAYERS_PER_TEAM = 4;

class Game {
  id: string;
  players: Map<string, Player>;
  player_directions_finished: boolean;
  teams: Array<unknown>;
  constructor(id: string) {
    this.id = id;
    this.players = new Map();
    this.teams = [];
    this.player_directions_finished = false;
  }

  addPlayer(id: string, nickname: string) {
    let playerID;
    do {
      playerID = randomBytes(2).toString('hex');
    } while (this.players.get(playerID) !== undefined);

    this.players.set(playerID, new Player(playerID, nickname));
    return playerID;
  }

  processPlayerDirections() {
    return; //todo
  }

  processTeams() {
    const numTeams = Math.min(Math.max(Math.ceil(this.players.size / MAX_PLAYERS_PER_TEAM), 2), 4); // 4 teams maximum
    // const numPlayersPerTeam = Math.min(Math.ceil(this.players.size / numTeams), 4); // 4 directions


    // create teams here please
    const teams = Array(numTeams).fill(0).map(() => new Map<string, string[]>());
    console.log(this.players);
    // Teams[team_id]Player_id] = Array of directions the player owns in that team
    const playerIds = [...this.players.keys()];
    console.log(playerIds);
    let playerI = 0;
    while (playerI < playerIds.length) {
      for (let teamIndex = 0; teamIndex < numTeams; teamIndex++) {
        const player_id = playerIds[playerI];
        teams[teamIndex].set(player_id, []);
        if (teams[numTeams-1].size === 4) break;
        playerI++;

      }
      if (teams[numTeams-1].size === 4) break;

    }

    console.log(teams);
    console.log('--------------------------');
    for (let teamIndex = 0; teamIndex < numTeams; teamIndex++) {
      const directions = ['U', 'D', 'L', 'R'];
      let dI = 0;
      console.log(teamIndex);
      while (dI < directions.length) {
        for (const player of teams[teamIndex]) {
          if (dI == directions.length) break;
          player[1].push(directions[dI]);
          dI++;
          console.log(dI);
        }
      }
    }
    console.log(teams);

    this.teams = teams;

  }
}

export default Game;