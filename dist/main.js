(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing/app-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/app-routing/app-routing.module.ts ***!
  \***************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes */ "./src/app/app-routing/routes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_3__["routes"])
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app-routing/routes.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing/routes.ts ***!
  \***************************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _market_market_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../market/market.component */ "./src/app/market/market.component.ts");
/* harmony import */ var _opportunities_opportunities_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../opportunities/opportunities.component */ "./src/app/opportunities/opportunities.component.ts");
/* harmony import */ var _people_people_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../people/people.component */ "./src/app/people/people.component.ts");
/* harmony import */ var _bam_bam_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bam/bam.component */ "./src/app/bam/bam.component.ts");
/* harmony import */ var _top_top_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../top/top.component */ "./src/app/top/top.component.ts");






var routes = [
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"] },
    { path: 'market', component: _market_market_component__WEBPACK_IMPORTED_MODULE_1__["MarketComponent"] },
    { path: 'oppy', component: _opportunities_opportunities_component__WEBPACK_IMPORTED_MODULE_2__["OpportunitiesComponent"] },
    { path: 'people', component: _people_people_component__WEBPACK_IMPORTED_MODULE_3__["PeopleComponent"] },
    { path: 'bam', component: _bam_bam_component__WEBPACK_IMPORTED_MODULE_4__["BamComponent"] },
    { path: 'top', component: _top_top_component__WEBPACK_IMPORTED_MODULE_5__["TopComponent"] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.wrapperDisabled {\n    display: none;\n    position: absolute;\n    width: 100px;\n    height: 100px;\n    background-color: gray;\n    top: 50px;\n    left: 50px;\n    padding: 10px;\n    opacity: .8;\n  }\n\n  .nsm-dialog {\n    max-width:950px;\n  }"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.\n    <notifier-container></notifier-container>\n-->    \n    <div [ngClass]=\"{'wrapper': true}\"> \n\n        <ngx-smart-modal [closable]=\"false\" [escapable]=\"false\" [dismissable]=\"false\" #modalMsgFromServer identifier=\"modalMsgFromServer\" id=\"modalMsgFromServer\">\n            <h3>{{modalTitle}}</h3>\n            <hr>   \n                    \n            <ul *ngIf=\"actions.length > 0\">                \n                    <table class=\"table\">\n                            <thead>\n                                <tr>\n                                    <th scope=\"col\">Action</th>\n                                    <th scope=\"col\">Result</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let action of actions\">\n                                    <td>{{action.type}}</td>\n                                    <td>[{{action.result}}]</td>\n                                </tr>\n                            </tbody>\n                            \n                    </table>    \n            </ul>   \n\n            <ngx-spinner bdOpacity = 0.9 size = \"default\" color = \"#06f47d\" type = \"pacman\" fullScreen = \"false\">                \n                <p style=\"color: #06f47d\" > Running Quarter ... </p>\n            </ngx-spinner>\n\n            <button (click)=\"cleanStatus()\" *ngIf=\"isFinish\">Close</button>\n        </ngx-smart-modal>\n\n\n                    <app-sidebar></app-sidebar>                                \n                    <app-navbar></app-navbar>\n            \n                    <div [ngClass]=\"{'wrapperDisabled': isElaborating}\">\n                        <router-outlet></router-outlet> \n                        <app-footer></app-footer>\n                    </div>\n                    \n                    <app-elaboration [hidden]=\"!isElaborating\"></app-elaboration>\n                    \n                    \n\n            \n    </div>        \n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_websocket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/websocket.service */ "./src/app/services/websocket.service.ts");
/* harmony import */ var _services_chat_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/chat.service */ "./src/app/services/chat.service.ts");
/* harmony import */ var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-smart-modal */ "./node_modules/ngx-smart-modal/esm5/ngx-smart-modal.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(chatService, cookieService, ngxSmartModalService, spinner) {
        var _this_1 = this;
        this.chatService = chatService;
        this.cookieService = cookieService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.spinner = spinner;
        this.title = 'The Presales Game';
        this.isFinish = false;
        this.actions = [];
        this.chatService.messages.subscribe(function (msg) {
            console.log(msg);
            if (msg['type'] === 'start') {
                _this_1.isFinish = false;
                _this_1.modalTitle = msg['msg'];
                _this_1.ngxSmartModalService.getModal("modalMsgFromServer").open();
            }
            if (msg['type'] === 'end') {
                _this_1.isFinish = true;
                _this_1.spinner.hide();
            }
            if (msg['type'] === 'actions') {
                _this_1.actions.push(msg['msg']);
                console.log(_this_1.actions);
            }
        }, function (error) {
            console.log("Error receiving webSocket message : ", error);
        }, function () {
            console.log("webSocket connection closed by Server side");
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.companyID = this.cookieService.get('companyID');
        var _this = this;
        setTimeout(function () { _this.chatService.messages.next({ type: 'control', message: _this.companyID }); }, 1000);
        this.spinner.show();
    };
    AppComponent.prototype.cleanStatus = function () {
        this.ngxSmartModalService.getModal('modalMsgFromServer').close();
        this.actions = [];
        window.location.reload();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            providers: [_services_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"], _services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"]]
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_chat_service__WEBPACK_IMPORTED_MODULE_2__["ChatService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"],
            ngx_smart_modal__WEBPACK_IMPORTED_MODULE_3__["NgxSmartModalService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/sidebar/sidebar.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _market_market_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./market/market.component */ "./src/app/market/market.component.ts");
/* harmony import */ var _opportunities_opportunities_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./opportunities/opportunities.component */ "./src/app/opportunities/opportunities.component.ts");
/* harmony import */ var _people_people_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./people/people.component */ "./src/app/people/people.component.ts");
/* harmony import */ var _bam_bam_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bam/bam.component */ "./src/app/bam/bam.component.ts");
/* harmony import */ var _top_top_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./top/top.component */ "./src/app/top/top.component.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app-routing/app-routing.module */ "./src/app/app-routing/app-routing.module.ts");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _shared_restConfig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/restConfig */ "./src/app/shared/restConfig.ts");
/* harmony import */ var _services_company_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./services/company.service */ "./src/app/services/company.service.ts");
/* harmony import */ var _services_process_httpmsg_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/angular-highcharts.es5.js");
/* harmony import */ var _charts_charts_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./charts/charts.component */ "./src/app/charts/charts.component.ts");
/* harmony import */ var _shared_filter_pipe__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./shared/filter.pipe */ "./src/app/shared/filter.pipe.ts");
/* harmony import */ var _shared_filter_pipe_peopleproposal__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./shared/filter.pipe.peopleproposal */ "./src/app/shared/filter.pipe.peopleproposal.ts");
/* harmony import */ var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-smart-modal */ "./node_modules/ngx-smart-modal/esm5/ngx-smart-modal.js");
/* harmony import */ var _elaboration_elaboration_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./elaboration/elaboration.component */ "./src/app/elaboration/elaboration.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__["SidebarComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"],
                _market_market_component__WEBPACK_IMPORTED_MODULE_7__["MarketComponent"],
                _opportunities_opportunities_component__WEBPACK_IMPORTED_MODULE_8__["OpportunitiesComponent"],
                _people_people_component__WEBPACK_IMPORTED_MODULE_9__["PeopleComponent"],
                _bam_bam_component__WEBPACK_IMPORTED_MODULE_10__["BamComponent"],
                _top_top_component__WEBPACK_IMPORTED_MODULE_11__["TopComponent"],
                _shared_filter_pipe__WEBPACK_IMPORTED_MODULE_25__["MyFilterPipe"],
                _shared_filter_pipe_peopleproposal__WEBPACK_IMPORTED_MODULE_26__["PeopleProposal"],
                _charts_charts_component__WEBPACK_IMPORTED_MODULE_24__["ChartsComponent"],
                _elaboration_elaboration_component__WEBPACK_IMPORTED_MODULE_28__["ElaborationComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_29__["NgxSpinnerModule"],
                _app_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_12__["HttpModule"],
                angular_highcharts__WEBPACK_IMPORTED_MODULE_23__["ChartModule"],
                angular_notifier__WEBPACK_IMPORTED_MODULE_22__["NotifierModule"].withConfig({
                    position: {
                        horizontal: {
                            position: 'right',
                            distance: 12
                        },
                        vertical: {
                            position: 'top',
                            distance: 12,
                            gap: 10
                        }
                    },
                    theme: 'material',
                    behaviour: {
                        autoHide: 5000,
                        onMouseover: 'pauseAutoHide',
                        showDismissButton: true,
                    },
                    animations: {
                        enabled: true,
                        show: {
                            preset: 'slide',
                            speed: 300,
                            easing: 'ease'
                        },
                        hide: {
                            preset: 'fade',
                            speed: 300,
                            easing: 'ease',
                            offset: 50
                        },
                        shift: {
                            speed: 300,
                            easing: 'ease'
                        },
                        overlap: 150
                    }
                }),
                ngx_restangular__WEBPACK_IMPORTED_MODULE_16__["RestangularModule"].forRoot(_shared_restConfig__WEBPACK_IMPORTED_MODULE_17__["RestangularConfigFactory"]),
                ngx_smart_modal__WEBPACK_IMPORTED_MODULE_27__["NgxSmartModalModule"].forRoot()
            ],
            providers: [{ provide: 'BaseURL', useValue: _shared_baseurl__WEBPACK_IMPORTED_MODULE_15__["baseURL"] },
                _services_process_httpmsg_service__WEBPACK_IMPORTED_MODULE_19__["ProcessHTTPMsgService"],
                _services_company_service__WEBPACK_IMPORTED_MODULE_18__["CompanyService"],
                _services_message_service__WEBPACK_IMPORTED_MODULE_21__["MessageService"],
                ngx_cookie_service__WEBPACK_IMPORTED_MODULE_20__["CookieService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/bam/bam.component.css":
/*!***************************************!*\
  !*** ./src/app/bam/bam.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".BAMBOX {\n    min-height:1000px;\n    margin-top: 35px;\n    margin-left:285px;\n    margin-right: 5px;\n    margin-bottom: 5px;\n    \n}\n\niframe {\n    border:none;\n    width:85%;\n    height:1000px;\n}\n\n.buttonController{\n    margin-bottom: 5px;\n    \n}"

/***/ }),

/***/ "./src/app/bam/bam.component.html":
/*!****************************************!*\
  !*** ./src/app/bam/bam.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\" row\">\n    <div class=\"col-lg-12 BAMBOX\">\n        <div class=\"row buttonController\">\n            <div class=\"col-lg-2 .offset-md-2\">\n                <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n                            <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" (click)=\"pagePrev();\"></span>\n                    </button>     \n                    <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n                            <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" (click)=\"pageNext();\"></span>\n                    </button>                                 \n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n                <iframe [src]=\"iFrameUrl\"></iframe>\n        </div>\n            \n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/bam/bam.component.ts":
/*!**************************************!*\
  !*** ./src/app/bam/bam.component.ts ***!
  \**************************************/
/*! exports provided: BamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BamComponent", function() { return BamComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _services_qrs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/qrs.service */ "./src/app/services/qrs.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/config */ "./src/app/shared/config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BamComponent = /** @class */ (function () {
    function BamComponent(messageService, qrsService, cookieService, sanitizer) {
        this.messageService = messageService;
        this.qrsService = qrsService;
        this.cookieService = cookieService;
        this.sanitizer = sanitizer;
        this.idxSheet = 0;
        this.prog = 0;
        this.sheetConnect = "&sheet=";
        this.ticketConnect = "&qlikTicket=";
    }
    ;
    BamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.setPageStatus("BAM");
        this.qsTrigram = this.cookieService.get('trigram');
        this.qrsService.getQSToken(this.qsTrigram)
            .subscribe(function (ticket) {
            var baseUrl = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].BaseUtl;
            var appId = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.AppId;
            var sheetId = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.Sheets[_this.idxSheet];
            var url = baseUrl + appId + _this.sheetConnect + sheetId + _this.ticketConnect + ticket.data.Ticket;
            _this.iFrameUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(url);
        });
    };
    BamComponent.prototype.pageNext = function () {
        var _this = this;
        console.log("Next Page");
        this.qrsService.getQSToken(this.qsTrigram)
            .subscribe(function (ticket) {
            var numEle = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.Sheets.length;
            _this.prog++;
            _this.idxSheet = _this.prog % numEle;
            var url = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].BaseUtl + _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.AppId + _this.sheetConnect + _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.Sheets[_this.idxSheet] + _this.ticketConnect + ticket.data.Ticket;
            _this.iFrameUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(url);
            console.log(url);
        });
    };
    BamComponent.prototype.pagePrev = function () {
        var _this = this;
        console.log("Previous Page");
        this.qrsService.getQSToken(this.qsTrigram)
            .subscribe(function (ticket) {
            var numEle = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.Sheets.length;
            _this.prog--;
            _this.idxSheet = _this.prog % numEle;
            var url = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].BaseUtl + _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.AppId + _this.sheetConnect + _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].MAB.Sheets[_this.idxSheet] + _this.ticketConnect + ticket.data.Ticket;
            _this.iFrameUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(url);
            console.log(url);
        });
    };
    BamComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bam',
            template: __webpack_require__(/*! ./bam.component.html */ "./src/app/bam/bam.component.html"),
            styles: [__webpack_require__(/*! ./bam.component.css */ "./src/app/bam/bam.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"],
            _services_qrs_service__WEBPACK_IMPORTED_MODULE_2__["QrsService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], BamComponent);
    return BamComponent;
}());



