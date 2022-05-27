import app from "./app";
import { Server as WebsocketServer } from "socket.io";
import http from "http";
import sockets from "./sockets";

import { connectDB } from "./db";
connectDB();

const server = http.createServer(app);

// Oyente de Servidor
const httpServer = server.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
});

const io = new WebsocketServer(httpServer, {
  cors: {
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowHeaders: ["my-custom-header"],
    credentials: true,
  },
});

sockets(io);