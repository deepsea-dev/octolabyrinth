import express from 'express';
import request from 'supertest';
import { init } from '../../../src/controllers/rootController/rootController';

describe('Root controller', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
  });

  it('returns useragent when /api queried', async () => {
    init(app);
    const response = await request(app).get('/api').set('User-Agent', 'tester');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({message: 'Hello: tester'});
  });
});

export default {};