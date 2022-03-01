/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
        <p class="tweet">${tweetObject.content.text}</p>
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

  const renderTweets = function(arrayOfTweets) {
    for (const tweet of arrayOfTweets) {
      const $tweet = createTweetElement(tweet);
      $('.container').append($tweet);    
    }
  }

  renderTweets(data);

  $("#tweetbutton").on("input", function(event) {
    console.log(140 - $(this).val().length);
    $(this).parent().find(".counter").html(140 - $(this).val().length);
    if ($(this).val().length >= 140) {
      $(this).parent().find(".counter").css("color", "red");
    }
  });

});