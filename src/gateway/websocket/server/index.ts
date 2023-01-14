import {Server} from "ws";
import {WEBSOCKET_EVENTS} from "@types";
import {APP_CONFIG} from "@config";
import {onMessage} from "@gateway";
import http from "http";

export class Websocket {
    constructor() {
    }

    static NewServerOnSpecificPort() {
        const ws = new Server({port: APP_CONFIG.websocketServerPort});

        ws.on(WEBSOCKET_EVENTS.LISTENING, () => {
            // console.log('websocket server is listening on', APP_CONFIG.websocketServerPort);
        });

        ws.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
            // console.log("websocket new connection");
            ws.on(WEBSOCKET_EVENTS.CLOSE, () => true/*console.log("websocket connection closed")*/);
            ws.onmessage = onMessage;
        });
    }

    static NewServerOnSamePort(httpServer: http.Server) {
        const wsServer = new Server({noServer: true});

        httpServer.on("upgrade", async (req, socket, head) => {
            try {
                wsServer.handleUpgrade(req, socket, head, (websocket) => {
                    wsServer.emit("connection", websocket, req);
                });
            } catch (err: any) {
            }
        });

        wsServer.on(WEBSOCKET_EVENTS.LISTENING, () => {
            // console.log('websocket server is listening on', APP_CONFIG.websocketServerPort);
        });

        wsServer.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
            // console.log("websocket new connection");
            ws.on(WEBSOCKET_EVENTS.CLOSE, () => true/*console.log("websocket connection closed")*/);
            ws.onmessage = onMessage;
        });
    }
}

