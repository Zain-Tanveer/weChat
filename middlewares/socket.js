const socketio = (io) => {
  const users = {}

  io.on('connection', (socket) => {
    socket.on('new-user-joined', (user) => {
      console.log(`${user.name} has joined!`)
      users[socket.id] = user
      socket.broadcast.emit('user-joined', user)
    })

    socket.on('send', (message) => {
      socket.broadcast.emit('receive', {
        message: message,
        user: users[socket.id],
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
