"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
class UserRoutes {
    static RegisterRoutes(userHandlers, router) {
        router.get("/", userHandlers.create);
        router.get("/sayHi", userHandlers.sayHi);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
