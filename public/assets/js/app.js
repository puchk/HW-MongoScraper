$(document).ready(function() {
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

  $("#scrapeArticles").on("click", function(e) {
    e.preventDefault();
    // $.ajax({
    //   url: "/scrape",
    //   method: "GET",
    //   success: function(res) {
    //     alert(res.length() + " articles added to your saved articles");
    document.location.href = "/scrape";
    //   },
    //   error: function(err) {
    //     alert(err);
    //   }
    // });
  });

  $(".deleteArticle").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      url: "/delete/" + $(this).attr("data-id").toString(),
      method: "DELETE",
      success: function(res) {
        // alert(res);
        location.reload();
      }
    });
  });
});
