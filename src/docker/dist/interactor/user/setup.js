"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractor = void 0;
class UserInteractor {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    static Setup(userRepository) {
        return new UserInteractor(userRepository);
    }
    create() {
        console.log("create UserInteractor");
        this.userRepository.create();
    }
}
exports.UserInteractor = UserInteractor;
