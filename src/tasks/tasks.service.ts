import {Injectable} from "@nestjs/common";
import {ITask, TaskStatusEnum} from "./task.model";
// import * as uuid from "uuid/v1";
import {v1 as uuid} from "uuid";

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(title: string, description: string): ITask {
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatusEnum.OPEN
    };

    this.tasks.push(task);

    return task;
  }
}
