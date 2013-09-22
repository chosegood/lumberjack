/*
 * lumberjack
 * https://github.com/chosegood/lumberjack
 *
 * Copyright (c) 2013 Chris Hosegood
 * Licensed under the MIT license.
 */

'use strict';

exports.awesome = function() {
  return 'awesome';
};

exports.parseLog = function(logFile) {
  var fs = require('fs'),
      Lazy = require('lazy'),
      lazy;

    lazy = new Lazy(fs.createReadStream(logFile))
      .lines
      .forEach(function(line) {
        var arrayOfStrings = line.toString().split(' ');

        // var date = arrayOfStrings[0] + ' ' + arrayOfStrings[1];

        arrayOfStrings = line.toString().split('::');

          console.log('----');
        if ('WEB' === arrayOfStrings[1]) {
          console.log(arrayOfStrings[1]);
          console.log(arrayOfStrings[2]);
          console.log(arrayOfStrings[3]);
        } else {
          console.log(arrayOfStrings[1]);
          console.log(arrayOfStrings[2]);
          console.log(arrayOfStrings[3]);
        }

        // var performanceEntry = {
        //    date: date,
        //    duration: duration
        // };
        // console.log(duration);
      }
    );

  return 'awesome';
};
