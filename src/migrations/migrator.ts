import * as store from "@store";
import fs from "fs";
import path from "path";
import {Logger} from "@log";
import {Client} from "pg";
import {CONFIG} from "@config";

export class Migrator {

    constructor(readonly store: store.Postgres) {
    }

    async execMigrations() {
        const fileNames = fs.readdirSync(path.resolve("src", "migrations")).filter(fn => fn.endsWith(".sql"));
        for (const fn of fileNames) {
            const query = fs.readFileSync(path.resolve("src", "migrations", fn)).toString();

            await this.store.client.query(query);
            new Logger("MIGRATOR", null, `${fn} migration executed`);

        }
    }

    async dropTables() {
        await this.store.client.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
        new Logger("MIGRATOR", null, "all tables dropped");

    }

    static async createDatabase(cfg: CONFIG) {
        try {
            const client = new Client({
                host: cfg.postgresHost,
                port: cfg.postgresPort,
                user: cfg.postgresUsername,
                password: cfg.postgresPassword
            });

            await client.connect();

            const res = await client.query(`SELECT datname FROM pg_database WHERE datname='${cfg.postgresDbName}'`);

            if (!res.rows.length) {
                await client.query(`CREATE DATABASE ${cfg.postgresDbName} WITH ENCODING 'UTF8';`);
                new Logger("MIGRATOR", null, `${cfg.postgresDbName} database created.`);
            }else{
                new Logger("MIGRATOR", null, `${cfg.postgresDbName} database already exist.`);
            }
        } catch (e) {
            new Logger("MIGRATOR", e as Error, `${cfg.postgresDbName} database already exist.`);
        }
    }
}