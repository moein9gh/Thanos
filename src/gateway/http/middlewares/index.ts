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
import { HTTP_STATUS_MESSAGE, TYPES } from "@types";
import { PREFIXES } from "@log";
import rateLimit from "express-rate-limit";
import { messageToClient } from "@utils";
const promMid = require("express-prometheus-middleware");

@injectable()
export class Middlewares {
  constructor(
    @inject(TYPES.RootRouter) private router: Router,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG,
    @inject(TYPES.DocGenerator) private docGenerator: DocGenerator,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  registerMiddlewares() {
    const expressRouter = this.router.getRouter();

    const limiter = rateLimit({
      windowMs: this.cfg.rateLimitTime * 60 * 1000,
      max: this.cfg.maxRateLimit,
      standardHeaders: true,
      legacyHeaders: false,
      message: messageToClient(
        false,
        "Too many requests please try later",
        HTTP_STATUS_MESSAGE.TOO_MANY_REQUESTS,
        {
          message: "Too many requests please try later"
        }
      )
    });

    expressRouter.use(limiter);
    expressRouter.use(express.json());

    const winstonLogger = expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize(), winston.format.json()),
      level: "info",
      meta: false,
      msg: APP_CONFIG.logFormat,
      expressFormat: true,
      colorize: true,
      ignoreRoute: function () {
        return false;
      }
    });

    expressRouter.use((req, res, next) => {
      winstonLogger(req, res, next);
    });

    expressRouter.use(
      promMid({
        metricsPath: "/metrics",
        collectDefaultMetrics: true,
        requestDurationBuckets: [0.1, 0.5, 1, 1.5],
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
      })
    );

    expressRouter.use(express.urlencoded({ extended: true }));

    this.logger.print(
      PREFIXES.HTTP_SERVER,
      null,
      `static folder path : ${APP_CONFIG.staticFolder}`
    );

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
    this.logger.print(PREFIXES.DOC, null, "swagger is now accessible on /docs");
  }
}
