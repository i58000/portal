import * as WebSocket from 'ws';
import { verifyClient, getContext } from './context'

import onMessage from './onMessage'
import onConnection from './onConnection'
import onclose from './onclose'

const server = new WebSocket.Server({ port: 3002, verifyClient });

server.on('connection', (client: WebSocket.Client) => {
    const ctx = getContext(client)

    onConnection(ctx);

    client.on('message', msg => {
        onMessage(ctx, msg);
    });


    client.on('close', event => {
        onclose(ctx)
    })

    // client.send('init msg');
});

// server.on('headers', event => {
//     console.log(event)
// })