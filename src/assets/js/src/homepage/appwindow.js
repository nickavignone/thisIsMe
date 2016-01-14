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
      this.$el.toolbarLights({
        'AppObject': this
      });
      this.draggy = new Draggy(this.$el[0], this.$el.find('.toolbar')[0]);
      this.$el.on('mousedown', function(e) {
        if ($(e.target).closest('.toolbar__light').length < 1 && !$(this).hasClass('minimized')) {
          $('#homepage').append(_this.$el);
        }
      });
    };

    AppWindow.prototype.setSizeLocation = function() {
      this.$el.css({'width': this.$el.width() + 'px', 'height': this.$el.height() + 'px', 'transform': 'translateX(' + (($(document).width() - this.$el.width()) / 2) + 'px) translateY(60px)'});
    };

    AppWindow.prototype.setApplication = function() {
      if (this.type === 'chrome') {
        this.app = new Chrome();
        this.app.init();
        this.$el = this.app.$el;
        var height = this.$el.height() - this.$el.find('.toolbar').height() - this.$el.find('.urlbar').height();
        this.$el.find('.chromewindow__iframe').height(height + 'px');
      }
    };

    AppWindow.prototype.init = function() {
      if (this.$el === null) {
        this.setApplication();
      }
      this.$el.addClass('notransition');
      this.setSizeLocation();
      setTimeout(function() {
        this.setListeners();
      }.bind(this), 0);
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
