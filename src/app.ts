import 'dotenv/config'
import express from 'express';
import Routes from './route/routes';
import router from './route/routes';
import dbConnect from './config/database';
import logger from 'morgan';
import Auth from './middleware/auth';

const { PORT, HOST } = process.env;

const app = express();

app.use(Auth)
app.use(logger('combined'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(+PORT, HOST, () => {
  dbConnect();
  Routes(app);
})