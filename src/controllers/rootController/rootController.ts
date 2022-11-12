// Typical controller, I assume we'll have a couple of these one probably will handle just
// api/jobs which returns the status of jobs and allows new jobs to be submitted for example called JobController
// and another maybe for api/download which maybe is called DownloadController and allows the user to download the processed video

import express from 'express';
import { CreateGameResponse } from '../../models/CreateGameResponse';
import { HelloMessageResponse } from '../../models/helloMessageResponse';
import GameManager from '../../GameManager';
import { GameJoinResponse } from '../../models/GameJoinResponse';
import { GameStatus } from '../../models/GameStatus';

const game_manager = new GameManager();

export const init = (app: express.Application): void => {
  app.get('/api', async (req, res: express.Response<HelloMessageResponse>) => {
    res.status(200).json({ message: `Hello: ${req.headers['user-agent']}` });
  });
  app.get('/api/create_game', async (req, res: express.Response<CreateGameResponse>) => {
    const id = game_manager.addGame();
    res.status(200).json({ 'id': id });
  });
  app.get('/api/get_game', async (req, res) => {
    return;
  });
  app.get('/api/:id/start', async (req, res) => {
    if (!game_manager.doesGameExist(req.params.id)) {
      return res.sendStatus(400);
    }

    game_manager.processTeams(req.params.id);
    game_manager.startGame(req.params.id);
  });
  app.get('/api/:id/status', async (req, res: express.Response<GameStatus>) => {
    const gameId = req.params.id;
    if (!game_manager.doesGameExist(gameId)) return res.sendStatus(400);

    return res.status(200).json(game_manager.getGame(gameId).getStatus())
  });
  app.post('/api/:id/join', async (req, res: express.Response<GameJoinResponse>) => {
    if (!req.body.nickname) return res.sendStatus(400);
    try {
      const player_id = game_manager.addPlayer(req.params.id, req.body.nickname);
      return res.status(200).json({ player_id });
    } catch {
      return res.sendStatus(400);
    }
  });
  // app.get('/api/:id/get_player_directions', async (req, res) => {
  //   if (!game_manager.doesGameExist(req.params.id)) {
  //     return res.sendStatus(400);
  //   }
  //   const game = game_manager.getGame(req.params.id);
  //   if (!game.player_directions_finished) {
  //     return res.sendStatus(202); // Not finished processing directions for players
  //   }
  // });
  app.get('/api/:gameId/:playerId', async (req, res) => {
    if (!game_manager.doesGameExist(req.params.gameId)) {
      return res.sendStatus(400);
    }

    return res.status(200).json({moves: game_manager.getPlayersMoves(req.params.gameId, req.params.playerId)});
  });
  app.post('/api/:gameId/:playerId/move', async (req, res) => {
    if (!game_manager.doesGameExist(req.params.gameId)) {
      return res.sendStatus(400);
    }
    game_manager.tryMove(req.params.gameId, req.params.playerId, req.body.move);
    return res.sendStatus(200);
  });
  app.get('/api/test', async (res, req) => {
    const game_id = game_manager.addGame();
    for (let i = 0; i < 50; i++) {
      game_manager.addPlayer(game_id, 'nweondownewfo');
    }
    game_manager.processTeams(game_id);
    // console.log(game_manager.games[game_id].teams);

  });
};
