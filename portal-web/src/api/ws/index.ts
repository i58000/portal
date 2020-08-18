import { Message, MessageType } from "@/models/message";

let ws: WebSocket;

let _msgRdyToSend = new Array<string>();
export const send = (msg: Message) => {
  if (!ws) {
    console.warn("!ws");
    return;
  }
  const msgstr = JSON.stringify(msg);
  if (ws.readyState !== 1) {
    console.log("rdyToSend: ", msg);
    _msgRdyToSend.push(msgstr);
    return;
  }
  _sendMsgRdyToSend();
  ws.send(msgstr);
  console.log("send: ", msg);
};
const _sendMsgRdyToSend = () => {
  if (_msgRdyToSend.length === 0) return;
  if (!ws) return
  for (let index = 0; index < _msgRdyToSend.length; index++) {
    const str = _msgRdyToSend[index];
    ws.send(str);
  }
  _msgRdyToSend = [];
};
setInterval(_sendMsgRdyToSend, 1000);

const _subscribers: any = {};
export const connect = (): WebSocket => {
  ws = new WebSocket("ws://localhost:3002/");
  ws.onopen = () => {
    console.log("open", ws);
    ws.onmessage = event => {
      // console.log('recv', event.data)
      const msg: Message = JSON.parse(event.data);
      console.log("recv: ", msg);
      const handlers = _subscribers[msg.type];
      for (const i in handlers) {
        const h = handlers[i];
        h(msg.payload);
      }
    };
  };
  ws.onclose = () => {
    console.log("close", ws);
  };
  return ws;
};

export const disconnect = () => {
  ws && ws.close();
};

export const on = (type: MessageType, handler: Function) => {
  if (!_subscribers[type]) {
    _subscribers[type] = [];
  }
  _subscribers[type].push(handler);
};

const _sleep = (time: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
