import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from "uuid"
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getByID(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  create(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);

    return task
  }

  deleteByID(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateByID(id: string, status: TaskStatus): Task {
    const taskID = this.tasks.findIndex((task) => task.id === id);

    this.tasks[taskID].status = status;

    return this.tasks[taskID];
  }
}
