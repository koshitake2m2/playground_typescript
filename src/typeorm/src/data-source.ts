import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import { AddUser1710495536672 } from "./migration/1710495536672-AddUser";
import { AddLastNameToUser1710495599507 } from "./migration/1710495599507-AddLastNameToUser";
import { AddAgeToUser1710497856268 } from "./migration/1710497856268-AddAgeToUser";

// 都度追加が面倒. 漏れもある
const migrations = {
  AddUser1710495536672,
  AddLastNameToUser1710495599507,
  AddAgeToUser1710497856268,
};

export const AppDataSource = new DataSource({
  type: "sqlite",
  // database, entities, migrationsはcliを実行したディレクトリからの相対パスで指定する
  database: "database.sqlite",
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  // 以下のような書き方もある
  // entities: [User],
  // migrations: migrations,
  synchronize: false,
  logging: false,
  subscribers: [],
});
