import { randomBytes } from 'crypto';
import { GameStatus } from './models/GameStatus';
import Player from './Player';
import { Maze } from './models/Maze';
import { generateMaze } from './MazeGenerator';

const MAX_PLAYERS_PER_TEAM = 4;

class Game {
  id: string;
  players: Map<string, Player>;
  player_directions_finished: boolean;
  teams: Map<string, string[]>[];
  isStarted: boolean;
  maze: Maze;
  constructor(id: string) {
    this.id = id;
    this.players = new Map();
    this.player_directions_finished = false;
    this.isStarted = false;
    this.teams = [];
    this.maze = generateMaze(4, 25);
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
        if (teams[numTeams - 1].size === 4) break;
        playerI++;
        if (playerI == playerIds.length) break;

      }
      if (teams[numTeams - 1].size === 4) break;

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

    for (let [teamIndex, team] of teams.entries()) {
      for (const player of team) {
        const playerId = player[0];
        const moves = player[1];
        const playerData = this.players.get(playerId)!;
        playerData.moves = moves;
        playerData.teamId = teamIndex + '';
        console.log(playerData);
        this.players.set(playerId, playerData);
      }
    }

    this.maze.avatars = this.maze.avatars.slice(0, numTeams);
  }
  getStatus(): GameStatus {
    return {
      maze: this.maze,
      playerNames: [...this.players.values()].map(p => p.getNickname()),
      started: this.isStarted,
    };
  }

  tryMove(gameId: string, playerId: string, move: string) {
    const player = this.players.get(playerId);
    if (player === undefined) return;

    // Check if they are allowed to make a move
    if ((Date.now() - player.timeOfLastMove) <= 300) return;

    // Now make the move.
    const team = player.teamId;
    console.log(`team ${team}, avatars ${JSON.stringify(this.maze.avatars)}`)
    let x = this.maze.avatars.find(a => a.id == team)?.x!;
    let y = this.maze.avatars.find(a => a.id == team)?.y!;

    console.log(`x: ${x}, y: ${y},`);

    if (move == "U") {
      if (this.maze.grid[y-1][x] != 1) {
        y -= 1;
      }
    } else if (move == "L") {
      if (this.maze.grid[y][x-1] != 1) {
        x -= 1;
      }
    } else if (move == "D") {
      if (this.maze.grid[y+1][x] != 1) {
        y += 1;
      }
    } else if (move == "R") {
      if (this.maze.grid[y][x+1] != 1) {
        x += 1;
      }
    } 

    const avatar = this.maze.avatars.find(a => a.id == team)!;
    avatar.x = x;
    avatar.y = y;
    const index = this.maze.avatars.findIndex(a => a.id == team);
    this.maze.avatars[index] = avatar;

    // If valid
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.players.get(playerId)!.timeOfLastMove = Date.now();
  }
}

export default Game;