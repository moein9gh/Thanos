import express from "express";
import http from "http";
import { Router } from "@gateway";

export class HttpServer {
  static server: http.Server | null = null;

  constructor(
    readonly userRoutes: Router,
    readonly authRoutes: Router,
    readonly rootRouter: Router
  ) {
    HttpServer.server = http.createServer(
      express()
        .use("/", this.rootRouter.getRouter())
        .use("/api/auth", this.authRoutes.getRouter())
        .use("/api/users", this.userRoutes.getRouter())
    );
  }

  static NewServer(userRoutes: Router, authRoutes: Router, rootRouter): http.Server | null {
    new HttpServer(userRoutes, authRoutes, rootRouter);
    return HttpServer.server;
  }

  static GetServer(): http.Server | null {
    return HttpServer.server;
  }
}
