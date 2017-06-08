$(document).ready(function() {

  $("#addNewNote").on("click", function(e) {
    e.preventDefault();
    var title = $("#noteTitle").val();
    var body = $("#noteBody").val();
    var articleId = $(this).attr("data-articleId");
    console.log(title);
    console.log(body);
    console.log(articleId);

    if (title && title != "" && body && body != "" && articleId && articleId != "") {
      var path = "/addnote";
      var postData = {};
      postData.title = title;
      postData.body = body;
      postData.articleId = articleId;
      $.ajax({
          url: path,
          method: "POST",
          data: postData,
          success: function(res) {
            //   console.log(res);
            //   $("#masterModal").html(res);
              location.reload();
          },
          error: function(err) {
              console.log(err);
          }
      });

    } else {
        alert("Please enter title & note before clicking the save button.");
    }
  });

  $(".delete-note-btn").on("click", function(e) {
    e.preventDefault();
    var noteid = $(this).attr("data-id").toString();
    $.ajax({
        url: "/delete-note/" + noteid,
        method: "DELETE",
        success: function(res) {
            console.log(res);
            $("#panel-"+noteid).remove();
        }, 
        catch: function(err) {
            console.log(err);
        }
    });
  });

});
