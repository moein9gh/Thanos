import {IBaseRepository, IUserInteractor} from "@ports"
import {CONFIG} from "@config";

export class UserInteractor implements IUserInteractor {
    constructor(
        readonly pgUserRepo: IBaseRepository,
        readonly cfg: CONFIG,
    ) {
    }

    static Setup(pgUserRepo: IBaseRepository, cfg: CONFIG): UserInteractor {
        return new UserInteractor(pgUserRepo, cfg)
    }

    async create(): Promise<any> {
        console.log("create UserInteractor")
        await this.pgUserRepo.create()
    }

    async getUsers(): Promise<any> {
        console.log("getUsers UserInteractor")
        this.pgUserRepo.create()
    }
}