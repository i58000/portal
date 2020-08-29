import * as JWT from 'jsonwebtoken'
import { TOKEN_SECRET } from '@config/index'
import { find, insert } from '@src/dao/account'
import createErrorResponse from '@src/util/createErrorResponse'
import { Pager } from '@src/util/Pager'

export const queryAccount = async ({ keyword, pager }: { keyword?: any, pager: Pager }) => {
    const results = await find({ username: keyword, nickname: keyword, id: keyword, pager }, true)
    return results
}

export const createAccount = async ({ username, password, confirm, email }) => {
    if (password !== confirm) {
        return createErrorResponse(3003)
    }
    const results = await find({ username });
    if (results.length > 0) {
        return createErrorResponse(3004)
    }
    await insert({ username, password, email })
    return await checkAccount(username, password);
}

export const checkAccount = async (username: string, password: string) => {
    if (!username) {
        return createErrorResponse(3001)
    }
    if (!password) {
        return createErrorResponse(3002)
    }
    const results = await find({ username, password });
    console.log(results)
    // if (results.length === 0) {
    //     return createErrorResponse(3006)
    // } else 
    if (results.length === 1) {
        const account = results[0];
        // if (account.password !== password) {
        //     return createErrorResponse(3005)
        // }
        const token = JWT.sign(
            { username: account.username, nickname: account.nickname, id: account.id },  // 加密userToken, 等同于上面解密的userToken
            TOKEN_SECRET,
            { expiresIn: '1h' }  // 有效时长1小时
        )
        return {
            token,
            account
        }
    } else {
        return createErrorResponse(3005)
    }
}