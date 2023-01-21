import * as store from "@store";
import { CONFIG } from "@config";
import { IAuthRepository } from "@ports";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class PgAuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.Postgres) private store: store.Postgres,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {}

  static Setup(db: store.Postgres, cfg: CONFIG): PgAuthRepository {
    return new PgAuthRepository(db, cfg);
  }

  async create(): Promise<any> {
    const values = ["moein", "test", "test"];
    return this.store.client.query(
      "INSERT INTO users(username, password, phone_number) VALUES($1, $2, $3) RETURNING *",
      values
    );
  }

  read(): any {}

  update(): any {}

  deleteOne(): any {}

  findOne(): any {}

  insertOne(): any {}

  updateOne(): any {}
}
