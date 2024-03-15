import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

// DataSourceのsynchronize: trueの時, initializeでmigrationもしてくれる.
// database.sqliteに反映されている
AppDataSource.initialize()
  .then(async () => {
    if (AppDataSource.isInitialized) {
      console.log("AppDataSource is initialized");
      // DataSourceのsynchronize: falseの時, runMigrationsでまだmigrationしてないものだけmigrationしてくれる.
      // 多分, migrationsテーブルに記載されていないものだけmigrationしてくれる
      // database.sqliteに反映されている
      await AppDataSource.runMigrations();
      console.log("migration is done");
    }
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.age2 = 26;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
