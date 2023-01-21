import "./pathResolver";
// import "./tracer";
import "reflect-metadata";
import cluster from "cluster";
import { bootstrap } from "./serve";
import os from "os";
import { Logger } from "@log";
import { APP_CONFIG } from "@config";
import { DI } from "@DI";
import { TYPES } from "@types";
import { PREFIXES } from "@log";
const totalCPUs = os.cpus().length;
const logger = DI.get<Logger>(TYPES.Logger);
if (APP_CONFIG.clusterMode) {
  if (cluster.isPrimary) {
    logger.print(PREFIXES.CLUSTER, null, `CLUSTER MODE SET ${APP_CONFIG.clusterMode}`);
    logger.print(PREFIXES.CLUSTER, null, `Number of CPUs is ${totalCPUs}`);
    logger.print(PREFIXES.CLUSTER, null, `Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.print(PREFIXES.CLUSTER, null, `Worker ${process.pid} died`);
      cluster.fork();
    });
  } else {
    bootstrap().then();
    logger.print(PREFIXES.CLUSTER, null, `new worker ${process.pid} started`);
  }
} else {
  logger.print(PREFIXES.CLUSTER, null, `DEBUG MODE SET ${APP_CONFIG.debugMode}`);

  bootstrap().then();
}
