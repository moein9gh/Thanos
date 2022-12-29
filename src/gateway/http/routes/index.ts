import express from "express"
import {IUserController} from "@ports";
import {HTTP_ROUTES} from "../../../types/HTTP_ROUTES";

export class UserRoutes{
    static RegisterRoutes(userHandlers: IUserController, router: express.Router) : express.Router {

        router.get(HTTP_ROUTES.ROOT,userHandlers.create)
        router.get(HTTP_ROUTES.SAY_HI,userHandlers.sayHi)

        return router
    }
}