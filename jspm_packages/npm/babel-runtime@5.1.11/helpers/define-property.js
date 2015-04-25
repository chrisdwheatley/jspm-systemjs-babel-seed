/* */ 
"use strict";
var _Symbol = require("../core-js/symbol")["default"];
exports["default"] = function(obj, key, value) {
  return Object.defineProperty(obj, key, {
    value: value,
    enumerable: key == null || typeof _Symbol == "undefined" || key.constructor !== _Symbol,
    configurable: true,
    writable: true
  });
};
exports.__esModule = true;
