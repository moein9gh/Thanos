import {IBaseRepository} from "@ports";
import {REPOSITORY_RESULT} from "@types";
import {User} from "@model";

export interface IUserRepository extends IBaseRepository<User> {
    findByPhoneNumber(phoneNumber: string): Promise<REPOSITORY_RESULT<User>>
}