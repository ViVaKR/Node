import { createServer } from "http";
import { Server } from "socket.io";
// import cors from "cors";

const httpServer = createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.end("Hello World!");
})

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
        credentials: true
    }
});

// 연결이 성공적으로 이루어졌을 때
io.on("connection", (socket) => {
    socket.on("new-message", (msg) => {
        msg = {
            user: msg.user.trim(),
            message: msg.message.trim()
        }
        io.emit("new-message", msg);
    });
    socket.on("disconnect", () => {
        this.IMessage.user = msg.user.trim();
        this.IMessage.message = '님이 나가셨습니다.';
        io.emit("new-message", this.IMessage);
    });
});

httpServer.listen(3210).on("listening", () => {
    console.log("서버가 3210포트에서 실행중입니다");
    console.log("http://localhost:3210");
});
