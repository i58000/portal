
import * as KoaJwt from 'koa-jwt';
import * as JWT from 'jsonwebtoken'

import { TOKEN_SECRET } from '@config/index'

const jwt = KoaJwt({ secret: TOKEN_SECRET }).unless({
    // 登录，注册接口不需要验证
    path: [/^\/api\/v1\/account\/login/, /^\/api\/v1\/account\/register/]
})

const interceptor = (ctx, next) => {

    const token = ctx.cookies.get('token')
    if (token) {
        if (!ctx.request.headers['authorization']) {
            ctx.request.headers['authorization'] = "Bearer " + token
        }
        const account = JWT.verify(token, TOKEN_SECRET);
        ctx.session = {
            account
        }
    }

    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                errMsg: err.message
            }
        } else {
            throw err;
        }
    })
}

export default (app) => {
    app.use(interceptor)
        .use(jwt);
}