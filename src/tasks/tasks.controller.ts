import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksServices: TasksService) {
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksServices.getAll()
  }

  @Post()
  createTask(@Body('title') title, @Body('description') description): Task {
    return this.tasksServices.createTask(title, description)
  }
}
