require("express-async-errors");

// security middleware imports
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// helper modules imports
const path = require("path");
const exphbs = require("express-handlebars");

// express import and invoke
const express = require("express");
const app = express();

// server and socket.io import and invoke
const http = require("http").Server(app);
const io = require("socket.io")(http);

// database import
const mongoose = require("mongoose");

// socket middleware import
const socketio = require("./middlewares/socket");

// router imports
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

// authenticate middleware import
const authMiddleware = require("./middlewares/authenticate");

// error middleware imports
const NotFoundMiddleware = require("./middlewares/not-found");
const ErrorHandlerMiddleware = require("./middlewares/error-handler");

// security middlewares
app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// )
// app.use(helmet())
// app.use(cors())
// app.use(xss())

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// handlebars setup
app.engine(
  "handlebars",
  exphbs.engine({ extname: ".hbs", defaultLayout: false })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/public/views"));

// routes
app.get("/", (req, res) => {
  res.render("login", { frontendUrl: `${process.env.FRONTEND_URL}` });
});

app.get("/signup", (req, res) => {
  res.render("signup", { frontendUrl: `${process.env.FRONTEND_URL}` });
});

app.get("/weChat", (req, res) => {
  res.render("chat", { frontendUrl: `${process.env.FRONTEND_URL}` });
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

socketio(io);

// error middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`🗃️  [database]: Connected to DB...`);
    http.listen(PORT, () => {
      console.log(
        `⚡️ [server]: Server is running on http://localhost:${PORT}...`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
