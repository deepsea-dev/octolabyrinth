import express from 'express';
import cors from 'cors';
import { init as rootControllerInit } from './controllers/rootController/rootController';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8088;

rootControllerInit(app);

console.log(process.env);
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');
  app.use(express.static('site'));

  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: 'site'});
  });
}

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});