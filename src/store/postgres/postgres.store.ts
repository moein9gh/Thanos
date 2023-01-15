import {CONFIG} from "@config";
import {Client} from "pg";
import {Migrator} from "@migrations";
import {Logger} from "../../log";

export class Postgres {

    constructor(readonly host: string, readonly port: number, readonly username: string, readonly password: string, readonly client: Client) {
    }

    public static async setup(cfg: CONFIG) {
        try {

            const pgClient = new Client({
                host: cfg.postgresHost,
                port: cfg.postgresPort,
                user: cfg.postgresUsername,
                password: cfg.postgresPassword
            });

            await pgClient.connect();

            const pgInstance = new Postgres(cfg.postgresHost, cfg.postgresPort, cfg.postgresUsername, cfg.password, pgClient);

            const migrator = new Migrator(pgInstance);

            // await migrator.dropTables()
            await migrator.execMigrations();

            new Logger("STORE_POSTGRES", null, "Connected successfully to postgres database");

            return pgInstance;

        } catch (e) {
            throw e;
        }
    }
}

