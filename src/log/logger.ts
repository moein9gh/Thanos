import log from "npmlog";
import { APP_CONFIG } from "@config";
import { injectable } from "inversify";

// const access = fs.createWriteStream(path.resolve("src", "log", "access.log"), {
//     flags: "a"
//   }),
//   error = fs.createWriteStream(path.resolve("src", "log", "access.log"), {
//     flags: "a"
//   });
@injectable()
export class Logger {
  constructor() {}

  print = (prefix: string, error: Error | null, message: string, data: {} | null = null) => {
    if (APP_CONFIG.debugMode) {
      //uncomment for saving to the file
      // log.stream = access;

      if (!log.stream.path) {
        log.enableColor();
      }

      if (error) {
        log.prefixStyle = { fg: "red" };

        log.error(
          prefix,
          `workerId : ${process.pid} / ${message} ${data ? JSON.stringify(data) : ""}`
        );
      } else {
        log.prefixStyle = { fg: "green" };
        log.info(
          prefix,
          `workerId : ${process.pid} / ${message} ${data ? JSON.stringify(data) : ""}`
        );
      }
    }
  };
}
