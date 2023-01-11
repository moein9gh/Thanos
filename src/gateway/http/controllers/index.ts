import {IUserInteractor,IUserController} from "@ports";
import {Response,Request} from "express";

export class UserController{

    constructor(readonly userInteractor:IUserInteractor) {
    }

    static Setup(userInteractor:IUserInteractor) : UserController{
        return (new UserController(userInteractor))
    }

    create = (req:Request,res:Response):void=>{
        try {
            console.log("create UserController")
            this.userInteractor.create()
            res.send("hi3")

        }catch (e) {
            console.log("error",e)
        }
    }

    sayHi(req:Request,res:Response){
        res.send("/sayHi")
    }
}