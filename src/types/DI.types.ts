import { UserInteractor } from "@interactor";
import { GraphQLServer, HttpServer, Middlewares } from "@gateway";

export const TYPES = {
  APP_CONFIG: Symbol.for("APP_CONFIG"),
  DocGenerator: Symbol.for("DocGenerator"),
  Postgres: Symbol.for("Postgres"),
  Migrator: Symbol.for("Migrator"),
  UserRouter: Symbol.for("UserRouter"),
  AuthRouter: Symbol.for("AuthRouter"),
  UserRoutes: Symbol.for("UserRoutes"),
  AuthRoutes: Symbol.for("AuthRoutes"),
  RootRouter: Symbol.for("RootRouter"),
  UserRepository: Symbol.for("UserRepository"),
  AuthRepository: Symbol.for("AuthRepository"),
  UserInteractor: Symbol.for("UserInteractor"),
  AuthInteractor: Symbol.for("AuthInteractor"),
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  Middlewares: Symbol.for("Middlewares"),
  HttpServer: Symbol.for("HttpServer"),
  GrpcServer: Symbol.for("GrpcServer"),
  GraphQLServer: Symbol.for("GraphQLServer"),
  WebsocketServer: Symbol.for("WebsocketServer")
};
