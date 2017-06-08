var express = require("express");
var router = express.Router();
var request = require("request");
var cheerio = require("cheerio");

// model dependencies
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

router.get("/scrape", function(req, res) {
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
        result[i].link =
          baseUrl + $(this).find("h3").children("a").attr("href").toString();
      });
      resolve(result);
    });
  })
    .then(function(r) {
      res.render("scrape", { articles: r });
    })
    .catch(function(e) {
      console.log(e);
    });
});

router.get("/", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { articles: doc });
    }
  });
});

router.get("/clearall", function(req, res) {
  Article.remove({}, function(err) {
    res.send("Cleared Article collection");
  });
  Note.remove({}, function(err) {
    res.send("Cleared Article collection");
  });
});

router.get("/articles", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

router.get("/articles/:id", function(req, res) {
  Article.findOne({ _id: req.params.id })
    .populate("note")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
    });
});

router.get("/notes/:articleId", function(req, res) {
  Note.find({ articleId: req.params.articleId }).exec(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.render("partials/modalnotes", {notes: doc, articleId: req.params.articleId});
    }
  });
});

router.post("/addnote", function(req, res) {
  var note = {};
  console.log(req.body);
  note.title = req.body.title;
  note.body = req.body.body;
  note.articleId = req.body.articleId;
  var comment = Note(note);

  comment.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
      res.render("partials/modalnotes", {notes: doc, articleId: req.body.articleId});
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
    } else {
      console.log(doc);
      res.send("saved");
    }
  });
});

router.delete("/delete/:id", function(req, res) {
  console.log(req.params);
  Article.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted article from the database");
      res.send("Deleted article from the database");
    }
  });
  Note.remove({articleId: req.params.id}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted notes from the database");
    }
  });
});

module.exports = router;
