window.Hockey = window.Hockey || {};
(function(H) {
  // 'use strict';

  var keysDown      = H.keysDown = {},
      left          = H.LEFT = 37,
      up            = H.UP = 38,
      right         = H.RIGHT = 39,
      down          = H.DOWN = 40;

  var Player = H.Player = function() {
    this.striker =  new H.Striker(200, 560, 25, "orange");
    // Test
    // this.striker =  new H.Striker(200, 560, 75, "brown");
  };

  // Instantiation of player should prob go in game.js
  var player = H.player = new Player();

  window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });

  window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
  });

  Player.prototype.render = function() {
    this.striker.render();
  };

  Player.prototype.update = function() {
    for (var key in keysDown) {
      var value = Number(key);
      if (value === left) {
        this.striker.move(-H.STRIKERBASESPEED,0);
      } else if (value === right) {
        this.striker.move(H.STRIKERBASESPEED,0);
      } else if (value === up) {
        this.striker.move(0,-H.STRIKERBASESPEED);
      } else if (value === down) {
        this.striker.move(0,H.STRIKERBASESPEED);
      } else {
        this.striker.move(0,0);
      }
    }
  };

  Player.prototype.reset = function() {
    this.striker.position.x = 200;
    this.striker.position.y = 560;
  };

}(window.Hockey));
