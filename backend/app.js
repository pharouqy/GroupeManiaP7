const express = require("express");
const helmet = require("helmet");
var cookieParser = require('cookie-parser');
require("dotenv").config();
const path = require("path");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeDeslikeRouter = require("./routes/likeDeslikeRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likeDeslike", likeDeslikeRouter);

module.exports = app;