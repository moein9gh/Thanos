import express from "express";
import http from "http";

export class HttpServer {

    static server : http.Server | null = null

    constructor(readonly routes: express.Router) {
       HttpServer.server = http.createServer(express().use(this.routes))
    }

    static NewServer(routes: express.Router): http.Server | null {
        new HttpServer(routes)
        return HttpServer.server
    }

    static GetServer(): http.Server | null {
        return HttpServer.server
    }
}