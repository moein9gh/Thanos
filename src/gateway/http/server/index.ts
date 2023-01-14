import express from "express";
import http from "http";
import {Router} from "@gateway";

export class HttpServer {

    static server: http.Server | null = null;

    constructor(readonly userRoutes: Router, readonly authRoutes: Router) {
        HttpServer.server = http.createServer(
            express()
                .use("/api/auth", this.authRoutes.getRouter())
                .use("/api/users", this.userRoutes.getRouter())
        );
    }

    static NewServer(userRoutes: Router, authRoutes: Router): http.Server | null {
        new HttpServer(userRoutes, authRoutes);
        return HttpServer.server;
    }

    static GetServer(): http.Server | null {
        return HttpServer.server;
    }
}