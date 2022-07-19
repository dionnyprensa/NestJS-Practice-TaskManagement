import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dtos/update-task-status';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksServices: TasksService) {
  }

  @Get()
  getTasks(@Query() tasksFilterDTO: GetTasksFilterDTO): Task[] {
    if (Object.keys(tasksFilterDTO).length) {

      return this.tasksServices.getWithFilters(tasksFilterDTO)
    } else {

      return this.tasksServices.getAll()
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getByID(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksServices.deleteByID(id)
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ): Task {
    return this.tasksServices.create(createTaskDTO)
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO
  ): Task {
    return this.tasksServices.updateByID(id, updateTaskStatusDTO)
  }
}
