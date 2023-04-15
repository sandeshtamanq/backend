import { DataSource } from "typeorm";
import { ormConfig } from "./ormconfig";
import "reflect-metadata";

export const AppDataSource = new DataSource(ormConfig);
export const dbConnection = async (): Promise<DataSource> => {
  return AppDataSource.initialize();
};
