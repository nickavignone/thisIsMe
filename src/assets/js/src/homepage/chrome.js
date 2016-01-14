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

  Chrome.prototype.setListeners = function() {
    var _this = this;
    this.$el.find('.urlbar__input').keypress(function(e) {
      if (e.which == 13) {
        if (this.value.indexOf('http://') > -1 || this.value.indexOf('https://') > -1) {
          _this.$el.find('.chromewindow__iframe').attr('src', this.value);
        } else {
          _this.$el.find('.chromewindow__iframe').attr('src', 'http://' + this.value);
        }
      }
    });
  };

  Chrome.prototype.generateResizeable = function() {
    return '<div class="resizeable">' +
              '<div class="resizeable__arm resizeable__arm--top" data-resizefrom="t" data-resizeable="ns"></div>' +
              '<div class="resizeable__arm resizeable__arm--right" data-resizefrom="r" data-resizeable="ew"></div>' +
              '<div class="resizeable__arm resizeable__arm--bottom" data-resizefrom="b" data-resizeable="ns"></div>' +
              '<div class="resizeable__arm resizeable__arm--left" data-resizefrom="l" data-resizeable="ew"></div>' +
            '</div>';
  };

  Chrome.prototype.generateIframe = function() {
    return '<iframe class="chromewindow__iframe" src=""></iframe>';
  };

  Chrome.prototype.generateHTML = function() {
    this.$el = $('<div class="application chromewindow">' + Toolbar.generateHTML() + this.generateURLbar() + this.generateIframe() + this.generateResizeable() + '</div>');
    $('#homepage').append(this.$el);
  };

  Chrome.prototype.init = function() {
    this.generateHTML();
    this.setListeners();
  };

  window.Chrome = Chrome;

}());
