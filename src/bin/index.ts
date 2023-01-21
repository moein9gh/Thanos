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
const totalCPUs = os.cpus().length;
const logger = DI.get<Logger>(TYPES.Logger);
if (APP_CONFIG.clusterMode) {
  if (cluster.isPrimary) {
    logger.print("CLUSTER", null, `CLUSTER MODE SET ${APP_CONFIG.clusterMode}`);
    logger.print("CLUSTER", null, `Number of CPUs is ${totalCPUs}`);
    logger.print("CLUSTER", null, `Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.print("CLUSTER", null, `Worker ${process.pid} died`);
      cluster.fork();
    });
  } else {
    bootstrap().then();
    logger.print("CLUSTER", null, `new worker ${process.pid} started`);
  }
} else {
  logger.print("CLUSTER", null, `DEBUG MODE SET ${APP_CONFIG.debugMode}`);

  bootstrap().then();
}
