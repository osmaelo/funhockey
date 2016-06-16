window.Hockey = window.Hockey || {};
(function(H) {
  // 'use strict';
  var rinkLength = H.Animate.HEIGHT;
  var rinkWidth = H.Animate.WIDTH;
  var strikerBaseSpeed = H.STRIKERBASESPEED;
  var strikerTopSpeed = H.STRIKERTOPSPEED;

  var Computer = H.Computer = function() {
    this.striker =  new H.Striker(200, 40, 25, "green");
    // Test Comp 1
    // this.striker =  new H.Striker(25, 275, 25, "blue");
  };

  var computer = H.computer = new Computer();

  Computer.prototype.render = function () {
    this.striker.render();
  };

  Computer.prototype.reset = function() {
    this.striker.position.x = 200;
    this.striker.position.y = 40;
  };

  Computer.prototype.update = function(puck) {
    var puckPosY         = puck.position.y,
        puckInYLocation4 = puckPosY > 3*rinkLength/4,
        puckInYLocation3 = puckPosY > rinkLength/2,
        puckInYLocation2 = puckPosY > rinkLength/4,
        puckInYLocation1 = true;

    if (puckInYLocation4) {
      this.watchfulMovement(puck, strikerBaseSpeed/2);
    } else if (puckInYLocation3) {
      this.stalkerMovement(puck, strikerBaseSpeed);
    } else if (puckInYLocation2) {
      this.stalkerMovement(puck, strikerBaseSpeed);
    } else if (puckInYLocation1) {
      this.defensiveMovement(puck, strikerBaseSpeed);
    }
  };

  Computer.prototype.defensiveMovement = function(puck, topSpeed) {
    var computerXSpeed,
        computerYSpeed,
        topX    = this.striker.position.x + this.striker.radius,
        bottomX = this.striker.position.x - this.striker.radius,
        topY    = this.striker.position.y + this.striker.radius,
        bottomY = this.striker.position.y - this.striker.radius;

    if (Math.abs(puck.velocity.x) > topSpeed) {
      computerXSpeed = topSpeed;
    } else {
      computerXSpeed = Math.abs(puck.velocity.x);
    }

    if (Math.abs(puck.velocity.y) > topSpeed) {
      computerYSpeed = topSpeed;
    } else {
      computerYSpeed = Math.abs(puck.velocity.y);
    }

    // Attack Puck if it's velocity is 0!!!
    var yPositionChanged = false;
    if (puck.velocity.magnitude() < 1) {
      computerXSpeed = topSpeed/1.5;
      if (puck.position.x < bottomX) {
        this.striker.move(-computerXSpeed,0);
      } else if (puck.position.x > topX) {
        this.striker.move(computerXSpeed,0);
      }
      computerYSpeed = topSpeed/1.5;
      if (puck.position.y < bottomY) {
        this.striker.move(0, -computerYSpeed);
      } else if (puck.position.y > topY) {
        this.striker.move(0, computerYSpeed);
      }
    } else {
      if (puck.position.x < rinkWidth/3) {
        // Puck in Upper Left Corner moves Computer to block path to goal
        if (rinkWidth/3 < bottomX) {
          this.striker.move(-computerXSpeed, 0);
        } else if (rinkWidth/3 > topX) {
          this.striker.move(computerXSpeed, 0);
        }
      } else if (puck.position.x > 2*rinkWidth/3) {
        // Puck in Upper Right Corner moves Computer to block path to goal
        if (2*rinkWidth/3 < bottomX) {
          this.striker.move(-computerXSpeed, 0);
        } else if (2*rinkWidth/3 > topX) {
          this.striker.move(computerXSpeed, 0);
        }
      } else {
        // Will place Computer striker in front of goal
        if (rinkWidth/2 - this.striker.radius < bottomX) {
          this.striker.move(-computerXSpeed, 0);
        } else if (rinkWidth/2 + this.striker.radius > topX) {
          this.striker.move(computerXSpeed, 0);
        } else {
          if (puck.position.x < bottomX) {
            this.striker.move(-computerXSpeed, 0);
          } else if (puck.position.x > topX) {
            this.striker.move(computerXSpeed, 0);
          }
        }
      }
      if (puck.position.y < bottomY) {
        this.striker.move(0, -computerYSpeed);
      } else if (puck.position.y > topY) {
        this.striker.move(0, computerYSpeed);
      }
    }
  };

  Computer.prototype.watchfulMovement = function(puck, topSpeed) {
    var computerXSpeed,
        computerYSpeed,
        topX    = this.striker.position.x + this.striker.radius,
        bottomX = this.striker.position.x - this.striker.radius,
        topY    = this.striker.position.y + this.striker.radius,
        bottomY = this.striker.position.y - this.striker.radius;

    if (Math.abs(puck.velocity.x) > topSpeed) {
      computerXSpeed = topSpeed;
    } else {
      computerXSpeed = Math.abs(puck.velocity.x);
    }

    if (puck.position.x < bottomX) {
      this.striker.move(-computerXSpeed,0);
    } else if (puck.position.x > topX) {
      this.striker.move(computerXSpeed,0);
    }

    if (Math.abs(puck.velocity.y) > topSpeed) {
      computerYSpeed = topSpeed;
    } else {
      computerYSpeed = Math.abs(puck.velocity.y);
    }

    if (rinkLength/4 < bottomY) {
      this.striker.move(0,-computerYSpeed);
    } else if (rinkLength/4 > topY) {
      this.striker.move(0,computerYSpeed);
    }
  };

  Computer.prototype.stalkerMovement = function(puck, topSpeed) {
    var computerXSpeed,
        computerYSpeed,
        topX    = this.striker.position.x + this.striker.radius,
        bottomX = this.striker.position.x - this.striker.radius,
        topY    = this.striker.position.y + this.striker.radius,
        bottomY = this.striker.position.y - this.striker.radius;

    if (Math.abs(puck.velocity.x) > topSpeed) {
      computerXSpeed = topSpeed;
    } else {
      computerXSpeed = Math.abs(puck.velocity.x);
    }

    if (puck.position.x < bottomX) {
      this.striker.move(-computerXSpeed,0);
    } else if (puck.position.x > topX) {
      this.striker.move(computerXSpeed,0);
    }

    if (Math.abs(puck.velocity.y) > topSpeed) {
      computerYSpeed = topSpeed;
    } else {
      computerYSpeed = Math.abs(puck.velocity.y);
    }

    if (puck.position.y < bottomY) {
      this.striker.move(0,-computerYSpeed);
    } else if (puck.position.y > topY) {
      this.striker.move(0,computerYSpeed);
    }
  };

}(window.Hockey));
