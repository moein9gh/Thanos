import express from "express"
import {IUserController} from "@ports";

export class UserRoutes{
    static RegisterRoutes(userHandlers: IUserController, router: express.Router) : express.Router {

        router.get("/",userHandlers.create)
        router.get("/sayHi",userHandlers.sayHi)

        return router
    }
}