/***/ }),

/***/ "./src/app/charts/charts.component.css":
/*!*********************************************!*\
  !*** ./src/app/charts/charts.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/charts/charts.component.html":
/*!**********************************************!*\
  !*** ./src/app/charts/charts.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"content\">\n        <div [chart]=\"chart\"></div>\n  </div>\n\n\n\n"

/***/ }),

/***/ "./src/app/charts/charts.component.ts":
/*!********************************************!*\
  !*** ./src/app/charts/charts.component.ts ***!
  \********************************************/
/*! exports provided: ChartsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartsComponent", function() { return ChartsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular_highcharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-highcharts */ "./node_modules/angular-highcharts/angular-highcharts.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


__webpack_require__(/*! highcharts/highcharts-more */ "./node_modules/highcharts/highcharts-more.js")(highcharts__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! highcharts/modules/solid-gauge */ "./node_modules/highcharts/modules/solid-gauge.js")(highcharts__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! highcharts/modules/heatmap */ "./node_modules/highcharts/modules/heatmap.js")(highcharts__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! highcharts/modules/treemap */ "./node_modules/highcharts/modules/treemap.js")(highcharts__WEBPACK_IMPORTED_MODULE_1__);
__webpack_require__(/*! highcharts/modules/funnel */ "./node_modules/highcharts/modules/funnel.js")(highcharts__WEBPACK_IMPORTED_MODULE_1__);

