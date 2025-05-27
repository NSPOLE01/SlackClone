const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);
const io = socketio(expressServer);

io.of("/").on("connection", (socket) => {
  socket.join("chat");
  socket.join("adminChat");
  io.of("/").to("chat").emit("welcomeToChatRoom", {});
  io.of("/")
    .to("chat")
    .to("chat2")
    .to("adminChat")
    .emit("welcomeToChatRoom", {});
  console.log(socket.id, "has connected");
  socket.emit("messageFromServer", { data: "Welcome to the socket server!" });
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});

io.of("/admin").on("connection", (socket) => {
  console.log("Admin namespace connected:", socket.id);
  io.of("/admin").emit("messageToClientsFromAdmin", {});
});
