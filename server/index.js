require('dotenv').config()
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const Advertisement = require('./models/advertisement.model')

const { addUser, getUser, getUsersInRoom } = require('./controllers/chatUser.controller');
const { addMessage, getAllMessageByChatName } = require('./controllers/chatData.controller');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000','https://main--voluble-pegasus-6a9597.netlify.app']
}))
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', async ({ name, room }, callback) => {
    try{
      const user = await addUser({ id: socket.id, name, room });

      socket.join(user.room);
      const chatData = await addMessage(user.room, "LigaBot", `${user.name}, зайшов до чату!`)

      const messages = await getAllMessageByChatName(user.room)

      for (let messagesKey in messages) {
        if(messages[messagesKey].userName === user.name){
          socket.emit('message', { user: user.name , text: messages[messagesKey].messageText, date: messages[messagesKey].date });

        }else{
          socket.emit('message', { user: `${messages[messagesKey].userName}`, text: `${messages[messagesKey].messageText}`, date: messages[messagesKey].date});

        }
      }


      io.to(user.room).emit('roomData', { room: user.room, users: await getUsersInRoom(user.room) });

      callback();
    }catch (e) {
      console.log(e)
    }
  });

  socket.on('sendMessage', async (message, callback) => {
    try{
      const advertisementId = user.room.slice(0, 24)
      const advertisement = await Advertisement.findById(advertisementId)

      if(advertisement.statusStage === "reserved"){
        return  io.to(user.room).emit('message', { user: "LigaBot" , text: "Наразі ви не можете надсилати повідомлення до цього чату, зарезервований інший чат до цього оголошення!" , date: chatData.date});
      }else
        if(advertisement.statusStage === "fixed"){
         return io.to(user.room).emit('message', { user: "LigaBot" , text: "Наразі ви не можете надсилати повідомлення до цього чату, зафіксований інший чат до цього оголошення!" , date: chatData.date});
        }

      const user = await getUser(socket.id);
      const chatData = await addMessage(user.room, user.name, message)
      io.to(user.room).emit('message', { user: user.name , text: message , date: chatData.date});


      callback();
    }catch (e){
      console.log(e)
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));