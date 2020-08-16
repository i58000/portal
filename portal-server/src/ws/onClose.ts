import { unsubscribe } from "./dispatcher";

export default function (ctx) {
    console.log("onclose", ctx)
    console.log("unsubscribe", ctx.subscribers)
    ctx.subscribers.forEach(sid => {
        unsubscribe(sid)
    });
}