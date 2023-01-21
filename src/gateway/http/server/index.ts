import express from "express";
import http from "http";
import { AuthRoutes, Middlewares, Router, UserRoutes } from "@gateway";
import { CONFIG } from "@config";
import { Logger } from "@log";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class HttpServer {
  server: http.Server | null = null;

  constructor(
    @inject(TYPES.UserRoutes) private userRoutes: UserRoutes,
    @inject(TYPES.AuthRoutes) private authRoutes: AuthRoutes,
    @inject(TYPES.RootRouter) private rootRouter: Router,
    @inject(TYPES.Middlewares) private middlewares: Middlewares,
    @inject(TYPES.APP_CONFIG) private cfg: CONFIG
  ) {
    userRoutes.registerRoutes();
    authRoutes.registerRoutes();
    middlewares.registerMiddlewares();

    this.server = http.createServer(
      express()
        .use("/", this.rootRouter.getRouter())
        .use("/api/auth", this.authRoutes.router.getRouter())
        .use("/api/users", this.userRoutes.router.getRouter)
    );
  }

  getServer(): http.Server | null {
    return this.server;
  }

  listen() {
    this.server?.listen(this.cfg.httpServerPort, () => {
      new Logger("HTTP_SERVER", null, "server is running " + this.cfg.httpServerPort);
    });
  }
}
