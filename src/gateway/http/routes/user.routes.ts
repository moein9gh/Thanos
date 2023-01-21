import { IUserController } from "@ports";
import { Router } from "@gateway";
import { CONFIG } from "@config";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class UserRoutes {
  constructor(
    @inject(TYPES.UserController) private userController: IUserController,
    @inject(TYPES.UserRouter) public router: Router,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {}
  registerRoutes(): Router {
    const expressRouter = this.router.getRouter();

    expressRouter
      .route("/")
      .get<any, string>(this.userController.getUsers)
      .post<any, string>(this.userController.createUser);

    return this.router;
  }
}
