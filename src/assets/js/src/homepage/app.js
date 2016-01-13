/*global GulpType*/
/*global Dock*/

$(document).ready(function() {
  'use strict';
  var gType = new GulpType();
  gType.init();

  var dock = new Dock();
  dock.init();
});
