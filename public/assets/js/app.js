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

  $(".addNotes").on("click", function(e) {
    var path = '/notes/' + $(this).attr("data-id").toString();
    $.get(path, function(res) {
      $("#notesModal").html(res);
      $("#notesModal").modal("show");
    });
  });
  
});
