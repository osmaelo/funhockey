window.Hockey = window.Hockey || {};


(function(H) {
  // 'use strict';
  var enterKey = H.ENTER_KEY = 13;

  // var StartGame         = H.StartGame         = document.getElementById("start-game"),
      // Pause             = H.Pause             = document.getElementById("pause"),
      // PlayerScoreSpan   = H.PlayerScoreSpan   = document.getElementById("player"),
      // ComputerScoreSpan = H.ComputerScoreSpan = document.getElementById("computer");

  var Game = H.Game = {};

  var StartGame         = Game.StartGame         = document.getElementById("start-game"),
      Pause             = Game.Pause             = document.getElementById("pause"),
      PlayerScoreSpan   = Game.PlayerScoreSpan   = document.getElementById("player"),
      ComputerScoreSpan = Game.ComputerScoreSpan = document.getElementById("computer");

  window.addEventListener("keypress", function(event) {
    var key               = event.keyCode || event.key || event.which;
    var pauseIsHidden     = Pause.classList.contains("hidden");
    var startGameIsHidden = StartGame.classList.contains("hidden");
    if (key === enterKey) {
      if (!startGameIsHidden) {
        StartGame.classList.add("hidden");
        H.Animate.animate.call(window, H.Animate.step);
      } else if (pauseIsHidden) {
        Pause.classList.remove("hidden");
        // Pause game
        H.Animate.gamePaused();
      } else if (!pauseIsHidden) {
        Pause.classList.add("hidden");
        // Continue game
        H.Animate.gamePaused();
      }
    }
  });

  var updateScore = Game.updateScore = function(element) {
    var currentScore = Number(element.innerHTML);
    element.innerHTML = currentScore + 1;
  };

}(window.Hockey));
