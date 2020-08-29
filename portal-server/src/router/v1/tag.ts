import * as KoaRouter from "koa-router";

import { queryTag, deleteTag, updateTag, createTags } from "@src/service/tag";

const router = new KoaRouter();

router.get("/", async (ctx, next) => {
  console.log("get query", ctx.request.query);
  const tags = await queryTag();
  ctx.body = {
    tags
  };
  next();
});

router.post("/delete", async (ctx, next) => {
  console.log("delete body", ctx.request.body);
  let { id } = ctx.request.body;
  const result = await deleteTag(id);
  ctx.body = {
    result
  };

  next();
});

router.post("/update", async (ctx, next) => {
  console.log("update body", ctx.request.body);
  let { id, name, color, type, description } = ctx.request.body;

  const tag = await updateTag({ id, name, color, type, description });
  ctx.body = {
    tag
  };
  next();
});

router.post("/create", async (ctx, next) => {
  console.log("update query", ctx.request.body);
  let { name, color, type, description } = ctx.request.body;

  const tags = await createTags([{ name, color, type, description }]);
  ctx.body = {
    tag: tags && tags[0]
  };
  next();
});

export default router.routes();
