import "./pathResolver";
// import "./tracer";
import cluster from "cluster";
import { bootstrap } from "./serve";
import os from "os";
import { Logger } from "@log";
import { APP_CONFIG } from "@config";
const totalCPUs = os.cpus().length;

if (APP_CONFIG.clusterMode) {
  if (cluster.isPrimary) {
    new Logger("CLUSTER", null, `CLUSTER MODE SET ${APP_CONFIG.clusterMode}`);
    new Logger("CLUSTER", null, `Number of CPUs is ${totalCPUs}`);
    new Logger("CLUSTER", null, `Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      new Logger("CLUSTER", null, `Worker ${process.pid} died`);
      cluster.fork();
    });
  } else {
    bootstrap().then();
    new Logger("CLUSTER", null, `new worker ${process.pid} started`);
  }
} else {
  new Logger("CLUSTER", null, `DEBUG MODE SET ${APP_CONFIG.debugMode}`);

  bootstrap().then();
}
