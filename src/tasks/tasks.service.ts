import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskStatusDTO } from './dtos/update-task-status';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) { }

  async getTasks(tasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = tasksFilterDTO
    const query = this.tasksRepository.createQueryBuilder('task')


    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)'
        , { search: `%${search}%` }
      )
    }

    return await query.getMany();
  }

  async getByID(id: string): Promise<Task> {
    const _task: Task = await this.tasksRepository.findOneBy({
      id,
    });

    if (!_task) throw new NotFoundException(`Task with the ID ${id} not found`);

    return _task;
  }

  async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDTO;


    const _task: Task = await this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });

    return await this.tasksRepository.save(_task);
  }

  async deleteByID(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException(`Task with the ID ${id} not found`);
  }

  async updateByID(id: string, updateTaskStatusDTO: UpdateTaskStatusDTO): Promise<Task> {

    const _task = await this.getByID(id);

    _task.status = updateTaskStatusDTO.status;

    return await this.tasksRepository.save(_task);
  }
}
