import {CONFIG} from "@config";
import * as store from "@store";
import {MongoClient} from "mongodb";
import {IBaseRepository} from "@ports";

export class UserRepository implements IBaseRepository{
    constructor(readonly store:store.Server){}
    static Setup(db:store.Server){
        return new UserRepository(db)
    }
    create(): any {
        console.log(this.store.client.model("User"))
        console.log("create UserRepository",this.store.client.model("User").create({}))
        this.store.models.create({})
    }
    read(): any {}
    update(): any {}
    delete(): any {}
}