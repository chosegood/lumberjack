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
    Lazy = require('lazy'),
    json2csv = require('json2csv');

function parseLineToJSON(line) {
  var arrayOfStrings,
      datetime,
      performanceEntry;

  arrayOfStrings = line.split(' ');
  datetime = arrayOfStrings[0] + ' ' + arrayOfStrings[1];
  arrayOfStrings = line.toString().split('::');
  performanceEntry = {
    'datetime': datetime,
    'component': arrayOfStrings[1],
    'request': arrayOfStrings[2],
    'duration': arrayOfStrings[3].trim()
  };
  return performanceEntry;
}

function convertJSONToCSV(perfJson, stream) {
  perfJson = [perfJson];
  json2csv({data: perfJson, fields: ['datetime', 'component', 'request', 'duration']}, function(err, csv) {
    if (err) { console.log(err); }
    console.log(csv);
    stream.write(csv);
  });
}

exports.parseLog = function(logFile, outfile) {
  var lazy,
      stream = fs.createWriteStream(outfile);

    lazy = new Lazy(fs.createReadStream(logFile))
      .lines
      .forEach(function(line) {
        var lineStr = line.toString();
        if (lineStr.indexOf('PERFORMANCE METRICS') > 0) {
          convertJSONToCSV(parseLineToJSON(lineStr), stream);
        }
      }
    );

    // stream.end('');

  return 'awesome';
};
