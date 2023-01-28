import fs from "fs";
import path from "path";
import { Logger, PREFIXES } from "@log";
import { Client } from "pg";
import { CONFIG } from "@config";
import { Postgres } from "@store";
import { TYPES } from "@types";
import { inject, injectable } from "inversify";

@injectable()
export class Migrator {
  constructor(
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  async execMigrations(store: Postgres) {
    const fileNames = fs
      .readdirSync(path.resolve("src", "migrations"))
      .filter((fn) => fn.endsWith(".sql"));
    for (const fn of fileNames) {
      const query = fs.readFileSync(path.resolve("src", "migrations", fn)).toString();

      await store.client.query(query);
      this.logger.print(PREFIXES.MIGRATOR, null, `${fn} migration executed`);
    }
  }

  async dropTables(store: Postgres) {
    await store.client.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
    this.logger.print(PREFIXES.MIGRATOR, null, "all tables dropped");
  }

  async createDatabase() {
    try {
      const client = new Client({
        host: this.cfg.postgresHost,
        port: this.cfg.postgresPort,
        user: this.cfg.postgresUsername,
        password: this.cfg.postgresPassword
      });

      await client.connect();

      const res = await client.query(
        `SELECT datname FROM pg_database WHERE datname='${this.cfg.postgresDbName}'`
      );

      if (!res.rows.length) {
        await client.query(`CREATE DATABASE ${this.cfg.postgresDbName} WITH ENCODING 'UTF8';`);
        this.logger.print(PREFIXES.MIGRATOR, null, `${this.cfg.postgresDbName} database created.`);
      } else {
        this.logger.print(
          PREFIXES.MIGRATOR,
          null,
          `${this.cfg.postgresDbName} database already exist.`
        );
      }
    } catch (e) {
      this.logger.print(
        PREFIXES.MIGRATOR,
        e as Error,
        `${this.cfg.postgresDbName} database already exist.`
      );
    }
  }
}
