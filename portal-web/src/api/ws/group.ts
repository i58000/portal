import { send } from "./index";
import createRequest from "./createRequest";
import $store from "@/store";
import Account from "@/models/Account";

export const queryGroup = async () => {
  const { message, response } = createRequest("queryGroup", {});
  send(message);
  return ((await response) as any).groups;
};

export const createGroup = async (accounts: Array<Account>) => {
  console.log("api createGroup", accounts);
  let title = $store.account?.nickname || "";
  for (let index = 0; index < accounts.length && index < 4; index++) {
    const acc = accounts[index];
    title += " " + acc.nickname;
  }

  const { message, response } = createRequest("createGroup", {
    accounts,
    title
  });
  send(message);
  return ((await response) as any).group;
};
