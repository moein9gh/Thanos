import * as store from "@store";
import {CONFIG} from "@config";
import {IAuthRepository} from "../../ports/authRepository.port";

export class PgAuthRepository implements IAuthRepository {
    constructor(readonly store: store.Postgres, readonly cfg: CONFIG) {
    }

    static Setup(db: store.Postgres, cfg: CONFIG): PgAuthRepository {
        return new PgAuthRepository(db, cfg)
    }

    async create(): Promise<any> {
        const values = ['moein', 'test', "test"]
        return this.store.client.query("INSERT INTO users(username, password, phone_number) VALUES($1, $2, $3) RETURNING *", values)
    }

    read(): any {
    }

    update(): any {
    }

    deleteOne(): any {
    }

    findOne(): any {
    }

    insertOne(): any {
    }

    updateOne(): any {
    }
}