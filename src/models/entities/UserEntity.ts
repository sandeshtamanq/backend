import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TaskEntity } from "./TaskEntity";
import { userRoles } from "../interface/userRoles";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: userRoles.USER })
  role: userRoles;

  @OneToMany((type) => TaskEntity, (task) => task.user)
  task: TaskEntity[];
}
