window.Hockey = window.Hockey || {};
(function(H) {
  // 'use strict';

  var context          = H.Animate.context,
      strikerBaseSpeed = H.STRIKERBASESPEED = 3,
      strikerTopSpeed  = H.STRIKERTOPSPEED = 5,
      halfwayLine      = H.Animate.HEIGHT / 2;

  var Striker = H.Striker = function(x, y, radius, color) {
    this.position = new H.Vector(x, y);
    this.radius   = radius;
    this.color    = color;
  };

  Striker.prototype.render = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };

  Striker.prototype.move = function (x, y) {
    // if (!this.collision(H.puck)) { this.traverse(x, y); }
    if (this.collision(H.puck)) {
      this.backTraverse(x, y);
    } else {
      this.traverse(x, y);
    }
    if (this.position.y > halfwayLine) {
      this.constrainedBorderMovement(halfwayLine, H.Animate.HEIGHT);
    } else {
      this.constrainedBorderMovement(0, halfwayLine);
    }
  };

  Striker.prototype.traverse = function(x, y) {
    this.position.x += x;
    this.position.y += y;
  };

  Striker.prototype.backTraverse = function(x, y) {
    this.position.x -= x;
    this.position.y -= y;
  };

  Striker.prototype.constrainedBorderMovement = function(bottomBorder, topBorder) {
    var topX = this.position.x + this.radius,
        bottomX = this.position.x - this.radius,
        topY = this.position.y + this.radius,
        bottomY = this.position.y - this.radius;
    if (bottomY < bottomBorder) {
      this.position.y = bottomBorder + this.radius;
      // this.velocity.y = 0;
    } else if (topY > topBorder) {
      this.position.y = topBorder - this.radius;
      // this.velocity.y = 0;
    }
    if (bottomX < 0) {
      this.position.x = 0 + this.radius;
      // this.velocity.x = 0;
    } else if (topX > H.Animate.WIDTH) {
      this.position.x = H.Animate.WIDTH - this.radius;
      // this.velocity.x = 0;
    }
  };

  Striker.prototype.distance = function(puck) {
    var x = this.position.x - puck.position.x,
        y = this.position.y - puck.position.y;
    return Math.sqrt(x * x + y * y);
  };

  Striker.prototype.collision = function(puck) {
    return this.distance(puck) <= this.radius + puck.radius;
  };

}(window.Hockey));
