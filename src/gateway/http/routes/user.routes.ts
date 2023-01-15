import {IUserController} from "@ports";
import {Router} from "@gateway";
import {CONFIG} from "@config";

export class UserRoutes {
    static RegisterRoutes(userController: IUserController, router: Router, cfg: CONFIG): Router {

        const expressRouter = router.getRouter();

        expressRouter.route("/")
            .get<any, string>(userController.getUsers)
            .post<any, string>(userController.createUser);

        return router;
    }
}