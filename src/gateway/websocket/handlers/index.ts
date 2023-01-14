import {EVENTS} from "@gateway";

export function onMessage(event) {
    const data = JSON.parse(event.data);


    switch (data.action) {
    case EVENTS.PING :
        break;
    case EVENTS.PONG :
        break;
    }
}