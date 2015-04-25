/* */ 
'use strict';
var $ = require("./$"),
    $def = require("./$.def"),
    $iter = require("./$.iter"),
    assertInstance = require("./$.assert").inst;
module.exports = function(NAME, methods, common, IS_MAP, isWeak) {
  var Base = $.g[NAME],
      C = Base,
      ADDER = IS_MAP ? 'set' : 'add',
      proto = C && C.prototype,
      O = {};
  function fixMethod(KEY, CHAIN) {
    var method = proto[KEY];
    if ($.FW)
      proto[KEY] = function(a, b) {
        var result = method.call(this, a === 0 ? 0 : a, b);
        return CHAIN ? this : result;
      };
  }
  if (!$.isFunction(C) || !(isWeak || !$iter.BUGGY && proto.forEach && proto.entries)) {
    C = common.getConstructor(NAME, IS_MAP, ADDER);
    $.mix(C.prototype, methods);
  } else {
    var inst = new C,
        chain = inst[ADDER](isWeak ? {} : -0, 1),
        buggyZero;
    if (!require("./$.iter-detect")(function(iter) {
      new C(iter);
    })) {
      C = function(iterable) {
        assertInstance(this, C, NAME);
        var that = new Base;
        if (iterable != undefined)
          $iter.forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      };
      C.prototype = proto;
      if ($.FW)
        proto.constructor = C;
    }
    isWeak || inst.forEach(function(val, key) {
      buggyZero = 1 / key === -Infinity;
    });
    if (buggyZero) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (buggyZero || chain !== inst)
      fixMethod(ADDER, true);
  }
  require("./$.cof").set(C, NAME);
  require("./$.species")(C);
  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);
  if (!isWeak)
    $iter.std(C, NAME, common.getIterConstructor(), common.next, IS_MAP ? 'key+value' : 'value', !IS_MAP, true);
  return C;
};
