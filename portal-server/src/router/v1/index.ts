import * as KoaRouter from "koa-router";

import account from "./account";
import about from "./about";
import chat from "./chat";
import article from "./article";
import tag from "./tag";

const router = new KoaRouter();

router.use("/account", account);
router.use("/about", about);
router.use("/chat", chat);
router.use("/article", article);
router.use("/tag", tag);

router.get("/", (ctx, next) => {
  ctx.body = "v1";
  next();
});

export default router.routes();
