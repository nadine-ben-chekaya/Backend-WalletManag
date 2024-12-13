//server.js
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`: ${socket.id} user just connected!`);

  // Listen for client notifications
  //   socket.on("sendNotification", (data) => {
  //     console.log(`Notification received from client:`, data);
  //   });
  socket.on("sendNotification", (data) => {
    // Broadcast a 'notifyUser' event to all connected clients with a message
    console.log(`Notification received from client:`);
    socketIO.emit("sendNotification", data);
    //socketIO.emit("adminNotif", "Notification From Admin");
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// app.post("/api", (req, res) => {
//   const { name, message } = req.body;
//   socketIO.emit("notification", { name, message });
//   console.log(name, message);

//   res.status(200).json({ name, message });
// });

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
