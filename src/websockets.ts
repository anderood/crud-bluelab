import { io } from "./http";
import { accounts } from "./routes/users.routes";

io.on("connection", (socket) => {

    socket.on("message", (msg) => {
        console.log(msg)
    })
})