// Typical controller, I assume we'll have a couple of these one probably will handle just
// api/jobs which returns the status of jobs and allows new jobs to be submitted for example called JobController
// and another maybe for api/download which maybe is called DownloadController and allows the user to download the processed video

import express from 'express';
import { HelloMessageResponse } from '../../models/helloMessageResponse';

export const init = (app: express.Application): void => {
  app.get('/api', async (req, res: express.Response<HelloMessageResponse>) => {
    res.status(200).json({message: `Hello: ${req.headers['user-agent']}`});
  });
};
