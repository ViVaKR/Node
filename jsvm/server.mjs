import express from 'express';
import { NodeVM } from 'vm2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 7392;

app.use(cors());
app.use(bodyParser.json());

const requestCounts = {};
const MAX_REQUESTS = 120;
const TIME_WINDOW = 60 * 60 * 1000;

app.use((req, res, next) => {
    const clientIp = req.ip;

    if (!requestCounts[clientIp]) {
        requestCounts[clientIp] = { count: 1, firstRequestTime: Date.now() };
    } else {
        const currentTime = Date.now();
        const timeElapsed = currentTime - requestCounts[clientIp].firstRequestTime;

        if (timeElapsed < TIME_WINDOW) {
            requestCounts[clientIp].count += 1;
        } else {
            requestCounts[clientIp] = { count: 1, firstRequestTime: currentTime };
        }
    }

    if (requestCounts[clientIp].count > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    next();
});

app.post('/api/run-js', (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send('Code is required');
    }

    try {
        const vm = new NodeVM({
            timeout: 1000,
            sandbox: {}
        });

        // 코드 실행 결과를 명시적으로 반환
        const result = vm.run(`(function() { ${code} })()`);
        res.json({ result });
    } catch (error) {
        console.error(`Error executing code: ${error.message}`);
        res.status(500).json({ error: 'Failed to execute code' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
