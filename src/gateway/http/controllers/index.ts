import {IUserInteractor,IUserController} from "@ports";
import {Response,Request} from "express";

export class UserController{

    constructor(readonly userInteractor:IUserInteractor) {
    }

    static Setup(userInteractor:IUserInteractor) : IUserController{
        return (new UserController(userInteractor))
    }

    create = (req:Request,res:Response):void=>{
        try {
            console.log("create UserController")
            this.userInteractor.create()
            res.send("hi")

        }catch (e) {
            console.log(12,e)
        }
    }
}