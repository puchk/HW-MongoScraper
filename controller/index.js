var express = require("express");
var controller = express.Router();

controller.get("/", function(req, res) {
  res.send("HELLO WORLD");
});

module.exports = controller;
