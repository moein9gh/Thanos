import {IUserController} from "@ports";
import {HTTP_ROUTES} from "../../../types/HTTP_ROUTES";
import {Router} from "../router";
import {CONFIG} from "@config";

export class UserRoutes {
    static RegisterRoutes(userController: IUserController, router: Router, cfg: CONFIG): Router {

        const expressRouter = router.getRouter()

        expressRouter.get(HTTP_ROUTES.ROOT, userController.create)

        expressRouter.get(HTTP_ROUTES.SAY_HI, userController.sayHi)

        expressRouter.get<string, any, string>("/",userController.getUsers)
        expressRouter.post<string, any, string>("/",userController.createUser)

        expressRouter.use("/api/users",expressRouter)

        return router
    }
}