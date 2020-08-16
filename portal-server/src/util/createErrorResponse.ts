export const ACCOUNT = {
    3001: 'username is empty',
    3002: 'password is empty',
    3003: 'password !== confirm',
    3004: 'username exist',
    3005: 'password or username wrong',
    // 3006: 'username not exist'
}

export default (errCode) => {
    return {
        errCode,
        errMsg: ACCOUNT[errCode]
    }
}