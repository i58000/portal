import $store from "@/store";
import {
  createMessage,
  Message,
  MessageType,
  QueryMessagePayload,
  ReadMessagePayload,
  SendMessagePayload
} from "@/models/message";
import Account from "@/models/Account";

let ws: WebSocket;

const msgReadyToSend = new Array<string>();

const _send = (msg: Message) => {
  console.log("send: ", msg);
  if (!ws) {
    console.warn("!ws");
    return;
  }
  const msgstr = JSON.stringify(msg)
  if (ws.readyState !== 1) {
    msgReadyToSend.push(msgstr);
    return
  }
  if (msgReadyToSend.length > 0) {
    msgReadyToSend.forEach((str: string) => {
      ws.send(str)
    })
  }
  ws.send(msgstr);

};
const _subscribers: any = {};

export const connect = (): WebSocket => {
  ws = new WebSocket("ws://localhost:3002/");
  ws.onopen = () => {
    console.log('open', ws)
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
  }
  ws.onclose = () => {
    console.log('close', ws)
  }

  // _test();

  return ws;
};

export const disconnect = () => {
  ws && ws.close();
};

export const queryMessage = async (payload: QueryMessagePayload) => {
  _send(createMessage("QueryMessage", payload));

  return;
  // test
  const { beforeTimestamp, count, groupId, read } = payload;
  const handlers = _subscribers["NewMessage"];
  for (const i in handlers) {
    const h = handlers[i];

    // mock查询未读
    if (read === false) {
      h({
        id: __newmsgid++,
        group: { id: groupId, title: "group.title mock查询未读" },
        content: "content-mock查询未读-" + Math.random(),
        account: {
          username: "mock查询未读",
          nickname: "mock查询未读",
          id: 123
        } as Account,
        timestamp: new Date().getTime()
      });
    } else if (beforeTimestamp === undefined) {
      // mock点击切换group查询
      h({
        id: __newmsgid++,
        group: { id: groupId },
        content: "content-mock点击切换group查询-" + Math.random(),
        account: {
          username: "mock点击切换group查询",
          nickname: "mock点击切换group查询",
          id: 123
        } as Account,
        timestamp: new Date().getTime()
      });
    } else {
      // mock点击加载loadmore
      h({
        id: __newmsgid++,
        group: { id: groupId },
        content: "content-mock点击加载loadmore-" + Math.random(),
        account: {
          username: "mock点击加载loadmore",
          nickname: "mock点击加载loadmore",
          id: 123
        } as Account,
        timestamp: (beforeTimestamp as any) - 1000
      });

      const sysHandlers = _subscribers["System"];
      for (const si in sysHandlers) {
        const sh = sysHandlers[si];
        sh({
          code: 1001,
          description: "load message no more",
          data: {
            groupId
          }
        });
      }
    }
  }
};

export const readMessage = async (payload: ReadMessagePayload) => {
  // await _sleep(2000);
  _send(createMessage("ReadMessage", payload));
};

export const sendMessage = async (payload: SendMessagePayload) => {
  // await _sleep(2000);

  _send(createMessage("SendMessage", payload));

  // test
  // const { groupId, content, timestamp } = payload;
  // const handlers = _subscribers["NewMessage"];
  // for (const i in handlers) {
  //   const h = handlers[i];
  //   h({
  //     id: __newmsgid++,
  //     group: { id: groupId },
  //     content: content,
  //     account: {
  //       username: $store.account?.username,
  //       nickname: $store.account?.nickname,
  //       id: $store.account?.id
  //     } as Account,
  //     timestamp: timestamp
  //   });
  // }

  // fixme
  return true;
};
let __newmsgid = 1000;

export const onmessage = (type: MessageType, handler: Function) => {
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

let __msgid = 2000;
const groupIds = [111, 222];
const accountIds = [111, 222];

const _test = async () => {
  // test
  setInterval(() => {
    const groupId = groupIds[Math.floor(Math.random() * 2)];
    const accountId = accountIds[Math.floor(Math.random() * 2)];

    const handlers = _subscribers["NewMessage"];
    for (const i in handlers) {
      const h = handlers[i];
      __msgid++;
      h({
        id: __msgid,
        group: {
          id: groupId,
          title: "group-" + groupId
        },
        content: "content" + __msgid + "----" + groupId,
        account: {
          username: "admin",
          nickname: "Admin" + accountId,
          id: accountId
        },
        timestamp: new Date().getTime()
      });
    }
  }, 2000);
};
