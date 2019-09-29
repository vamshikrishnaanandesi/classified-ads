var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressValidator = require('express-validator');
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const cors = require("cors");

require("./models/user");
require("./models/ads.model");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adsRouter = require("./routes/ads");

// Connect To Database (OLD CODE)
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});
// On Error
mongoose.connection.on("error", err => {
  console.log("Database error " + err);
});

var app = express();

const users = require("./routes/users");
const ads = require("./routes/ads");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    parameterLimit: 100000000,
    extended: true //extended: true
  })
);
app.use(expressValidator());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/ads", adsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
