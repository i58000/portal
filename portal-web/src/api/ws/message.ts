import { send } from "./index";
import {
  createMessage,
  QueryMessagePayload,
  ReadMessagePayload,
  SendMessagePayload
} from "@/models/message";

export const queryMessage = async (payload: QueryMessagePayload) => {
  send(createMessage("QueryMessage", payload));
};

export const readMessage = async (payload: ReadMessagePayload) => {
  send(createMessage("ReadMessage", payload));
};

export const sendMessage = async (payload: SendMessagePayload) => {
  send(createMessage("SendMessage", payload));
};
