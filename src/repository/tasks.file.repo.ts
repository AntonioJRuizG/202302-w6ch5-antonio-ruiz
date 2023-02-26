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

  async update(newData: TaskStructure) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: TaskStructure[] = JSON.parse(info);
    const updatedData = parsedData.map((item) =>
      item.id === newData.id ? newData : item
    );
    const finalData = JSON.stringify(updatedData);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async delete(newData: TaskStructure) {
    const info = await fs.readFile(file, { encoding: 'utf-8' });
    const parsedData: TaskStructure[] = JSON.parse(info);
    const deleteData = parsedData.splice(newData.id);
    const finalData = JSON.stringify(deleteData);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }
}
