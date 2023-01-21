import * as store from "@store";
import { IUserRepository } from "@ports";
import { CONFIG } from "@config";
import { UserEntity } from "@entity";
import { User } from "@model";
import { REPOSITORY_RESULT, TYPES } from "@types";
import { updateQueryBuilder } from "@utils";
import { inject, injectable } from "inversify";

@injectable()
export class PgUserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.Postgres) private store: store.Postgres,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {}

  static Setup(db: store.Postgres, cfg: CONFIG): PgUserRepository {
    return new PgUserRepository(db, cfg);
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

  async updateOne(id: string, userEntity: UserEntity): Promise<REPOSITORY_RESULT<User>> {
    try {
      const query = updateQueryBuilder("users", userEntity, `WHERE id=${id}`);

      const queryResult = await this.store.client.query(query);
      const convertedResult: User[] = [];

      for (const res of queryResult.rows) {
        convertedResult.push(UserEntity.Create(res).mapToModel());
      }

      return {
        rows: convertedResult,
        rowCount: queryResult.rowCount,
        success: true
      };
    } catch (e) {
      throw e;
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<REPOSITORY_RESULT<User>> {
    try {
      const queryResult = await this.store.client.query(
        "SELECT * FROM users WHERE phone_number=$1",
        [phoneNumber]
      );
      const convertedResult: User[] = [];

      for (const res of queryResult.rows) {
        convertedResult.push(UserEntity.Create(res).mapToModel());
      }

      return {
        rows: convertedResult,
        rowCount: queryResult.rowCount,
        success: true
      };
    } catch (e) {
      throw e;
    }
  }
}
