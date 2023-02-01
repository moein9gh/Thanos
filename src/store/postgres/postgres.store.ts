import { CONFIG } from "@config";
import { Client } from "pg";
import { Logger, PREFIXES } from "@log";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class Postgres {
  public client: Client;

  constructor(
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG,
    @inject(TYPES.Logger) private logger: Logger
  ) {
    this.connect();
  }

  connect = () => {
    try {
      let pgClient = new Client({
        host: this.cfg.postgresHost,
        port: this.cfg.postgresPort,
        user: this.cfg.postgresUsername,
        password: this.cfg.postgresPassword,
        database: this.cfg.postgresDbName
      });

      pgClient.connect();

      this.client = pgClient;

      this.logger.print(PREFIXES.POSTGRES, null, "Connected successfully to postgres database");
    } catch (e) {
      this.logger.print(
        PREFIXES.POSTGRES,
        e as Error,
        "error occurred while creating database instance",
        e
      );
      throw e;
    }
  };

  public static async setup(cfg: CONFIG) {}
}
