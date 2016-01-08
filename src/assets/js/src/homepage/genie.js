$(this).closest('.a');

/*global jQuery*/

(function($) {
  'use strict';
  $.fn.genie = function(options) {
    options = $.extend({
      'example': 1500,
      'minSize': 65,
      'action' : 'minimize' 
    }, options);

    var $appWindow = this;
    var $dock = $('#dock ul');


    function minimize() {
      var scale     = options.minSize / $appWindow.width();
      var targetX   = $('#dock li').last().offset().left;
      var targetY   = $('#dock li').last().offset().top;
      var partialW  = ($appWindow.outerWidth() / 100);
      var partialH  = ($appWindow.outerHeight() / 100);
      var targetLeft = ((targetX + 45) - ($( window ).width() /2 )) / partialW;
      var targetTop = targetY / partialH;
      var top = (65 - ($appWindow.height() * scale)) / 2;


      console.log(targetX + ' x');
      console.log($('#dock ul li:nth-child(1)').offset().left + ' 11');
      console.log($('#dock ul li:nth-child(2)').offset().left + ' 22');
      console.log($('#dock ul li:nth-child(3)').offset().left + ' 33');
      console.log($('#dock ul li:nth-child(4)').offset().left + ' 44');
      console.log($('#dock ul li:nth-child(5)').offset().left + ' 55');

      $appWindow.css('transform', 'translateX(' + targetLeft + '%) translateY(' + (targetTop + (top / partialH)) + '%) scale('+ scale +')');
      console.log($dock);
      console.log($dock.width());
      $dock.css('width', ($dock.width() + 95) + 'px');
      console.log($dock.width());
      setTimeout(function () {
        //$dock.append($('<li></li>').append($appWindow));
        //$appWindow.css({'transition':'none', 'transform' : 'scale('+ scale +')', 'left':'0', 'position':'absolute','top': top + 'px'});
        //$appWindow.addClass('minimized');
        console.log($appWindow.height());
      }, 500);
    }

    function maximize() {

    }

    function expand() {

    }

    function init() {
      if(options.action == 'minimize') {
        minimize();
      } else if(options.action == 'maximize'){
        maximize();
      } else {
        expand();
      }
    }

    init();
  };
})(jQuery);

var Genie = (function($) {
  'use strict';
  var Genie = function() {
    this.$trigger = $('.toolbar__light--yellow');
    this.$terminal = $('.terminal__textDisplay');
    this.dataSet = 0;
    this.dataLine = 0;
  };

  Genie.prototype.setListeners = function() {

  };

  Genie.prototype.init = function() {

    this.setListeners();

  };

  return Genie;

}(jQuery));


$(document).ready(function() {
  'use strict';
  var genie = new Genie();
  genie.init();
});