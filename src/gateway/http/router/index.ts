import express from "express";
import { injectable } from "inversify";
import { IRouter } from "@ports";

@injectable()
export class Router implements IRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
  }

  // static NewRouter(): Router {
  //     return new Router(router);
  // }

  getRouter = (): express.Router => this.router;
}
