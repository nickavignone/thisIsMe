(function() {
  'use strict';

  var Toolbar = function() {
    this.init();
  };

  Toolbar.prototype.generateHTML = function() {
    return '<div class="test"></div>';
  };

  Toolbar.prototype.init = function() {
    this.html = this.generateHTML();
  };

  return Toolbar.html;

}());
