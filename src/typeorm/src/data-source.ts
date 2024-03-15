import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { migrations } from "./migration";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  // entities: ["src/entity/*.ts"],
  // migrations: ["src/migration/*.ts"],
  entities: [User],
  migrations: migrations,
  subscribers: [],
});
