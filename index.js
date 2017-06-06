/**
 * Main index.js file
 */

// Static variables
var PORT = process.env.PORT || 3000;

// Dependencies
var http = require("http");
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// app specific dependencies
var controller = require("./controller");

// model dependencies
var Article = require("./models/Article.js");

// initialize express app instance
var app = express();
app.server = http.createServer(app);

// db config
var databaseUrl = "news_scraper";
var collections = ["articles"];

// hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(err) {
  console.log("Database Error:", err);
});

// server static pages
app.use(express.static(path.join(__dirname, "/public")));

// Set views
app.set("views", path.join(__dirname, "/views"));

// Set Handlebars as view engine
var hbs = exphbs.create({
  layoutsDir: "views/layouts",
  defaultLayout: "main"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// serve index.html which will be
app.use("/", controller);

app.server.listen(PORT, function() {
  console.log("App started on port " + PORT);
});

module.exports.app;
