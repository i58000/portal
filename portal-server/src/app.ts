import * as Koa from "koa";

import { createConnection } from "typeorm";

import useMiddlewares from "./middleware";

import "./ws";

createConnection().then(conn => {
  console.log(conn.options);
});

const app = new Koa();

// koa中间件
useMiddlewares(app);

//设置监听端口
app.listen(3001, () => {
  console.log("服务器开启 127.0.0.1:3001");
});
