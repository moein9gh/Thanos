import { MongoClient , Db} from 'mongodb'
import {IBaseRepository, IUserInteractor} from "@ports"

export class UserInteractor implements IUserInteractor{
    constructor(readonly userRepository:IBaseRepository) {}

    static Setup(userRepository:IBaseRepository):UserInteractor{
        return new UserInteractor(userRepository)
    }

    create(): any {
        console.log("create UserInteractor")
        this.userRepository.create()
    }
}