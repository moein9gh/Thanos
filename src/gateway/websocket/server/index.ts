import { Server } from "ws";
import { TYPES, WEBSOCKET_EVENTS } from "@types";
import { APP_CONFIG } from "@config";
import { HttpServer, onMessage } from "@gateway";
import { Logger } from "@log";
import { inject, injectable } from "inversify";
import { PREFIXES } from "@log";

@injectable()
export class Websocket {
  constructor(
    @inject(TYPES.HttpServer) private httpServer: HttpServer,
    @inject(TYPES.Logger) private logger: Logger
  ) {}

  NewServerOnSpecificPort() {
    const ws = new Server({ port: APP_CONFIG.websocketServerPort });

    ws.on("listening", () => {
      this.logger.print(
        PREFIXES.WEBSOCKET_SERVER,
        null,
        "websocket server is listening on " + APP_CONFIG.websocketServerPort
      );
    });

    ws.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
      this.logger.print(PREFIXES.WEBSOCKET_SERVER, null, "websocket new connection");

      ws.on(WEBSOCKET_EVENTS.CLOSE, () =>
        this.logger.print(PREFIXES.WEBSOCKET_SERVER, null, "connection closed")
      );
      ws.onmessage = onMessage;
    });
  }

  newServerOnSamePort() {
    try {
      const wsServer = new Server({ noServer: true });

      this.logger.print(
        PREFIXES.WEBSOCKET_SERVER,
        null,
        "websocket server is listening on " + APP_CONFIG.websocketServerPort
      );

      this.httpServer.getServer()?.on("upgrade", async (req, socket, head) => {
        try {
          wsServer.handleUpgrade(req, socket, head, (websocket) => {
            wsServer.emit("connection", websocket, req);
          });
        } catch (err: any) {
          this.logger.print(
            PREFIXES.WEBSOCKET_SERVER,
            err,
            "websocket server error " + err.message
          );
        }
      });

      wsServer.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
        this.logger.print(PREFIXES.WEBSOCKET_SERVER, null, "websocket new connection");

        ws.on(WEBSOCKET_EVENTS.CLOSE, () =>
          this.logger.print(PREFIXES.WEBSOCKET_SERVER, null, "websocket connection closed")
        );
        ws.onmessage = onMessage;
      });
    } catch (e: any) {
      this.logger.print(PREFIXES.WEBSOCKET_SERVER, e, "websocket server error " + e.message);
    }
  }
}
