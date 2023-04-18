import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { taskStatus } from "../interface/taskStatus";

@Entity({ name: "tasks" })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  description: string;

  @Column({ default: taskStatus.OPEN })
  status: taskStatus;

  @Column({ select: false })
  userId: number;

  @ManyToOne((type) => UserEntity, (user) => user.task)
  user: UserEntity;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
