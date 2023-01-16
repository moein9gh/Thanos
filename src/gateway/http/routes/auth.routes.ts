import { IAuthController } from "@ports";
import { Router } from "@gateway";
import { CONFIG } from "@config";

export class AuthRoutes {
  static RegisterRoutes(authController: IAuthController, router: Router, cfg: CONFIG): Router {
    const expressRouter = router.getRouter();

    expressRouter.get<string, any, string>("/", authController.verifyToken);
    expressRouter.get("/sms-verification", authController.smsVerification);

    return router;
  }
}
