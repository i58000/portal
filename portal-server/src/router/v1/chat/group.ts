import * as KoaRouter from "koa-router";
import { queryGroup, createGroup } from "@src/service/chat/group";

const router = new KoaRouter();

router.get("/", async (ctx, next) => {
  const groups = await queryGroup(ctx.session.account.id);
  ctx.body = { groups };

  next();
});

router.post("/", async (ctx, next) => {
  const cur = ctx.session.account;
  const { accounts, title } = ctx.request.body;
  accounts.push(cur);
  const group = await createGroup(accounts, title);

  ctx.body = { group };

  next();
});

export default router.routes();
