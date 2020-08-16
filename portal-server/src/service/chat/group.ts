import createErrorResponse from '@src/util/createErrorResponse'
import { find, insert } from '@src/dao/group'

export const queryGroup = async (accountId) => {
    return await find({ accountId })
}

export const newGroup = async (accounts, title) => {
    return await insert({ accounts, title })
}