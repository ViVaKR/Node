import express from 'express';
import { publicIpv4 } from 'public-ip';
import cors from 'cors';

const app = express();
const port = 5028;
app.use(cors());

app.get('/api/ip', async (req, res) => {
    try {
        const ip = await publicIpv4();
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Public IP Address</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f0f0f0;
                    }
                    .container {
                        text-align: center;
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .ip {
                        font-size: 2em;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h5 style="margin-bottom:10px;">Your Public IP Address</h5>
                    <p class="ip text-sky-800">${ip}</p>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Public IP Address</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f0f0f0;
                    }
                    .container {
                        text-align: center;
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .ip {
                        font-size: 2em;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Your Public IP Address</h1>
                    <p class="ip">0.0.0.0</p>
                </div>
            </body>
            </html>
        `);
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
