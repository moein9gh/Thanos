import {MongoClient,Db} from 'mongodb'
import {CONFIG} from "@config"

export class Server {

    constructor(readonly host: string, readonly port: number, readonly username: string, readonly password: string,readonly client:MongoClient,readonly db:Db) {
    }

    public static async setup(cfg: CONFIG) {
        try {

            const url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host}:${cfg.port}`;
            const client: MongoClient = new MongoClient(url);

            await client.connect();

            console.log('Connected successfully to database');

            const db = client.db(cfg.dbName);

            return new Server(cfg.host, cfg.port,cfg.username,cfg.password,client,db)

        } catch (e) {
            console.log(e)
            throw new Error("")
        }
    }
}

