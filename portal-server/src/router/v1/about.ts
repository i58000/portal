import * as KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/', (ctx, next) => {
    ctx.body = 'about';
    // next()函数，当执行next将会从这里主动把执行权交给下一个中间件，大家可以了解下洋葱模型
    next();
});

export default router.routes();