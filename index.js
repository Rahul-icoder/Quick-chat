const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
const path = require('path')
const ejs = require('ejs')
const io = require('socket.io')(server,{
  cors: {
    origin: '*',
  }
})
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname,'/public')))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.render('index')
})

const user = {}

io.on('connection', socket => {
  socket.on('name',(name)=>{
      user[socket.id] = name;
      socket.broadcast.emit('chat-join',user[socket.id])
  })
  socket.on('chat-message',(message)=>{
  	socket.broadcast.emit('message',{
      name:user[socket.id],
      msg:message
    })
  })
})



server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})