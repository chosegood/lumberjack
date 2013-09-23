/*
 * lumberjack
 * https://github.com/chosegood/lumberjack
 *
 * Copyright (c) 2013 Chris Hosegood
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    Lazy = require('lazy');

function parseLine(line) {
  var arrayOfStrings,
      datetime,
      performanceEntry;

  arrayOfStrings = line.split(' ');
  datetime = arrayOfStrings[0] + ' ' + arrayOfStrings[1];
  arrayOfStrings = line.toString().split('::');
  performanceEntry = {
    datetime: datetime,
    component: arrayOfStrings[1],
    request: arrayOfStrings[2],
    duration: arrayOfStrings[3].trim()
  };
  return performanceEntry;
}

exports.parseLog = function(logFile) {
  var lazy;

    lazy = new Lazy(fs.createReadStream(logFile))
      .lines
      .forEach(function(line) {
        var lineStr = line.toString();
        if (lineStr.indexOf('PERFORMANCE METRICS') > 0) {
          console.log(parseLine(lineStr));
        }
      }
    );

  return 'awesome';
};
