// Typical controller, I assume we'll have a couple of these one probably will handle just
// api/jobs which returns the status of jobs and allows new jobs to be submitted for example called JobController
// and another maybe for api/download which maybe is called DownloadController and allows the user to download the processed video

import express from 'express';
import { CreateGameResponse } from '../../models/CreateGameResponse';
import { HelloMessageResponse } from '../../models/helloMessageResponse';
import GameManager from '../../GameManager';
import { GameJoinResponse } from '../../models/GameJoinResponse';

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
  app.post('/api/:id/join', async (req, res: express.Response<GameJoinResponse>) => {
    if (!req.body.nickname) return res.sendStatus(400);
    try {
      const player_id = game_manager.addPlayer(req.params.id, req.body.nickname);
      return res.status(200).json({ player_id });
    } catch {
      return res.sendStatus(400);
    }
  });
};
