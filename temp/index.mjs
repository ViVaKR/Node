import express from "express";
//? (문의에 대한 답변 1.) 서버 생성
const app = express();
const port = 3333; // 포트 번호
//? (문의에 대한 답변 2.) 라우터
app.get('/api/sound/:name', (req, res) => {
    const { name } = req.params;
    switch (name) {
        case 'cat': return res.send({ msg: '야옹' });
        case 'dog': return res.send({ msg: '멍멍' });
        case 'pig': return res.send({ msg: '꿀꿀' });
        default: return res.sendStatus(404);
    }
});

//? (원모어 씽, 깍두기).. 서비스 참고 라우터 : 실제 데이터를 반환하는 라우터 샘플
export const mountains = [
    { id: 1, name: '장길산' },
    { id: 2, name: '백두산' },
    { id: 3, name: '소백산' },
    { id: 4, name: '한라산' }
];

app.get('/api/mountains', (req, res) => { res.send(mountains); });
app.get('/api/mountains/:id', (req, res) => {
    const { id } = req.params;
    const data = mountains.find(x => x.id === Number(id));
    if (!data) {
        return res.sendStatus(404);
    }
    res.send(data);
});

//? (문의에 대한 답변 3) 서버 실행
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/*
? 모듈 설치 및 실행 방법

--> index.mjs 파일 생성 후 코드 작성...
(모듈 설치)
--> package.json 파일 생성 : npm init -y
--> express 모듈 설치 : npm install express
--> nodemon 설치 : npm install -g nodemon

(코드 작성 : 답변 내용 참고)
1. express 모듈을 import하여 express 객체를 생성한다.
2. express 객체를 이용하여 서버를 생성한다.
3. 라우터를 생성한다.
4. 서버를 실행한다.

(실행)
--> $ npm run start:dev
또는 ...
--> $ npm run start

Web Browser에서 접속
--> localhost:3333/api/sound/cat  ==> { msg: '야옹' }
--> localhost:3333/api/sound/dog ==> { msg: '멍멍' }
--> localhost:3333/api/sound/pig ==> { msg: '꿀꿀' }

*/
