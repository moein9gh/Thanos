import { CONFIG } from "@config";
import { Client } from "pg";
import { Logger } from "@log";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class Postgres {
  public client: Client;

  constructor(
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG,
    @inject(TYPES.Logger) private logger: Logger
  ) {
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

      logger.print("STORE_POSTGRES", null, "Connected successfully to postgres database");
    } catch (e) {
      logger.print("POSTGRES", e as Error, "error occurred while creating database instance", e);
      throw e;
    }
  }

  public static async setup(cfg: CONFIG) {}
}
