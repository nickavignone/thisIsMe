/*global jQuery*/

(function($) {
  'use strict';
  $.fn.toolbarLights = function(options) {
    options = $.extend({
      'example'   : 1500,
      'minSize'   : 65,
      'action'    : 'minimize',
      'AppObject' : null
    }, options);

    var $appWindow = this;
    var $dock = $('#dock ul');
    var minimized = {};
    var maximized = {};

    function setListeners() {
      $appWindow.on('click', function() {
        if ($appWindow.hasClass('minimized')) {
          maximize();
        }
      });
      $appWindow.find('.toolbar__light--yellow').on('click', function() {
        minimize();
      });
    }

    function minimize() {
      var scale     = options.minSize / $appWindow.width();
      var targetX   = $('#dock li').last().offset().left;
      var targetY   = $('#dock li').last().offset().top;
      var partialW  = ($appWindow.outerWidth() / 100);
      var partialH  = ($appWindow.outerHeight() / 100);

      var targetLeft = ((targetX + 45) - ($(window).width() / 2)) / partialW;
      targetLeft = ((targetX + 45)) / partialW;
      var targetTop = targetY / partialH;
      var top = (65 - ($appWindow.height() * scale)) / 2;

      options.AppObject.draggy.disable();

      $appWindow.removeClass('notransition');
      $appWindow.css({'transform': 'translateX(' + targetLeft + '%) translateY(' + (targetTop + (top / partialH)) + '%) scale(' + scale + ')'});

      minimized.left = targetLeft;
      minimized.scale = scale;
      minimized.top = (targetTop + (top / partialH));

      maximized.top = $appWindow.offset().top;
      maximized.left = $appWindow.offset().left;

      $dock.css('width', ($dock.width() + 93) + 'px');
      setTimeout(function() {
        $dock.append($('<li></li>').append($appWindow));
        //$appWindow.css({'transition':'none', 'transform' : 'scale('+ scale +')', 'left':'0', 'position':'absolute','top': top + 'px'});
        $appWindow.css({'transform': 'scale(' + scale + ')', 'position': 'absolute','top': top + 'px'});
        $appWindow.addClass('minimized');
      }, 500);
    }

    function maximize() {
      $('#homepage').append($appWindow);
      $('#dock').find('li').last().remove();

      options.AppObject.draggy.enable();

      //$appWindow.css({'transition':'none', 'top':'0', 'left':'50%', 'transform':'translateX(' + minimized.left + '%) translateY(' + minimized.top + '%) scale('+ minimized.scale +')'});
      $appWindow.addClass('notransition');
      $appWindow.css({'top': '0', 'transform': 'translateX(' + minimized.left + '%) translateY(' + minimized.top + '%) scale(' + minimized.scale + ')'});

      setTimeout(function() {
        $appWindow.removeClass('notransition');
      }, 0);

      setTimeout(function() {
        $dock.css('width', ($dock.width() - 93) + 'px');
        $appWindow.removeClass('minimized');
        //$appWindow.css({'transform':'scale(1) translateX(' + maximized.left + 'px) translateY(' + maximized.top + 'px)', 'left' : '50%'});
        $appWindow.css({'transform': 'scale(1) translateX(' + maximized.left + 'px) translateY(' + maximized.top + 'px)'});
      }, 0);

      setTimeout(function() {
        $appWindow.addClass('notransition');
      }, 500);
    }

    function expand() {

    }

    function init() {
      setListeners();
    }
    init();
  };
})(jQuery);
/*
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
});*/
