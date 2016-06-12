// This one goes first

window.Hockey = window.Hockey || {};

(function() {
  // 'use strict';

  var Util = H.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  // Math, vector algebra goes here ...

}(window.Hockey));
