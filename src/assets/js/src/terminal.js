/*global jQuery*/
/*global TypeData*/

(function($, document, TypeData) {
  'use strict';
  function GulpType() {
    this.className = 'ff';
    this.$terminal = $('.terminal__textDisplay');
    this.dataSet = 0;
    this.dataLine = 0;
  }

  GulpType.prototype.runType = function () {
    console.log(this);
    var set   = this.dataSet;
    var line  = this.dataLine;
    this.$terminal.append($('<br /><span>' + TypeData[set].data[line] + '</span>'));
    if(TypeData[set].data.length > line + 2) {
      this.dataLine++;
      this.runType();
    } else {
      this.nextSet();
    }
    console.log(this);
  };

  GulpType.prototype.runLine = function () {
    console.log(this);
    var set   = this.dataSet;
    var line  = this.dataLine;
    this.$terminal.append($('<br /><span>' + TypeData[set].data[line] + '</span>'));
    if(TypeData[set].data.length > line + 2) {
      this.dataLine++;
      this.runLine();
    } else {
      this.nextSet();
    }
    console.log(this);
  };

  GulpType.prototype.nextSet = function () {
    this.dataSet++;
    if(TypeData.length > this.dataSet + 1) {
      this.run();
    }
  };

  GulpType.prototype.run = function () {
    console.log(this);

    if(TypeData[this.dataSet].type == 'type') {
      this.runType();
    } else {
      this.runLine();
    }
  };

  GulpType.prototype.setListeners = function() {

  };

  GulpType.prototype.init = function() {

    this.run();

  };

  $(document).ready(function() {
    var gType = new GulpType();
    gType.init();
  });
}(jQuery, document, TypeData));