const _subcribers = [];

let _sid = 1000;

export const subscribe = (groupId, callback) => {
    const sid = _sid++;
    _subcribers.push({
        sid,
        groupId,
        callback
    })
    return sid;
}

export const unsubscribe = (sid) => {
    const index = _subcribers.findIndex(x => x.sid === sid)
    _subcribers.splice(index, 1)
}

export const dispatch = (groupId, data) => {
    _subcribers.forEach(x => {
        if (x.groupId !== groupId) return
        x.callback(data)
    })
}