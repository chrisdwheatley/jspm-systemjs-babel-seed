/* */ 
'use strict';
var $ = require("./$"),
    $def = require("./$.def");
$def($def.P, 'String', {repeat: function repeat(count) {
    var str = String($.assertDefined(this)),
        res = '',
        n = $.toInteger(count);
    if (n < 0 || n == Infinity)
      throw RangeError("Count can't be negative");
    for (; n > 0; (n >>>= 1) && (str += str))
      if (n & 1)
        res += str;
    return res;
  }});
