/*
    resolve default defined paths in package.json
*/

import * as dotenv from "dotenv";
import { GraphQLServer, GrpcServer, HttpServer, Websocket } from "@gateway";
import { Logger } from "@log";
import { DI } from "@DI";
import { TYPES } from "@types";
import { Migrator } from "@migrations";
import { PREFIXES } from "@log";

dotenv.config({
  path: process.cwd() + "/src/env/.env"
});
const logger = DI.get<Logger>(TYPES.Logger);
export async function bootstrap() {
  try {
    await DI.get<Migrator>(TYPES.Migrator).createDatabase();
  } catch (e) {
    logger.print(PREFIXES.SERVE, e as Error, "error occurred while creating database", e);
  }

  try {
    await DI.get<Migrator>(TYPES.Migrator).execMigrations();

    DI.get<GraphQLServer>(TYPES.GraphQLServer).listen();

    DI.get<HttpServer>(TYPES.HttpServer).listen();

    DI.get<Websocket>(TYPES.WebsocketServer).newServerOnSamePort();

    DI.get<GrpcServer>(TYPES.GrpcServer).listen();
  } catch (e) {
    logger.print(PREFIXES.SERVE, e as Error, (e as Error).message);
  }
}
