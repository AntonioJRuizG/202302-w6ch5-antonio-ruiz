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
      const infoId = data.find((item) => item.id === Number(id));
      res.json(infoId);
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
    const incomingTask = req.body;
    const updatedTask = Object.assign(currentTask, incomingTask);
    await this.repo.update(updatedTask);
    res.send('Task updated');
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleteTask: any = await this.repo.readById(id);
    await this.repo.delete(deleteTask);
    res.send('Task removed');
  }
}
