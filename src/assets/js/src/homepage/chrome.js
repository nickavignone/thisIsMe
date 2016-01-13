/*global Toolbar*/

(function() {
  'use strict';

  var Chrome = function() {
    this.init();
  };

  Chrome.prototype.generateHTML = function() {
    console.log(new Toolbar());
  };

  Chrome.prototype.init = function() {
    this.generateHTML();
  };

  return Chrome;

}());
