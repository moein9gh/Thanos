import express from "express";
import helmet from "helmet";
import cors from "cors";
import { APP_CONFIG, CONFIG } from "@config";
import expressWinston from "express-winston";
import winston from "winston";
import { Router } from "@gateway";
import { Logger } from "@log";
import swaggerUi from "swagger-ui-express";
import { DocGenerator } from "@doc";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

const promMid = require("express-prometheus-middleware");

@injectable()
export class Middlewares {
  constructor(
    @inject(TYPES.RootRouter) private router: Router,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG,
    @inject(TYPES.DocGenerator) private docGenerator: DocGenerator
  ) {}

  registerMiddlewares() {
    const expressRouter = this.router.getRouter();
    expressRouter.use(express.json());

    expressRouter.use(
      promMid({
        metricsPath: "/metrics",
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
      })
    );

    expressRouter.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
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
      })
    );

    expressRouter.use(express.urlencoded({ extended: true }));
    new Logger("HTTP_SERVER", null, `static folder path : ${APP_CONFIG.staticFolder}`);

    expressRouter.use(express.static(APP_CONFIG.staticFolder));

    expressRouter.use(
      helmet({
        contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false
      })
    );
    expressRouter.use(
      cors({
        methods: "*",
        origin: "*"
      })
    );

    expressRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(this.docGenerator.doc));
    new Logger("DOC", null, "swagger is now accessible on /docs");
  }
}
