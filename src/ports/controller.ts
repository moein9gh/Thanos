import {NextFunction, Request, Response} from "express";

export interface IUserController {
    create(req: Request, res: Response)

    sayHi(req: Request, res: Response)

    verifyToken(req: Request, res: Response, next: NextFunction)

    getUsers(req: Request, res: Response),

    createUser(req: Request, res: Response),
}