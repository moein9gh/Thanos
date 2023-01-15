import {NextFunction, Request, Response} from "express";
import {CONFIG} from "@config";
import {getMobiles, messageToClient, num2en} from "@utils";
import {IAuthInteractor} from "@ports";
import {IAuthController} from "@ports";
import {SmsVerificationDto} from "@dto";
import {HTTP_STATUS_CODE, HTTP_STATUS_MESSAGE} from "@types";

export class AuthController implements IAuthController {

    constructor(readonly authInteractor: IAuthInteractor, readonly cfg: CONFIG) {
    }

    static Setup(authInteractor: IAuthInteractor, cfg: CONFIG): AuthController {
        return (new AuthController(authInteractor, cfg));
    }

    verifyToken(req: Request, res: Response, next: NextFunction) {

    }

    smsVerification = async (req: Request<any, any, any, SmsVerificationDto>, res: Response) => {

        let phoneNumber = req.query.phoneNumber;

        try {

            if (!phoneNumber) {
                return res.send(messageToClient(false, "phoneNumber is required", HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {phoneNumber}));
            }

            phoneNumber = num2en(phoneNumber);

        } catch (e) {
            if (e instanceof TypeError) {
                return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(messageToClient(false, e.message, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {phoneNumber}));
            }
        }

        let validatedNumber;

        try {
            validatedNumber = getMobiles(phoneNumber);
        } catch (e) {
            return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(messageToClient(false, (e as Error).message, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {phoneNumber}));
        }

        if (!validatedNumber) {
            return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(messageToClient(false, "phoneNumber is required", HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {phoneNumber}));
        }

        await this.authInteractor.smsVerification(validatedNumber);

        return res.status(HTTP_STATUS_CODE.CREATED).json(messageToClient(false, null, HTTP_STATUS_MESSAGE.CREATED, {phoneNumber}));

    };

}