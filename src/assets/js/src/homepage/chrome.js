/*global Toolbar*/

(function() {
  'use strict';

  var Chrome = function() {
    this.$el = null;
  };

  Chrome.prototype.generateHTML = function() {
    this.$el = $('<div class="application">' + Toolbar.generateHTML() + '</div>');
    $('#homepage').append(this.$el);
  };

  Chrome.prototype.init = function() {
    this.generateHTML();
  };

  window.Chrome = Chrome;

}());
