import { IUserInteractor, IUserRepository } from "@ports";
import { CONFIG } from "@config";
import { IAuthRepository } from "@ports";

export class UserInteractor implements IUserInteractor {
  constructor(
    readonly pgUserRepo: IUserRepository,
    readonly pgAuthRepo: IAuthRepository,
    readonly cfg: CONFIG
  ) {}

  static Setup(
    pgUserRepo: IUserRepository,
    pgAuthRepo: IAuthRepository,
    cfg: CONFIG
  ): UserInteractor {
    return new UserInteractor(pgUserRepo, pgAuthRepo, cfg);
  }

  async create(): Promise<any> {
    await this.pgUserRepo.insertOne();
  }

  async getUsers(): Promise<any> {
    this.pgUserRepo.insertOne();
  }
}