var ChartsComponent = /** @class */ (function () {
    function ChartsComponent() {
    }
    ChartsComponent.prototype.ngOnInit = function () {
    };
    ChartsComponent.prototype.updateChart = function () {
        var title = this.lablesChart[0] + " vs. " + this.lablesChart[1];
        this.chart = new angular_highcharts__WEBPACK_IMPORTED_MODULE_2__["Chart"]({
            chart: {
                polar: true,
                type: 'line'
            },
            title: {
                text: title,
                x: -80
            },
            /*
                tooltip: {
                    formatter: function() {
                        return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name+' you already have '+this.title[this.x]+' people, in your tema';
                    }
                },
                */
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: this.labels,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                //gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },
            series: [{
                    name: this.lablesChart[0],
                    data: this.personalScore
                }, {
                    name: this.lablesChart[1],
                    data: this.avgTeamScore
                }, {
                    name: this.lablesChart[2],
                    data: this.avgTeamScoreMax
                }]
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('labels'),
        __metadata("design:type", Array)
    ], ChartsComponent.prototype, "labels", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('personalScore'),
        __metadata("design:type", Array)
    ], ChartsComponent.prototype, "personalScore", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('avgTeamScore'),
        __metadata("design:type", Array)
    ], ChartsComponent.prototype, "avgTeamScore", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('avgTeamScoreMax'),
        __metadata("design:type", Array)
    ], ChartsComponent.prototype, "avgTeamScoreMax", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('numPeople'),
        __metadata("design:type", Object)
    ], ChartsComponent.prototype, "numPeople", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('lablesChart'),
        __metadata("design:type", Object)
    ], ChartsComponent.prototype, "lablesChart", void 0);
    ChartsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-charts',
            template: __webpack_require__(/*! ./charts.component.html */ "./src/app/charts/charts.component.html"),
            styles: [__webpack_require__(/*! ./charts.component.css */ "./src/app/charts/charts.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ChartsComponent);
    return ChartsComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#modalImproveFeature {\n    max-width: 680px;\n}"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Modal to improve product features-->\n\n<ngx-smart-modal #modalImproveFeature identifier=\"modalImproveFeature\" id=\"modalImproveFeature\">\n    <h3>Improve feature</h3>\n    <hr>\n    <form>\n        <div class=\"row\" *ngIf=\"company !== undefined\">\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label>Feature</label>\n                    <input type=\"text\" class=\"form-control border-input\"  placeholder=\"Insert the feature to improve\" \n                            [(ngModel)]=\"featureToImprove\" name=\"featureToImprove\" (ngModelChange)=\"featureSuggestion($event)\" required />\n                    <ul [hidden]=\"!isFeatureSuggestion\">\n                        <li *ngFor=\"let feature of company.productFeatures | myfilter:featureToImprove\" (click)=\"featureToImprove=feature.name;isFeatureSuggestion=false\"> {{feature.name}}</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <div class=\"form-group\">\n                    <label>Money to invest</label>\n                    <input type=\"number\" [(ngModel)]=\"moneyToInvest\" class=\"form-control border-input\" placeholder=\"Insert the amount to invest\" name=\"moneyToInvest\" required />\n                </div>\n            </div>\n            <div class=\"col-md-4\">\n                <br>\n                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"improveFeature();modalImproveFeature.close()\">Invest</button>\n            </div>                                                     \n        </div>\n</form>\n  \n    <button (click)=\"modalImproveFeature.close()\">Close</button>\n</ngx-smart-modal>\n\n<!-- Modal to improve warn about the BAM activation-->\n<ngx-smart-modal #modalBAMActivation identifier=\"modalBAMActivation\">\n    <h3>BAM Activation</h3>\n    <hr>\n    <p class=\"text-warning\">\n        BAM cna give you more insights on the opportunities you face in the previous quarter.\n        Enabling BAM now you can find out several information which might help you to better\n        setting your company. <br>\n        BAM require an initial cost in terms of effort to implement (hours) and in terms of money\n        and a recoursive cost each quarter (hours + money). You can disable this feature any time avoiding\n        the recoursive cost.\n        Are you sure to enable BAM?\n    </p>\n    <hr>\n    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n        <button type=\"button\" class=\"btn btn-outline-warning\" (click)=\"toggleBAM(); modalBAMActivation.close()\">{{labelBAM}}</button>\n        <button type=\"button\" class=\"btn btn-outline-info\" (click)=\"modalBAMActivation.close()\">Cancel</button>\n    </div>\n</ngx-smart-modal>\n\n<!-- Modal to improve warn about the TOP activation-->\n<ngx-smart-modal #modalTOPActivation identifier=\"modalTOPActivation\">\n    <h3>TOP Activation</h3>\n    <hr>\n    <p class=\"text-warning\">\n        TOP cna give you more insights on the opportunities you face in the previous quarter.\n        Enabling TOP now you can find out several information which might help you to better\n        setting your company. <br>\n        TOP require an initial cost in terms of effort to implement (hours) and in terms of money\n        and a recoursive cost each quarter (hours + money). You can disable this feature any time avoiding\n        the recoursive cost.\n        Are you sure to enable TOP?\n    </p>\n    <hr>\n    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n        <button type=\"button\" class=\"btn btn-outline-warning\" (click)=\"toggleTOP(); modalTOPActivation.close()\">{{labelTOP}}</button>\n        <button type=\"button\" class=\"btn btn-outline-info\" (click)=\"modalTOPActivation.close()\">Cancel</button>\n    </div>\n</ngx-smart-modal>\n\n<div class=\"main-panel\">\n    <div class=\"content\">\n        <div class=\"container-fluid\">\n            <div class=\"row\" *ngIf=\"company !== undefined\">\n                <div class=\"col-lg-3 col-sm-6\">\n                    <div class=\"card\">\n                        <div class=\"content\">\n                            <div class=\"row\">\n                                <div class=\"col-xs-5\">\n                                    <div class=\"icon-big icon-warning text-center\">\n                                        <i class=\"ti-cup\"></i>\n                                    </div>\n                                </div>\n                                <div class=\"col-xs-7\">\n                                    <div class=\"numbers\">\n                                        <p>Brand Recognition</p>\n                                       {{company.brendRecognition | number : '1.2-2'}} %\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"footer\">\n                                <hr />\n\n                                <div class=\"stats\">\n                                    <i class=\"ti-stats-up\"></i> Increase\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-lg-3 col-sm-6\">\n                    <div class=\"card\">\n                        <div class=\"content\">\n                            <div class=\"row\">\n                                <div class=\"col-xs-5\">\n                                    <div class=\"icon-big icon-success text-center\">\n                                        <i class=\"ti-wallet\"></i>\n                                    </div>\n                                </div>\n                                <div class=\"col-xs-7\">\n                                    <div class=\"numbers\">\n                                        <p>Budget</p>\n                                        K€ {{company.budget | number : '1.2-2' }}\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"footer\">\n                                <hr />\n                                <div class=\"stats\">\n                                    <i class=\"ti-view-list\"></i> List details\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-lg-3 col-sm-6\">\n                    <div class=\"card\">\n                        <div class=\"content\">\n                            <div class=\"row\">\n                                <div class=\"col-xs-5\">\n                                    <div class=\"icon-big icon-info text-center\">\n                                        <i class=\"ti-ruler-pencil\"></i>\n                                    </div>\n                                </div>\n                                <div class=\"col-xs-7\">\n                                    <div class=\"numbers\">\n                                        <p>AVG Team Satisf</p>\n                                        {{avgSatisfaction | number : '1.2-2'}} %\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"footer\">\n                                <hr />\n                                <div class=\"stats\">\n                                    <i class=\"ti-stats-up\"></i> Improve\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-lg-3 col-sm-6\">\n                        <div class=\"card\">\n                            <div class=\"content\">\n                                <div class=\"row\">\n                                    <div class=\"col-xs-5\">\n                                        <div class=\"icon-big icon-danger text-center\">\n                                            <i class=\"ti-hummer\"></i>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-xs-7\">\n                                        <div class=\"numbers\">\n                                            <p>Working Hours</p>\n                                            {{company.totalHours}}\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"footer\">\n                                    <hr />\n                                    <div class=\"stats\">\n                                        <i class=\"ti-timer\"></i> In the last hour\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>            \n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"card\">\n                        <div class=\"header\">\n                            <h4 class=\"title\">My Product Features</h4>\n                            <p class=\"category\">Sorted by Relevance</p>\n                        </div>\n                        <div class=\"content\">\n                            <div id=\"chartProductFeatures\" class=\"ct-chart\"></div>\n                            <div class=\"footer\">\n                                <div class=\"chart-legend\">\n                                    <i class=\"fa fa-circle text-info\"></i> Open\n                                    <i class=\"fa fa-circle text-danger\"></i> Click\n                                    <i class=\"fa fa-circle text-warning\"></i> Click Second Time\n                                </div>\n                                <hr>\n                                <div class=\"stats\" (click)=\"ngxSmartModalService.getModal('modalImproveFeature').open()\">\n                                    <i class=\"ti-stats-up\"></i> Improve\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"col-md-6\">\n                    <div class=\"card \">\n                        <div class=\"header\">\n                            <h4 class=\"title\">Report Settings</h4>\n                            <p class=\"category\">Managing sub system BAM e TOP</p>\n                        </div>\n                        <div class=\"content\">\n\n                            <div class=\"row\" *ngIf=\"company !== undefined\">\n                                <div class=\"BAM_TOP\">\n                                    <div class=\"col-md-5\">\n                                        <div class=\"row\">\n                                                <h3 class=\"sistemLable sistemLableActive\" [hidden]=\"!company.isBAMEnabled\">BAM Enabled</h3>\n                                                <h3 class=\"sistemLable sistemLableDeactive\" [hidden]=\"company.isBAMEnabled\">BAM Disabled</h3>\n                                        </div>\n\n                                        <div class=\"row\">\n                                            <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"ngxSmartModalService.getModal('modalBAMActivation').open()\">{{labelBAM}}</button>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-2\"></div>\n                                    <div class=\"col-md-5\">\n                                        <div class=\"row\">\n                                                <h3 class=\"sistemLable sistemLableActive\" [hidden]=\"!company.isTOPEnabled\">TOP Enabled</h3>\n                                                <h3 class=\"sistemLable sistemLableDeactive\" [hidden]=\"company.isTOPEnabled\">TOP Disabled</h3>\n                                        </div>\n\n                                        <div class=\"row\">\n                                            <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"ngxSmartModalService.getModal('modalTOPActivation').open()\">{{labelTOP}}</button>\n                                        </div>\n                                    </div>                                    \n                                </div>\n                            </div>\n\n\n                            <hr>\n\n                            <div class=\"row\" >\n                                    <div class=\"BAM_TOP\">\n                                        <div class=\"col-md-4\">\n                                            <h3>Brand Recognition</h3>\n                                        </div>\n                                        <div class=\"col-md-8\">\n                                            <div class=\"row\">\n                                                    <form>\n                                                            <div class=\"row\" >\n                                                                <div class=\"col-md-4\">\n                                                                    <div class=\"form-group\">\n                                                                        <label>Hours</label>\n                                                                        <input type=\"number\" class=\"form-control border-input\"  placeholder=\"Insert the #Hours to invest\" [(ngModel)]=\"hoursToInvest\" name=\"hoursToInvest\" required />\n                                                                        \n                                                                    </div>\n                                                                </div>\n                                                                <div class=\"col-md-4\">\n                                                                    <div class=\"form-group\">\n                                                                        <label>Cost</label>\n                                                                        <input type=\"number\" [(ngModel)]=\"moneyToInvest\" class=\"form-control border-input\" placeholder=\"Insert the amount to invest\" name=\"moneyToInvest\" required />\n                                                                    </div>\n                                                                </div>\n                                                                <div class=\"col-md-4\">\n                                                                    <br>\n                                                                    <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"getCampain()\">Invest</button>\n                                                                </div>                                                     \n                                                            </div>\n                                                    </form>\n                                            </div>\n                                            <div class=\"row\">\n                                                    <table class=\"table\" *ngIf=\"company !== undefined\">\n                                                            <thead>\n                                                              <tr>\n                                                                <th scope=\"col\">Money</th>\n                                                                <th scope=\"col\">Hours</th>\n                                                                <th scope=\"col\">Delete</th>\n                                                              </tr>\n                                                            </thead>\n                                                            <tbody>\n                                                                    <tr *ngFor=\"let investment of company.brandRecognInvestments; let i = index\">\n                                                                        <td>{{investment.money}}</td>\n                                                                        <td>{{investment.hours}}</td>\n                                                                        <td>\n                                                                                <div class=\"icon-big icon-danger text-center\">\n                                                                                        <i class=\"ti-close\" (click)=\"removeCampain(i)\"></i>\n                                                                                </div>\n                                                                        </td>\n                                                                    </tr>\n                                                            </tbody>\n                                                        </table>\n                                            </div>\n                                        </div>\n                                        \n                                    </div>\n                                </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"card\">\n                        <div class=\"header\">\n                            <h4 class=\"title\">Team Members</h4>\n                        </div>\n                        <div class=\"content\">\n                            <ul class=\"list-unstyled team-members\">\n                                        <li *ngFor=\"let person of team\">\n                                            <div class=\"row\">\n                                                <div class=\"col-xs-3\">\n                                                    <div class=\"avatar\">\n                                                        <img src=\"assets/img/{{person.icon}}.png\" alt=\"Circle Image\" class=\"img-circle img-no-padding img-responsive\">\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-xs-4\">\n                                                    <h3>{{person.name}}</h3>\n                                                    <span class=\"text-success\"><small>Satisfaction : {{person.satisfactionLevel | number : '1.2-2'}} %</small></span>\n                                                </div>\n                                                <div class=\"col-xs-5\">\n                                                    <div class=\"col-xs-3\">\n                                                            <div class=\"icon-big icon-warning text-center\">\n                                                                    <i class=\"ti-medall\" (click)=\"toggleCourses(person,1)\"></i>\n                                                            </div>\n                                                    </div>\n                                                    <div class=\"col-xs-3\">\n                                                            <div class=\"icon-big icon-success text-center\">\n                                                                    <i class=\"ti-gift\" (click)=\"toggleCourses(person,2)\"></i>\n                                                                </div> \n                                                    </div>\n                                                    <div class=\"col-xs-3\">\n                                                            <div class=\"icon-big icon-info text-center\">\n                                                                    <i class=\"ti-briefcase\" (click)=\"toggleCourses(person,3);isTrends=true;\"></i>\n                                                                </div> \n                                                    </div>\n                                                    <div class=\"col-xs-3\">\n                                                            <div class=\"icon-big icon-danger text-center\">\n                                                                    <i class=\"ti-stats-up\" (click)=\"toggleCourses(person,4);isTrends=false\"></i>\n                                                                </div> \n                                                    </div>\n                                                   \n                                                </div>\n                                            </div>\n                                        </li>\n                                        <li *ngFor=\"let person of peopleToConfirm\">\n                                            <div class=\"row\">\n                                                <div class=\"col-xs-3\">\n                                                    <div class=\"avatar\">\n                                                        <img src=\"assets/img/{{person.icon}}.png\" alt=\"Circle Image\" class=\"img-circle img-no-padding img-responsive\">\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-xs-4\">\n                                                    <h3>{{person.name}}</h3>\n                                                    <span class=\"text-success\"><small>Satisfaction : {{person.satisfactionLevel | number : '1.2-2'}} %</small></span>\n                                                </div>\n                                                <div class=\"col-xs-5\">\n                                                    <div class=\"col-xs-5\">\n                                                        <button type=\"button\" class=\"btn btn-outline-success\" (click)=\"confirmPerson(person.ID)\">Confirm</button>\n                                                    </div>\n                                                    <div class=\"col-xs-2\">\n                                                        \n                                                    </div>\n                                                    <div class=\"col-xs-5\">\n                                                        <button type=\"button\" class=\"btn btn-outline-danger\" (click)=\"discardPerson(person.ID)\">Discard</button>\n                                                    </div>\n                                                   \n                                                </div>\n                                            </div>\n                                        </li>\n                                    </ul>\n                        </div>\n                        <div class=\"footer\">\n                                <div class=\"container\">\n                                        <hr />\n                                        <div class=\"stats\">\n                                            <a routerLink=\"/people\"><i class=\"ti-timer\"></i> Hire People</a>\n                                        </div>\n                                </div>\n    \n    \n                            </div>    \n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"card\" [hidden]=\"userDetails != 0 || proposals.length === 0\">\n                        <div class=\"header\">\n                            <h4 class=\"title\">Proposal placed</h4>\n                        </div>\n                        <div class=\"content\">\n                            <ul class=\"list-unstyled team-members\">\n                                        <li *ngFor=\"let person of proposals\">\n                                            <div class=\"row\">\n                                                <div class=\"col-xs-3\">\n                                                    <div class=\"avatar\">\n                                                        <img src=\"assets/img/{{person.icon}}.png\" alt=\"Circle Image\" class=\"img-circle img-no-padding img-responsive\">\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-xs-6\">\n                                                    {{person.name}}\n                                                    <br />\n                                                    <span class=\"text-success\" *ngFor=\"let prop of person.proposals | proposal:companyID\"><small>Amount proposed : {{prop.Amount}}</small></span>\n                                                </div>\n                                                <div class=\"icon-big icon-danger text-center\">\n                                                    <i class=\"ti-close\" (click)=\"removeOffer(person.ID)\"></i>\n                                                </div> \n                                            </div>\n                                        </li>\n\n                            </ul>\n                        </div>\n                    \n                    </div>\n\n                    <div class=\"card\" *ngIf=\"selectedPerson !== null\">\n                            <div class=\"header\">\n                                <h4 class=\"title\" [hidden]=\"userDetails != 1\">Merit increase</h4>\n                                <h4 class=\"title\" [hidden]=\"userDetails != 2\">Retention Bonus</h4>\n                                <!--<h4 class=\"title\" [hidden]=\"userDetails != 3\">Improve features skills</h4> -->\n                                <h4 class=\"title\" [hidden]=\"userDetails != 4\">Improve Market Trends skill</h4>\n                                <p (click)=\"toggleCourses(selectedPerson,0)\">Click here to show the proposal placed </p>\n                            </div>\n                            <div class=\"content\">\n                                <ul class=\"list-unstyled team-members\">\n\n                                                <div class=\"row\">\n                                                    <div class=\"col-xs-2\">\n                                                        <div class=\"avatar\">\n                                                            <img src=\"assets/img/{{selectedPerson.icon}}.png\" alt=\"Circle Image\" class=\"img-circle img-no-padding img-responsive\">\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"col-xs-7\">\n                                                            <dl class=\"dl-horizontal\">\n                                                                    <dt>ID</dt>\n                                                                    <dd>{{selectedPerson.ID}}</dd>\n                            \n                                                                    <dt>Name</dt>\n                                                                    <dd>{{selectedPerson.name}}</dd>\n                                                                    \n                                                                    <dt>cost</dt>\n                                                                    <dd>{{selectedPerson.cost}} K€</dd>\n\n                                                                    <dt>Satisfactional Level</dt>\n                                                                    <dd>{{selectedPerson.satisfactionLevel}}</dd>\n\n                                                                    <!--\n                                                                    <hr>\n                                                                    <dt>Courses enrolled</dt>\n                                                                    <dd *ngFor=\"let course of selectedPerson.courses\">{{course.period}} - {{course.feature}} {{course.marketTrend}} : {{course.hours}} hours spent</dd>     \n                                                                    \n                                                                    <hr>\n                                                                    <dt>Merit increase earned</dt>\n                                                                    <dd *ngFor=\"let merit of selectedPerson.meritIncreases\">{{merit}}</dd>  \n\n                                                                    <hr>\n                                                                    <dt>Retention bonus Gained</dt>\n                                                                    <dd *ngFor=\"let retention of selectedPerson.retentionBonuses\">{{retention.period}} - {{retention.money}} K€</dd>  \n                                                                    -->\n                                                                    \n                                                            </dl>\n                                                    </div>\n                                                    <div class=\"col-xs-3\">\n                                                            <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"toggleChart()\">Features</button>\n                                                    </div>\n                                                    \n    \n                                                </div>\n                                                \n                                                <div class=\"row\">\n                                                        <app-charts [labels]=\"labels\" \n                                                        [personalScore]=\"personalScore\" \n                                                        [avgTeamScore]=\"avgTeamScore\"\n                                                        [avgTeamScoreMax]=\"avgTeamScoreMax\"\n                                                        [numPeople]=\"numPeople\"\n                                                        [lablesChart]=\"lablesChart\"></app-charts>\n                                                </div>\n\n                                                <div class=\"row\">\n                                                    <!--<div class=\"container\">-->\n\n                                                        <form [hidden]=\"userDetails != 1\">\n                                                                    <div class=\"row\" >\n                                                                        <div class=\"col-md-4\">\n                                                                            <div class=\"form-group\">\n                                                                                <label>Merit Increase</label>\n                                                                                <input type=\"number\" class=\"form-control border-input\"  placeholder=\"Insert the Merit Increase in %\" [(ngModel)]=\"meritIncrease\" name=\"meritIncrease\" required />\n                                                                            </div>\n                                                                        </div>\n    \n                                                                        <div class=\"col-md-4\">\n                                                                            <br>\n                                                                            <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"giveMeritIncrease()\">Submit</button>\n                                                                        </div>                                                     \n                                                                    </div>\n                                                        </form>\n\n                                                        <form [hidden]=\"userDetails != 2\">\n                                                                <div class=\"row\" >\n                                                                    <div class=\"col-md-4\">\n                                                                        <div class=\"form-group\">\n                                                                            <label>Retention Bonus</label>\n                                                                            <input type=\"number\" class=\"form-control border-input\"  placeholder=\"Insert the retention bonus in K€\" [(ngModel)]=\"retentionBonus\" name=\"meritIncrease\" required />\n                                                                        </div>\n                                                                    </div>\n\n                                                                    <div class=\"col-md-4\">\n                                                                        <br>\n                                                                        <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"giveRetentiononus()\">Submit</button>\n                                                                    </div>                                                     \n                                                                </div>\n                                                        </form>\n\n                                                        <!--\n                                                        <form [hidden]=\"userDetails != 3\">\n                                                                <div class=\"row\" >\n                                                                    <div class=\"col-md-4\">\n                                                                        <div class=\"form-group\">\n                                                                            <label>Select the Feature to improve</label>\n                                                                            <input type=\"text\" class=\"form-control border-input\"  placeholder=\"Insert the feature to improve\" \n                                                                                    [(ngModel)]=\"featureToImprove\" name=\"featureToImprove\" (ngModelChange)=\"featureSuggestion($event)\" required />\n                                                                            <ul [hidden]=\"!isFeatureSuggestion\">\n                                                                                <li *ngFor=\"let feature of company.productFeatures | myfilter:featureToImprove\" (click)=\"featureToImprove=feature.name;isFeatureSuggestion=false\"> {{feature.name}}</li>\n                                                                            </ul>\n                                                                        </div>\n                                                                        <div class=\"form-group\">\n                                                                                <label>Course Level</label><br>\n                                                                                <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                                                                                        \n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=0\">Base</button>\n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=1\">Advance</button>\n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=2\">Intensive</button>\n                                                                                      </div>\n                                                                            </div>\n\n                                                                    </div>\n                                                                    <div class=\"col-md-2\"></div>\n                                                                    <div class=\"col-md-6\" [hidden]=\"courseIndexCost < 0\">\n                                                                            <h4>Course Details ({{featureToImprove}}) </h4>\n                                                                            <hr>\n                                                                            <dl class=\"dl-horizontal\">\n                                                                                    <dt>Course Cost</dt>\n                                                                                    <dd>{{courseMoneyCost[courseIndexCost]}} K€</dd>\n\n                                                                                    <dt>Required hours</dt>\n                                                                                    <dd>{{courseHoursCost[courseIndexCost]}} hours</dd>   \n                                                                                    \n                                                                                    <dt>Knowledge Increase</dt>\n                                                                                    <dd>up to {{courseIncreaseUpTo[courseIndexCost]}} %</dd>\n                                                                            </dl>\n                                                                    </div> \n                                                  \n                                                                </div>\n                                                                <div class=\"row\">\n                                                                        <div class=\"col-md-4\">\n                                                                                <br>\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"enrollCourse(0)\">Get Course</button>\n                                                                            </div>   \n                                                                </div>\n                                                        </form>         \n                                                        -->\n\n                                                        <form [hidden]=\"userDetails != 4\">\n                                                                <div class=\"row\" >\n                                                                    <div class=\"col-md-4\">\n                                                                        <div class=\"form-group\">\n                                                                            <label>Select the Trend to improve</label>\n                                                                            <input type=\"text\" class=\"form-control border-input\"  placeholder=\"Insert the trend to improve\" \n                                                                                    [(ngModel)]=\"trendToImprove\" name=\"trendToImprove\" (ngModelChange)=\"trendSuggestion($event)\" required />\n                                                                            <ul [hidden]=\"!isTrendSuggestion\">\n                                                                                <li *ngFor=\"let trend of marketTrendsList | myfilter:trendToImprove\" (click)=\"trendToImprove=trend.name;isTrendSuggestion=false\"> {{trend.name}}</li>\n                                                                            </ul>\n                                                                        </div>\n                                                                        <div class=\"form-group\">\n                                                                                <label>Course Level</label><br>\n                                                                                <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                                                                                        \n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=0\">Base</button>\n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=1\">Advance</button>\n                                                                                        <button type=\"button\" class=\"btn btn-default\" (click)=\"courseIndexCost=2\">Intensive</button>\n                                                                                      </div>\n                                                                            </div>\n\n                                                                    </div>\n                                                                    <div class=\"col-md-2\"></div>\n                                                                    <div class=\"col-md-6\" [hidden]=\"courseIndexCost < 0\">\n                                                                            <h4>Course Details ({{trendToImprove}}) </h4>\n                                                                            <hr>\n                                                                            <dl class=\"dl-horizontal\">\n                                                                                    <dt>Course Cost</dt>\n                                                                                    <dd>{{courseMoneyCost[courseIndexCost]}} K€</dd>\n\n                                                                                    <dt>Required hours</dt>\n                                                                                    <dd>{{courseHoursCost[courseIndexCost]}} hours</dd>   \n                                                                                    \n                                                                                    <dt>Knowledge Increase</dt>\n                                                                                    <dd>up to {{courseIncreaseUpTo[courseIndexCost]}} %</dd>\n                                                                            </dl>\n                                                                    </div> \n                                                  \n                                                                </div>\n                                                                <div class=\"row\">\n                                                                        <div class=\"col-md-4\">\n                                                                                <br>\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"enrollCourse(1)\">Get Course</button>\n                                                                            </div>   \n                                                                </div>\n                                                        </form> \n                                                    <!--</div>-->\n                                                </div>\n    \n                                        </ul>\n                            </div>\n                        \n                        </div>                                           \n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _services_company_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/company.service */ "./src/app/services/company.service.ts");
/* harmony import */ var _services_qrs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/qrs.service */ "./src/app/services/qrs.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _services_presales_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/presales.service */ "./src/app/services/presales.service.ts");
/* harmony import */ var _services_market_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/market.service */ "./src/app/services/market.service.ts");
/* harmony import */ var picasso_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! picasso.js */ "./node_modules/picasso.js/dist/picasso.esm.js");
/* harmony import */ var _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/PicassoCharts.js */ "./src/app/shared/PicassoCharts.js");
/* harmony import */ var _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _charts_charts_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../charts/charts.component */ "./src/app/charts/charts.component.ts");
/* harmony import */ var ngx_smart_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-smart-modal */ "./node_modules/ngx-smart-modal/esm5/ngx-smart-modal.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};














