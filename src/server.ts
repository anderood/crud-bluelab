import express from "express";
import cors from "cors";
import { usersRoutes  } from "./routes/users.routes";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app)

app.use(cors())
app.use(express.json())

app.use("/", usersRoutes);

httpServer.listen(3333, () => console.log("Running"));