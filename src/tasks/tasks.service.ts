import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from "uuid"
import { CreateTaskDTO } from './create-task.dto';
import { GetTasksFilterDTO } from './get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getWithFilters(tasksFilterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = tasksFilterDTO
    let _task = [...this.tasks];

    if (status) {
      _task = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      _task = this.tasks.filter((task) => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search))
    }

    return _task
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
