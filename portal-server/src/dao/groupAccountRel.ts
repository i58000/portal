import ChatGroupAccountRel from '@src/entity/ChatGroupAccountRel'
import { createQueryBuilder, getRepository } from 'typeorm'
import { ReadMessagePayload } from '@src/ws/message';
import Account from '@src/entity/Account';

export const update = async ({ groupId, accountId, exceptAccountId, change }: any) => {
    const repo = getRepository(ChatGroupAccountRel)
    const params = {
        'group_id': groupId,
    }
    if (accountId) {
        params['account_id'] = accountId
    }
    const rels = await repo.find(params)
    for (let index = 0; index < rels.length; index++) {
        const rel = rels[index];
        if (exceptAccountId && rel.account_id === exceptAccountId) {
            continue
        }
        change(rel)
        await repo.save(rel)
    }


    return;
};
