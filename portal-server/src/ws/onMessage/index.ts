import {
  Message,
  QueryMessagePayload,
  ReadMessagePayload,
  SendMessagePayload,
  NewMessagePayload,
  RequestPayload,
  MessageType
} from "../message";
import {
  queryMessage,
  readMessage,
  sendMessage
} from "@src/service/chat/message";
import { dispatch } from "../dispatcher";
import ChatMessage from "@src/entity/ChatMessage";

import onRequest from "./onRequest";

export default async function onMessage(ctx, msgstr) {
  console.log("server receive msg：", ctx, msgstr);
  const { payload, type }: Message = JSON.parse(msgstr);

  switch (type) {
    case "Request":
      onRequest(payload as RequestPayload, ctx);
      break;
    case "QueryMessage":
      onQueryMessage(payload as QueryMessagePayload, ctx);
      break;
    case "ReadMessage":
      onReadMessage(payload as ReadMessagePayload, ctx);
      break;
    case "SendMessage":
      onSendMessage(payload as SendMessagePayload, ctx);
      break;
  }
}

const onQueryMessage = async (payload: QueryMessagePayload, ctx) => {
  let results = await queryMessage(payload, ctx.account);
  results.forEach(pl => {
    ctx.send("NewMessage", pl);
  });
};

const onReadMessage = async (payload: ReadMessagePayload, ctx) => {
  readMessage(payload, ctx.account);
};

const onSendMessage = async (payload: SendMessagePayload, ctx) => {
  const account = ctx.account;
  const newMsg: ChatMessage = await sendMessage(
    payload as SendMessagePayload,
    account
  );
  // console.log("SendMessage", newMsg)
  const { groupId } = payload;
  const pl = {
    id: newMsg.id,
    group: newMsg.group,
    content: newMsg.content,
    account: newMsg.account,
    timestamp: newMsg.timestamp.getTime()
  } as NewMessagePayload;

  dispatch(groupId, {
    type: "NewMessage" as MessageType,
    payload: pl as NewMessagePayload
  });
};
