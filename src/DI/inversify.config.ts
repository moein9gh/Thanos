import { Container } from "inversify";
import { TYPES } from "@types";
import { APP_CONFIG, CONFIG } from "@config";
import { DocGenerator } from "@doc";
import { Postgres } from "@store";
import { Migrator } from "@migrations";
import {
  AuthController,
  AuthRoutes,
  GraphQLServer,
  GrpcServer,
  HttpServer,
  Middlewares,
  Router,
  UserController,
  UserRoutes,
  Websocket
} from "@gateway";
import { PgAuthRepository, PgUserRepository } from "@repository";
import {
  IAuthController,
  IAuthInteractor,
  IAuthRepository,
  IUserController,
  IUserInteractor,
  IUserRepository
} from "@ports";
import { AuthInteractor, UserInteractor } from "@interactor";

const DI = new Container();

DI.bind<CONFIG>(TYPES.APP_CONFIG).toConstantValue(APP_CONFIG);
DI.bind<DocGenerator>(TYPES.DocGenerator).to(DocGenerator);
DI.bind<Postgres>(TYPES.Postgres).to(Postgres).inSingletonScope();
DI.bind<Migrator>(TYPES.Migrator).to(Migrator).inSingletonScope();

DI.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes).inSingletonScope();
DI.bind<AuthRoutes>(TYPES.AuthRoutes).to(AuthRoutes).inSingletonScope();

DI.bind<Router>(TYPES.UserRouter).to(Router).inSingletonScope();
DI.bind<Router>(TYPES.AuthRouter).to(Router).inSingletonScope();
DI.bind<Router>(TYPES.RootRouter).to(Router).inSingletonScope();

DI.bind<IUserRepository>(TYPES.UserRepository).to(PgUserRepository).inSingletonScope();
DI.bind<IAuthRepository>(TYPES.AuthRepository).to(PgAuthRepository).inSingletonScope();

DI.bind<IUserInteractor>(TYPES.UserInteractor).to(UserInteractor).inSingletonScope();
DI.bind<IAuthInteractor>(TYPES.AuthInteractor).to(AuthInteractor).inSingletonScope();

DI.bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
DI.bind<IAuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();

DI.bind<HttpServer>(TYPES.HttpServer).to(HttpServer).inSingletonScope();
DI.bind<Websocket>(TYPES.WebsocketServer).to(Websocket).inSingletonScope();

DI.bind<Middlewares>(TYPES.Middlewares).to(Middlewares).inSingletonScope();
DI.bind<GrpcServer>(TYPES.GrpcServer).to(GrpcServer).inSingletonScope();
DI.bind<GraphQLServer>(TYPES.GraphQLServer).to(GraphQLServer).inSingletonScope();

export { DI };
