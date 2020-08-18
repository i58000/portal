import { Context } from "./context";

const _subcribers = [];
let _sid = 100000;

const subscribe = (groupId, callback) => {
  const sid = _sid++;
  _subcribers.push({
    sid,
    groupId,
    callback
  });
  return sid;
};

const unsubscribe = sid => {
  const index = _subcribers.findIndex(x => x.sid === sid);
  _subcribers.splice(index, 1);
};

export const dispatch = (groupId, data) => {
  _subcribers.forEach(x => {
    if (x.groupId !== groupId) return;
    x.callback(data);
  });
};

/////

export const addSubscriber = (
  accountIdOrIds: number | number[],
  groupIdOrIds: number | number[]
) => {
  const forGroupId = (ctx: Context, groupId) => {
    const sid = subscribe(groupId, ({ type, payload }) => {
      ctx.send(type, payload);
    });
    ctx.subscribers.push(sid);
  };

  const forAccountId = accountId => {
    const ctx = getContext(accountId);
    if (!ctx) return
    if (Array.isArray(groupIdOrIds)) {
      groupIdOrIds.forEach(groupId => {
        forGroupId(ctx, groupId);
      });
    } else {
      forGroupId(ctx, groupIdOrIds);
    }
  };

  if (Array.isArray(accountIdOrIds)) {
    accountIdOrIds.forEach(forAccountId);
  } else {
    forAccountId(accountIdOrIds);
  }
};

//////

const _contexts = new Array<Context>();
export const signIn = (ctx: Context, groupIds) => {
  const accountId = ctx.account.id;
  _contexts.push(ctx);
  // 消息订阅
  addSubscriber(accountId, groupIds);
};

export const signOut = (ctx: Context) => {
  const index = _contexts.indexOf(ctx);
  if (index > -1) _contexts.splice(index, 1);
  // 消息订阅
  ctx.subscribers.forEach(unsubscribe);
};

const getContext = (accountId): Context => {
  const ctx = _contexts.find((x: Context) => x.account.id === accountId);
  return ctx;
};
