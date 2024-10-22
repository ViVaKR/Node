import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.get('/api/get-client-ip', async (req, res) => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(data.ip);
        res.json({ ip: data.ip });
    } catch (error) {
        res.json({ ip: '0.0.0.0' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
