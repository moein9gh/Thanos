import { NextFunction, Request, Response } from "express";
import { CONFIG } from "@config";
import { getMobiles, messageToClient, num2en } from "@utils";
import { IAuthController, IAuthInteractor } from "@ports";
import { SmsVerificationDto } from "@dto";
import { HTTP_STATUS_CODE, HTTP_STATUS_MESSAGE, TYPES } from "@types";
import { inject, injectable } from "inversify";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.AuthInteractor) private authInteractor: IAuthInteractor,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {}

  static Setup(authInteractor: IAuthInteractor, cfg: CONFIG): AuthController {
    return new AuthController(authInteractor, cfg);
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {}

  smsVerification = async (req: Request<any, any, any, SmsVerificationDto>, res: Response) => {
    let phoneNumber = req.query.phoneNumber;

    try {
      if (!phoneNumber) {
        const localedMessage = req.t("phoneNumberIsRequired");
        return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).send(
          messageToClient(false, localedMessage, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {
            phoneNumber
          })
        );
      }

      phoneNumber = num2en(phoneNumber);
    } catch (e) {
      if (e instanceof TypeError) {
        return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(
          messageToClient(false, e.message, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {
            phoneNumber
          })
        );
      }
    }

    let validatedNumber;

    try {
      validatedNumber = getMobiles(phoneNumber);
    } catch (e) {
      return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(
        messageToClient(false, (e as Error).message, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {
          phoneNumber
        })
      );
    }

    if (!validatedNumber) {
      const localedMessage = req.t("phoneNumberIsRequired");

      return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json(
        messageToClient(false, localedMessage, HTTP_STATUS_MESSAGE.UNPROCESSABLE_ENTITY, {
          phoneNumber
        })
      );
    }

    await this.authInteractor.smsVerification(validatedNumber);

    const localedMessage = req.t("created");

    return res.status(HTTP_STATUS_CODE.CREATED).json(
      messageToClient(true, null, localedMessage, {
        phoneNumber
      })
    );
  };
}
