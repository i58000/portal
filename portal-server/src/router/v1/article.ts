import * as KoaRouter from "koa-router";

import {
  queryArticle,
  createArticle,
  deleteArticle,
  updateArticle
} from "@src/service/article";

const router = new KoaRouter();

router.get("/", async (ctx, next) => {
  console.log("get query", ctx.request.query);
  let { id, tags, pager, title } = ctx.request.query;
  pager = pager && JSON.parse(pager);
  tags = tags && tags.split(",");
  const selectContent = Boolean(id);
  const { data, total } = await queryArticle(
    { id, tags, pager, title },
    selectContent
  );

  ctx.body = {
    data,
    total
  };
  next();
});

router.post("/create", async (ctx, next) => {
  console.log("create query", ctx.request.body);
  let { title, tags } = ctx.request.body;
  if (!title || title === "") {
    throw new Error("title为空");
  }
  tags = tags && tags.split(",");
  const account = ctx.session.account;
  const article = await createArticle({ account, title, tags });
  ctx.body = {
    article
  };
  next();
});

router.post("/delete", async (ctx, next) => {
  console.log("delete body", ctx.request.body);
  let { id } = ctx.request.body;

  const result = await deleteArticle({ id });
  ctx.body = {
    result
  };

  next();
});

router.post("/update", async (ctx, next) => {
  console.log("update body", ctx.request.body);
  let { content, tags, title, id, top } = ctx.request.body;
  if (tags !== undefined) {
    tags = tags.split(",");
    tags = tags.filter(x => x !== "");
  }

  const article = await updateArticle({ id, title, tags, content, top });
  ctx.body = {
    article
  };
  next();
});

export default router.routes();
