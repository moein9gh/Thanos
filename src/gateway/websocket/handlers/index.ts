import {EVENTS} from "@gateway";

export function onMessage(event) {
    const data = JSON.parse(event.data)
    switch (data.action) {
        case EVENTS.PING :
            console.log("PING action")

        case EVENTS.PING :
            console.log("PONG action")

    }
}