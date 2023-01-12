import {CONFIG} from "@config"
import * as mongoose from "mongoose";
import {User} from "@entity";

export class Server {

    constructor(readonly host: string, readonly port: number, readonly username: string, readonly password: string, readonly client: mongoose.Mongoose, readonly User: User) {
    }

    public static async setup(cfg: CONFIG, UserEntity: User) {
        try {

            const url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host}:${cfg.port}/${cfg.dbName}?authSource=admin`;

            const client = await mongoose.connect(url)

            console.log('Connected successfully to database');

            UserEntity.defineEntity()

            return (new Server(cfg.host, cfg.port, cfg.username, cfg.password, client, UserEntity))

        } catch (e) {
            console.log(e)
            throw new Error("")
        }
    }
}

