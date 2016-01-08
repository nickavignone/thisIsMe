$(this).closest('.a');

/*global jQuery*/

var AppWindows = (function($) {
  'use strict';

  var AppWindow = function(el) {
    this.$el = el;
    this.$minimize = el.find('.toolbar__light--yellow');
    this.init();
  };

  AppWindow.prototype.setListeners = function() {
    var _this = this;
    this.$minimize.on('click', function () {
      _this.$el.genie();
    });
  };

  AppWindow.prototype.init = function() {
    this.setListeners();
    var $dock = $('#dock ul');
    $dock.addClass('notransition');
    $dock.width($dock.width() + 1);
    setTimeout(function () {
      $dock.removeClass('notransition');
    }, 0);
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

  AppWindows.prototype.setListeners = function() {

  };

  AppWindows.prototype.init = function() {
    this.setWindows();
    this.setListeners();

  };

  

  return AppWindows;

}(jQuery));


$(document).ready(function() {
  'use strict';
  var genie = new AppWindows();
  genie.init();
});