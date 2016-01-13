//$(this).closest('.a');

/*global jQuery*/
/*global Draggy*/
/*global Chrome*/
(function() {
  'use strict';
  var AppWindows = (function($) {

    var AppWindow = function(el, type) {
      this.type = type || '';
      this.$el = el || null;
      this.init();
    };

    AppWindow.prototype.setListeners = function() {
      var _this = this;
      this.$el.genie({
        'AppObject': this
      });
      this.draggy = new Draggy(this.$el[0]);
    };

    AppWindow.prototype.setSizeLocation = function() {
      this.$el.css({'width': this.$el.width() + 'px', 'height': this.$el.height() + 'px', 'transform': 'translate(' + (($(document).width() - this.$el.width()) / 2) + 'px, 60px)'});
    };

    AppWindow.prototype.setApplication = function() {
      if (this.type === 'chrome') {
        this.app = new Chrome();
        this.app.init();
        this.$el = this.app.$el;
      }
    };

    AppWindow.prototype.init = function() {
      if (this.$el === null) {
        this.setApplication();
      }
      this.setSizeLocation();
      this.setListeners();
    };

    var AppWindows = function() {
      this.$terminal = $('.terminal__textDisplay');
      this.AppWindows = [];
      this.dataLine = 0;
    };

    AppWindows.prototype.setWindows = function() {
      var _this = this;
      $('.application').each(function() {
        _this.AppWindows.push(new AppWindow($(this)));
      });
    };

    AppWindows.prototype.addWindow = function(type) {
      this.AppWindows.push(new AppWindow(null, type));
    };

    AppWindows.prototype.setListeners = function() {

    };

    AppWindows.prototype.init = function() {
      this.setWindows();
      this.setListeners();
      var $dock = $('#dock ul');
      $dock.addClass('notransition');
      $dock.width($dock.width() + 1);
      setTimeout(function() {
        $dock.removeClass('notransition');
      }, 0);
    };

    return AppWindows;

  }(jQuery));
  $(document).ready(function() {
    window.appWindows = new AppWindows();
    window.appWindows.init();
  });
})();
