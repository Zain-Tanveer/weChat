require('dotenv').config({})
require('express-async-errors')

// security middleware imports
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// helper modules imports
const path = require('path')
const exphbs = require('express-handlebars')

// express import and invoke
const express = require('express')
const app = express()

// server and socket.io import and invoke
const http = require('http').Server(app)
const io = require('socket.io')(http)

// database import
const mongoose = require('mongoose')

// router imports
const authRouter = require('./routes/auth.route')

// error middleware imports
const NotFoundMiddleware = require('./middlewares/not-found')
const ErrorHandlerMiddleware = require('./middlewares/error-handler')

// security middlewares
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// handlebars setup
app.engine(
  'handlebars',
  exphbs.engine({ extname: '.hbs', defaultLayout: false })
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/public/views'))

// routes
app.get('/', (req, res) => {
  res.render('login')
})

app.get('/weChat', (req, res) => {
  res.render('chat')
})

app.get('/test route', (req, res) => {
  res.send('this is a test route in development')
})

app.use('/api/v1/auth', authRouter)

// socket setup
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
    delete users[socket.id]
  })
})

// error middlewares
app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`🗃️  [database]: Connected to DB...`)
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
