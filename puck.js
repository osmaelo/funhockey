window.Hockey = window.Hockey || {};

(function(H) {
  // 'use strict';
  var context = H.Animate.context;

  var Puck = H.Puck = function(x, y, xSpeed, ySpeed, radius) {
    this.position = new H.Vector(x, y);
    this.velocity = new H.Vector(xSpeed, ySpeed);
    this.radius   = radius;
    // this.color    = "black";
    this.color    = "white";
  };

  var coeffFriction        = Puck.COEFFFRICTION        = 0.003;
  var wallElasticity       = Puck.WALLELASTICITY       = 0.87;
  var puckElasticity       = Puck.PUCKELASTICITY       = 1.40;
  var puckTopSpeed         = Puck.PUCKTOPSPEED         = 10.5;
  var movingPuckElasticity = Puck.MOVINGPUCKELASTICITY = 1.6;
  var puckStrikerMomentum  = Puck.PUCKSTRIKERMOMENTUM  = 6.5;

  if (H.STRIKERTOPSPEED > puckStrikerMomentum) {
    throw "Puck has to bounce off faster than the striker can travel";
  }

  // Instantiation of puck should prob go in game.js
  var puck = H.puck =  new Puck(200, 300, 0, 6, 15);
  // Test Puck 1
  // var puck = H.puck =  new Puck(60, 150, 0, -0.9, 15);
  // Test Puck 2
  // var puck = H.puck =  new Puck(200, 145, 0, -1, 15);

  Puck.prototype.render = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };

  Puck.prototype.update = function(striker1, striker2) {
    var collision = false;
    this.puckFriction(coeffFriction);
    collision = this.traverse(striker1, striker2);
    this.puckWallImpact(wallElasticity);
    if (collision) { this.strikerCollision(collision); }
  };

  Puck.prototype.puckFriction = function(coeffFriction) {
    if (this.velocity.x < 0) {
      this.velocity.x += Math.abs(this.velocity.x) * coeffFriction;
    } else if (this.velocity.x > 0) {
      this.velocity.x -= Math.abs(this.velocity.x) * coeffFriction;
    }
    if (this.velocity.y < 0) {
      this.velocity.y += Math.abs(this.velocity.y) * coeffFriction;
    } else if (this.velocity.y > 0) {
      this.velocity.y -= Math.abs(this.velocity.y) * coeffFriction;
    }
  };

  Puck.prototype.distance = function(striker) {
    var x = striker.position.x - this.position.x,
        y = striker.position.y - this.position.y;
    return Math.sqrt(x * x + y * y);
  };

  Puck.prototype.collision = function(striker) {
    return this.distance(striker) <= this.radius + striker.radius;
  };

  Puck.prototype.sweetSpot = function(striker) {
    this.position.x -= this.velocity.x;
    this.position.y -= this.velocity.y;
    while (!this.collision(striker)) {
      this.position.x += this.velocity.x * 0.0001;
      this.position.y += this.velocity.y * 0.0001;
    }
    this.position.x -= this.velocity.x * 0.0001;
    this.position.y -= this.velocity.y * 0.0001;
  };

  Puck.prototype.traverse = function(striker1, striker2) {
    if (this.velocity.x > puckTopSpeed) {
      this.velocity.x = puckTopSpeed;
    } else if (this.velocity.y > puckTopSpeed) {
      this.velocity.y = puckTopSpeed;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.collision(striker1)) { this.sweetSpot(striker1); return striker1; }
    if (this.collision(striker2)) { this.sweetSpot(striker2); return striker2; }
    return false;
  };

  Puck.prototype.puckWallImpact = function(wallElasticity) {
    var topX = this.position.x + this.radius,
        bottomX = this.position.x - this.radius,
        topY = this.position.y + this.radius,
        bottomY = this.position.y - this.radius;

    if (bottomX <= 0) {
      this.position.x = this.radius;
      this.velocity.x = -this.velocity.x * wallElasticity;
    } else if (topX >= H.Animate.WIDTH) {
      this.position.x = H.Animate.WIDTH -  this.radius;
      this.velocity.x = -this.velocity.x * wallElasticity;
    }

    if (topY >= H.Animate.HEIGHT) {
      // Needs logic for scoring
      this.position.y = H.Animate.HEIGHT -  this.radius;
      this.velocity.y = -this.velocity.y * wallElasticity;
    } else if (bottomY <= 0) {
      // Needs logic for scoring
      this.position.y = this.radius;
      this.velocity.y = -this.velocity.y * wallElasticity;
    }
  };

  Puck.prototype.strikerCollision = function(striker) {
    var x = striker.position.x - this.position.x,
        y = striker.position.y - this.position.y;

    var normalVector = new H.Vector(x, y);
    var tangentVector1 = normalVector.perpendicularVector1();
    var tangentVector2 = normalVector.perpendicularVector2();

    var tAngle1 = tangentVector1.angle();
    var tAngle2 = tangentVector2.angle();
    var vAngle = this.velocity.angle();

    var unitNormalVector = normalVector.unitVector();
    var unitTangentVector1 = tangentVector1.unitVector();
    var unitTangentVector2 = tangentVector2.unitVector();

    var velocityTangent;
    var velocityTangentVector;

    if (Math.abs(vAngle - tAngle1) > Math.abs(vAngle - tAngle2)) {
      velocityTangent = unitTangentVector2.dot(this.velocity);
      velocityTangentVector = unitTangentVector2.multiply(velocityTangent);
    } else {
      velocityTangent = unitTangentVector1.dot(this.velocity);
      velocityTangentVector = unitTangentVector1.multiply(velocityTangent);
    }

    var velocityNormal = -Math.abs(unitNormalVector.dot(this.velocity));
    var velocityNormalVector = unitNormalVector.multiply(velocityNormal);

    var newVelocityVector = velocityNormalVector.add(velocityTangentVector);
    var newUnitVelocityVector = newVelocityVector.unitVector();

    // puck.velocity = newVelocityVector.multiply(puckElasticity);
    if (newVelocityVector.magnitude() < 0.2) {
      puck.velocity = newUnitVelocityVector.multiply(puckStrikerMomentum);
    } else {
      puck.velocity = newVelocityVector.multiply(puckElasticity);
    }
    // Calculate collision if striker is speeding
  };
}(window.Hockey));


// Get the Velocity components parallel and perpendicular to the tangent vector
// Or get the a velocity component parallel to the tangent vector and
// get the other velocity component parallel to the normal vector

// Get the a velocity vector parallel to the tangent vector and convert to a
// new x y vector
// Get the a velocity vector parallel to the normal vector and convert to a
// new x y vector
// Add these for the resultant velocity vector

// The component of the velocity vector parallel to the normal vector will
// always point the opposite direction of the normal vector
// Regardless of whether the striker is moving or not
// The component of the velocity vector parallel to the tangent vector will
// always point in the same direction as it was before collision
