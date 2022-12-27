"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(store) {
        this.store = store;
    }
    static Setup(db) {
        return new UserRepository(db);
    }
    create() {
        this.store.db.collection("user").insertOne({ username: "hi" });
        console.log("create UserRepository");
    }
    read() { }
    update() { }
    delete() { }
}
exports.UserRepository = UserRepository;
