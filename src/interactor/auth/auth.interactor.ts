import {IUserRepository} from "@ports";
import {CONFIG} from "@config";
import {IAuthInteractor} from "../../ports/interactor.port";
import {IAuthRepository} from "../../ports/authRepository.port";
import {getRandomIntInclusive, sendSMS} from "@utils";

export class AuthInteractor implements IAuthInteractor {
    constructor(
        readonly pgUserRepo: IUserRepository,
        readonly pgAuthRepo: IAuthRepository,
        readonly cfg: CONFIG,
    ) {
    }

    static Setup(pgUserRepo: IUserRepository, pgAuthRepo: IAuthRepository, cfg: CONFIG): AuthInteractor {
        return new AuthInteractor(pgUserRepo, pgAuthRepo, cfg);
    }

    async create(): Promise<any> {
        await this.pgUserRepo.insertOne();
    }

    async smsVerification(validatedNumber: string): Promise<any> {
        try {
            let findResult = await this.pgUserRepo.findByPhoneNumber(validatedNumber);
            if (findResult.success) {
                if (findResult.rowCount == 0) {

                } else if (findResult.rowCount == 1) {
                    const generatedCode = getRandomIntInclusive(0, 10000000);

                    await sendSMS(findResult.rows[0].phoneNumber, generatedCode);

                    await this.pgUserRepo.updateOne(findResult.rows[0].id,findResult.rows[0].mapToEntity());


                } else {
                    throw new Error("invalid exception");
                }

            }

        } catch (e) {
            throw e;
        }
    }
}