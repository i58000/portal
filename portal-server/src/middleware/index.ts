

import * as KoaBodyparser from 'koa-bodyparser';
import * as KoaBody from 'koa-body';
import * as KoaJson from 'koa-json';
import * as KoaStatic from 'koa-static';
import * as KoaOnerror from 'koa-onerror';
import * as KoaLogger from 'koa-logger';

import useRouter from './useRouter';
import useJwt from './useJwt'

export default app => {

    // jwt
    useJwt(app);

    // koa-onerror
    KoaOnerror(app);

    // koa-logger
    app.use(KoaLogger())

    // koa-json
    app.use(KoaJson())

    // koa-bodyparser
    app.use(KoaBodyparser())

    // router
    useRouter(app);
    
}