window.Hockey = window.Hockey || {};

(function(H) {
  // 'use strict';
  var Animate = H.Animate = {};

  var gameContinues = H.Animate.gameContinues = true,
      gameWon       = H.Animate.gameWon       = false;

  Animate.WIDTH  = 400;
  Animate.HEIGHT = 600;

  var animate = Animate.animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60); };

  var canvas = Animate.canvas = document.getElementById('game-canvas');
  canvas.width = Animate.WIDTH;
  canvas.height = Animate.HEIGHT;
  var context = Animate.context = canvas.getContext('2d');

  var step = Animate.step = function() {
    if (gameContinues) { update(); }
    render();
    animate(step);
  };

  var update = Animate.update = function() {
    H.player.update();
    H.computer.update(H.puck);
    H.puck.update(H.player.striker, H.computer.striker);
  };

  var render = Animate.render = function() {
    if (gameWon) {
      H.Rink.renderMagicalRink();
    } else {
      H.Rink.renderRink();
    }
    // H.Rink.renderRink();
    // H.Rink.renderMagicalRink();
    H.player.render();
    H.computer.render();
    H.puck.render();
  };

  var gamePaused = Animate.gamePaused = function() {
    gameContinues = gameContinues ? false : true;
  };

  var gameFinished = Animate.gameFinished = function() {
    gameWon = gameWon ? false : true;
  };

}(window.Hockey));