var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(companyService, cookieService, notifierService, presalesService, messageService, ngxSmartModalService, marketService, qrsService, document) {
        this.companyService = companyService;
        this.cookieService = cookieService;
        this.notifierService = notifierService;
        this.presalesService = presalesService;
        this.messageService = messageService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.marketService = marketService;
        this.qrsService = qrsService;
        this.document = document;
        this.companyID = null;
        this.gameID = null;
        this.team = [];
        this.peopleToConfirm = [];
        this.proposals = [];
        this.marketTrends = {};
        this.marketTrendsList = [];
        this.labelBAM = "Enable BAM";
        this.labelTOP = "Enable TOP";
        this.hoursToInvest = 0;
        this.moneyToInvest = 0;
        this.userDetails = 0;
        this.selectedPerson = null;
        this.labels = [];
        this.personalScore = [];
        this.marketScore = [];
        this.lablesChart = [];
        this.isTrends = true;
        this.isFeatureSuggestion = false;
        this.isTracked = false;
        this.isTrendSuggestion = false;
        this.courseHoursCost = [10, 20, 40];
        this.courseMoneyCost = [2, 4, 8];
        this.courseIncreaseUpTo = [10, 20, 40];
        this.courseIndexCost = -1;
        this.notifier = this.notifierService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.companyID = this.cookieService.get('companyID');
        this.gameID = this.cookieService.get('gameID');
        this.qsUserId = this.cookieService.get('qsUserId');
        console.log("From Dashboard CompanyID : " + this.companyID);
        console.log("From Dashboard gameID : " + this.gameID);
        if (this.companyID === undefined || this.gameID === undefined || this.companyID === "" || this.gameID === "") {
            console.log("Company not created yet. Redirect to landing!");
            var hostname = this.document.location.protocol + "//" + this.document.location.hostname + ":" + this.document.location.port + "/landing";
            window.location.href = hostname;
        }
        this.userDetails = 0;
        this.messageService.setPageStatus("Dashboard");
        this.marketService.getTeamAvgSatisfaction(this.gameID, this.companyID)
            .subscribe(function (res) {
            _this_1.avgSatisfaction = res['data'];
        });
        this.companyService.getDetails(this.companyID, this.gameID)
            .subscribe(function (CompanyDet) {
            _this_1.company = CompanyDet['data'];
            _this_1.messageService.setCompany(_this_1.company);
            _this_1.team = [];
            CompanyDet['data']['presalesTeam'].forEach(function (p) {
                _this_1.presalesService.getPresale(p, _this_1.gameID)
                    .subscribe(function (person) {
                    _this_1.team.push(person['data']['person']);
                    _this_1.marketTrends = person['data']['marketTrends'];
                    //this.selectedPerson=this.team[0];
                    var _this = _this_1;
                    Object.keys(_this_1.marketTrends).forEach(function (trend) {
                        _this.marketTrendsList.push({ name: trend, score: _this.marketTrends[trend] });
                    });
                });
            });
            _this_1.peopleToConfirm = [];
            CompanyDet['data']['peopleToConfirm'].forEach(function (p) {
                _this_1.presalesService.getPresale(p, _this_1.gameID)
                    .subscribe(function (person) {
                    _this_1.peopleToConfirm.push(person['data']['person']);
                });
            });
            _this_1.proposals = [];
            CompanyDet['data']['proposal'].forEach(function (p) {
                _this_1.presalesService.getPresale(p, _this_1.gameID)
                    .subscribe(function (person) {
                    _this_1.proposals.push(person['data']['person']);
                });
            });
            picasso_js__WEBPACK_IMPORTED_MODULE_7__["default"].chart({
                element: document.querySelector('#chartProductFeatures'),
                data: [{
                        type: 'matrix',
                        data: _this_1.company['productFeatures']
                    }],
                settings: _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_8___default.a.barchart
            });
        });
    };
    DashboardComponent.prototype.toggleBAM = function () {
        var _this_1 = this;
        if (!this.company['isBAMEnabled']) {
            this.companyService.enableBAM(this.companyID, this.gameID)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["mergeMap"])(function (res) { return _this_1.qrsService.addCustomProp(_this_1.gameID, _this_1.qsUserId, "MAB"); }))
                .subscribe(function (res) {
                _this_1.labelBAM = "Disable BAM";
                _this_1.notifier.notify('success', 'BAM has been enabled');
            });
        }
        else {
            this.companyService.disableBAM(this.companyID, this.gameID)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["mergeMap"])(function (res) { return _this_1.qrsService.delCustomProp(_this_1.gameID, _this_1.qsUserId, "MAB"); }))
                .subscribe(function (res) {
                _this_1.labelBAM = "Enable BAM";
                _this_1.notifier.notify('success', 'BAM has been disabled');
            });
        }
        this.messageService.setCompany(this.company);
        this.ngOnInit();
    };
    DashboardComponent.prototype.toggleTOP = function () {
        var _this_1 = this;
        if (!this.company['isTOPEnabled']) {
            this.companyService.enableTOP(this.companyID, this.gameID)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["mergeMap"])(function (res) { return _this_1.qrsService.addCustomProp(_this_1.gameID, _this_1.qsUserId, "POT"); }))
                .subscribe(function (res) {
                _this_1.labelTOP = "Disable TOP";
                _this_1.notifier.notify('success', 'TOP has been enabled');
            });
        }
        else {
            this.companyService.disableTOP(this.companyID, this.gameID)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["mergeMap"])(function (res) { return _this_1.qrsService.delCustomProp(_this_1.gameID, _this_1.qsUserId, "POT"); }))
                .subscribe(function (res) {
                _this_1.labelTOP = "Enable TOP";
                _this_1.notifier.notify('success', 'TOP has been disabled');
            });
        }
        this.messageService.setCompany(this.company);
        this.ngOnInit();
    };
    DashboardComponent.prototype.getCampain = function () {
        var _this_1 = this;
        console.log("hours: ", this.hoursToInvest, " Money : ", this.moneyToInvest);
        this.companyService.getCampain(this.companyID, this.gameID, this.hoursToInvest, this.moneyToInvest)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'Marketing Campain has succesfully run');
            }
            else
                _this_1.notifier.notify('error', 'Error while getting Marketing Campain');
            _this_1.hoursToInvest = 0;
            _this_1.moneyToInvest = 0;
            _this_1.ngOnInit();
        });
    };
    DashboardComponent.prototype.toggleCourses = function (person, status) {
        var _this_1 = this;
        this.labels = [];
        this.personalScore = [];
        this.marketScore = [];
        if (this.isTrends) {
            person.PersonTrends.forEach(function (t) {
                _this_1.labels.push(t.name);
                _this_1.personalScore.push(t.score);
                _this_1.marketScore.push(_this_1.marketTrends[t.name]);
            });
            this.lablesChart = ["Personal Trends", "Market Trends"];
        }
        else {
            var featuresTranscode_1 = {};
            person.features.forEach(function (s) {
                featuresTranscode_1[s.name] = s.score;
            });
            this.company['productFeatures'].forEach(function (f) {
                _this_1.labels.push(f.name);
                _this_1.marketScore.push(f.score);
                if (featuresTranscode_1[f.name] !== undefined)
                    _this_1.personalScore.push(featuresTranscode_1[f.name]);
                else
                    _this_1.personalScore.push(0);
            });
            this.lablesChart = ["Personal Features", "Product Features"];
            console.log(this.personalScore);
        }
        var _this = this;
        setTimeout(function () { _this.child.updateChart(); }, 250);
        this.selectedPerson = person;
        this.userDetails = status;
    };
    DashboardComponent.prototype.toggleChart = function () {
        this.isTrends = !this.isTrends;
        this.toggleCourses(this.selectedPerson, this.userDetails);
    };
    DashboardComponent.prototype.giveMeritIncrease = function () {
        console.log("You are givince merit increase : ", this.meritIncrease);
    };
    DashboardComponent.prototype.giveRetentiononus = function () {
        var _this_1 = this;
        console.log("You are givince retention Bonus : ", this.retentionBonus);
        this.marketService.offerRetentionBonus(this.gameID, this.companyID, this.selectedPerson.ID, this.retentionBonus)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this_1.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this_1.ngOnInit();
        });
    };
    DashboardComponent.prototype.removeOffer = function (candidateId) {
        var _this_1 = this;
        this.marketService.removeOffer(this.gameID, this.companyID, candidateId)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this_1.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this_1.ngOnInit();
        });
    };
    DashboardComponent.prototype.featureSuggestion = function () {
        if (this.featureToImprove.length > 1) {
            this.filterargs = { name: this.featureToImprove };
            this.isFeatureSuggestion = true;
        }
        else {
            this.isFeatureSuggestion = false;
        }
    };
    DashboardComponent.prototype.trendSuggestion = function () {
        if (this.trendToImprove.length > 1) {
            this.filterargs = { name: this.trendToImprove };
            this.isTrendSuggestion = true;
        }
        else {
            this.isTrendSuggestion = false;
        }
    };
    DashboardComponent.prototype.enrollCourse = function (type) {
        var _this_1 = this;
        if (type === 1)
            this.featureToImprove = this.trendToImprove;
        this.marketService.enrollCourse(this.gameID, this.companyID, this.selectedPerson.ID, this.featureToImprove, this.courseMoneyCost[this.courseIndexCost], this.courseHoursCost[this.courseIndexCost], this.courseIncreaseUpTo[this.courseIndexCost], type)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'Retention Bonus succesfully assigned');
                _this_1.ngOnInit();
            }
            else
                _this_1.notifier.notify('error', 'Error while assigning the retention Bonus');
        });
    };
    DashboardComponent.prototype.confirmPerson = function (person) {
        var _this_1 = this;
        this.marketService.confirmOffer(this.gameID, this.companyID, person)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'Person succesfully confirmed');
                _this_1.ngOnInit();
            }
            else
                _this_1.notifier.notify('error', 'Error while Confirming this person');
        });
    };
    DashboardComponent.prototype.discardPerson = function (person) {
        var _this_1 = this;
        this.marketService.declineOffer(this.gameID, this.companyID, person)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('warning', 'Person succesfully declined, You payed the penalty');
                _this_1.ngOnInit();
            }
            else
                _this_1.notifier.notify('error', 'Error while declined this person');
        });
    };
    DashboardComponent.prototype.removeCampain = function (idx) {
        var _this_1 = this;
        console.log("Remove campain having index : ", idx);
        this.companyService.delCampain(this.companyID, this.gameID, idx)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('warning', 'Campain removed');
                _this_1.ngOnInit();
            }
            else
                _this_1.notifier.notify('error', 'Error while removing campain');
        });
    };
    DashboardComponent.prototype.improveFeature = function () {
        var _this_1 = this;
        console.log("Improve feature ", this.featureToImprove, " investing ", this.moneyToInvest);
        this.companyService.improveProductFeature(this.companyID, this.gameID, this.featureToImprove, this.moneyToInvest)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this_1.notifier.notify('success', 'You have succesfully increased your ', _this_1.featureToImprove, ' feature by ', _this_1.moneyToInvest / 10, "%");
                _this_1.ngOnInit();
            }
            else
                _this_1.notifier.notify('error', 'Error while increasing product feature');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_charts_charts_component__WEBPACK_IMPORTED_MODULE_10__["ChartsComponent"]),
        __metadata("design:type", _charts_charts_component__WEBPACK_IMPORTED_MODULE_10__["ChartsComponent"])
    ], DashboardComponent.prototype, "child", void 0);
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        __param(8, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_12__["DOCUMENT"])),
        __metadata("design:paramtypes", [_services_company_service__WEBPACK_IMPORTED_MODULE_2__["CompanyService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_9__["NotifierService"],
            _services_presales_service__WEBPACK_IMPORTED_MODULE_5__["PresalesService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"],
            ngx_smart_modal__WEBPACK_IMPORTED_MODULE_11__["NgxSmartModalService"],
            _services_market_service__WEBPACK_IMPORTED_MODULE_6__["MarketService"],
            _services_qrs_service__WEBPACK_IMPORTED_MODULE_3__["QrsService"],
            Document])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/elaboration/elaboration.component.css":
/*!*******************************************************!*\
  !*** ./src/app/elaboration/elaboration.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#ElaborationModal{\n    height: 500px;\n    background-color: white;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    /* bring your own prefixes */\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    z-index: 1000;\n}\n"

