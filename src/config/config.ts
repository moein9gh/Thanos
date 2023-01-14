import {CONFIG} from "./type";
import path from "path";

export const APP_CONFIG: CONFIG = {
    host: process.env.MONGO_HOST || "mongo",
    port: process.env.MONGO_CONTAINER_PORT || 27017,
    username: process.env.MONGO_USERNAME || "root",
    password: process.env.MONGO_PASSWORD || "example",
    dbName: process.env.MONGO_DB || "myCollection",
    httpServerPort: process.env.HTTP_SERVER_CONTAINER_PORT || 3000,
    websocketServerPort: process.env.WEBSOCKET_SERVER_CONTAINER_PORT || 4000,
    grpcServerPort: process.env.GRPC_SERVER_CONTAINER_PORT || 5000,
    logFormat: "HTTP {{req.method}} {{req.url}}",
    staticFolder: path.resolve("src", "static"),
    postgresHost: process.env.PG_HOST || "postgres",
    postgresPort: process.env.PG_CONTAINER_PORT || 5432,
    postgresUsername: process.env.PG_USERNAME || "postgres",
    postgresPassword: process.env.PG_PASSWORD || "changeme",
    postgresDbName: process.env.PG_HOST || "myCollection",
    jwtSecretKey: process.env.JWT_SECRET_KEY || "veryStrongKey:)",
};
