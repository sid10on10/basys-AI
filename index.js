"use strict";
const express = require("express");
const bodyParser = require("body-parser")
// Create the express app
const app = express();

// routes
const tradesRouter = require("./routers/trades");

// Routes and middleware
// app.use(/* ... */)
// app.get(/* ... */)

app.use(bodyParser.json())

app.use("/trades", tradesRouter);

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send('This is an invalid route');
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Sorry Server Crashed!');
});

// Start server
app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Started at http://localhost:3000");
});
