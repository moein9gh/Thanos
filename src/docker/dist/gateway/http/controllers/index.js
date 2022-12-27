"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userInteractor) {
        this.userInteractor = userInteractor;
        this.create = (req, res) => {
            try {
                console.log("create UserController");
                this.userInteractor.create();
                res.send("hi");
            }
            catch (e) {
                console.log(12, e);
            }
        };
    }
    static Setup(userInteractor) {
        return (new UserController(userInteractor));
    }
    sayHi(req, res) {
        res.send("/sayHi");
    }
}
exports.UserController = UserController;
