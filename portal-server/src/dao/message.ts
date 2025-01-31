import ChatMessage from '@src/entity/ChatMessage'
import ChatGroup from '@src/entity/ChatGroup'
import { createQueryBuilder, getRepository } from 'typeorm'
import { QueryMessagePayload, SendMessagePayload } from '@src/ws/message';
import Account from '@src/entity/Account'

export const find = async ({ id, beforeTimestamp, groupId, read, count }: QueryMessagePayload, account: Account): Promise<ChatMessage[]> => {

    const accountId = account.id;

    const query = createQueryBuilder(ChatMessage, 'm')

    query
        .leftJoinAndSelect("m.account", 'a')
        .leftJoinAndSelect("m.group", 'g')

    query
        .where(qb => {
            const subQuery = createQueryBuilder(ChatGroup, 'gg')
                .leftJoin("gg.accounts", "aa")
                .andWhere("aa.id = :accountId")
                .select('gg.id')
                .getQuery()
            return 'm.group_id in ' + `( ${subQuery} )`
        }, { accountId })

    if (id !== undefined) query.andWhere("m.id = :id", { id })
    if (groupId !== undefined) query.andWhere("m.group_id = :groupId", { groupId })
    if (read !== undefined) query.andWhere("m.read = :read", { read })

    if (beforeTimestamp !== undefined) query.andWhere('m.timestamp < :beforeTimestamp', { beforeTimestamp })
    if (count !== undefined) query.take(count);


    console.log(accountId)
    console.log(query.getSql())

    return await query.getMany();
};

export const insert = async ({ groupId, content, timestamp }: SendMessagePayload, account: Account) => {

    console.log('----', content)
    const timeServer = new Date();
    const repo = getRepository(ChatMessage);
    const temp = new ChatMessage({
        content,
        type: "default",
        timestamp: timeServer,
        group_id: groupId,
        account_id: account.id
    })

    const newMsg = await repo.save(temp);
    const msg = await find({ id: newMsg.id }, { id: newMsg.account_id } as any)
    return msg[0]

}