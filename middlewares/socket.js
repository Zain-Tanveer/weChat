const socketio = (io) => {
  const users = {}

  io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
      console.log(`${name} has joined!`)
      users[socket.id] = name
      socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', (message) => {
      socket.broadcast.emit('receive', {
        message: message,
        name: users[socket.id],
      })
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-left', users[socket.id])
      console.log(`${users[socket.id]} left the chat!`)
      delete users[socket.id]
    })
  })
}

module.exports = socketio
