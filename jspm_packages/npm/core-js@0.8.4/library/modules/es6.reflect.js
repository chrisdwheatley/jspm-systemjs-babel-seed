/* */ 
var $ = require("./$"),
    $def = require("./$.def"),
    setProto = require("./$.set-proto"),
    $iter = require("./$.iter"),
    ITER = require("./$.uid").safe('iter'),
    step = $iter.step,
    assert = require("./$.assert"),
    isObject = $.isObject,
    getDesc = $.getDesc,
    setDesc = $.setDesc,
    getProto = $.getProto,
    apply = Function.apply,
    assertObject = assert.obj,
    _isExtensible = Object.isExtensible || $.it;
function Enumerate(iterated) {
  var keys = [],
      key;
  for (key in iterated)
    keys.push(key);
  $.set(this, ITER, {
    o: iterated,
    a: keys,
    i: 0
  });
}
$iter.create(Enumerate, 'Object', function() {
  var iter = this[ITER],
      keys = iter.a,
      key;
  do {
    if (iter.i >= keys.length)
      return step(1);
  } while (!((key = keys[iter.i++]) in iter.o));
  return step(0, key);
});
function wrap(fn) {
  return function(it) {
    assertObject(it);
    try {
      fn.apply(undefined, arguments);
      return true;
    } catch (e) {
      return false;
    }
  };
}
function get(target, propertyKey) {
  var receiver = arguments.length < 3 ? target : arguments[2],
      desc = getDesc(assertObject(target), propertyKey),
      proto;
  if (desc)
    return $.has(desc, 'value') ? desc.value : desc.get === undefined ? undefined : desc.get.call(receiver);
  return isObject(proto = getProto(target)) ? get(proto, propertyKey, receiver) : undefined;
}
function set(target, propertyKey, V) {
  var receiver = arguments.length < 4 ? target : arguments[3],
      ownDesc = getDesc(assertObject(target), propertyKey),
      existingDescriptor,
      proto;
  if (!ownDesc) {
    if (isObject(proto = getProto(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = $.desc(0);
  }
  if ($.has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver))
      return false;
    existingDescriptor = getDesc(receiver, propertyKey) || $.desc(0);
    existingDescriptor.value = V;
    setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}
var reflect = {
  apply: require("./$.ctx")(Function.call, apply, 3),
  construct: function construct(target, argumentsList) {
    var proto = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype,
        instance = $.create(isObject(proto) ? proto : Object.prototype),
        result = apply.call(target, instance, argumentsList);
    return isObject(result) ? result : instance;
  },
  defineProperty: wrap(setDesc),
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = getDesc(assertObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  },
  enumerate: function enumerate(target) {
    return new Enumerate(assertObject(target));
  },
  get: get,
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getDesc(assertObject(target), propertyKey);
  },
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(assertObject(target));
  },
  has: function has(target, propertyKey) {
    return propertyKey in target;
  },
  isExtensible: function isExtensible(target) {
    return !!_isExtensible(assertObject(target));
  },
  ownKeys: require("./$.own-keys"),
  preventExtensions: wrap(Object.preventExtensions || $.it),
  set: set
};
if (setProto)
  reflect.setPrototypeOf = function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  };
$def($def.G, {Reflect: {}});
$def($def.S, 'Reflect', reflect);
