import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 59147;

// --> 1. Get the file path from the URL of the current module
// server.js 가 실행되는 파일의 URL을 가져온다.
const __filename = fileURLToPath(import.meta.url);

// --> 2. Get the directory name from the file path
// server.js 파일이 실행되는 디렉토리 이름을 가져온다.
const __dirname = dirname(__filename);

// --> 3. Middleware, 미들웨어
// Serve the static files from the public folder
// publi 폴더에 있는 파일들을 서비스한다.
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// --> 3. Join the directory name with the public folder and index.html file
const indexPage = path.join(__dirname, 'public', 'index.html');
// '/Users/vivakr/GitWorkspace/Node/backend-course/chapter_3/src/public/index.html'
// --> Serving up the HTML file from the
app.get('/', (req, res) => {
    res.sendFile(indexPage)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
