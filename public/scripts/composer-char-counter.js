
// A JQuery event handler that listens for a user typing a new tweet in the tweet form and calculates and displays the current remaining characters.
$(document).ready(function() {
  console.log("index.html has finished loading!")

  $("#new-tweet form > textarea").on("input", function(event) {
    console.log(140 - $(this).val().length);
    $(this).parent().find(".counter").html(140 - $(this).val().length);
    if ($(this).val().length >= 140) {
      $(this).parent().find(".counter").css("color", "red");
    } else {
      $(this).parent().find(".counter").css("color", "#545149");
    }
  });
});