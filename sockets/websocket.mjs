import { createRequire } from 'module';
import { promises as fs } from 'fs';
const require = createRequire(import.meta.url);
const { Server, WebSocket } = require('ws');

const server = new WebSocket.Server({ host: '0.0.0.0', port: 3000 });
const clients = new Set();

const dataFilePath = './data.json';

// 서버가 시작될 때 파일에서 메시지를 읽어옴
let messages = [];

// 파일에서 메시지를 읽어옴
fs.readFile(dataFilePath, 'utf-8')
    .then((data) => {
        messages = JSON.parse(data);
    })
    .catch(async (error) => { // 파일이 없을 경우 빈 배열을 생성
        if (error.code === 'ENOENT') {
            console.log('Data file not found. Creating new one.');
            await fs.writeFile(dataFilePath, '[]');
            return;
        }
        console.error('Failed to read data file:', error);
    });


server.on('connection', (socket) => { // 클라이언트가 연결될 때마다 호출
    console.log('Client connected');

    if (!clients.has(socket))
        clients.add(socket);


    const msg = JSON.stringify({ type: 'history', data: messages })
    socket.send(msg);

    socket.on('message', (message) => {
        // 수신된 메시지를 JSON으로 파싱
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);

        } catch (e) {
            console.error('Invalid JSON received:', message);
            return;
        }

        // 메시지 객체에 type 속성 추가
        const messageToSend = { type: 'response', data: parsedMessage };


        // JSON 문자열로 변환하여 모든 클라이언트로 전송
        const responseString = JSON.stringify(messageToSend);
        clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(responseString);
            }
        });

        // 메시지를 메모리에 저장
        parsedMessage.type = 'history';
        messages.push({
            type: 'history',
            message: parsedMessage
        });
        console.log(messages);
        fs.writeFile(dataFilePath, JSON.stringify(messages))
            .catch((error) => {
                console.error('Failed to write data file:', error);
            });

    });

    socket.on('close', () => { // 클라이언트가 연결을 끊을 때마다 호출
        console.log('Client disconnected');
        clients.delete(socket);
    });

    socket.on('error', (error) => { // 에러가 발생할 때 호출
        console.error('WebSocket error:', error);
    });
});

server.on('listening', () => { // 서버가 시작될 때 호출
    console.log('WebSocket server is listening on port 3000');
});

server.on('error', (error) => { // 에러가 발생할 때 호출
    console.error('WebSocket server error:', error);
});
