import fs from 'fs/promises';
import { TaskStructure } from '../models/tasks';
const file = 'data/data.json';

export class TaskFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as TaskStructure[]);
  }

  async readById(id: TaskStructure['id']) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const infoParsed: TaskStructure[] = JSON.parse(info);
    return infoParsed.find((item) => item.id === id);
  }

  async write(newData: TaskStructure) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: TaskStructure[] = JSON.parse(info);
    const nextIdNumber: number = parsedData.length;
    newData.id = nextIdNumber;
    const appendData = JSON.stringify([...parsedData, newData]);
    await fs.writeFile(file, appendData, { encoding: 'utf-8' });
  }

  async update(newData: TaskStructure['id']) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: TaskStructure[] = JSON.parse(info);
    const nextIdNumber: number = parsedData.length;
    newData.id = nextIdNumber;
    const appendData = JSON.stringify([...parsedData, newData]);
    await fs.writeFile(file, appendData, { encoding: 'utf-8' });
  }
}
