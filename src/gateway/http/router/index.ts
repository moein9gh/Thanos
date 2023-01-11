import express from 'express'

export class Router {

    constructor(private readonly router: express.Router) {
    }

    static NewRouter(): Router {
        const router = express.Router()

        router.use(express.json())
        router.use(express.urlencoded({extended: true}))

        return (new Router(router));
    }

    getRouter(): express.Router {
        return this.router
    }
}