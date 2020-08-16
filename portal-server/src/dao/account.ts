import Account from '@src/entity/Account'
import { createQueryBuilder, getRepository } from 'typeorm'
import { Pager } from '@src/util/Pager'

interface QueryParams {
    id?: number;
    username?: string;
    password?: string;
    nickname?: string;
    pager?: Pager;
}
export const find = async ({ id, username, password, nickname, pager }: QueryParams, fuzzy: boolean = false): Promise<Account[]> => {
    let query = createQueryBuilder(Account)
    if (fuzzy) {
        if (id) query = query.orWhere("account.id like :id", { id: `%${id}%` })
        if (username) query = query.orWhere("account.username like :username", { username: `%${username}%` })
        if (nickname) query = query.orWhere("account.nickname like :nickname", { nickname: `%${nickname}%` })
        if (password) query = query.orWhere("account.password like :password", { password: `%${password}%` })
    } else {
        if (id) query = query.andWhere("account.id = :id", { id })
        if (username) query = query.andWhere("account.username = :username", { username })
        if (nickname) query = query.andWhere("account.nickname = :nickname", { nickname: nickname })
        if (password) query = query.andWhere("account.password = :password", { password: password })
    }
    console.log(query.getSql())
    if (pager) {
        query.skip(pager.size * pager.index).take(pager.size)
    }

    return await query.getMany();
}

export const insert = async ({ username, password, email }) => {
    const repo = getRepository(Account);
    const temp = new Account({ username, password, email })
    return await repo.save(temp)
}