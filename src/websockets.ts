import { io } from "./http";

const messages = [];

io.on("connection", (socket) => {

   socket.on('chat-private', (data) => {

        const message = {
            id: data.id,
            room: data.room,
            textmsg: data.textmsg,
            createdAt: new Date()
        }

        messages.push(message);

        socket.to(data.room).emit('chat-private', messages)
        console.log(messages);
   })

})