const users = require("./users");

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
module.exports = function initSocket(socket) {
  let id;
  socket
    .on("init", async () => {
      console.log(id, socket.id);
      id = await users.create(socket);
      if (id) {
        socket.emit("init", { id });
      } else {
        socket.emit("error", { message: "Failed to generating user id" });
      }
    })
    .on("request", (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit("request", { from: id });
      }
    })
    .on("call", (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit("call", { ...data, from: id });
      } else {
        socket.emit("failed");
      }
    })
    .on("end", (data) => {
      const receiver = users.get(data.to);
      if (receiver) {
        receiver.emit("end");
      }
    })
    .on("disconnect", () => {
      users.remove(id);
      console.log(id, "disconnected");
    });
};
