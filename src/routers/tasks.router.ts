import { Router } from 'express';
import { TaskController } from '../controller/tasks.controller.js';
import { TaskFileRepo } from '../repository/tasks.file.repo.js';

// eslint-disable-next-line new-cap
export const tasksRouter = Router();
const repo = new TaskFileRepo();
const controller = new TaskController(repo);

tasksRouter.get('/', controller.getAll.bind(controller));
tasksRouter.get('/:id', controller.get.bind(controller));
tasksRouter.post('/', controller.post.bind(controller));
tasksRouter.delete('/:id', controller.delete.bind(controller));
tasksRouter.patch('/:id', controller.patch.bind(controller));
