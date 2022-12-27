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
import * as http from "@gateway"
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

        let router = http.newRouter()

        const uRepository = repository.UserRepository.Setup(db)

        const uInteractor = UserInteractor.Setup(uRepository)

        const handlers = http.UserController.Setup(uInteractor)

        const routes = http.UserRoutes.RegisterRoutes(handlers,router)

        http.newServer(routes).listen(process.env.SERVER_LOCAL_PORT,()=>{
            console.log("server is runnnig",process.env.SERVER_LOCAL_PORT)
        })
    }catch (e) {
        console.log("e")
    }
}

bootstrap()
