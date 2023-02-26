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

  post(req: Request, res: Response) {
    this.repo.write(req.body).then(() => {
      res.send('<h2>Your are great<h2>');
    });
  }

  patch(req: Request, res: Response) {
    res.send('Things ' + req.params.id);
  }

  delete(req: Request, res: Response) {
    res.send('Things' + req.params.id);
  }
}
