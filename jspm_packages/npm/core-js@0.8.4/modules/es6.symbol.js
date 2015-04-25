/* */ 
'use strict';
var $ = require("./$"),
    setTag = require("./$.cof").set,
    uid = require("./$.uid"),
    $def = require("./$.def"),
    keyOf = require("./$.keyof"),
    has = $.has,
    hide = $.hide,
    getNames = $.getNames,
    toObject = $.toObject,
    Symbol = $.g.Symbol,
    Base = Symbol,
    setter = false,
    TAG = uid.safe('tag'),
    SymbolRegistry = {},
    AllSymbols = {};
function wrap(tag) {
  var sym = AllSymbols[tag] = $.set($.create(Symbol.prototype), TAG, tag);
  $.DESC && setter && $.setDesc(Object.prototype, tag, {
    configurable: true,
    set: function(value) {
      hide(this, tag, value);
    }
  });
  return sym;
}
if (!$.isFunction(Symbol)) {
  Symbol = function Symbol(description) {
    if (this instanceof Symbol)
      throw TypeError('Symbol is not a constructor');
    return wrap(uid(description));
  };
  hide(Symbol.prototype, 'toString', function() {
    return this[TAG];
  });
}
$def($def.G + $def.W, {Symbol: Symbol});
var symbolStatics = {
  'for': function(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = Symbol(key);
  },
  keyFor: function keyFor(key) {
    return keyOf(SymbolRegistry, key);
  },
  pure: uid.safe,
  set: $.set,
  useSetter: function() {
    setter = true;
  },
  useSimple: function() {
    setter = false;
  }
};
$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
  var sym = require("./$.wks")(it);
  symbolStatics[it] = Symbol === Base ? sym : wrap(sym);
});
setter = true;
$def($def.S, 'Symbol', symbolStatics);
$def($def.S + $def.F * (Symbol != Base), 'Object', {
  getOwnPropertyNames: function getOwnPropertyNames(it) {
    var names = getNames(toObject(it)),
        result = [],
        key,
        i = 0;
    while (names.length > i)
      has(AllSymbols, key = names[i++]) || result.push(key);
    return result;
  },
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var names = getNames(toObject(it)),
        result = [],
        key,
        i = 0;
    while (names.length > i)
      has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
    return result;
  }
});
setTag(Symbol, 'Symbol');
setTag(Math, 'Math', true);
setTag($.g.JSON, 'JSON', true);
