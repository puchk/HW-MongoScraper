$(document).ready(function() {
  $("#scrapeArticles").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/scrape",
      method: "GET",
      success: function(res) {
        alert("30 articles loaded");
        location.reload();
      },
      error: function(err) {
        alert(err);
      }
    });
  });

  $("#deleteArticles").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/clearall",
      method: "GET",
      success: function(res) {
        alert(res);
        location.reload();
      },
      error: function(err) {
        alert(err);
      }
    });
  });

  $(".saveArticle").on("click", function(e) {
    var postData = {};
    postData.summary = $(this).attr("data-summary");
    postData.title = $(this).attr("data-title");
    postData.link = $(this).attr("data-link");
    postData.imgUrl = $(this).attr("data-imgUrl");
    $.ajax({
      url: "/save",
      method: "POST",
      data: postData,
      success: function(res) {
        console.log(res);
        document.location.href = "/";
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
