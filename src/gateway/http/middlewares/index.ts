import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import expressWinston from 'express-winston'
import winston from 'winston'
import path from "path";

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
            meta: false, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
        }));

        router.use(express.urlencoded({extended: true}))
        console.log(path.resolve("src","static"))
        router.use(express.static(path.resolve("src","static")))

        router.use(helmet());
        router.use(cors({
            methods: "*",
            origin: "*"
        }));

        return router;
    }
}
