import express from "express"
import {IUserController} from "@ports";
import {HTTP_ROUTES} from "../../../types/HTTP_ROUTES";
import {Router} from "../router";

export class UserRoutes{
    static RegisterRoutes(userHandlers: IUserController, router: Router) : Router {

        const expressRouter = router.getRouter()
        expressRouter.get(HTTP_ROUTES.ROOT,userHandlers.create)
        expressRouter.get(HTTP_ROUTES.SAY_HI,userHandlers.sayHi)

        return router
    }
}