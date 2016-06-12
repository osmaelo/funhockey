// This will go last!!!

window.Hockey = window.Hockey || {};

// alert("Hi from game");

StartGame = Hockey.StartGame = document.getElementById("start-game");
Pause     = Hockey.Pause     = document.getElementById("pause");

var ENTER_KEY = 13;

window.addEventListener("keypress", function(event) {
  var key               = event.keyCode || event.key || event.which;
  var pauseIsHidden     = Pause.classList.contains("hidden");
  var startGameIsHidden = StartGame.classList.contains("hidden");
  if (key === ENTER_KEY) {
    if (!startGameIsHidden) {
      StartGame.classList.add("hidden");

      Hockey.Animate.animate.call(window, Hockey.Animate.step);
      // var gameView = Hockey.gameView(...)
      console.log("game started");
    } else if (pauseIsHidden) {
      Pause.classList.remove("hidden");
      console.log("Paused!");
      // Pause game
    } else if (!pauseIsHidden) {
      Pause.classList.add("hidden");
      console.log("Continued!");
      // Continue game
    }
  }
});
