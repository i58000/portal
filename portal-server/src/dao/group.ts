import ChatGroup from '@src/entity/ChatGroup'
import { createQueryBuilder, getRepository } from 'typeorm'

export const find = async ({ accountId }): Promise<ChatGroup[]> => {
    let query = createQueryBuilder(ChatGroup, 'g')
    query
    .leftJoinAndSelect("g.accounts", 'a')
    .leftJoinAndSelect("g.groupAccountRels", 'rel')
    .andWhere("rel.account_id = :accountId")
    .andWhere(qb => {
            const subQuery = createQueryBuilder(ChatGroup, 'gg')
                .leftJoin("gg.accounts", "aa")
                .andWhere("aa.id = :accountId")
                .select('gg.id')
                .getQuery()
            return 'g.id in ' + `( ${subQuery} )`
        }, { accountId })

    return await query.getMany();
};

export const insert = async ({ accounts, title }) => {
    const repo = getRepository(ChatGroup);
    const temp = new ChatGroup({ title, type: accounts.length > 2 ? 'group' : 'private' })
    temp.accounts = accounts
    return await repo.save(temp)
}