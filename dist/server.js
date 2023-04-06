"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //익스프레스 (라우팅들 좋은 기능 많음) 모든걸 빠르게 설정하기 위해 use, get 등 다양한 기능을 제공한다
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http")); //docs 노드
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)(); //express함수를 app 에 넣어서 서버에 넣어버린다 ->
const server = http_1.default.createServer(app); //http.createServer((req,res)=>{ ex extensions .txt .png 지정해주고, 라우팅도 하나하나 완전설정으로 간다})
const io = new socket_io_1.Server(server);
//import { chats } from "./model/data";
//express의 get 으로 라우팅
app.get("/", (req, res) => {
    res.send("API is Running");
});
app.get("/api/chat", (req, res) => {
    //res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
    //console.log(req.params.id);
    //  const singleChat = chats.find((c: { _id: any; }) => c._id === req.params.id);
    // res.send(singleChat);
});
//Set static folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//Run when client connects
io.on("connection", (socket) => {
    //너 한테 알려줌
    socket.emit("message", "Welcome to Chatcord");
    //Broadcast when a user connets 너 뺴고 다
    socket.broadcast.emit("message", "A user has joined the chat");
    //전체
    io.emit("message", "a User has joined the chat");
    //Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });
    //Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });
});
console.log(path_1.default.join(__dirname));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
