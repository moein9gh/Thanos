import {NextFunction, Request, Response} from "express";
import {SmsVerificationDto} from "../dto";

export interface IUserController {
    create(req: Request, res: Response)

    sayHi(req: Request, res: Response)

    verifyToken(req: Request, res: Response, next: NextFunction)

    getUsers(req: Request, res: Response),

    createUser(req: Request, res: Response),
}

export interface IAuthController {
    verifyToken(req: Request, res: Response, next: NextFunction)
    smsVerification(req: Request<any, any, any, SmsVerificationDto>, res: Response, next: NextFunction)
}