/*global jQuery*/
/*global TypeData*/

var GulpType = (function($, document, TypeData) {
  'use strict';
  var GulpType = function() {
    this.$terminal = $('.terminal__textDisplay');
    this.dataSet = 0;
    this.dataLine = 0;
  };

  GulpType.prototype.randomNum = function () {
    var rando = Math.floor((Math.random() * 30));
    if(rando < 1) {
      return Math.floor((Math.random() * 1000));
    } else if (rando < 2) {
      return Math.floor((Math.random() * 800));
    }
    return Math.floor((Math.random() * 100));
  };

  GulpType.prototype.typeText = function (str, $el) {
    if(str.length > 0) {
      $el.append(str[0]);
      setTimeout(function() {
        this.typeText(str.slice(1), $el);
      }.bind(this), 75);
    } else {
      $el.removeClass('terminal__typing');
      if(TypeData[this.dataSet].data.length > this.dataLine + 1) {
        this.dataLine++;
        setTimeout(this.runType.bind(this), 500);
      } else {
        this.nextSet();
      }
    }
  };

  GulpType.prototype.runType = function () {
    var $el   = $('<span class="terminal__typing"></span>');
    this.$terminal.append($('<br />'));
    this.$terminal.append($el);
    $el.append(TypeData[this.dataSet].pre + '&nbsp;');
    //this.$terminal.append($('<br /><span>' + TypeData[set].data[line] + '</span>'));
    this.typeText(TypeData[this.dataSet].data[this.dataLine], $el);
  };

  GulpType.prototype.runLine = function () {
    var set   = this.dataSet;
    var line  = this.dataLine;
    this.$terminal.addClass('terminal__textDisplay--running');
    this.$terminal.append($('<br /><span>' + TypeData[set].data[line] + '</span>'));
    if(TypeData[set].data.length > line + 1) {
      this.dataLine++;
      setTimeout(this.runLine.bind(this), this.randomNum());
    } else {
      this.$terminal.removeClass('terminal__textDisplay--running');
      this.nextSet();
    }
  };

  GulpType.prototype.nextSet = function () {
    this.dataSet++;
    this.dataLine = 0;
    if(TypeData.length > this.dataSet) {
      this.run();
    } else {
      this.$terminal.find('span').last().addClass('terminal__typing');
    }
  };

  GulpType.prototype.setSize = function () {
    var terminal = $('.terminal');
    terminal.css('width', terminal.width() + 'px');
    terminal.css('height', terminal.height() + 'px');
  };

  GulpType.prototype.run = function () {

    this.setSize();

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
  return GulpType;
}(jQuery, document, TypeData));

