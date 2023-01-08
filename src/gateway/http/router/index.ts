import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

export class Router {

    static router: express.Router | null = null

    constructor(expressRouter: express.Router) {
        Router.router = expressRouter
    }

    static NewRouter(): express.Router | null {
        const router = express.Router()

        router.use(express.json())
        router.use(express.urlencoded({extended: true}))

        new Router(router)

        return Router.router;
    }

    static GetRouter(): express.Router | null {
        return Router.router
    }
}
//
// export function newRouter(): express.Router {
//     const router = express.Router()
//
//     router.use(express.json())
//     router.use(express.urlencoded({extended: true}))
//
//     router.use(helmet());
//     router.use(cors({
//         methods: "*",
//         origin: "*"
//     }));
//
//     return router;
// }