import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { join } from "path";
import { TaskEntity } from "models/entities/TaskEntity";
import { UserEntity } from "models/entities/UserEntity";
require("dotenv").config();
export const ormConfig: PostgresConnectionOptions = {
  type: "postgres",
  // host: process.env.DB_HOST,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // port: Number(process.env.DB_PORT),
  // database: process.env.DB_DATABASE_NAME,
  url: process.env.DB_URL,
  entities: [TaskEntity, UserEntity],
  logging: false,
  synchronize: true,
};
