window.Hockey = window.Hockey || {};

(function(H) {
  // 'use strict';
  var Rink = H.Rink = {};

  var context = H.Animate.context;
  var width = H.Animate.WIDTH;
  var height = H.Animate.HEIGHT;
  var rinkRadius = H.Rink.RINKRADIUS = 75;

  var renderRink = Rink.renderRink = function() {
    context.fillStyle = "#ccccff";
    context.fillRect(0, 0, width, height / 2);
    context.fillStyle = "#d6f5d6";
    context.fillRect(0, height / 2, width, height / 2);
    context.fillStyle = "red";
    context.fillRect(0, height / 2 - 5, width, 10);
  };

  var renderMagicalRink = Rink.renderMagicalRink = function() {
    context.fillStyle = "#ffcc00";
    context.fillRect(0, 0, width / 3, height / 4);

    context.fillStyle = "#ff9933";
    context.fillRect(width / 3, 0,  2 * width / 3, height / 4);

    context.fillStyle = "#ff6600";
    context.fillRect(2 * width / 3, 0, width, height / 4);

    context.fillStyle = "#660066";
    context.fillRect(0, height / 4, width / 3, height / 2);

    context.fillStyle = "#cc00cc";
    context.fillRect(width / 3, height / 4,  2 * width / 3, height / 2);

    context.fillStyle = "#ff00ff";
    context.fillRect(2 * width / 3, height / 4, width, height / 2);

    context.fillStyle = "#009933";
    context.fillRect(0, height / 2, width / 3, 3 * height / 4);

    context.fillStyle = "#33cc33";
    context.fillRect(width / 3, height / 2,  2 * width / 3, 3 * height / 4);

    context.fillStyle = "#003300";
    context.fillRect(2 * width / 3, height / 2, width, 3 * height / 4);

    context.fillStyle = "#00ccff";
    context.fillRect(0, 3 * height / 4, width / 3, height);

    context.fillStyle = "#0099ff";
    context.fillRect(width / 3, 3 * height / 4,  2 * width / 3, height);

    context.fillStyle = "#0066ff";
    context.fillRect(2 * width / 3, 3 * height / 4, width, height);

    context.fillStyle = "red";
    context.fillRect(0, height / 2 - 5, width, 10);
  };

}(window.Hockey));
