import { io } from "./http";
import { accounts } from "./routes/users.routes";

io.on("connection", (socket) => {

   // Evento q ouve o vem do cliente
   socket.on('chat-private', (data) => {


      const dataUser = accounts.filter(item => item.id == data.id);

      const dataSend = [{
         first_name: dataUser[0].first_name,
         last_name: dataUser[0].last_name,
         message: data.message,
         created_at: new Date()
      }];

      io.emit('chat-private', dataSend);
      
   })

})