/***/ }),

/***/ "./src/app/elaboration/elaboration.component.html":
/*!********************************************************!*\
  !*** ./src/app/elaboration/elaboration.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"ElaborationModal\">\n    <div class=\"container\">\n            <h1> ELABORATION IN PROGRESS</h1>\n            <p> Interval : {{interval}}, progress : {{progress}}</p>\n\n            <div class=\"row\">\n                <div class=\"container\">\n                    <div class=\"progress\">\n                            <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{'width.%': progress}\" aria-valuenow=\"progress\" aria-valuemin=\"0\" aria-valuemax=\"100\">{{progress}}</div>\n                    </div>\n                </div>\n            </div>\n\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/elaboration/elaboration.component.ts":
/*!******************************************************!*\
  !*** ./src/app/elaboration/elaboration.component.ts ***!
  \******************************************************/
/*! exports provided: ElaborationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElaborationComponent", function() { return ElaborationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ElaborationComponent = /** @class */ (function () {
    function ElaborationComponent() {
        this.progress = 0;
        this.step = 5;
        this.totTime = 4000;
    }
    ElaborationComponent.prototype.ngOnInit = function () {
        this.interval = this.totTime * this.step / 100;
        /*
            this.int = setInterval( function(){
              this.progress +=this.step;
            }, this.interval);
        
        
            if (this.progress === 100)
              clearImmediate(this.int);
        */
    };
    ElaborationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-elaboration',
            template: __webpack_require__(/*! ./elaboration.component.html */ "./src/app/elaboration/elaboration.component.html"),
            styles: [__webpack_require__(/*! ./elaboration.component.css */ "./src/app/elaboration/elaboration.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ElaborationComponent);
    return ElaborationComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-panel\">\n<footer class=\"footer\">\n    <div class=\"container-fluid\">\n        <nav class=\"pull-left\">\n            <ul>\n\n                <li>\n                    <a href=\"http://www.creative-tim.com\">\n                        Creative Tim\n                    </a>\n                </li>\n                <li>\n                    \n                </li>\n                <li>\n                    <a href=\"http://www.creative-tim.com/license\">\n                        Licenses\n                    </a>\n                </li>\n            </ul>\n        </nav>\n        <div class=\"copyright pull-right\">\n            <a href=\"https://seal.beyondsecurity.com/vulnerability-scanner-verification/pbgame.expovin.it\"><img src=\"https://seal.beyondsecurity.com/verification-images/pbgame.expovin.it/vulnerability-scanner-2.gif\" alt=\"Website Security Test\" border=\"0\"></a>\n        </div>\n    </div>\n</footer>\n</div>"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/market/market.component.css":
/*!*********************************************!*\
  !*** ./src/app/market/market.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/market/market.component.html":
/*!**********************************************!*\
  !*** ./src/app/market/market.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/market/market.component.ts":
/*!********************************************!*\
  !*** ./src/app/market/market.component.ts ***!
  \********************************************/
/*! exports provided: MarketComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarketComponent", function() { return MarketComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MarketComponent = /** @class */ (function () {
    function MarketComponent(messageService) {
        this.messageService = messageService;
        this.marketTrends = [];
    }
    MarketComponent.prototype.ngOnInit = function () {
        this.messageService.setPageStatus("Market");
    };
    MarketComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-market',
            template: __webpack_require__(/*! ./market.component.html */ "./src/app/market/market.component.html"),
            styles: [__webpack_require__(/*! ./market.component.css */ "./src/app/market/market.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], MarketComponent);
    return MarketComponent;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-panel\">\n<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar bar1\"></span>\n                <span class=\"icon-bar bar2\"></span>\n                <span class=\"icon-bar bar3\"></span>\n            </button>\n            <a class=\"navbar-brand\">{{pageStatus}} <small>({{quarter}})</small></a>\n        </div>\n        <div class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li>\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"ti-panel\"></i>\n                        <p>Stats</p>\n                    </a>\n                </li>\n                <li>\n                    <a (click)=\"toggleNotification()\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                            <i class=\"ti-bell\"></i>\n                            <p>{{notificationLable[notificationLableIdx]}}</p>\n                      </a>\n                </li>\n    <li>\n                    <a href=\"#\">\n        <i class=\"ti-settings\"></i>\n        <p>Settings</p>\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n    </div>\n</nav>\n</div>"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_company_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/company.service */ "./src/app/services/company.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _services_market_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/market.service */ "./src/app/services/market.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(notifierService, companyService, messageService, marketService, cookieService) {
        var _this_1 = this;
        this.notifierService = notifierService;
        this.companyService = companyService;
        this.messageService = messageService;
        this.marketService = marketService;
        this.cookieService = cookieService;
        this.isEnabledNotification = false;
        this.stepNotify = null;
        this.notificationLable = ['Disable Notification', 'Enable Notification'];
        this.notificationLableIdx = 0;
        this.notifier = this.notifierService;
        this.subscription = this.messageService.getPageStatus()
            .subscribe(function (selectedState) {
            _this_1.pageStatus = selectedState;
            console.log(_this_1.pageStatus);
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.gameID = this.cookieService.get('gameID');
        this.companyID = this.cookieService.get('companyID');
        console.log(this.companyID);
        this.marketService.getQuarter(this.gameID)
            .subscribe(function (res) {
            _this_1.quarter = res['data'];
        });
    };
    NavbarComponent.prototype.toggleNotification = function () {
        this.isEnabledNotification = !this.isEnabledNotification;
        console.log("Notification Status : ", this.isEnabledNotification, " Lable : ", this.notificationLable[this.notificationLableIdx]);
        var _this = this;
        if (!this.isEnabledNotification) {
            console.log("Abilito Notifiche");
            _this.notificationLableIdx = 0;
            _this.stepNotify = setInterval(function () {
                _this.companyService.getMessage(_this.companyID, _this.gameID)
                    .subscribe(function (res) {
                    if (res['data']) {
                        _this.notifier.notify(res['data']['type'], res['data']['msg']);
                    }
                });
            }, 5000);
        }
        else {
            console.log("DisAbilito Notifiche");
            clearInterval(_this.stepNotify);
            _this.notificationLableIdx = 1;
        }
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            _services_company_service__WEBPACK_IMPORTED_MODULE_1__["CompanyService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"],
            _services_market_service__WEBPACK_IMPORTED_MODULE_5__["MarketService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/opportunities/opportunities.component.css":
/*!***********************************************************!*\
  !*** ./src/app/opportunities/opportunities.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/opportunities/opportunities.component.html":
/*!************************************************************!*\
  !*** ./src/app/opportunities/opportunities.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-panel\">\n    <div class=\"content\">\n        <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"col-md-8\">\n                        <div class=\"card\">\n                            <div class=\"header\">\n                                <h4 class=\"title\">Opportunities</h4>\n                                <p class=\"category\">by Values</p>\n                            </div>\n                            <div class=\"content\">\n                                <div id=\"chartOpportunities\" class=\"ct-chart\"></div>\n                            </div>\n                        </div>\n            </div>\n            <div class=\"col-md-4\" [hidden]=\"!isOppySelected\">\n                    <div class=\"card card-plain\">\n                        <div class=\"header\">\n                            <h4 class=\"title\">Opportunities details</h4>\n                            <p class=\"category\">Included companies</p>\n                        </div>\n                        <div class=\"content\">\n                                <dl class=\"dl-horizontal\">\n                                        <dt>ID</dt>\n                                        <dd>{{selectedOppy.ID}}</dd>\n\n                                        <dt>Company Name</dt>\n                                        <dd>{{selectedOppy.CompanyName}}</dd>\n                                        \n                                        <dt>Value</dt>\n                                        <dd>{{selectedOppy.teoricalValue}} K€</dd>\n                                        <hr>\n                                        <dt>Trend required</dt>\n                                        <dd *ngFor=\"let trend of selectedOppy.TrendsRequired\" >{{trend}}</dd>   \n                                        <hr>\n                                        <dt>Feature required</dt>\n                                        <dd *ngFor=\"let feat of selectedOppy.features\">{{feat.name}} @{{feat.score}}%</dd>                                          \n                                </dl>\n                        </div>\n                    </div>\n            </div>\n        </div>\n        <div class=\"row\">\n                <div class=\"col-md-7 table-Fix\" [hidden]=\"!config.showOpportunities\">\n                        <div class=\"card card-plain\">\n                            <div class=\"header\">\n                                <h4 class=\"title\">Market Opportunities</h4>\n                                <p class=\"category\">Click on the id for more details</p>\n                            </div>\n                            <div class=\"content table-responsive table-full-width\">\n                                <table class=\"table table-hover\">\n                                    <thead>\n                                      <th>ID</th>\n                                      <th>Company Name</th>\n                                      <th>Estimated Value</th>\n                                      <th>Qualification level</th>\n                                      <th>status</th>\n                                    </thead>\n                                    <tbody>\n                                        <tr *ngFor=\"let oppy of opportunities\">\n                                          <td (click)=\"SelectOppy(oppy)\">{{oppy.ID}}</td>\n                                          <td>{{oppy.CompanyName}}</td>\n                                          <td>{{oppy.teoricalValue}}</td>\n                                          <td>{{oppy.qualificationLevel}}</td>  \n                                          <td>{{oppy.status}}</td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n    \n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-1\"></div>\n                    <div class=\"col-md-4\">\n                        <div class=\"row\">\n                            <div class=\"row\">\n                                    <h4>Filters Pane  </h4>\n                                    <hr>\n\n                                    <div class=\"panel panel-default\" *ngIf=\"company !== undefined\">\n                                            <div class=\"panel-heading\"><h5>Opportunity Value</h5></div>\n                                            <div class=\"panel-body\">\n                                                <div class=\"row\">\n                                                        <form>\n                                                        <div class=\"row\">\n                                                                <div class=\"col-md-4\">\n                                                                        <div class=\"btn-group-vertical\" role=\"group\" aria-label=\"...\">\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"toggleConstraint(0)\">{{lblValue}}</button>\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"changeConstraint(0)\" [disabled]=\"!company.oppyConstraint.flgValue\">Submit</button>\n                                                                        </div>\n\n                                                                </div>\n                                                                <div class=\"col-md-4\">\n                                                                        <div class=\"form-group\">\n                                                                                <label>From</label>\n                                                                                <input type=\"number\" class=\"form-control border-input\"  \n                                                                                                placeholder=\"Insert the Merit Increase in %\" \n                                                                                                [(ngModel)]=\"company.oppyConstraint.Value[0]\" \n                                                                                                name=\"valueMin\" \n                                                                                                [disabled]=\"!company.oppyConstraint.flgValue\"\n                                                                                                required />\n                                                                        </div>\n                                                                </div>\n                                                                <div class=\"col-md-4\">\n                                                                        <div class=\"form-group\">\n                                                                                        <label>To</label>\n                                                                                        <input type=\"number\" class=\"form-control border-input\"  \n                                                                                            placeholder=\"Insert the Merit Increase in %\" \n                                                                                            [(ngModel)]=\"company.oppyConstraint.Value[1]\" \n                                                                                            name=\"valueMax\" \n                                                                                            [disabled]=\"!company.oppyConstraint.flgValue\"\n                                                                                            required />\n                                                                        </div>\n                                                                </div>\n                                                        </div>\n                                                        <div class=\"row\">\n                                                                <div class=\"col-md-4\"></div>\n                                                                        <div class=\"col-md-8\">\n                                                                                <div class=\"form-group\">\n                                                                                                <div class=\"row\"><label>Qualification Level</label></div>\n                                                                                                <div class=\"row\">\n                                                                                                        <div class=\"btn-group\" role=\"group\" aria-label=\"...\" >\n                                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['1B']\" (click)=\"modifyQualificationArray(1)\" [disabled]=\"!company.oppyConstraint.flgQualification\">1</button>\n                                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['2B']\" (click)=\"modifyQualificationArray(2)\" [disabled]=\"!company.oppyConstraint.flgQualification\">2</button>\n                                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['3B']\" (click)=\"modifyQualificationArray(3)\" [disabled]=\"!company.oppyConstraint.flgQualification\">3</button>\n                                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['4B']\" (click)=\"modifyQualificationArray(4)\" [disabled]=\"!company.oppyConstraint.flgQualification\">4</button>\n                                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['5B']\" (click)=\"modifyQualificationArray(5)\" [disabled]=\"!company.oppyConstraint.flgQualification\">5</button>\n                                                                                                        </div>    \n                                                                                                </div>                                                                            \n                                                                                        </div>\n                                                                         </div>\n                                                                </div>\n                                                        </form>\n                                                </div>\n                                            </div>\n                                    </div>\n\n                                    <!--\n                                    <div class=\"panel panel-default\">\n                                            <div class=\"panel-heading\"><h5>Qualification Level</h5></div>\n                                            <div class=\"panel-body\">\n                                                <div class=\"row\" *ngIf=\"company !== undefined\">\n                                                        <form>\n                                                                <div class=\"col-md-4\">\n                                                                        <div class=\"btn-group-vertical\" role=\"group\" aria-label=\"...\">\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"toggleConstraint(1)\">{{lblQualification}}</button>\n                                                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"changeConstraint(1)\" [disabled]=\"!company.oppyConstraint.flgQualification\">Submit</button>\n                                                                        </div>\n\n                                                                </div>\n                                                                        <div class=\"col-md-8\">\n                                                                                <div class=\"row\">\n                                                                                    <label>Qualification Level</label>\n                                                                                </div>\n                                                                                <div class=\"row\">\n                                                                                        <div class=\"btn-group\" role=\"group\" aria-label=\"...\" >\n                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['1B']\" (click)=\"modifyQualificationArray(1)\" [disabled]=\"!company.oppyConstraint.flgQualification\">1</button>\n                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['2B']\" (click)=\"modifyQualificationArray(2)\" [disabled]=\"!company.oppyConstraint.flgQualification\">2</button>\n                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['3B']\" (click)=\"modifyQualificationArray(3)\" [disabled]=\"!company.oppyConstraint.flgQualification\">3</button>\n                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['4B']\" (click)=\"modifyQualificationArray(4)\" [disabled]=\"!company.oppyConstraint.flgQualification\">4</button>\n                                                                                                <button type=\"button\" [ngClass]=\"btnClassArray['5B']\" (click)=\"modifyQualificationArray(5)\" [disabled]=\"!company.oppyConstraint.flgQualification\">5</button>\n                                                                                        </div>\n                                                                                </div>\n                                                                        </div>\n                                                            </form>\n                                                </div>\n                                            </div>\n                                    </div>\n                                -->\n\n                                </div>\n\n\n                        </div>\n                    </div>\n        </div>\n\n\n\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/opportunities/opportunities.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/opportunities/opportunities.component.ts ***!
  \**********************************************************/
/*! exports provided: OpportunitiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunitiesComponent", function() { return OpportunitiesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_opportunities_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/opportunities.service */ "./src/app/services/opportunities.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _shared_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/config.js */ "./src/app/shared/config.js");
/* harmony import */ var picasso_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! picasso.js */ "./node_modules/picasso.js/dist/picasso.esm.js");
/* harmony import */ var _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/PicassoCharts.js */ "./src/app/shared/PicassoCharts.js");
/* harmony import */ var _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_company_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/company.service */ "./src/app/services/company.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OpportunitiesComponent = /** @class */ (function () {
    function OpportunitiesComponent(opportunitiesService, companyService, notifierService, messageService, cookieService) {
        this.opportunitiesService = opportunitiesService;
        this.companyService = companyService;
        this.notifierService = notifierService;
        this.messageService = messageService;
        this.cookieService = cookieService;
        this.gameID = null;
        this.opportunities = [];
        this.plottigPoint = [];
        this.selectedOppy = {};
        this.isOppySelected = false;
        this.lblValue = "Enable";
        this.lblQualification = "Enable";
        this.btnClassArray = {};
        this.config = _shared_config_js__WEBPACK_IMPORTED_MODULE_4__["Config"];
        this.notifier = this.notifierService;
    }
    OpportunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.setPageStatus("Opportunities");
        this.gameID = this.cookieService.get('gameID');
        this.companyID = this.cookieService.get('companyID');
        this.companyService.getDetails(this.companyID, this.gameID)
            .subscribe(function (CompanyDet) {
            _this.company = CompanyDet['data'];
            _this.modifyQualificationArray(0);
        });
        this.opportunitiesService.getOpportunities(this.gameID)
            .subscribe(function (res) {
            _this.opportunities = res['data'];
            _this.plottigPoint.push(['Year', 'Month', 'Sales', 'Margin']);
            _this.opportunities.forEach(function (o) {
                _this.plottigPoint.push(["FIX", o['CompanyName'], o['teoricalValue'], o['qualificationLevel']]);
            });
            picasso_js__WEBPACK_IMPORTED_MODULE_5__["default"].chart({
                element: document.querySelector('#chartOpportunities'),
                data: [{
                        type: 'matrix',
                        data: _this.plottigPoint
                    }],
                settings: _shared_PicassoCharts_js__WEBPACK_IMPORTED_MODULE_6___default.a.scatterplot
            });
        });
    };
    OpportunitiesComponent.prototype.SelectOppy = function (oppy) {
        this.isOppySelected = true;
        this.selectedOppy = oppy;
    };
    OpportunitiesComponent.prototype.toggleConstraint = function (type) {
        var _this = this;
        if (!this.company.oppyConstraint.flgValue)
            this.lblValue = "Disable";
        else
            this.lblValue = "Enable";
        this.companyService.toggleValueConstraint(this.companyID, this.gameID)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this.ngOnInit();
        });
        if (!this.company.oppyConstraint.flgQualification)
            this.lblQualification = "Disable";
        else
            this.lblQualification = "Enable";
        this.companyService.toggleValueQualification(this.companyID, this.gameID)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this.ngOnInit();
        });
    };
    OpportunitiesComponent.prototype.changeConstraint = function (type) {
        var _this = this;
        this.companyService.changeValueConstraint(this.companyID, this.gameID, this.company.oppyConstraint.Value)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this.ngOnInit();
        });
        console.log(this.company.oppyConstraint.Qualification);
        this.companyService.changeValueQualification(this.companyID, this.gameID, this.company.oppyConstraint.Qualification)
            .subscribe(function (res) {
            if (res['result'] === 'OK') {
                _this.notifier.notify('success', 'Retention Bonus succesfully assigned');
            }
            else
                _this.notifier.notify('error', 'Error while assigning the retention Bonus');
            _this.ngOnInit();
        });
    };
    OpportunitiesComponent.prototype.modifyQualificationArray = function (level) {
        if (level !== 0) {
            var index = this.company.oppyConstraint.Qualification.indexOf(level);
            if (index > -1) {
                this.company.oppyConstraint.Qualification.splice(index, 1);
            }
            else {
                this.company.oppyConstraint.Qualification.push(level);
            }
        }
        this.btnClassArray = {};
        for (var i = 1; i < 6; i++) {
            if (this.company.oppyConstraint.Qualification.indexOf(i) !== -1)
                this.btnClassArray[i + "B"] = "btn btn-success";
            else
                this.btnClassArray[i + "B"] = "btn btn-danger";
        }
    };
    OpportunitiesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-opportunities',
            template: __webpack_require__(/*! ./opportunities.component.html */ "./src/app/opportunities/opportunities.component.html"),
            styles: [__webpack_require__(/*! ./opportunities.component.css */ "./src/app/opportunities/opportunities.component.css")]
        }),
        __metadata("design:paramtypes", [_services_opportunities_service__WEBPACK_IMPORTED_MODULE_1__["OpportunitiesService"],
            _services_company_service__WEBPACK_IMPORTED_MODULE_7__["CompanyService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_8__["NotifierService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"]])
    ], OpportunitiesComponent);
    return OpportunitiesComponent;
}());



