import { CONFIG } from "@config";
import { Client } from "pg";
import { Migrator } from "@migrations";
import { Logger } from "@log";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class Postgres {
  public client: Client;

  constructor(@inject(TYPES.APP_CONFIG) private cfg: CONFIG) {
    try {
      let pgClient = new Client({
        host: cfg.postgresHost,
        port: cfg.postgresPort,
        user: cfg.postgresUsername,
        password: cfg.postgresPassword,
        database: cfg.postgresDbName
      });

      pgClient.connect();

      this.client = pgClient;

      new Logger("STORE_POSTGRES", null, "Connected successfully to postgres database");
    } catch (e) {
      new Logger("POSTGRES", e as Error, "error occurred while creating database instance", e);
      throw e;
    }
  } // readonly client: Client // readonly password: string, // readonly username: string, // readonly port: number, // readonly host: string,

  public static async setup(cfg: CONFIG) {}
}
