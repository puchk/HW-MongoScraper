var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// model dependencies
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

// router.get("/", function(req, res) {
//   Article.find({}, function(err, doc) {
//     if(err) {
//       console.log(err);
//     } else {
//       res.render("index", {"articles":doc});      
//     }
//   });
// });

router.get("/", function(req, res) {
  return new Promise(function(resolve, reject) {
    var result = {};
    var baseUrl = "http://www.newsweek.com/";
    var articleSubUrl = "tech-science";
    request(baseUrl + articleSubUrl, function(err, resp, html) {
      var $ = cheerio.load(html);
      $("li article").each(function(i, element) {
        result[i] = {};
        console.log($(this).find("h3").children("a").attr("href").toString());
        result[i].title = $(this).find("h3").children("a").text();
        result[i].imgUrl = $(this).find("picture").children("img").attr("src");
        result[i].summary = $(this).find("div.summary").text();
        result[i].link = baseUrl + $(this).find("h3").children("a").attr("href").toString();
      });
      resolve(result);
    });
  })
    .then(function(r) {
      res.render("index", {"articles":r});      
    })
    .catch(function(e) {
      console.log(e);
    });
});

router.get("/clearall", function(req, res) {
  Article.remove({}, function(err) {
    res.send("Cleared Article collection");
  });
});

router.get("/articles", function(req, res) {
  Article.find({}, function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

router.get("/articles/:id", function(req, res) {
  Article.findOne({"_id": req.params.id})
    .populate("note")
    .exec(function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});


router.post("/save", function(req, res) {
  console.log(req.body);
  //save data into database
  var entry = Article(req.body);

  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
      // res.redirect("saved");
      
    } else {
      console.log(doc);
    }
  });
});

module.exports = router;
