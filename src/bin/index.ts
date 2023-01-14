/*
    resolve default defined paths in package.json
*/

import * as moduleAlias from "module-alias";
moduleAlias.default();
import * as dotenv from "dotenv";
import * as store from "@store";
import * as gateway from "@gateway";
import * as repository from "@repository";
import {AuthInteractor, UserInteractor} from "@interactor";
import {APP_CONFIG} from "@config";



dotenv.config({
    path: process.cwd() + "/src/env/.env"
});


async function bootstrap() {

    try {

        const postgres = await store.Postgres.setup(APP_CONFIG);

        let userRouter = gateway.Router.NewRouter()!;

        gateway.Middlewares.Register(userRouter, APP_CONFIG);

        const pgUserRepository = repository.PgUserRepository.Setup(postgres, APP_CONFIG);

        const pgAuthRepository = repository.PgAuthRepository.Setup(postgres, APP_CONFIG);

        const userInteractor = UserInteractor.Setup(pgUserRepository, pgAuthRepository, APP_CONFIG);

        const authInteractor = AuthInteractor.Setup(pgUserRepository, pgAuthRepository, APP_CONFIG);

        const userHandlers = gateway.UserController.Setup(userInteractor, APP_CONFIG);

        const authHandlers = gateway.AuthController.Setup(authInteractor, APP_CONFIG);

        const authRoutes = gateway.AuthRoutes.RegisterRoutes(authHandlers, gateway.Router.NewRouter(), APP_CONFIG);

        const userRoutes = gateway.UserRoutes.RegisterRoutes(userHandlers, userRouter, APP_CONFIG);


        gateway.HttpServer.NewServer(userRoutes, authRoutes)?.listen(APP_CONFIG.httpServerPort, () => {
            // console.log("server is running", APP_CONFIG.httpServerPort);
        });


        gateway.Websocket.NewServerOnSamePort(gateway.HttpServer.GetServer()!);

        gateway.GrpcServer.NewServer()

    } catch (e) {
    }
}

bootstrap().then();
