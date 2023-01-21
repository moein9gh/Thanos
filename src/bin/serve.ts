/*
    resolve default defined paths in package.json
*/

import * as dotenv from "dotenv";
import { Postgres } from "@store";
import * as gateway from "@gateway";
import { HttpServer, Router } from "@gateway";
import { CONFIG } from "@config";
import { Logger } from "@log";
import { DI } from "@DI";
import { TYPES } from "@types";
import { Migrator } from "@migrations";

dotenv.config({
  path: process.cwd() + "/src/env/.env"
});

export async function bootstrap() {
  try {
    await Migrator.createDatabase(DI.get<CONFIG>(TYPES.APP_CONFIG));
  } catch (e) {
    new Logger("POSTGRES", e as Error, "error occurred while creating database", e);
  }

  try {
    const migrator = new Migrator(DI.get<Postgres>(TYPES.Postgres));

    await migrator.execMigrations();

    gateway.GraphQLServer.NewServer(DI.get<Router>(TYPES.RootRouter));

    DI.get<HttpServer>(TYPES.HttpServer).listen();

    gateway.Websocket.NewServerOnSamePort(DI.get<HttpServer>(TYPES.HttpServer).getServer()!);

    gateway.GrpcServer.NewServer();
  } catch (e) {
    new Logger("SERVE", e as Error, (e as Error).message);
  }
}
