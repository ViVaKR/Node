
import https from 'https';
import { createServer } from 'http';
import fs from 'fs';

import { WebSocketServer } from 'ws';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

const server = createServer();
// cert: fs.readFileSync('server.cert'),
// key: fs.readFileSync('server.key')
// });

const wsServer = new WebSocketServer({ server });
const port = 8765;
const connections = {};
const users = {};

const broadcast = () => { // send the state of all users to all clients

    Object.keys(connections).forEach((key) => {
        const connection = connections[key];
        const message = JSON.stringify(users);
        connection.send(message);
    });
}
// message = state
const handleMesage = (bytes, uuid) => {

    // JSON.parse() converts a JSON string to a JavaScript object
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];
    user.state = message;

    broadcast();

    console.log(`${user.username} updated their state:  ${JSON.stringify(user.state)}`);

    // message = { "x": 10, "y": 20 }
    // user.state.x = message.x
    // user.state.y = message.y
    // user.state = message

};

const handleClose = (uuid) => {
    console.log(`${users[uuid].username} has left the chat`);
    delete connections[uuid];
    delete users[uuid];
    broadcast();
};

wsServer.on('connection', (ws, request) => {
    const uuid = generateUUID();
    //**  wss://192.168.0.8:8000?username=Viv */
    const { username } = parse(request.url, true).query;
    // const uuid = uuidv4();

    console.log(uuid, username);

    // brodcat to all clients, pan out the new user
    connections[uuid] = ws;

    users[uuid] = {
        username: username,
        state: {}
    }
    // JSON.stringify() converts a JavaScript object or value to a JSON string
    ws.on("message", (message) => { handleMesage(message, uuid) });
    ws.on("close", () => {
        handleClose(uuid);
        // delete connections[uuid];
        // delete users[uuid];
    });
});

server.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
