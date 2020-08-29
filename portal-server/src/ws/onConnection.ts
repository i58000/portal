import { queryGroup } from "@src/service/chat/group";
import { signIn } from "./dispatcher";

export default async function(ctx) {
  console.log("onConnection", ctx);
  const accountId = ctx.account.id;

  // 订阅group消息
  const groups = await queryGroup(accountId);
  // 找到所有groupId
  const groupIds = groups.map(x => x.id);
  signIn(ctx, groupIds);
}
