import {EVENTS} from "@gateway";

export function onMessage(event) {
    switch (event.data.action) {
        case EVENTS.PING :
            console.log("PING action")

        case EVENTS.PING :
            console.log("PONG action")

    }
}