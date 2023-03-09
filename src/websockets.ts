import { io } from "./http";
import { accounts } from "./routes/users.routes";

const messages = []

io.on('connection', (socket) => {
   console.log('a user connected');

  socket.on('chat', (data)=> {

    messages.push(data);
    socket.broadcast.emit('chatx', messages)
  })
 
 });