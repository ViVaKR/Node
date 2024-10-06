const express = require("express");

var cors = require('cors');

const HOST = "0.0.0.0";
const PORT = 33333;

const app = express();

// Eanable All CORS Requests
// 모든 응답에 대응 설정
app.use(cors());

// HTTP Method (Routing, Callback)
// HTTP Method : 프런트엔드에서 백엔드로 보내 요청의 목적 및 종류를 알리는 수단(Get - 주소창(O), Post - 주소창(X))
// Get 요청을 처리하는 곳
// GET : params, query
app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1");
});

// (GET 방식) req -> params
app.get("/query/:id", function (req, res) {
    const q = req.query;
    console.log(q);

    res.send({ ID: `${q.a} ${q.b} ${q.c}` });
});

app.get("/sound/:name", (req, res) => {
    const { name } = req.params;
    let rs = name === 'dog' ? '멍멍' : (name === 'cat' ? '야옹' : '~~~');
    console.log(rs);
    res.json({ sound: `${rs}` });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
