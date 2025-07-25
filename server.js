const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST"],
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("✅ A user connected");

  // When a user types something, send it to others
 socket.on("send-changes", (delta) => {
  socket.broadcast.emit("receive-changes", delta);
});

  // When user leaves
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

// Start server
server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
