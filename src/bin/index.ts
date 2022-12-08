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
        const db = await store.Server.setup({password:"example",port:27017,username:"root",host:"localhost",dbName:"myCollection"})

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
