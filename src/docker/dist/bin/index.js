"use strict";
/*
    resolve default defined paths in package.json
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moduleAlias = __importStar(require("module-alias"));
moduleAlias.default();
const dotenv = __importStar(require("dotenv"));
dotenv.config({
    path: process.cwd() + "/src/env/.env"
});
const store = __importStar(require("@store"));
const http = __importStar(require("@gateway"));
const repository = __importStar(require("@repository"));
const _interactor_1 = require("@interactor");
async function bootstrap() {
    try {
        const db = await store.Server.setup({
            password: process.env.password || "root",
            port: Number(process.env.password) || 27017,
            username: process.env.username || "root",
            host: process.env.host || "localhost",
            dbName: process.env.dbName || "test"
        });
        let router = http.newRouter();
        const uRepository = repository.UserRepository.Setup(db);
        const uInteractor = _interactor_1.UserInteractor.Setup(uRepository);
        const handlers = http.UserController.Setup(uInteractor);
        const routes = http.UserRoutes.RegisterRoutes(handlers, router);
        http.newServer(routes).listen(3000, () => {
            console.log("server is runnnig");
        });
    }
    catch (e) {
        console.log("e");
    }
}
bootstrap();
