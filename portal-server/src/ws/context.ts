import * as JWT from "jsonwebtoken";

import { TOKEN_SECRET, TOKEN_COOKIE_KEY } from "@config/index";
import {
  createMessage,
  NewMessagePayload,
  SystemPayload,
  MessageType
} from "./message";
import Account from "@src/entity/Account";

export interface Context {
  send: Function;
  account: Account;
  subscribers: Array<number>;
}

export function getContext(client): Context {
  const ctx = client._socket.ctx;
  ctx.send = (
    type: MessageType,
    payload: NewMessagePayload | SystemPayload
  ) => {
    const msg = createMessage(type, payload);
    client.send(JSON.stringify(msg));
  };
  ctx.subscribers = [];
  return ctx;
}

export function verifyClient(info) {
  // console.log("info", info);
  const token = getCookie(TOKEN_COOKIE_KEY, info.req.headers.cookie);
  if (!token) return false;
  const account = JWT.verify(token, TOKEN_SECRET);
  if (!account) return false;

  info.req.socket.ctx = {
    account
  };
  return true;

  // info.req.socket.ctx = {
  //   account: {
  //     username: "uuu",
  //     nickname: "nnn",
  //     id: 123
  //   }
  // };
  // return true;
}

function getCookie(cname, cookie) {
  var name = cname + "=";
  var ca = cookie?.split(";");
  if (!ca) return "";
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
