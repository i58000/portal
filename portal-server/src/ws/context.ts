import * as JWT from 'jsonwebtoken'

import { TOKEN_SECRET, TOKEN_COOKIE_KEY } from '@config/index'
import { createMessage, NewMessagePayload, SystemPayload, MessageType } from './message'

// interface Context {
//     send:
// }

export function getContext(client) {
    client._socket.ctx.send = (type: MessageType, payload: NewMessagePayload | SystemPayload) => {
        const msg = createMessage(type, payload);
        client.send(JSON.stringify(msg))
    }
    client._socket.ctx.subscribers = []
    return client._socket.ctx
}

export function verifyClient(info) {
    // console.log('info', info)

    const token = getCookie(TOKEN_COOKIE_KEY, info.req.headers.cookie)
    const account = JWT.verify(token, TOKEN_SECRET);

    if (!account) return false;

    info.req.socket.ctx = {
        account
    }
    return true
}

function getCookie(cname, cookie) {
    var name = cname + "=";
    var ca = cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}