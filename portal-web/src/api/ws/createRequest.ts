import {
  createMessage,
  RequestPayload,
  ResponsePayload
} from "@/models/message";
import { on } from "./index";

interface RequestHandler {
  requestId: number;
  resolve: Function;
  reject: Function;
}

let _requestId = 0;
const _requestHandlers = new Array<RequestHandler>();

on("Response", (payload: ResponsePayload) => {
  const requestId = payload.requestId;
  const i = _requestHandlers.findIndex(x => x.requestId === requestId);
  if (i === -1) {
    console.warn("unknown request id");
    return;
  }
  const h = _requestHandlers[i];
  const data = payload.data;
  const status = payload.status;

  if (status === 200) {
    h.resolve(data);
  } else {
    h.reject(data);
  }
});

export default function createRequest(resourceId: string, data: any) {
  const requestId = _requestId++;
  let timer: number;
  return {
    message: createMessage("Request", {
      requestId,
      resourceId,
      data
    } as RequestPayload),

    response: new Promise((resolve, reject) => {
      const h = {
        requestId,
        resolve,
        reject
      };
      _requestHandlers.push(h);
      // 定时器
      timer = setTimeout(() => {
        reject("timeout");
      }, 10000);
    })
      // 最后维护数组
      .finally(() => {
        clearTimeout(timer);
        const i = _requestHandlers.findIndex(x => x.requestId === requestId);
        if (i > -1) _requestHandlers.slice(i, 1);
      })
  };
}
