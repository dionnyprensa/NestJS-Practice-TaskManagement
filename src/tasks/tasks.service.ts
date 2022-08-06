import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TASK_STATUS } from './task-status.enum';
import { Task } from './task.entity';

import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskStatusDTO } from './dtos/update-task-status';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger();

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) { }

  async getTasks(tasksFilterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = tasksFilterDTO
    const query = this.tasksRepository.createQueryBuilder('task')

    query.andWhere({ user });

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))'
        , { search: `%${search}%` }
      )
    }

    try {
      const tasks = await query.getMany();

      return tasks
    } catch (error) {
      this.logger.error(`Failed to get tasks for user ${user.username
        }. Filters: ${JSON.stringify(tasksFilterDTO)}`, error.stack
      )
      throw new InternalServerErrorException()
    }
  }

  async getByID(id: string, user: User): Promise<Task> {
    // const _task: Task = await this.tasksRepository.findOneBy({
    //   id,
    // });
    const _task: Task = await this.tasksRepository.findOne({
      where: {
        id, user
      }
    });

    if (!_task) throw new NotFoundException(`Task with the ID ${id} not found`);

    return _task;
  }

  async create(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDTO;


    const _task: Task = await this.tasksRepository.create({
      title,
      description,
      status: TASK_STATUS.OPEN,
      user
    });

    return await this.tasksRepository.save(_task);
  }

  async deleteByID(id: string, user: User): Promise<void> {
    // const _task = await this.getByID(id, user);

    // if (!_task) throw new NotFoundException(`Task with the ID ${id} not found`);

    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) throw new NotFoundException(`Task with the ID ${id} not found`);
  }

  async updateByID(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO, user: User): Promise<Task> {

    const _task = await this.getByID(id, user);

    _task.status = updateTaskStatusDTO.status;

    return await this.tasksRepository.save(_task);
  }
}
