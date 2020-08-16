import { Message, QueryMessagePayload, ReadMessagePayload, SendMessagePayload, createMessage, NewMessagePayload, MessageType } from "./message";
import { queryMessage, readMessage, sendMessage } from '@src/service/chat/message'
import { dispatch } from './dispatcher'
import ChatMessage from "@src/entity/ChatMessage";

export default async function onMessage(ctx, msgstr) {
    console.log('server receive msg：', ctx, msgstr);

    const msg: Message = JSON.parse(msgstr);

    const { payload, type } = msg;
    const account = ctx.account

    switch (type) {
        case "QueryMessage":
            let results = await queryMessage(payload as QueryMessagePayload, account)
            results.forEach(pl => {
                ctx.send("NewMessage", pl)
            })
            break;
        case "ReadMessage":
            readMessage(payload as ReadMessagePayload, account)
            break;
        case "SendMessage":
            const newMsg: ChatMessage = await sendMessage(payload as SendMessagePayload, account);
            // console.log("SendMessage", newMsg)
            const { groupId } = payload as SendMessagePayload;
            const pl = {
                id: newMsg.id,
                group: newMsg.group,
                content: newMsg.content,
                account: newMsg.account,
                timestamp: newMsg.timestamp.getTime()
            } as NewMessagePayload
            dispatch(groupId, pl)
            break;
    }
}