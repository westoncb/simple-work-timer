const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {

  var msPassed = 0;
  var secondsRemaining = 0;

  var finished = true;
  var paused = false;
  
  init();

  function init() {
    $('.hour-btn').click(function() {
      secondsRemaining += 1 * 60 * 60;
      finished = false;
      keypressListener.focus();
    });

    $('.half-hour-btn').click(function() {
      secondsRemaining += 0.5 * 60 * 60;
      finished = false;
      keypressListener.focus();
    });

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

    $(document).click(function() {
      keypressListener.focus();
    });

    setInterval(loop, 50);
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

  function loop() {
    var progress = 50;

    update(progress)
  }

  function doFinishNotification() {
    var audio = new Audio('time.wav');
    audio.play();
    ipcRenderer.send('forefront');
  }
});