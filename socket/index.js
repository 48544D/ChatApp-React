const { Server } = require("socket.io");
let onlineUsers = [];

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // listen to connected user
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    io.emit("getOnlineUsers", onlineUsers);
  });

  // listen to disconnected user
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

  // listen to send message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        chatId: message.chatId,
        senderId: message.senderId,
        text: message.text,
        isRead: false,
        date: Date.now(),
      });
    }
  });
});

io.listen(3000);
