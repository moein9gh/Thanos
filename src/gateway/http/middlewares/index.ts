import express from "express";
import helmet from "helmet";
import cors from "cors";
import {APP_CONFIG, CONFIG} from "@config";
import expressWinston from "express-winston";
import winston from "winston";
import {graphqlHTTP} from "express-graphql";
import {buildSchema} from "graphql";
import {Router} from "@gateway";
import {Logger} from "@log";
import swaggerUi from "swagger-ui-express";
import {DocGenerator} from "../../../doc";


export class Middlewares {

    static Register(router: Router, cfg: CONFIG, docGenerator: DocGenerator): Router {
        const expressRouter = router.getRouter();
        expressRouter.use(express.json());
        expressRouter.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            level: function () {
                return String("info");
            },
            meta: false,
            msg: APP_CONFIG.logFormat,
            expressFormat: true,
            colorize: true,
            ignoreRoute: function () {
                return false;
            }
        }));

        const schema = buildSchema(`
            type Query {
                hello: String
            }
        `);

        const root = {
            hello: () => "Hello world!",
        };

        expressRouter.use(express.urlencoded({extended: true}));
        new Logger("HTTP_SERVER", null, `static folder path : ${APP_CONFIG.staticFolder}`);

        expressRouter.use(express.static(APP_CONFIG.staticFolder));

        expressRouter.use(helmet({contentSecurityPolicy: (process.env.NODE_ENV === "production") ? undefined : false}));
        expressRouter.use(cors({
            methods: "*",
            origin: "*"
        }));

        expressRouter.use("/graphql", graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        }));

        expressRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(docGenerator.doc));

        return router;
    }
}
