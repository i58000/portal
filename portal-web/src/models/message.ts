import Account from "./Account";

export interface Group {
  id: number;
  title?: string;
}

export type MessageType =
  // client
  | "QueryMessage"
  | "SendMessage"
  | "ReadMessage"
  | "Request"
  // server
  | "Response"
  | "NewMessage"
  | "System";

type MessageOrigin = "client" | "server";

export interface QueryMessagePayload {
  groupId?: Group["id"];
  read?: boolean;
  beforeTimestamp?: number;
  afterTimestamp?: number;
  count?: number;
}

export interface SendMessagePayload {
  groupId: Group["id"];
  content: string;
  timestamp: number;
}

export interface ReadMessagePayload {
  groupId: Group["id"];
  beforeTimestamp: number;
}

export interface NewMessagePayload {
  id: number;
  group: Group;
  content: string;
  account: Account;
  timestamp: number;
}

export interface SystemPayload {
  code: number;
  description: string;
  data?: any;
}

export interface RequestPayload {
  requestId: number;
  resourceId: string;
  data?: any;
}

export interface ResponsePayload {
  requestId: number;
  resourceId: string;
  status: 200 | 400 | 403 | 401 | 404 | 500;
  data?: any;
}

type Payload =
  | QueryMessagePayload
  | SendMessagePayload
  | ReadMessagePayload
  | SystemPayload
  | RequestPayload;

export interface Message {
  type: MessageType;
  origin: MessageOrigin;
  timestamp: number;
  payload: Payload;
}

export const createMessage = (type: MessageType, payload: Payload): Message => {
  const msg: Message = {
    type,
    origin: "client",
    timestamp: new Date().getTime(),
    payload
  };
  return msg;
};
