import { io } from "./http";
import { accounts } from "./routes/users.routes";

const messages = []

io.on('connection', (socket) => {
   console.log('a user connected');

  socket.on('chat', (data)=> {

    const userAccount = accounts.find(item => item.id === data.id)

    messages.push({
      id: userAccount.id,
      username: userAccount.first_name,
      text: data.text,
      created_at: new Date()
    });
    
    socket.broadcast.emit('chatx', messages)
  })
 
 });