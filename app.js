require('express-async-errors')

const path = require('path')
const exphbs = require('express-handlebars')

const express = require('express')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const NotFoundMiddleware = require('./middlewares/not-found')
const ErrorHandlerMiddleware = require('./middlewares/error-handler')

app.use(express.static(path.join(__dirname, 'public')))

app.engine(
  'handlebars',
  exphbs.engine({ extname: '.hbs', defaultLayout: false })
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/public/views'))

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/weChat', (req, res) => {
  res.render('chat')
})

const users = {}

io.on('connection', (socket) => {
  socket.on('new-user-joined', (name) => {
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
    delete users[socket.id]
  })
})

app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    http.listen(PORT, () => {
      console.log(
        `⚡️ [server]: Server is running on http://localhost:${PORT}...`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start()
