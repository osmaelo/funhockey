window.Hockey = window.Hockey || {};

(function(H) {
  // 'use strict';
  var Rink = H.Rink = {};

  var context = H.Animate.context;
  var width = H.Animate.WIDTH;
  var height = H.Animate.HEIGHT;
  var rinkRadius = H.Rink.RINKRADIUS = 75;

  var renderRink = Rink.renderRink = function() {
    var redRadius = 45;
    var blueRadius = 55;
    var circleThickness = 10;
    var goalRadius = width/6;
    var blueisColor = "blue";
    var redishColor = "red";
    var white = "white";
    var centerRedLinePos;
    var topBlueLinePos = height/4.5 + redRadius + (height/2 - blueRadius - height/4.5 - redRadius)/2;
    var bottomBlueLinePos = height - (height/4.5 + redRadius + (height/2 - blueRadius - height/4.5 - redRadius)/2);
    var upperOutsideRedDotPos = topBlueLinePos + (height/2 - (topBlueLinePos + circleThickness/2))/2;
    // Rink color
    context.fillStyle = white;
    context.fillRect(0, 0, width, height);
    // striker radius is 25
    // puck radius is 15


    // center blue circle
    context.beginPath();
    context.arc(width/2, height/2, blueRadius, 2 * Math.PI, false);
    context.fillStyle = blueisColor;
    context.fill();

    context.beginPath();
    context.arc(width/2, height/2, blueRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = white;
    context.fill();

    // center red line
    context.fillStyle = redishColor;
    context.fillRect(0, height / 2 - 5, width, 10);

    // blue dot;
    context.beginPath();
    context.arc(width/2, height/2, circleThickness, 2 * Math.PI, false);
    context.fillStyle = blueisColor;
    context.fill();

    // blues lines
    context.fillStyle = blueisColor;
    context.fillRect(0, topBlueLinePos, width, 10);

    context.fillStyle = blueisColor;
    context.fillRect(0, bottomBlueLinePos, width, 10);

    // 4 outside dots
    context.beginPath();
    context.arc(width/4.5, upperOutsideRedDotPos, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, upperOutsideRedDotPos, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/4.5, height - upperOutsideRedDotPos, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, height - upperOutsideRedDotPos, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();


    // 4 red circles
    // circle 1
    context.beginPath();
    context.arc(width/4.5, height/4.5, redRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/4.5, height/4.5, redRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = white;
    context.fill();

    // circle 2
    context.beginPath();
    context.arc(width - width/4.5, height - height/4.5, redRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, height - height/4.5, redRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = white;
    context.fill();

    // circle 3
    context.beginPath();
    context.arc(width/4.5, height - height/4.5, redRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/4.5, height - height/4.5, redRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = white;
    context.fill();

    // circle 4
    context.beginPath();
    context.arc(width - width/4.5, height/4.5, redRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, height/4.5, redRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = white;
    context.fill();

    // 4 inside red dots
    context.beginPath();
    context.arc(width/4.5, height/4.5, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, height/4.5, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/4.5, height - height/4.5, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width - width/4.5, height - height/4.5, circleThickness, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    // first and last red lines
    context.fillStyle = redishColor;
    context.fillRect(0, 0, width, 10);

    context.fillStyle = redishColor;
    context.fillRect(0, height - 10, width, 10);

    // Goal Circles
    context.beginPath();
    context.arc(width/2, 0, goalRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/2, 0, goalRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = blueisColor;
    context.fill();

    context.beginPath();
    context.arc(width/2, height, goalRadius, 2 * Math.PI, false);
    context.fillStyle = redishColor;
    context.fill();

    context.beginPath();
    context.arc(width/2, height, goalRadius - circleThickness, 2 * Math.PI, false);
    context.fillStyle = blueisColor;
    context.fill();
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
