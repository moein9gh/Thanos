import {Server} from "ws";
import {WEBSOCKET_EVENTS} from "@types";
import {APP_CONFIG} from "@config";

export class Websocket{
    constructor() {
    }

    static NewServer(){
        const ws = new Server({ port: APP_CONFIG.websocketServerPort });

        ws.on(WEBSOCKET_EVENTS.LISTENING, () => {
            console.log('websocket server is listening on',APP_CONFIG.websocketServerPort);
        });

        ws.on(WEBSOCKET_EVENTS.CONNECTION, (ws) => {
            console.log();
            ws.on(WEBSOCKET_EVENTS.CLOSE, () => console.log());
        });
    }
}

