import * as KoaRouter from "koa-router";
import * as JWT from "jsonwebtoken";
import {
  TOKEN_SECRET,
  TOKEN_COOKIE_KEY,
  TOKEN_COOKIE_MAXAGE
} from "@config/index";
import {
  checkAccount,
  createAccount,
  queryAccount
} from "@src/service/account";

const router = new KoaRouter();

router.get("/", async (ctx, next) => {
  const { keyword, pager } = ctx.request.query;
  const accounts = await queryAccount({ keyword, pager: JSON.parse(pager) });
  ctx.body = {
    accounts
  };
  next();
});

router.post("/check", async (ctx, next) => {
  const token = ctx.cookies.get("token");
  const { username, nickname, id } = JWT.verify(token, TOKEN_SECRET);
  if (id) {
    ctx.body = {
      token,
      username,
      nickname,
      id
    };
    ctx.status = 200;
  } else {
    ctx.body = "error token";
    ctx.status = 400;
  }
});

router.post("/register", async (ctx, next) => {
  const { username, password, confirm, email } = ctx.request.body;
  const { errCode, errMsg, token, account }: any = await createAccount({
    username,
    password,
    confirm,
    email
  });
  if (!errCode) {
    const { id, nickname } = account;
    ctx.body = {
      token,
      username,
      nickname,
      id
    };
    ctx.status = 200;
    ctx.cookies.set(TOKEN_COOKIE_KEY, token, { maxAge: TOKEN_COOKIE_MAXAGE });
  } else {
    // 登录失败, 用户名密码不正确
    ctx.body = {
      errCode,
      errMsg
    };
    ctx.status = 400;
  }
  next();
});

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const { errCode, errMsg, token, account }: any = await checkAccount(
    username,
    password
  );
  if (!errCode) {
    const { id, nickname } = account;
    ctx.body = {
      token,
      username,
      nickname,
      id
    };
    ctx.status = 200;
    ctx.cookies.set(TOKEN_COOKIE_KEY, token, { maxAge: TOKEN_COOKIE_MAXAGE });
  } else {
    // 登录失败, 用户名密码不正确
    ctx.body = {
      errCode,
      errMsg
    };
    ctx.status = 400;
  }
  next();
});

router.post("/logout", async (ctx, next) => {
  const token = ctx.cookies.get("token");
  const { username, nickname, id } = JWT.verify(token, TOKEN_SECRET);
  ctx.cookies.set(TOKEN_COOKIE_KEY, "", { expires: -1 });

  ctx.body = {
    username,
    nickname,
    id
  };
  next();
});

export default router.routes();
