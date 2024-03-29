import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { TASK_STATUS } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

import { CreateTaskDTO } from './dtos/create-task.dto';
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dtos/update-task-status';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(
    private readonly tasksServices: TasksService
  ) {
  }

  @Get()
  async getTasks(@Query() tasksFilterDTO: GetTasksFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(tasksFilterDTO)}`
    );
    return await this.tasksServices.getTasks(tasksFilterDTO, user)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksServices.getByID(id, user)
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    return await this.tasksServices.deleteByID(id, user)
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksServices.create(createTaskDTO, user)
  }

  @Patch('/:id/status')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.tasksServices.updateByID(id, updateTaskStatusDTO, user)
  }
}
