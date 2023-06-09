import { IUserController, IUserInteractor } from "@ports";
import { NextFunction, Request, Response } from "express";
import { CONFIG } from "@config";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(TYPES.UserInteractor) private userInteractor: IUserInteractor,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {}

  static Setup(userInteractor: IUserInteractor, cfg: CONFIG): UserController {
    return new UserController(userInteractor, cfg);
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {}

  async getUsers(req: Request, res: Response) {
    res.send("get");
  }

  create = (req: Request, res: Response): void => {
    try {
      this.userInteractor.create();
    } catch (e) {}
  };

  sayHi(req: Request, res: Response) {
    res.send("/sayHi");
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userInteractor.create();
  };
}
