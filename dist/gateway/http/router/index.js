"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRouter = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
function newRouter() {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use((0, helmet_1.default)());
    router.use((0, cors_1.default)({
        methods: "*",
        origin: "*"
    }));
    return router;
}
exports.newRouter = newRouter;
