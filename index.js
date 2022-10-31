require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://react-chat-app-client-neon.vercel.app",
  },
});
// {name: name, message: message}
const TEST_MESSAGES = [];
io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
  socket.on("messages:fetch", () => {
    socket.emit("messages:get", { messages: TEST_MESSAGES });
  });
  socket.on("messages:send", ({ message }) => {
    TEST_MESSAGES.push(message);
    io.emit("messages:response", { message: message });
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
httpServer.listen(3001);
