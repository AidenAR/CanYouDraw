import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'

const app = express()

const server = http.createServer(app)
const io = new Server(server);


app.get('/', (_req, res) => {
  res.json({
	  data: "Data!"
  })
});

io.on('connection', (socket) => {
  console.log('socket connected', socket);

  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
});


server.listen(5000, 
	() => console.log("Server Started at port 5000"))
