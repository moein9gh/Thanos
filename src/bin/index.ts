/*
    resolve default defined paths in package.json
*/

import * as moduleAlias from "module-alias"
moduleAlias.default()

import * as store from "@store"
import * as http from "@gateway"
import * as repository from "@repository";
import {UserInteractor} from "@interactor";



async function bootstrap() {

    try{
        console.log("db config",{
            password:process.env.password || "root",
            port:Number(process.env.password) || 27017,
            username:process.env.username || "root",
            host:process.env.host || "localhost",
            dbName:process.env.dbName || "test"
        })

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

        http.newServer(routes).listen(3000,()=>{
            console.log("server is runnnig")
        })
    }catch (e) {
        console.log("e")
    }
}

bootstrap()
