import { Request, Response } from 'express';
import { TaskFileRepo } from '../repository/tasks.file.repo.js';

export class TaskController {
  constructor(public repo: TaskFileRepo) {
    this.repo = repo;
  }

  getAll(_req: Request, res: Response) {
    this.repo.read().then((data) => {
      res.json(data);
    });
  }

  get(req: Request, res: Response) {
    this.repo.read().then((data) => {
      const { id } = req.params;
      const getTask = data.find((item) => item.id === Number(id));
      // eslint-disable-next-line no-unused-expressions
      getTask === undefined
        ? res.status(400).send(`<h1>Task id ${id} does not exist</h1>`)
        : res.json(getTask);
    });
  }

  async post(req: Request, res: Response) {
    await this.repo.write(req.body).then(() => {
      res.send('New task added!');
    });
  }

  async patch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const currentTask: any = await this.repo.readById(id);
    console.log(currentTask);

    if (currentTask === undefined) {
      res.status(400).send(`<h1>Task id ${id} does not exist</h1>`);
    }

    if (currentTask !== undefined) {
      const incomingTask = req.body;
      const updatedTask = Object.assign(currentTask, incomingTask);
      await this.repo.update(updatedTask);
      res.send('Task updated');
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleteTask: any = await this.repo.readById(id);
    if (deleteTask === undefined) {
      res.status(400).send(`<h1>Task id ${id} does not exist</h1>`);
    }

    if (deleteTask !== undefined) {
      await this.repo.delete(deleteTask);
      res.send(`Task with id ${id} removed`);
    }
  }
}
