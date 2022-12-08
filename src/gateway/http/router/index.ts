import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

export function newRouter() : express.Router {
    const router = express.Router()

    router.use(express.json())
    router.use(express.urlencoded({extended:true}))

    router.use(helmet());
    router.use(cors({
        methods:"*",
        origin:"*"
    }));

    return router;
}