import {IBaseRepository} from "./repository.port";
import {User} from "@model";

export interface IAuthRepository extends IBaseRepository<User>{

}