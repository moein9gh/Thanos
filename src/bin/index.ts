/*
    resolve default defined paths in package.json
*/

import * as moduleAlias from "module-alias"
moduleAlias.default()

import * as store from "@store"
import * as http from "@gateway"
import * as userInteractor from "@interactor"

(async()=>{
   const db = await store.setup()
    const router = http.newRouter()

    const uInteractor = userInteractor.newUserIntractor(db)
    const handlers = http.newUserController(uInteractor)
    http.registerRoutes(handlers,router)
    http.newServer().listen(3000,()=>{
        console.log("server is runnnig")
    })

})()