import { QueryMessagePayload, ReadMessagePayload, SendMessagePayload } from "@src/ws/message"
import { find, insert } from "@src/dao/message"
import Account from "@src/entity/Account"
import { update } from "@src/dao/groupAccountRel";

export const queryMessage = async (payload: QueryMessagePayload, account: Account) => {
    return await find(payload, account);
}

export const readMessage = async (payload: ReadMessagePayload, account: Account) => {
    const { groupId } = payload;
    const accountId = account.id;

    return await update({ groupId, accountId, change: (entity) => { entity.unread = 0 } })
}

export const sendMessage = async (payload: SendMessagePayload, account: Account) => {
    const { groupId } = payload
    const exceptAccountId = account.id;
    const msg = await insert(payload, account)
    await update({ groupId, exceptAccountId, change: (entity) => { entity.unread += 1 } })

    return msg
}