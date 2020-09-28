import {Body, Controller, Get, Post, Patch, Delete} from "@nestjs/common";
import {ITask} from "./task.model";
import {TasksService} from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body("title") title: string,
    @Body("description") description: string
  ): ITask {
    const newTask: ITask = this.tasksService.createTask(title, description);

    return newTask;
  }
}
