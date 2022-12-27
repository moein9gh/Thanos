"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const mongodb_1 = require("mongodb");
class Server {
    constructor(host, port, username, password, client, db) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.client = client;
        this.db = db;
    }
    static async setup(cfg) {
        try {
            const url = `mongodb://${cfg.username}:${cfg.password}@${cfg.host}:${cfg.port}`;
            const client = new mongodb_1.MongoClient(url);
            await client.connect();
            console.log('Connected successfully to server');
            const db = client.db(cfg.dbName);
            return new Server(cfg.host, cfg.port, cfg.username, cfg.password, client, db);
        }
        catch (e) {
            console.log(e);
            throw new Error("");
        }
    }
}
exports.Server = Server;
