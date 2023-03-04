import { io } from "./http";
import { accounts } from "./routes/users.routes";

io.on('connection', (socket) => {
   console.log('a user connected');
 
   socket.on('chat-private', (messagex: string) => {
     console.log('message:', messagex);
     io.emit('chat-private', messagex);
   });
 
   socket.on('disconnect', () => {
     console.log('user disconnected');
   });
 });