/***/ }),

/***/ "./src/app/people/people.component.css":
/*!*********************************************!*\
  !*** ./src/app/people/people.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/people/people.component.html":
/*!**********************************************!*\
  !*** ./src/app/people/people.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-panel\">\n    <div class=\"content\">\n        <div class=\"container-fluid\">\n                <div class=\"row\" [hidden]=\"!isPersonSelected\">\n                    <div class=\"col-md-5\">\n                        <div class=\"card\">\n\n                            <div class=\"content\">\n                                <div class=\"row\">\n                                        <div class=\"col-md-3\">\n                                                <img class=\"card-img-left\" src=\"../assets/img/{{selectedPerson.icon}}.png\">\n                                            </div>\n                                            <div class=\"col-md-6\">\n                                                <h4>{{selectedPerson.name}}</h4>\n                                            </div>\n                                            <div class=\"col-md-3\">\n                                                    <h3>{{selectedPerson.cost}} K€</h3>\n                                            </div>\n                                </div>\n                               \n                                <div class=\"row\">\n                                        <div class=\"progress skillsProgress\">\n                                                <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{'width.%': selectedPerson.skills[0].score}\"  aria-valuenow=\"selectedPerson.skills[0].score\" aria-valuemin=\"0\" aria-valuemax=\"100\">Business Acumen</div>\n                                        </div>\n                                </div>\n                                <div class=\"row\">\n                                        <div class=\"progress skillsProgress\">\n                                                <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{'width.%': selectedPerson.skills[1].score}\" aria-valuenow=\"selectedPerson.skills[1].score\" aria-valuemin=\"0\" aria-valuemax=\"100\">Willing to Learn</div>\n                                        </div>\n                                </div>\n                                <div class=\"row\">\n                                        <div class=\"progress skillsProgress\">\n                                                <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{'width.%': selectedPerson.skills[2].score}\" aria-valuenow=\"selectedPerson.skills[1].score\" aria-valuemin=\"0\" aria-valuemax=\"100\">Team worker</div>\n                                        </div>\n                                </div>  \n\n                                <div class=\"row\">\n                                    <div class=\"container\">\n                                        <form>\n                                            <div class=\"col-md-2\">\n                                                <input type=\"number\" class=\"form-control border-input\"  placeholder=\"Place an offer\" [(ngModel)]=\"offer\" name=\"offer\" [attr.disabled]=\"selectedPerson.isEmployed ? '' : null\">\n                                            </div>\n                                            <div class=\"col-md-2\">\n                                                <button type=\"button\" class=\"btn btn-outline-success\" (click)=\"placeOffer()\" [attr.disabled]=\"selectedPerson.isEmployed ? '' : null\">Place an offer</button>\n                                            </div>\n                                            <!--\n                                            <div class=\"col-md-4\">\n                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"toggleChart()\">{{lableButton}}</button>\n                                            </div>\n                                            -->\n                                        </form>\n\n\n                                    </div>\n                                </div>                              \n                            </div>\n\n        \n        \n                                    <div class=\"footer\">\n                                                <hr />\n                                                <div class=\"stats\">\n                                                    <i class=\"ti-stats-up\"></i> Increase\n                                                </div>\n                                    </div>\n                           \n\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-7\">\n                        <div class=\"card\">\n                            <app-charts [labels]=\"labels\" \n                                [personalScore]=\"personalScore\" \n                                [avgTeamScore]=\"avgTeamScore\"\n                                [avgTeamScoreMax]=\"avgTeamScoreMax\"\n                                [numPeople]=\"numPeople\"\n                                [lablesChart]=\"lablesChart\">\n                            </app-charts>\n                        </div>\n\n\n\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                        <div class=\"col-md-8 table-Fix\"  id=\"tablePresales\">\n                                <div class=\"card card-plain\">\n                                    <div class=\"header\">\n                                        <h4 class=\"title\">Presales People</h4>\n                                        <p class=\"category\">Click on the id for more details</p>\n                                    </div>\n                                    <div class=\"content table-responsive table-full-width\">\n                                        <table class=\"table table-hover table-sm\">\n                                            <thead>\n                                              <th>ID</th>\n                                              <th>Name</th>\n                                              <th>Salary</th>\n                                              <th>Employed by</th>\n                                              <th># Trends</th>\n                                              <th># Features</th>\n                                            </thead>\n                                            <tbody>\n                                                <tr *ngFor=\"let presale of presalesPeople\">\n                                                  <td (click)=\"SelectPerson(presale.person)\">{{presale.person.ID}}</td>\n                                                  <td>{{presale.person.name}}</td>\n                                                  <td>{{presale.person.cost}} K€ </td>\n                                                  <td>{{companyNameDict[presale.person.employedBy]}}</td>\n                                                  <td>{{presale.person.PersonTrends.length}}</td>\n                                                  <td>{{presale.person.features.length}}</td>\n                                                </tr>\n                                            </tbody>\n                                        </table>\n            \n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-4\">\n\n                                    <div class=\"content\">\n                                        <div class=\"row\">\n                                            <div class=\"col-md-6\">\n                                                <h4>Filters Pane - {{presalesPeople.length}}</h4>\n                                            </div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <form>\n                                            <div class=\"checkbox\">\n                                                <label><input type=\"checkbox\" (ngModelChange)=\"onChangeShowEmpoyed()\" [ngModel]=\"showEmployed\" name=\"filterPeople\">\n                                                    Show Employed people</label>\n                                                <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"onChangeShowEmpoyed()\">Show Employed</button>\n                                            </div>\n                                            </form>\n                                        </div>\n                                    </div>\n\n                            </div>\n                </div>\n\n\n\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/people/people.component.ts":
/*!********************************************!*\
  !*** ./src/app/people/people.component.ts ***!
  \********************************************/
