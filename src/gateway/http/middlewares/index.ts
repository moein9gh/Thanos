import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import {APP_CONFIG} from '@config'
import expressWinston from 'express-winston'
import winston from 'winston'
import { graphqlHTTP } from 'express-graphql';
import {buildSchema} from "graphql"

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
            level: function (req, res, err) {
                return String("info");
            },
            meta: false,
            msg: APP_CONFIG.logFormat,
            expressFormat: true,
            colorize: true,
            ignoreRoute: function (req, res) {
                return false;
            }
        }));

        const schema = buildSchema(`
            type Query {
                hello: String
            }
        `);

        const root = {
            hello: () => {
                return 'Hello world!';
            },
        };

        router.use(express.urlencoded({extended: true}))
        console.log(`static folder path : ${APP_CONFIG.staticFolder}`)
        router.use(express.static(APP_CONFIG.staticFolder))

        router.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
        router.use(cors({
            methods: "*",
            origin: "*"
        }));

        router.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));

        return router;
    }
}
