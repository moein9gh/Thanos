import log from "npmlog";
import { APP_CONFIG } from "@config";
import fs from "fs";
import path from "path";

const access = fs.createWriteStream(path.resolve("src", "log", "access.log"), {
    flags: "a"
  }),
  error = fs.createWriteStream(path.resolve("src", "log", "access.log"), {
    flags: "a"
  });

export class Logger {
  constructor(prefix: string, error: Error | null, message: string, data: {} | null = null) {
    if (APP_CONFIG.debugMode) {
      //uncomment for saving to the file
      // log.stream = access;

      if (!log.stream.path) {
        log.enableColor();
      }

      if (error) {
        log.prefixStyle = { fg: "red" };

        log.error(prefix, `${message} ${data ? JSON.stringify(data) : ""}`);
      } else {
        log.prefixStyle = { fg: "green" };
        log.info(prefix, `${message} ${data ? JSON.stringify(data) : ""}`);
      }
    }
  }
}