/*! exports provided: PeopleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleComponent", function() { return PeopleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_presales_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/presales.service */ "./src/app/services/presales.service.ts");
/* harmony import */ var _services_company_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/company.service */ "./src/app/services/company.service.ts");
/* harmony import */ var _services_market_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/market.service */ "./src/app/services/market.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _charts_charts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../charts/charts.component */ "./src/app/charts/charts.component.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PeopleComponent = /** @class */ (function () {
    function PeopleComponent(presalesService, companyService, marketService, notifierService, messageService, cookieService) {
        this.presalesService = presalesService;
        this.companyService = companyService;
        this.marketService = marketService;
        this.notifierService = notifierService;
        this.messageService = messageService;
        this.cookieService = cookieService;
        this.selectedPerson = {
            skills: [{ score: 0 }, { score: 0 }, { score: 0 }]
        };
        this.marketTrends = {};
        this.labels = [];
        this.lablesChart = [];
        this.personalScore = [];
        this.avgTeamScore = [];
        this.avgTeamScoreMax = [];
        this.numPeople = {};
        this.avgTeamTrends = {};
        this.isPersonSelected = false;
        this.isTrend = true;
        this.lableButton = "Show Features";
        this.companyID = null;
        this.companyFeatures = [];
        this.gameID = null;
        this.presalesPeople = [];
        this.offer = 0;
        this.companyNameDict = {};
        this.notifier = this.notifierService;
    }
    PeopleComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.messageService.setPageStatus("People");
        this.gameID = this.cookieService.get('gameID');
        this.companyID = this.cookieService.get('companyID');
        var _this = this;
        this.companyService.getCompanies(this.gameID)
            .subscribe(function (Companies) {
            Object.keys(Companies['data']).forEach(function (companyId) {
                _this.companyNameDict[companyId] = Companies['data'][companyId]['name'];
            });
        });
        this.presalesService.getPresales(this.gameID)
            .subscribe(function (res) {
            _this_1.marketTrends = res['data'][Object.keys(res['data'])[0]]['marketTrends'];
            var _this = _this_1;
            Object.keys(res['data']).forEach(function (personID) {
                _this.presalesPeople.push(res['data'][personID]);
            });
        });
        this.companyService.getDetails(this.companyID, this.gameID)
            .subscribe(function (CompanyDet) {
            _this_1.companyFeatures = CompanyDet['data']['ProductBasicFeatures'];
        });
        this.marketService.getTeamAvgTrends(this.gameID, this.companyID)
            .subscribe(function (res) {
            _this_1.avgTeamTrends = res['data'];
        });
    };
    PeopleComponent.prototype.onChangeShowEmpoyed = function () {
        console.log(this.showEmployed);
    };
    PeopleComponent.prototype.toggleChart = function () {
        this.isTrend = !this.isTrend;
        if (!this.isTrend)
            this.lableButton = "Show Trends";
        else
            this.lableButton = "Show Features";
        this.SelectPerson(this.selectedPerson);
    };
    PeopleComponent.prototype.placeOffer = function () {
        console.log("Stai Offrendo ", this.offer);
        this.marketService.placeOffer(this.gameID, this.companyID, this.selectedPerson['ID'], this.offer)
            .subscribe(function (res) {
            console.log(res);
        });
        this.notifier.notify('info', 'You placed an offer to ' + this.selectedPerson['name']);
    };
    PeopleComponent.prototype.SelectPerson = function (person) {
        var _this_1 = this;
        this.selectedPerson = person;
        this.labels = [];
        this.personalScore = [];
        this.avgTeamScore = [];
        this.avgTeamScoreMax = [];
        this.offer = this.selectedPerson['cost'];
        this.isPersonSelected = true;
        if (this.isTrend) {
            this.selectedPerson['PersonTrends'].forEach(function (t) {
                _this_1.lablesChart = ['Personal Trends', 'Avg Team Trends', 'Avg Team Trends Max'];
                _this_1.labels.push(t.name);
                _this_1.personalScore.push(t.score);
                _this_1.avgTeamScore.push(_this_1.avgTeamTrends[t.name][1]);
                _this_1.avgTeamScoreMax.push(_this_1.avgTeamTrends[t.name][0]);
                _this_1.numPeople[t.name] = _this_1.avgTeamTrends[t.name][2];
            });
        }
        else {
            this.selectedPerson['features'].forEach(function (f) {
                _this_1.lablesChart = ['Personal Features', 'Market Features'];
                _this_1.labels.push(f.name);
                _this_1.personalScore.push(f.score);
                _this_1.companyFeatures.forEach(function (cf) {
                    if (cf.name === f.name)
                        _this_1.avgTeamScore.push(cf.score);
                });
            });
        }
        var _this = this;
        setTimeout(function () { _this.child.updateChart(); }, 250);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_charts_charts_component__WEBPACK_IMPORTED_MODULE_5__["ChartsComponent"]),
        __metadata("design:type", _charts_charts_component__WEBPACK_IMPORTED_MODULE_5__["ChartsComponent"])
    ], PeopleComponent.prototype, "child", void 0);
    PeopleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-people',
            template: __webpack_require__(/*! ./people.component.html */ "./src/app/people/people.component.html"),
            styles: [__webpack_require__(/*! ./people.component.css */ "./src/app/people/people.component.css")]
        }),
        __metadata("design:paramtypes", [_services_presales_service__WEBPACK_IMPORTED_MODULE_1__["PresalesService"],
            _services_company_service__WEBPACK_IMPORTED_MODULE_2__["CompanyService"],
            _services_market_service__WEBPACK_IMPORTED_MODULE_3__["MarketService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"],
            _services_message_service__WEBPACK_IMPORTED_MODULE_7__["MessageService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"]])
    ], PeopleComponent);
    return PeopleComponent;
}());



/***/ }),

/***/ "./src/app/services/chat.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/chat.service.ts ***!
  \******************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _websocket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.service */ "./src/app/services/websocket.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var ChatService = /** @class */ (function () {
    function ChatService(wsService, document) {
        this.document = document;
        var CHAT_URL = 'ws://' + this.document.location.hostname + ':1337/';
        this.messages = wsService
            .connect(CHAT_URL)
            .map(function (response) {
            var data = JSON.parse(response.data);
            return (data);
        });
    }
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_websocket_service__WEBPACK_IMPORTED_MODULE_1__["WebsocketService"],
            Document])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/app/services/company.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/company.service.ts ***!
  \*********************************************/
/*! exports provided: CompanyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyService", function() { return CompanyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CompanyService = /** @class */ (function () {
    function CompanyService(http, restangular, processHTTPMsgService) {
        this.http = http;
        this.restangular = restangular;
        this.processHTTPMsgService = processHTTPMsgService;
    }
    CompanyService.prototype.getDetails = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.getCompanies = function (gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.getMessage = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/message', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.enableBAM = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/BAM', {}, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.enableTOP = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/TOP', {}, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.disableBAM = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.delete(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/BAM', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.disableTOP = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.delete(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/TOP', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.getCampain = function (idCompany, gameId, hours, cost) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/Campain', { cost: cost, hours: hours }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.delCampain = function (idCompany, gameId, idx) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.put(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/Campain', { idx: idx }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.toggleValueConstraint = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.put(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/filter/value', {}, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.changeValueConstraint = function (idCompany, gameId, values) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/filter/value', { oppyValues: values }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.toggleValueQualification = function (idCompany, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.put(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/filter/qualification', {}, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.changeValueQualification = function (idCompany, gameId, values) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/filter/qualification', { oppyQualifications: values }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService.prototype.improveProductFeature = function (idCompany, gameId, feature, money) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'companies/' + idCompany + '/ProductFeature', { feature: feature, money: money }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    CompanyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__["ProcessHTTPMsgService"]])
    ], CompanyService);
    return CompanyService;
}());



/***/ }),

/***/ "./src/app/services/market.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/market.service.ts ***!
  \********************************************/
/*! exports provided: MarketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarketService", function() { return MarketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MarketService = /** @class */ (function () {
    function MarketService(http, restangular, processHTTPMsgService) {
        this.http = http;
        this.restangular = restangular;
        this.processHTTPMsgService = processHTTPMsgService;
    }
    MarketService.prototype.getTrends = function (gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.getQuarter = function (gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/quarter', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.getTeamAvgSatisfaction = function (gameId, CompanyId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/avgSatisfaction/' + CompanyId, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.getTeamAvgTrends = function (gameId, CompanyId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/avgTeamTrends/' + CompanyId, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.placeOffer = function (gameId, CompanyId, PersonId, offer) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/proposal/' + CompanyId + '/' + PersonId, { value: offer }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.removeOffer = function (gameId, CompanyId, PersonId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.delete(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/proposal/' + CompanyId + '/' + PersonId, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.offerRetentionBonus = function (gameId, CompanyId, PersonId, offer) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/retentionBonus/' + CompanyId + '/' + PersonId, { money: offer }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.enrollCourse = function (gameId, CompanyId, PersonId, feature, money, hours, gain, type) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        if (type === 0)
            return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/course/' + CompanyId + '/' + PersonId, { feature: feature, money: money, hours: hours, quantity: gain }, requestOptions)
                .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
        else
            return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/course/' + CompanyId + '/' + PersonId, { marketTrend: feature, money: money, hours: hours, quantity: gain }, requestOptions)
                .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.confirmOffer = function (gameId, CompanyId, PersonId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.post(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/evaluate', { personID: PersonId, companyID: CompanyId }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService.prototype.declineOffer = function (gameId, CompanyId, PersonId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.put(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'market/evaluate/', { personID: PersonId, companyID: CompanyId }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    MarketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__["ProcessHTTPMsgService"]])
    ], MarketService);
    return MarketService;
}());



/***/ }),

/***/ "./src/app/services/message.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/message.service.ts ***!
  \*********************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        this.pageStatus = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.companyDetails = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    MessageService.prototype.setCompany = function (state) {
        this.companyDetails.next(state);
    };
    MessageService.prototype.getCompany = function () {
        return this.companyDetails.asObservable();
    };
    MessageService.prototype.setPageStatus = function (state) {
        this.pageStatus.next(state);
    };
    MessageService.prototype.getPageStatus = function () {
        return this.pageStatus.asObservable();
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/services/opportunities.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/opportunities.service.ts ***!
  \***************************************************/
/*! exports provided: OpportunitiesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunitiesService", function() { return OpportunitiesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OpportunitiesService = /** @class */ (function () {
    function OpportunitiesService(http, restangular, processHTTPMsgService) {
        this.http = http;
        this.restangular = restangular;
        this.processHTTPMsgService = processHTTPMsgService;
    }
    OpportunitiesService.prototype.getOpportunities = function (gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'opportunities', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    OpportunitiesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__["ProcessHTTPMsgService"]])
    ], OpportunitiesService);
    return OpportunitiesService;
}());



/***/ }),

/***/ "./src/app/services/presales.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/presales.service.ts ***!
  \**********************************************/
/*! exports provided: PresalesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresalesService", function() { return PresalesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PresalesService = /** @class */ (function () {
    function PresalesService(http, restangular, processHTTPMsgService) {
        this.http = http;
        this.restangular = restangular;
        this.processHTTPMsgService = processHTTPMsgService;
    }
    PresalesService.prototype.getPresales = function (gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'presales', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    PresalesService.prototype.getPresale = function (PresaleId, gameId) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'presales/' + PresaleId, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    PresalesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__["ProcessHTTPMsgService"]])
    ], PresalesService);
    return PresalesService;
}());



/***/ }),

/***/ "./src/app/services/process-httpmsg.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/process-httpmsg.service.ts ***!
  \*****************************************************/
/*! exports provided: ProcessHTTPMsgService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessHTTPMsgService", function() { return ProcessHTTPMsgService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProcessHTTPMsgService = /** @class */ (function () {
    function ProcessHTTPMsgService() {
    }
    ProcessHTTPMsgService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ProcessHTTPMsgService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ProcessHTTPMsgService);
    return ProcessHTTPMsgService;
}());



/***/ }),

/***/ "./src/app/services/qrs.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/qrs.service.ts ***!
  \*****************************************/
/*! exports provided: QrsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrsService", function() { return QrsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _shared_baseurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/baseurl */ "./src/app/shared/baseurl.ts");
/* harmony import */ var _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./process-httpmsg.service */ "./src/app/services/process-httpmsg.service.ts");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var QrsService = /** @class */ (function () {
    function QrsService(http, restangular, processHTTPMsgService) {
        this.http = http;
        this.restangular = restangular;
        this.processHTTPMsgService = processHTTPMsgService;
    }
    QrsService.prototype.addCustomProp = function (gameId, userId, customProp) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.put(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'QIX/user/' + userId + '/custProp', { custProp: customProp }, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    QrsService.prototype.delCustomProp = function (gameId, userId, customProp) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'gameID': gameId,
            'custProp': customProp
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.delete(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'QIX/user/' + userId + '/custProp', requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    QrsService.prototype.getQSToken = function (trigram) {
        var _this = this;
        var headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        var requestOptions = {
            headers: new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"](headerDict),
        };
        return this.http.get(_shared_baseurl__WEBPACK_IMPORTED_MODULE_3__["baseURL"] + 'QIX/token/' + trigram, requestOptions)
            .map(function (res) { return _this.processHTTPMsgService.extractData(res); });
    };
    QrsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _process_httpmsg_service__WEBPACK_IMPORTED_MODULE_4__["ProcessHTTPMsgService"]])
    ], QrsService);
    return QrsService;
}());



