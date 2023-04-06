import express from "express"; //익스프레스 (라우팅들 좋은 기능 많음) 모든걸 빠르게 설정하기 위해 use, get 등 다양한 기능을 제공한다
import path from "path";
import http from "http"; //docs 노드
import dotenv from "dotenv";
dotenv.config();
import { Server} from "socket.io";

const app = express(); //express함수를 app 에 넣어서 서버에 넣어버린다 ->
const server = http.createServer(app); //http.createServer((req,res)=>{ ex extensions .txt .png 지정해주고, 라우팅도 하나하나 완전설정으로 간다})

const io = new Server(server);
import chats  from "./data/data.js";



//express의 get 으로 라우팅
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("API is Running");
});

app.get("/api/chat", (req: any, res: { send: (arg0: any) => void; }) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req: { params: { id: any; }; }, res: { send: (arg0: any) => void; }) => {
  console.log(req.params.id);
  const singleChat = chats.find((c: { _id: any; }) => c._id === req.params.id);
  res.send(singleChat);
});

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

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

console.log(path.join(__dirname));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
