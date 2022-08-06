import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";


export class TasksRepository extends Repository<Task> {
  // constructor(
  //   @InjectRepository(Task)
  //   private readonly tasksRepository: Repository<Task>
  // ) {
  //   super(Task, );
  // }
}