/***/ }),

/***/ "./src/app/services/websocket.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/websocket.service.ts ***!
  \***********************************************/
/*! exports provided: WebsocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketService", function() { return WebsocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WebsocketService = /** @class */ (function () {
    function WebsocketService() {
    }
    WebsocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    };
    WebsocketService.prototype.create = function (url) {
        var ws = new WebSocket(url);
        console.log("WS created : " + url);
        var observable = rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(function (obs) {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        var observer = {
            next: function (data) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__["Subject"].create(observer, observable);
    };
    WebsocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], WebsocketService);
    return WebsocketService;
}());



/***/ }),

/***/ "./src/app/shared/PicassoCharts.js":
/*!*****************************************!*\
  !*** ./src/app/shared/PicassoCharts.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  barchart : {
    scales: {
      y: {
        data: { field: 'score' },
        invert: true,
        include: [0]
      },
      c: {
        data: { field: 'score' },
        type: 'color'
      },
      t: { data: { extract: { field: 'name' } }, padding: 0.3 }
    },

    components: [{
      type: 'axis',
      dock: 'left',
      scale: 'y'
    },{
      type: 'axis',
      dock: 'bottom',
      scale: 't'
    },{
      key: 'bars',
      type: 'box',
      data: {
        extract: {
          field: 'name',
          props: {
            start: 0,
            end: { field: 'score' }
          }
        }
      },
      settings: {
        major: { scale: 't' },
        minor: { scale: 'y' },
        box: {
          fill: { scale: 'c', ref: 'end' }
        }
      }
    }]
  },
    scatterplot : {
      scales: {
        s: {
          data: {
            field: 'Sales'
          },
          invert: true,
          expand: 0.1
        },
        m: {
          data: {
            field: 'Margin'
          },
          expand: 0.1
        },
        col: {
          data: { extract: { field: 'Year' } },
          type: 'color'
        }
      },
      components: [{
        type: 'legend-cat',
        scale: 'col',
        dock: 'top',
        brush: {
          trigger: [{
            contexts: ['highlight'],
            on: 'tap',
            action: 'toggle'
          }],
          consume: [{
            context: 'highlight',
            style: {
              inactive: {
                opacity: 0.4
              }
            }
          }]
        }
      }, {
        type: 'axis',
        scale: 's',
        dock: 'left'
      }, {
        type: 'axis',
        scale: 'm',
        dock: 'bottom'
      }, {
        type: 'point',
        data: {
          extract: {
            field: 'Month',
            props: {
              y: { field: 'Sales' },
              mar: { field: 'Margin' },
              fill: { field: 'Year' }
            }
          }
        },
        settings: {
          x: { scale: 'm', ref: 'mar' },
          y: { scale: 's' },
          size: () => Math.random(),
          opacity: 0.8,
          fill: { scale: 'col' }
        },
        brush: {
          trigger: [{
            contexts: ['highlight'],
            on: 'tap',
            action: 'toggle',
            data: ['fill']
          }],
          consume: [{
            context: 'highlight',
            style: {
              inactive: {
                opacity: 0.4
              }
            }
          }]
        }
      }]

    }

}

/***/ }),

/***/ "./src/app/shared/baseurl.ts":
/*!***********************************!*\
  !*** ./src/app/shared/baseurl.ts ***!
  \***********************************/
/*! exports provided: baseURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseURL", function() { return baseURL; });
var baseURL = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/api/v1/'; //document.location.port+'/';


/***/ }),

/***/ "./src/app/shared/config.js":
/*!**********************************!*\
  !*** ./src/app/shared/config.js ***!
  \**********************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = {
    showOpportunities: false,
    BaseUtl: "https://pbgqix.expovin.it/pbg/single/?appid=",
    MAB: {
        AppId: "4efbe950-8e2d-4793-8a51-6f8ba3f95f1f",
        Sheets: [
            //'7f4b7dbd-837e-4515-a0c2-1a7f58201cd0',
            'cc0a8c51-d494-4857-8d08-f360f07bc2de',
            '9d98e7f9-8d3a-4b25-b342-f14de4c83399',
            'f16262ff-63ea-437c-a57a-0c8bf80bb9ec',
            '9a8425b1-4b8c-4975-8834-ee71e9ad6a59'
        ]
    },
    POT: {
        AppId: "eb9a769f-9dea-4297-a54b-86a686c9c71d",
        Sheets: ["1f35bd57-fee3-4039-8f51-b2e180fe5f7a"]
    }
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "./src/app/shared/config.ts":
/*!**********************************!*\
  !*** ./src/app/shared/config.ts ***!
  \**********************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = {
    showOpportunities: false,
    BaseUtl: "https://pbgqix.expovin.it/pbg/single/?appid=",
    MAB: {
        AppId: "4efbe950-8e2d-4793-8a51-6f8ba3f95f1f",
        Sheets: [
            //'7f4b7dbd-837e-4515-a0c2-1a7f58201cd0',
            'cc0a8c51-d494-4857-8d08-f360f07bc2de',
            '9d98e7f9-8d3a-4b25-b342-f14de4c83399',
            'f16262ff-63ea-437c-a57a-0c8bf80bb9ec',
            '9a8425b1-4b8c-4975-8834-ee71e9ad6a59'
        ]
    },
    POT: {
        AppId: "eb9a769f-9dea-4297-a54b-86a686c9c71d",
        Sheets: ["1f35bd57-fee3-4039-8f51-b2e180fe5f7a"]
    }
};


/***/ }),

/***/ "./src/app/shared/filter.pipe.peopleproposal.ts":
/*!******************************************************!*\
  !*** ./src/app/shared/filter.pipe.peopleproposal.ts ***!
  \******************************************************/
/*! exports provided: PeopleProposal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleProposal", function() { return PeopleProposal; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PeopleProposal = /** @class */ (function () {
    function PeopleProposal() {
    }
    PeopleProposal.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return item.Company.indexOf(filter) !== -1; });
    };
    PeopleProposal = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'proposal',
            pure: false
        })
    ], PeopleProposal);
    return PeopleProposal;
}());



/***/ }),

/***/ "./src/app/shared/filter.pipe.ts":
/*!***************************************!*\
  !*** ./src/app/shared/filter.pipe.ts ***!
  \***************************************/
/*! exports provided: MyFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyFilterPipe", function() { return MyFilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MyFilterPipe = /** @class */ (function () {
    function MyFilterPipe() {
    }
    MyFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return item.name.indexOf(filter) !== -1; });
    };
    MyFilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'myfilter',
            pure: false
        })
    ], MyFilterPipe);
    return MyFilterPipe;
}());



/***/ }),

/***/ "./src/app/shared/restConfig.ts":
/*!**************************************!*\
  !*** ./src/app/shared/restConfig.ts ***!
  \**************************************/
/*! exports provided: RestangularConfigFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestangularConfigFactory", function() { return RestangularConfigFactory; });
/* harmony import */ var _baseurl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseurl */ "./src/app/shared/baseurl.ts");

// Function for settting the default restangular configuration
function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl(_baseurl__WEBPACK_IMPORTED_MODULE_0__["baseURL"]);
}


/***/ }),

/***/ "./src/app/sidebar/sidebar.component.css":
/*!***********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a.disabled {\n    pointer-events: none;\n    cursor: default;\n }\n "

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.html":
/*!************************************************!*\
  !*** ./src/app/sidebar/sidebar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\" data-background-color=\"white\" data-active-color=\"danger\">\n\n    <!--\n\t\tTip 1: you can change the color of the sidebar's background using: data-background-color=\"white | black\"\n\t\tTip 2: you can change the color of the active button using the data-active-color=\"primary | info | success | warning | danger\"\n\t-->\n\n    \t<div class=\"sidebar-wrapper\" *ngIf=\"companyDetails !== undefined\">\n            <div class=\"logo\">\n                <a href=\"http://www.creative-tim.com\" class=\"simple-text\">\n                    {{companyDetails.name}}\n                </a>\n            </div>\n\n            <ul class=\"nav\">\n\n                <li routerLinkActive=\"active\">\n                    <a routerLink=\"dashboard\">\n                        <i class=\"ti-panel\"></i>\n                        <p>Dashboard</p>\n                    </a>\n                </li>\n                <li routerLinkActive=\"active\">\n                    <a routerLink=\"market\">\n                        <i class=\"ti-stats-up\"></i>\n                        <p>Market</p>\n                    </a>\n                </li>\n                <li routerLinkActive=\"active\">\n                    <a routerLink=\"people\">\n                        <i class=\"ti-user\"></i>\n                        <p>People</p>\n                    </a>\n                </li>\n                <li routerLinkActive=\"active\">\n                    <a routerLink=\"oppy\">\n                        <i class=\"ti-text\"></i>\n                        <p>Opportunities</p>\n                    </a>\n                </li>\n                <li routerLinkActive=\"active\" *ngIf=\"companyDetails.isBAMEnabled\">\n                    <a routerLink=\"bam\">\n                        <i class=\"ti-pencil-alt2\"></i>\n                        <p>BAM</p>\n                    </a>\n                </li>\n                <li routerLinkActive=\"active\" *ngIf=\"companyDetails.isTOPEnabled\">\n                    <a routerLink=\"top\">\n                        <i class=\"ti-map\"></i>\n                        <p>TOP</p>\n                    </a>\n                </li>\n            </ul>\n    \t</div>\n    </div>"

/***/ }),

/***/ "./src/app/sidebar/sidebar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sidebar/sidebar.component.ts ***!
  \**********************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(messageService) {
        var _this = this;
        this.messageService = messageService;
        this.subscription = this.messageService.getCompany()
            .subscribe(function (selectedState) {
            _this.companyDetails = selectedState;
        });
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/top/top.component.css":
/*!***************************************!*\
  !*** ./src/app/top/top.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".BAMBOX {\n    min-height:1000px;\n    margin-top: 35px;\n    margin-left: 285px;\n    margin-right: 5px;\n    margin-bottom: 5px;\n    \n}\n\niframe {\n    border:none;\n    width:85%;\n    height:1000px;\n}\n\n.buttonController{\n    margin-bottom: 5px;\n    \n}"

/***/ }),

/***/ "./src/app/top/top.component.html":
/*!****************************************!*\
  !*** ./src/app/top/top.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\" row\">\n        <div class=\"col-lg-12 BAMBOX\">\n            <div class=\"row buttonController\">\n                <div class=\"col-lg-2 .offset-md-2\">\n                    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n                                <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\" (click)=\"pagePrev();\"></span>\n                        </button>     \n                        <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n                                <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\" (click)=\"pageNext();\"></span>\n                        </button>                                 \n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                    <iframe [src]=\"iFrameUrl\"></iframe>\n            </div>\n                \n        </div>\n    </div>\n    \n    "

/***/ }),

/***/ "./src/app/top/top.component.ts":
/*!**************************************!*\
  !*** ./src/app/top/top.component.ts ***!
  \**************************************/
/*! exports provided: TopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopComponent", function() { return TopComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/message.service */ "./src/app/services/message.service.ts");
/* harmony import */ var _services_qrs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/qrs.service */ "./src/app/services/qrs.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/config */ "./src/app/shared/config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TopComponent = /** @class */ (function () {
    function TopComponent(messageService, qrsService, cookieService, sanitizer) {
        this.messageService = messageService;
        this.qrsService = qrsService;
        this.cookieService = cookieService;
        this.sanitizer = sanitizer;
        this.idxSheet = 0;
        this.prog = 0;
    }
    ;
    TopComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.setPageStatus("TOP");
        var trigram = this.cookieService.get('trigram');
        this.qrsService.getQSToken(trigram)
            .subscribe(function (ticket) {
            console.log(ticket);
            var baseUrl = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].BaseUtl;
            var appId = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].POT.AppId;
            var sheetConnect = "&sheet=";
            var sheetId = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].POT.Sheets[_this.idxSheet];
            var ticketConnect = "&qlikTicket=";
            var url = baseUrl + appId + sheetConnect + sheetId + ticketConnect + ticket.data.Ticket;
            _this.iFrameUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(url);
            console.log(_this.iFrameUrl);
        });
    };
    TopComponent.prototype.pageNext = function () {
        console.log("Next Page");
        var numEle = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].POT.Sheets.length;
        this.prog++;
        this.idxSheet = this.prog % numEle;
    };
    TopComponent.prototype.pagePrev = function () {
        console.log("Previous Page");
        var numEle = _shared_config__WEBPACK_IMPORTED_MODULE_5__["Config"].POT.Sheets.length;
        this.prog--;
        this.idxSheet = this.prog % numEle;
    };
    TopComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-top',
            template: __webpack_require__(/*! ./top.component.html */ "./src/app/top/top.component.html"),
            styles: [__webpack_require__(/*! ./top.component.css */ "./src/app/top/top.component.css")]
        }),
        __metadata("design:paramtypes", [_services_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"],
            _services_qrs_service__WEBPACK_IMPORTED_MODULE_2__["QrsService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], TopComponent);
    return TopComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /opt/Dev/pbGame/PresalesGame/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map