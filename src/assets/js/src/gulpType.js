/*global jQuery*/

(function($, document) {
  'use strict';
  function GulpType() {
    this.className = 'ff';
  }

  GulpType.prototype.setListeners = function() {

  };

  GulpType.prototype.init = function() {

    this.setListeners();

  };

  $(document).ready(function() {
    var gType = new GulpType();
    gType.init();
  });
}(jQuery, document));