var socket = io()

// Make Connection Between Server And Client                   =>    Done
socket.on('connect',function(){

  // Defining room To The Server
  socket.emit('join',{
    room : jQuery.deparam(window.location.search).room
  })
  socket.on('newMessage',function(data){
    console.log(data)
    var message = jQuery('#messages')
    var li = `<li>${data.from} : ${data.text}</li>`
    message.append(li)
  })

  jQuery('#send-message').on('click',function(e){
    e.preventDefault()
    socket.emit('createMessage',{
      from : 'User',
      text : jQuery('#send-text').val()
    })
    jQuery('#send-text').val('')

  })




})
