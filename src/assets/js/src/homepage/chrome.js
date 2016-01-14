/*global Toolbar*/

(function() {
  'use strict';

  var Chrome = function() {
    this.$el = null;
  };

  Chrome.prototype.generateURLbar = function() {
    return '<div class="urlbar">' +
              '<div><input class="urlbar__input" type="text" name="url"></div>' +
            '</div>';
  };

  Chrome.prototype.generateIframe = function() {
    return '<iframe class="chromewindow__iframe" src="http://espn.com"></iframe>';
  };

  Chrome.prototype.generateHTML = function() {
    this.$el = $('<div class="application chromewindow">' + Toolbar.generateHTML() + this.generateURLbar() + this.generateIframe() + '</div>');
    $('#homepage').append(this.$el);
  };

  Chrome.prototype.init = function() {
    this.generateHTML();
  };

  window.Chrome = Chrome;

}());
