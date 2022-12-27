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



async function bootstrap() {

    try{

        const db = await store.Server.setup({
            password:process.env.password || "root",
            port:Number(process.env.password) || 27017,
            username:process.env.username || "root",
            host:process.env.host || "localhost",
            dbName:process.env.dbName || "test"
        })

        let router = gateway.newRouter()

        const uRepository = repository.UserRepository.Setup(db)

        const uInteractor = UserInteractor.Setup(uRepository)

        const handlers = gateway.UserController.Setup(uInteractor)

        const routes = gateway.UserRoutes.RegisterRoutes(handlers,router)

        gateway.HttpServer.NewServer(routes)?.listen(process.env.HTTP_SERVER_LOCAL_PORT,()=>{
            console.log("server is running",process.env.HTTP_SERVER_LOCAL_PORT)
        })

        gateway.Websocket.NewServer()

    }catch (e) {
        console.log("e")
    }
}

bootstrap().then()
