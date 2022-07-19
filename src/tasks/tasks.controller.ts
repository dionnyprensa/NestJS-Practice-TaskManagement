import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDTO } from './create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksServices: TasksService) {
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksServices.getAll()
  }

  @Get("/:id")
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getByID(id)
  }

  @Delete("/:id")
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksServices.deleteByID(id)
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ): Task {
    return this.tasksServices.create(createTaskDTO)
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ): Task {
    return this.tasksServices.updateByID(id, status)
  }
}
