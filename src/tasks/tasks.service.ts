import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from "uuid"
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dtos/update-task-status';

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
    const _task: Task = this.tasks.find(task => task.id === id);

    if (!_task) throw new NotFoundException(`Task with the ID ${id} not found`);

    return _task;
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
    const taskID = this.tasks.findIndex((task) => task.id === id);

    if (taskID < 0) throw new NotFoundException(`Task with the ID ${id} not found`);

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateByID(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO): Task {
    const taskID = this.tasks.findIndex((task) => task.id === id);

    if (taskID < 0) throw new NotFoundException(`Task with the ID ${id} not found`);

    this.tasks[taskID].status = updateTaskStatusDTO.status;

    return this.tasks[taskID];
  }
}
