import {IUserController, IUserInteractor} from "@ports";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken"
import {CONFIG} from "@config";
import {messageToClient} from "@utils";

export class UserController implements IUserController {

    constructor(readonly userInteractor: IUserInteractor, readonly cfg: CONFIG) {
    }

    static Setup(userInteractor: IUserInteractor, cfg: CONFIG): UserController {
        return (new UserController(userInteractor, cfg))
    }

    verifyToken(req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];

        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];

            jwt.verify(bearerToken, this.cfg.jwtSecretKey, (err, authData) => {
                if (err) {
                    console.log(err)
                    if (err.name === "TokenExpiredError") {
                        res.statusCode = 401;
                        res.send(messageToClient(false, err.name, {}));


                    } else {
                        res.statusCode = 401;
                        res.send(messageToClient(false, 'token_expire', {}));
                    }

                } else {
                    req.user = authData;
                    next();
                }
            });


        } else {
            // res.sendStatus(401);
            // res.send(messageToClient(false,'token_expire',{}));
            //

        }
    }

    async getUsers(req: Request, res: Response) {
        const decoded = req.user;


    }

    create = (req: Request, res: Response): void => {
        try {
            console.log("create UserController")
            this.userInteractor.create()
            res.send("hi3")

        } catch (e) {
            console.log("error", e)
        }
    }

    sayHi(req: Request, res: Response) {
        res.send("/sayHi")
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        const user = await this.userInteractor.create()
        res.send(messageToClient(true,"created",user))
    }
}