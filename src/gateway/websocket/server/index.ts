import {Server} from "ws";
import {WEBSOCKET_EVENTS} from "@types";

export class Websocket{
    constructor() {
    }

    static NewServer(){
        const sockserver = new Server({ port: process.env.WEBSOCKET_SERVER_LOCAL_PORT });

        sockserver.on(WEBSOCKET_EVENTS.LISTENING, () => {
            console.log('websocket server is listening on',process.env.WEBSOCKET_SERVER_LOCAL_PORT);
        });

        sockserver.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
            console.log();
            ws.on(WEBSOCKET_EVENTS.CLOSE, () => console.log());
        });
    }
}

