import { queryGroup } from "@src/service/chat/group";
import { subscribe } from "./dispatcher";
import { MessageType, NewMessagePayload } from "./message";

export default async function (ctx) {
    console.log("onConnection", ctx)
    const accountId = ctx.account.id;
    const groups = await queryGroup(accountId)
    // console.log(groups)
    // 找到所有groupId
    groups.forEach(g => {
        const sid = subscribe(g.id, (msg) => {
            ctx.send("NewMessage" as MessageType, msg as NewMessagePayload)
        })
        ctx.subscribers.push(sid);
    });
}