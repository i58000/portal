import { RequestPayload, ResponsePayload, MessageType } from "../message";
import { queryGroup, createGroup } from "@src/service/chat/group";
import { addSubscriber } from "../dispatcher";

export default async (payload: RequestPayload, ctx) => {
  const { requestId, resourceId, data: requestData } = payload;
  let responseData: any = {};
  try {
    switch (resourceId) {
      case "queryGroup":
        responseData = await onQueryGroup(requestData, ctx);
        break;
      case "createGroup":
        responseData = await onCreateGroup(requestData, ctx);
        break;
      case "deleteGroup":
        // responseData = await onCreateGroup(requestData, ctx);
        break;
      case "updateGroup":
        // responseData = await onCreateGroup(requestData, ctx);
        break;
    }
    console.log("responseData", responseData);
    ctx.send(
      "Response" as MessageType,
      {
        status: 200,
        requestId,
        resourceId,
        data: responseData
      } as ResponsePayload
    );
  } catch (err) {
    ctx.send(
      "Response" as MessageType,
      {
        status: 500,
        requestId,
        resourceId,
        data: err
      } as ResponsePayload
    );
  }
};

const onQueryGroup = async (data, ctx) => {
  const accountId = ctx.account.id;
  const groups = await queryGroup(accountId);
  return { groups };
};

const onCreateGroup = async (data, ctx) => {
  const cur = ctx.account;
  const { accounts, title } = data;
  accounts.push(cur);
  const group = await createGroup(accounts, title);

  const accountIds = group.accounts.map(x => x.id);
  addSubscriber(accountIds, group.id);

  return { group };
};
