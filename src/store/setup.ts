import {CONFIG} from "@config"
import * as mongoose from "mongoose";
import {IBaseEntity} from "@ports";
export class Server {

    constructor(readonly host: string, readonly port: number, readonly username: string, readonly password: string, readonly client: mongoose.Mongoose,readonly models: mongoose.Model<any>) {
    }

    public static async setup(cfg: CONFIG, ...entities: [IBaseEntity]) {
        try {

            const url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host}:${cfg.port}`;

            const client = await mongoose.connect(url)

            console.log('Connected successfully to database');

            let models
            for (const e of entities) {
                e.defineEntity()
                models = e.getEntity()
                console.log("e.getEntity().baseModelName", e.getEntity().collection.collectionName)
            }

            return (new Server(cfg.host, cfg.port, cfg.username, cfg.password, client,models))

        } catch (e) {
            console.log(e)
            throw new Error("")
        }
    }
}

