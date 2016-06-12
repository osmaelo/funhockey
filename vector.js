window.Hockey = window.Hockey || {};

(function(H) {
  // 'use strict';
  var Vector = H.Vector = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Vector.prototype.angle = function() {
    var x = this.x,
        y = this.y,
        baseAngle;

    if (x >= 0) {
      if (y >= 0 ) {
        // quadrant 1
        baseAngle = Math.atan(y/x) * 180/Math.PI;
      } else {
        // quadrant 4
        baseAngle = Math.abs(Math.atan(x/y)) * 180/Math.PI + 270;
      }
    } else {
      if (y >= 0 ) {
        // quadrant 2
        baseAngle = Math.abs(Math.atan(x/y)) * 180/Math.PI + 90;
      } else {
        // quaadrant 3
        baseAngle = Math.abs(Math.atan(y/x)) * 180/Math.PI + 180;
      }
    }
    return baseAngle;
  };

  Vector.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Vector.prototype.add = function(otherVector) {
    var newX = this.x + otherVector.x;
    var newY = this.y + otherVector.y;
    return new Vector(newX, newY);
  };

  Vector.prototype.subtract = function(otherVector) {
    var newX = this.x - otherVector.x;
    var newY = this.y - otherVector.y;
    return new Vector(newX, newY);
  };

  Vector.prototype.multiply = function(scalar) {
    var newX = this.x * scalar;
    var newY = this.y * scalar;
    return new Vector(newX, newY);
  };

  Vector.prototype.divide = function(scalar) {
    if (scalar === 0) { throw "Can't divide by zero!"; }
    var newX = this.x / scalar;
    var newY = this.y / scalar;
    return new Vector(newX, newY);
  };

  Vector.prototype.unitVector = function() {
    var magnitude = this.magnitude();
    var newX = this.x / magnitude;
    var newY = this.y / magnitude;
    return new Vector(newX, newY);
  };

  Vector.prototype.perpendicularVector1 = function() {
    return new Vector(this.y, -1 * this.x);
  };

  Vector.prototype.perpendicularVector2 = function() {
    return new Vector(-1 * this.y, this.x);
  };

  Vector.prototype.dot = function(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y;
  };

}(window.Hockey));
