/*global appWindows*/

var Dock = function() {
  'use strict';

  Dock.prototype.setListeners = function() {
    $('#dock ul').on('click', 'li', function() {
      console.log($(this));
      console.log($(this).attr('data-apptype'));
      appWindows.addWindow($(this).attr('data-apptype'));
    });
  };

  Dock.prototype.init = function() {
    this.setListeners();
  };
};
