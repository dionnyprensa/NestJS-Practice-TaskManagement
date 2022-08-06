import { IsEnum } from "class-validator";
import { TASK_STATUS } from "../task-status.enum";

export class UpdateTaskStatusDTO {
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;
}