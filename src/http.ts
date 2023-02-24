import express from "express";
import { usersRoutes  } from "./routes/users.routes";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ['Content-Type', 'Authorization'],
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
    "access-control-allow-origin": "*",
    "access-control-expose-headers": "*",
    "Connection": "keep-alive",
    "Content-Length": 1,
    "Content-Type": "text/plain; charset=UTF-8"
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "http://localhost:3000/"} });

app.use(express.json())
app.use(cors(corsOptions));
app.use("/", usersRoutes);


export {  httpServer, io }