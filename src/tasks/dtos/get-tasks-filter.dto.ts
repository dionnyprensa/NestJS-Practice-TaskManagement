import { IsOptional, IsEnum, IsString } from "class-validator";
import { TASK_STATUS } from "../task-status.enum";

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TASK_STATUS)
  status?: TASK_STATUS;

  @IsOptional()
  @IsString()
  search?: string;
}