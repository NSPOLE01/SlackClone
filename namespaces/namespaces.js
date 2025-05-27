const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  socket.emit("messageFromServer", { data: "Welcome to the socket server!" });
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});
