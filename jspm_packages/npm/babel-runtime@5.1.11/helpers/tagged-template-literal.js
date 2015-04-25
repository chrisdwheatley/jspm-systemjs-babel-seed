/* */ 
"use strict";
var _Object$freeze = require("../core-js/object/freeze")["default"];
exports["default"] = function(strings, raw) {
  return _Object$freeze(Object.defineProperties(strings, {raw: {value: _Object$freeze(raw)}}));
};
exports.__esModule = true;
