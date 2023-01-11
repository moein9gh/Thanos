import express from "express";
import http from "http";
import {Router} from "@gateway";

export class HttpServer {

    static server : http.Server | null = null

    constructor(readonly routes: Router) {
        HttpServer.server = http.createServer(express().use(this.routes.getRouter()))
    }

    static NewServer(routes: Router): http.Server | null {
        new HttpServer(routes)
        return HttpServer.server
    }

    static GetServer(): http.Server | null {
        return HttpServer.server
    }
}