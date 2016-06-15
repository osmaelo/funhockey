window.Hockey = window.Hockey || {};


(function(H) {
  // 'use strict';
  var enterKey = H.ENTER_KEY = 13;
  var Game = H.Game = {};

  var StartGame         = Game.StartGame         = document.getElementById("start-game"),
      Pause             = Game.Pause             = document.getElementById("pause"),
      PlayerScoreSpan   = Game.PlayerScoreSpan   = document.getElementById("player"),
      ComputerScoreSpan = Game.ComputerScoreSpan = document.getElementById("computer");
      GoalScored        = Game.GoalScored        = document.getElementById("goal-scored");
      timer             = Game.timer             = document.getElementById("timer");
      winningScore      = Game.winningScore      = 5;
      timerDuration     = Game.duration          = 150;
      gameResetting     = Game.gameResetting     = false;

  window.addEventListener("keypress", function(event) {
    var key               = event.keyCode || event.key || event.which;
    var pauseIsHidden     = Pause.classList.contains("hidden");
    var startGameIsHidden = StartGame.classList.contains("hidden");
    if (key === enterKey) {
      if (!startGameIsHidden) {
        StartGame.classList.add("hidden");
        H.Animate.animate.call(window, H.Animate.step);
      } else if (pauseIsHidden && !gameResetting) {
        Pause.classList.remove("hidden");
        // Pause game
        H.Animate.gamePaused();
      } else if (!pauseIsHidden && !gameResetting) {
        Pause.classList.add("hidden");
        // Continue game
        H.Animate.gamePaused();
      }
    }
  });

  var updateScore = Game.updateScore = function(element) {
    var currentScore = Number(element.innerHTML);
    element.innerHTML = currentScore + 1;
    if (currentScore === winningScore - 1) {
      alert("You win!");
      // Show modal, and winner of game, pause game indefinitely...
    } else {
      this.resetGame();
    }
  };

  var resetGamePieces = Game.resetGamePieces = function() {
    H.puck.reset();
    H.player.reset();
    H.computer.reset();
  };

  var countdown = Game.countdown = function() {
    var duration = timerDuration;
    var seconds, milli;
    myInte = setInterval(function() {
        seconds = parseInt(duration / 100, 10);
        milli = parseInt(duration % 100, 10);
        milli = milli < 10 ? "0" + milli : milli;
        timer.innerHTML = seconds + "." + milli;
        if (--duration < 0) { duration = 0; }
    }, 10);
  };

  var resetGame = Game.resetGame = function() {
    gameResetting = true;
    GoalScored.classList.remove("hidden");
    this.resetGamePieces();
    H.Animate.gamePaused();
    this.countdown();
    setTimeout(function(){
      GoalScored.classList.add("hidden");
      H.Animate.gamePaused();
      clearInterval(myInte);
      gameResetting = false;
    }, timerDuration * 10);
  };

}(window.Hockey));
