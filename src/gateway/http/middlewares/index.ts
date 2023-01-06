import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import {APP_CONFIG} from '@config'
import expressWinston from 'express-winston'
import winston from 'winston'

export class Middlewares {

    static Register(router: express.Router): express.Router {
        router.use(express.json())

        router.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            level: function(req, res, err) { return String("info"); },
            meta: false,
            msg: APP_CONFIG.logFormat,
            expressFormat: true,
            colorize: true,
            ignoreRoute: function (req, res) { return false; }
        }));

        router.use(express.urlencoded({extended: true}))
        console.log(`static folder path : ${APP_CONFIG.staticFolder}`)
        router.use(express.static(APP_CONFIG.staticFolder))

        router.use(helmet());
        router.use(cors({
            methods: "*",
            origin: "*"
        }));

        return router;
    }
}
