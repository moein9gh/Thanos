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
        this.store.db.collection("user").insertOne({username:"hi"})
        console.log("create UserRepository")
    }
    read(): any {}
    update(): any {}
    delete(): any {}
}