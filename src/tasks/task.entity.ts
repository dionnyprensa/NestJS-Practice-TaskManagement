import { Exclude } from "class-transformer";
import { User } from "../auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TASK_STATUS } from "./task-status.enum";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TASK_STATUS;

  @ManyToOne(
    (_type) => User
    , (user) => user.tasks
    , { eager: false }
  )
  @Exclude({
    toPlainOnly: true
  })
  user: User;

}