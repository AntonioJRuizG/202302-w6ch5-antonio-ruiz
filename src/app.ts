import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { tasksRouter } from './routers/tasks.router.js';
export const app = express();

app.disable('x-powered-by');
app.use(morgan('dev'));
const corsoption = { origin: 'http://localhost:4500/tasks' };
app.use(cors(corsoption));
app.use(express.json());

app.use('/tasks', tasksRouter);
