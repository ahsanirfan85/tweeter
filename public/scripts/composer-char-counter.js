$(document).ready(function() {
  console.log("index.html has finished loading!")

  $("#tweet-text").on("input", function(event) {
    console.log(140 - $(this).val().length);
    $(this).parent().find(".counter").html(140 - $(this).val().length);
    if ($(this).val().length >= 140) {
      $(this).parent().find(".counter").css("color", "red");
    }
  });

  // $("textarea").on("keydown", (event) => {
  //   console.log(event);
  // });

  // $("textarea").on("keyup", (event) => {
  //   console.log(event);
  // });

  // $("textarea").on("change", (event) => {
  //   console.log(event);
  // });

  // $("textarea").on("input", (event) => {
  //   console.log(event);
  // });

});