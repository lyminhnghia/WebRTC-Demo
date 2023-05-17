const http = require("http");
const express = require("express");

const config = require("./config");
const initSocket = require("./lib/socket");

const app = express();
const server = http.createServer(app);

const sio = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

server.listen(config.PORT, () => {
  sio.on("connection", initSocket);
  console.log("Server is listening at :", config.PORT);
});
