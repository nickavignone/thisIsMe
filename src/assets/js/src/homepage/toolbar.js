/*jshint multistr: true */

(function() {
  'use strict';

  var Toolbar = function() {
  };

  Toolbar.prototype.generateHTML = function() {
    return '<div class="toolbar">' +
              '<div class="toolbar__top">' +
                '<div class="toolbar__lights">' +
                  '<div class="toolbar__light toolbar__light--red">' +
                    '<div class="glyph">&times;</div>' +
                    '<div class="shine"></div>' +
                    '<div class="glow"></div>' +
                  '</div>        ' +
                  '<div class="toolbar__light toolbar__light--yellow">' +
                    '<div class="glyph">-</div>' +
                    '<div class="shine"></div>' +
                    '<div class="glow"></div>' +
                  '</div>' +
                  '<div class="toolbar__light toolbar__light--green">' +
                    '<div class="glyph">+</div>' +
                    '<div class="shine"></div>' +
                    '<div class="glow"></div>' +
                  '</div>' +
                '</div>' +
                '<div class="toolbar__title">' +
                  'Chrome' +
                '</div>' +
                '<div class="toolbar__bubble">' +
                  '<div class="shine"></div>' +
                  '<div class="glow"></div>' +
                '</div>' +
              '</div>' +
            '</div>';
  };

  $(document).ready(function() {
    window.Toolbar = new Toolbar();
  });

}());
