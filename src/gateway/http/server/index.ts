import express from "express";

export class HttpServer {

    static server : express.Express | null = null

    constructor(readonly routes: express.Router) {
       HttpServer.server = express().use(this.routes)
    }

    static NewServer(routes: express.Router): express.Express | null {
        new HttpServer(routes)
        return HttpServer.server
    }

    static GetServer(): express.Express | null {
        return HttpServer.server
    }
}