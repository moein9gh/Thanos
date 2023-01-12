import * as store from "@store";
import {IBaseRepository} from "@ports";
import {CONFIG} from "@config";

export class PgUserRepository implements IBaseRepository {
    constructor(readonly store: store.Postgres, readonly cfg: CONFIG) {
    }

    static Setup(db: store.Postgres, cfg: CONFIG) {
        return new PgUserRepository(db, cfg)
    }

    async create(): Promise<any> {
        const values = ['moein', 'test', "test"]
        return this.store.client.query("INSERT INTO users(username, password, phone_number) VALUES($1, $2, $3) RETURNING *",values)
    }

    read(): any {
    }

    update(): any {
    }

    delete(): any {
    }
}