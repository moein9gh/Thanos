/*
    resolve default defined paths in package.json
*/

import * as moduleAlias from "module-alias"
moduleAlias.default()

import * as dotenv from 'dotenv'
import * as store from "@store"
import * as gateway from "@gateway"
import * as repository from "@repository";
import {UserInteractor} from "@interactor";
import {APP_CONFIG} from "@config";



dotenv.config({
    path: process.cwd() + "/src/env/.env"
});


async function bootstrap() {

    try {


        const postgres = await store.Postgres.setup(APP_CONFIG)

        let router = gateway.Router.NewRouter()!

        gateway.Middlewares.Register(router, APP_CONFIG)

        const pgUserRepository = repository.PgUserRepository.Setup(postgres, APP_CONFIG)

        const userInteractor = UserInteractor.Setup(pgUserRepository, APP_CONFIG)

        const handlers = gateway.UserController.Setup(userInteractor, APP_CONFIG)

        gateway.UserRoutes.RegisterRoutes(handlers, router, APP_CONFIG)

        gateway.HttpServer.NewServer(router)?.listen(APP_CONFIG.httpServerPort, () => {
            console.log("server is running", APP_CONFIG.httpServerPort)
        })

        gateway.Websocket.NewServerOnSamePort(gateway.HttpServer.GetServer()!)

        gateway.GrpcServer.NewServer()

    } catch (e) {
        console.log("error", e)
    }
}

bootstrap().then()
