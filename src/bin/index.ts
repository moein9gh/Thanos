/*
    resolve default defined paths in package.json
*/

import * as moduleAlias from "module-alias"
moduleAlias.default()

import * as dotenv from 'dotenv'

dotenv.config({
    path:process.cwd()+"/src/env/.env"
});

import * as store from "@store"
import * as gateway from "@gateway"
import * as repository from "@repository";
import {UserInteractor} from "@interactor";
import {APP_CONFIG} from "@config";


async function bootstrap() {

    try{

        const db = await store.Server.setup(APP_CONFIG)

        let router = gateway.Router.NewRouter()!

        gateway.Middlewares.Register(router)

        const uRepository = repository.UserRepository.Setup(db)

        const uInteractor = UserInteractor.Setup(uRepository)

        const handlers = gateway.UserController.Setup(uInteractor)

        gateway.UserRoutes.RegisterRoutes(handlers,router)

        gateway.HttpServer.NewServer(router)?.listen(APP_CONFIG.httpServerPort,()=>{
            console.log("server is running",APP_CONFIG.httpServerPort)
        })

        gateway.Websocket.NewServer()

        gateway.GrpcServer.NewServer()

    }catch (e) {
        console.log("error",e)
    }
}

bootstrap().then()
