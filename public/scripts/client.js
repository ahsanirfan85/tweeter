/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(tweetObject) {
    let tweetElement = `<article id="tweet-container">
    <div class="shadow">
      <header>
        <div>
          <img class="avatar">
          <h3 class="tweeter-name">${tweetObject.user.name}</h3>
        </div>
        <h3 class="tweeter-handle">${tweetObject.user.handle}</h3>
      </header>
      <div>
        <p class="tweet">${escape(tweetObject.content.text)}</p>
      </div>
      <footer>
        <p class="age">Posted ${timeago.format(tweetObject.created_at)}</p>
        <p class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </p>
      </footer>
    </div>
  </article>`;
  return tweetElement;
  }

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const renderTweets = function(arrayOfTweets) {
    for (const tweet of arrayOfTweets) {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet);
    }
  }

  const loadTweets = function() {
    // $('.container').empty();
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetsJSON) {
      console.log('Success: ', tweetsJSON);
      renderTweets(tweetsJSON);
    });
  };

  loadTweets();

  $("#tweetbutton").on("input", function(event) {
    console.log(140 - $(this).val().length);
    $(this).parent().find(".counter").html(140 - $(this).val().length);
    if ($(this).val().length >= 140) {
      $(this).parent().find(".counter").css("color", "red");
    }
  });

  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    
    const string = $(this).serialize();
    
    if (string === "text=") {
      // alert("Please write a Tweet before clicking the Tweet button!");
      $(".error-message").html("<strong>Error:</strong> Please write a Tweet before clicking the Tweet button!").slideDown("slow");
    } else if (string.length > 145) {
      $(".error-message").html("<strong>Error:</strong> Please keep your tweets to shorter than 140 characters!").slideDown("slow");
      // alert("Please keep your tweets to shorter than 140 characters!");
    } else {
      $.post("/tweets", string);
      loadTweets();
      $(this).trigger('reset');
    }

  });

  $(".newtweettoggle").click(function(event) {
    $(".tweet-form").slideToggle("slow");
  });

  $(window).scroll(function(event) {

    if ($(this).scrollTop() > 200) {
      $(".totop").fadeIn("slow");
      $("nav").slideUp("slow");
    } else {
      $(".totop").fadeOut("slow");
      $("nav").slideDown("slow");
    }
    
  });

  $(".totop").click(function(event) {
    $("html, body").animate({scrollTop: 0}, "slow");
    $(".tweet-form").slideToggle("slow");
  });

});