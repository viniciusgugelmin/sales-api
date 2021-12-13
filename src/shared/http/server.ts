import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(8000, () => {
  console.log('Listening on http://localhost:8000');
});
