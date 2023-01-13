import {REPOSITORY_RESULT} from "@types";
import {UserEntity} from "@entity";

export interface IBaseRepository<T> {
    insertOne(): any

    updateOne(id: string, userEntity: UserEntity): Promise<REPOSITORY_RESULT<T>>

    findOne(): any

    deleteOne(): any
}