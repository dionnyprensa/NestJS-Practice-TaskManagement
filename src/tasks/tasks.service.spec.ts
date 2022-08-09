import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TASK_STATUS } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksService = () => ({
  getTasks: jest.fn(),
  getByID: jest.fn()
});

const mockUser = {
  id: '1',
  username: 'Diio',
  password: 'password',
  tasks: []
}


describe('TasksService', () => {
  let tasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{
        provide: TasksService, useFactory: mockTasksService
      }],
    }).compile();

    tasksService = module.get(TasksService);
  });

  describe('getTasks', () => {
    it('Calls tasksService.getTasks and returns the result.', async () => {
      tasksService.getTasks.mockResolvedValue([]);

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual([]);
    });
  });

  describe('getByID', () => {
    const taskID = '1';

    it('calls TaskService.getByID and handles and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'Test id',
        status: TASK_STATUS.OPEN
      };

      tasksService.getByID.mockResolvedValue(mockTask);

      const result = await tasksService.getByID(taskID, mockUser);

      expect(result).toEqual(mockTask)

    });

    // it('calls TaskService.getByID and handles and error', () => {
    //   tasksService.getByID.mockRejectedValue(null);

    //   expect(tasksService.getByID(taskID, mockUser))
    //     .rejects
    //     .toThrowError(NotFoundException);
    // });
  });

});