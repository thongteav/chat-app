const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const cors = require('cors');
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

app.use(cors());
app.options('*', cors());

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

const port = 8000;

server.listen(port, () => console.log("server is running on localhost:" + port));