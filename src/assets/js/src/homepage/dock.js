/*global appWindows*/

var Dock = function() {
  'use strict';

  Dock.prototype.setListeners = function() {
    $('#dock ul').on('click', 'li.app', function() {
      appWindows.addWindow($(this).attr('data-apptype'));
    });
  };

  Dock.prototype.init = function() {
    this.setListeners();
  };
};
