$(document).ready(function() {

  var lastRender = 0
  var msPassed = 0;
  var secondsRemaining = 0;

  var finished = true;
  var paused = false;

  var keypressListener = $('.keypress-listener');
  keypressListener.focus();
  keypressListener.keypress(function() {
    paused = !paused;

    if (paused) {
      $('.pause').css('display', 'block');
    } else {
      $('.pause').css('display', 'none');
    }
  });
  
  init();

  function init() {
    $('.hour-btn').click(function() {
      secondsRemaining += 0.002 * 60 * 60;
      finished = false;
      keypressListener.focus();
    });

    $('.half-hour-btn').click(function() {
      secondsRemaining += 0.5 * 60 * 60;
      finished = false;
      keypressListener.focus();
    })

    window.requestAnimationFrame(loop)
  }

  function update(progress) {

    if (!finished && !paused) {
      secondsRemaining -= progress / 1000;
    }

    if (secondsRemaining < 0 && !finished) {
      secondsRemaining = 0;
      finished = true;
      
      doFinishNotification();
    }
;
    var hours = Math.floor(secondsRemaining / 60 / 60);
    var minutes = Math.floor(secondsRemaining / 60) % 60;
    var seconds = Math.floor(secondsRemaining) % 60;

    $('.clock-text').text(hours + " : " + minutes + " : " + seconds);
  }

  function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress)

    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }

  function doFinishNotification() {
    var audio = new Audio('time.wav');
    audio.play();
    window.setTimeout(function() {
      alert("It's that time!");
    }, 4000);
  }
});