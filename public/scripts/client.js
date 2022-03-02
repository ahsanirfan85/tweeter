$(document).ready(function() {

  // A function that creates the element(s) to display a tweet on the page.
  const createTweetElement = function(tweetObject) {
    let tweetElement = `<article>
    <header>
      <div>
        <img src="${tweetObject.user.avatars}">
        <h3>${tweetObject.user.name}</h3>
      </div>
      <h3>${tweetObject.user.handle}</h3>
    </header>
    <p class="tweet">${escape(tweetObject.content.text)}</p>
    <footer>
      <p>Posted ${timeago.format(tweetObject.created_at)}</p>
      <p class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </p>
    </footer>
  </article>`;
  return tweetElement;
  }

  // An escape function to ensure that if a user enters any HTML/CSS/JS into the tweet form, it doesn't break the app.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // A function that renders a collection/array of tweets on the page. Requires the 'createTweetElement' function above.
  const renderTweets = function(arrayOfTweets) {
    for (const tweet of arrayOfTweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }

  // A function that makes an AJAX request to the app's server to fetch all the stored tweets and display them on the page. Requires the 'renderTweets' function above
  const loadTweets = function() {
    $('#tweet-container').empty();
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetsJSON) {
      console.log('Success: ', tweetsJSON);
      renderTweets(tweetsJSON);
    });
  };

  // A function call that loads all tweets when the app loads for the first time.
  loadTweets();

  // A JQuery event handler that listens for the user to click the "tweet" button.
  $("#new-tweet form").submit(function(event) {
    event.preventDefault();
    const string = $(this).serialize();
    
    // Conditionals for error handling.
    if (string === "text=") {
      $(".error-message").html("<strong>Error:</strong> Please write a Tweet before clicking the Tweet button!").slideDown("slow");
    } else if (string.length > 145) {
      $(".error-message").html("<strong>Error:</strong> Please keep your tweets to shorter than 140 characters!").slideDown("slow");
    } else {
      $.post("/tweets", string, loadTweets());
      $("#new-tweet form textarea").val("");
    }

    // Resetting the character counter to 140.
    $(this).find('.counter').html(140);

  });

  // A JQuery event handler that listens for user clicking the "Write a new tweet" text in the navbar. Shows or hides the tweet form.
  $("#newtweettoggle").click(function(event) {
    $("#new-tweet").slideToggle("slow");
  });

  //A JQuery event handler that listens for the user scrolling. When they scroll down, the navbar slides up and a "scroll to top" button appears in the bottom right corner. When they scroll up to the top, the navbar slides down and the "scroll to top" button disappears.
  $(window).scroll(function(event) {

    if ($(this).scrollTop() > 200) {
      $("main > button").fadeIn("slow");
      $("nav").slideUp("slow");
    } else {
      $("main > button").fadeOut("slow");
      $("nav").slideDown("slow");
    }
    
  });

  // A JQuery event handler that listens for the user clicking the "scroll to top" button. Clicking it takes the user back to the top.
  $("main > button").click(function(event) {
    $("html, body").animate({scrollTop: 0}, "slow");
    $("#new-tweet").slideToggle("slow");
  });

});