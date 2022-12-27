"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newServer = void 0;
const express_1 = __importDefault(require("express"));
function newServer(routes) {
    return (0, express_1.default)().use(routes);
}
exports.newServer = newServer;
