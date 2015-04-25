/* */ 
'use strict';
var $ = require("./$"),
    cof = require("./$.cof"),
    $def = require("./$.def");
$def($def.P, 'String', {startsWith: function startsWith(searchString) {
    if (cof(searchString) == 'RegExp')
      throw TypeError();
    var that = String($.assertDefined(this)),
        index = $.toLength(Math.min(arguments[1], that.length));
    searchString += '';
    return that.slice(index, index + searchString.length) === searchString;
  }});
