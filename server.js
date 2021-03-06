const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
var port =  process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIo(server)

var users = []

app.use(express.static('public'))

app.get('/dashboard/chatserver',function(req,res) {
  res.sendFile(__dirname + '/public/dashboard/chatserver.html')
})

app.get('/dashboard',function(req,res) {
  res.sendFile(__dirname + '/public/dashboard.html')
})

io.on('connection',function(socket){

  socket.on('join',function(data){

    // Make room

    socket.join(data.room)
    socket.emit('newMessage',{
      from: 'Admin',
      text : 'Welcome TO Our Website ' + data.room + ' Page.'
    })
    socket.broadcast.to(data.room).emit('newMessage',{
      from : 'Admin',
      text: 'New User Joined!'
    })



    socket.to(data.room).on('createMessage',function(msg){
      io.to(data.room).emit('newMessage',{
        from : msg.from,
        text : msg.text
      })


    })
  })



  socket.on('disconnect',function(){
    console.log('Bye TO Our Website!')
  })

})


server.listen(port,function(){
  console.log('We Are On 3000')
})
