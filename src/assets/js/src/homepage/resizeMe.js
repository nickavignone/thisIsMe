/*global jQuery*/

(function($) {
  'use strict';
  $.fn.resizeMe = function(options) {
    options = $.extend({
      'example': 1500,
      'el': null
    }, options);

    var $d   = $(document);
    var from = '';
    var isTouch = 'ontouchstart' in window;

    function resizeStart(e) {
      console.log(isTouch);
      console.log(e.clientX);
      var start = {};
      start.x = isTouch ? e.touches[0].pageX : e.clientX;
      start.y = isTouch ? e.touches[0].pageY : e.clientY;
      start.width = options.el.width();
      start.height = options.el.height();
      start.top = options.el.offset().top;
      start.left = options.el.offset().left;
      $('.chromewindow__iframe').css('pointer-events', 'none');

      function resizeMove(e) {
        var current = {};
        current.x = isTouch ? e.touches[0].pageX : e.clientX;
        current.y = isTouch ? e.touches[0].pageY : e.clientY;

        if (from === 't') {
          options.el.height((start.height + (start.y - current.y)) + 'px');
          options.el.css({'transform': 'translate(' + start.left + 'px, ' + (start.top - (start.y - current.y)) + 'px)'});
        } else if (from === 'r') {
          options.el.width((start.width - (start.x - current.x)) + 'px');
        } else if (from === 'b') {
          options.el.height((start.height - (start.y - current.y)) + 'px');
        } else {
          options.el.width((start.width + (start.x - current.x)) + 'px');
          options.el.css({'transform': 'translate(' + (start.left - (start.x - current.x)) + 'px, ' + start.top + 'px)'});
        }
      }

      function resizeEnd() {
        $d.off('mousemove', resizeMove);
        $d.off('mouseup', resizeEnd);
        document.body.style.cursor = 'default';
        $('.chromewindow__iframe').css('pointer-events', 'all');
      }

      $d.on('mousemove', resizeMove);
      $d.on('mouseup', resizeEnd);

      from = $(e.target).attr('data-resizefrom');

      if ($(e.target).attr('data-resizeable') === 'ns') {
        document.body.style.cursor = 'ns-resize';
      } else {
        document.body.style.cursor = 'ew-resize';
      }
    }

    function setListeners() {
      options.el.find('.resizeable__arm').on('mousedown', resizeStart);
    }

    function init() {
      setListeners();
    }

    init();
  };
})(jQuery);
