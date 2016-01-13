var Dock = function() {
  'use strict';

  Dock.prototype.setListeners = function() {
    $('#dock ul').on('click', 'li', function() {
      console.log('test');
    });
  };

  Dock.prototype.init = function() {
    console.log('aa');
    this.setListeners();
  };
};
