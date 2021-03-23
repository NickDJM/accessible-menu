var AccessibleMenu = (function () {
  'use strict';

  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }

  if (!Array.includes) {
    Array.prototype.includes = function(search) {
      return !!~this.indexOf(search);
    };
  }

  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      },
      configurable: true,
      writable: true
    });
  }

  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      value: function (search, rawPos) {
        var pos = rawPos > 0 ? rawPos | 0 : 0;
        return this.substring(pos, pos + search.length) === search;
      }
    });
  }

  if (!String.prototype.endsWith) {
  	String.prototype.endsWith = function(search, this_len) {
  		if (this_len === undefined || this_len > this.length) {
  			this_len = this.length;
  		}
  		return this.substring(this_len - search.length, this_len) === search;
  	};
  }

  // A modification of https://github.com/WebReflection/get-own-property-symbols
  // (C) Andrea Giammarchi - MIT Licensed

  if (!('Symbol' in self && self.Symbol.length === 0)) {
    /* global Type */
    (function (Object,  GOPS, global) {

      var supportsGetters = (function () {
        // supports getters
        try {
          var a = {};
          Object.defineProperty(a, "t", {
            configurable: true,
            enumerable: false,
            get: function () {
              return true;
            },
            set: undefined
          });
          return !!a.t;
        } catch (e) {
          return false;
        }
      }());

      var	setDescriptor;
      var id = 0;
      var random = '' + Math.random();
      var prefix = '__\x01symbol:';
      var prefixLength = prefix.length;
      var internalSymbol = '__\x01symbol@@' + random;
      var emptySymbolLookup = {};
      var DP = 'defineProperty';
      var DPies = 'defineProperties';
      var GOPN = 'getOwnPropertyNames';
      var GOPD = 'getOwnPropertyDescriptor';
      var PIE = 'propertyIsEnumerable';
      var ObjectProto = Object.prototype;
      var hOP = ObjectProto.hasOwnProperty;
      var pIE = ObjectProto[PIE];
      var toString = ObjectProto.toString;
      var concat = Array.prototype.concat;
      var cachedWindowNames = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(self) : [];
      var nGOPN = Object[GOPN];
      var gOPN = function getOwnPropertyNames (obj) {
        if (toString.call(obj) === '[object Window]') {
          try {
            return nGOPN(obj);
          } catch (e) {
            // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
            return concat.call([], cachedWindowNames);
          }
        }
        return nGOPN(obj);
      };
      var gOPD = Object[GOPD];
      var objectCreate = Object.create;
      var objectKeys = Object.keys;
      var freeze = Object.freeze || Object;
      var objectDefineProperty = Object[DP];
      var $defineProperties = Object[DPies];
      var descriptor = gOPD(Object, GOPN);
      var addInternalIfNeeded = function (o, uid, enumerable) {
        if (!hOP.call(o, internalSymbol)) {
          try {
            objectDefineProperty(o, internalSymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: {}
            });
          } catch (e) {
            o[internalSymbol] = {};
          }
        }
        o[internalSymbol]['@@' + uid] = enumerable;
      };
      var createWithSymbols = function (proto, descriptors) {
        var self = objectCreate(proto);
        gOPN(descriptors).forEach(function (key) {
          if (propertyIsEnumerable.call(descriptors, key)) {
            $defineProperty(self, key, descriptors[key]);
          }
        });
        return self;
      };
      var copyAsNonEnumerable = function (descriptor) {
        var newDescriptor = objectCreate(descriptor);
        newDescriptor.enumerable = false;
        return newDescriptor;
      };
      var get = function get(){};
      var onlyNonSymbols = function (name) {
        return name != internalSymbol &&
          !hOP.call(source, name);
      };
      var onlySymbols = function (name) {
        return name != internalSymbol &&
          hOP.call(source, name);
      };
      var propertyIsEnumerable = function propertyIsEnumerable(key) {
        var uid = '' + key;
        return onlySymbols(uid) ? (
          hOP.call(this, uid) &&
          this[internalSymbol] && this[internalSymbol]['@@' + uid]
        ) : pIE.call(this, key);
      };
      var setAndGetSymbol = function (uid) {
        var descriptor = {
          enumerable: false,
          configurable: true,
          get: get,
          set: function (value) {
          setDescriptor(this, uid, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
          });
          addInternalIfNeeded(this, uid, true);
          }
        };
        try {
          objectDefineProperty(ObjectProto, uid, descriptor);
        } catch (e) {
          ObjectProto[uid] = descriptor.value;
        }
        source[uid] = objectDefineProperty(
          Object(uid),
          'constructor',
          sourceConstructor
        );
        var description = gOPD(Symbol.prototype, 'description');
        if (description) {
          objectDefineProperty(
            source[uid],
            'description',
            description
          );
        }
        return freeze(source[uid]);
      };

      var symbolDescription = function (s) {
        var sym = thisSymbolValue(s);

        // 3. Return sym.[[Description]].
        if (supportsInferredNames) {
          var name = getInferredName(sym);
          if (name !== "") {
            return name.slice(1, -1); // name.slice('['.length, -']'.length);
          }
        }

        if (emptySymbolLookup[sym] !== undefined) {
          return emptySymbolLookup[sym];
        }

        var string = sym.toString();
        var randomStartIndex = string.lastIndexOf("0.");
        string = string.slice(10, randomStartIndex);
        
        if (string === "") {
          return undefined;
        }
        return string;
      };

      var Symbol = function Symbol() {
        var description = arguments[0];
        if (this instanceof Symbol) {
          throw new TypeError('Symbol is not a constructor');
        }

        var uid = prefix.concat(description || '', random, ++id);

        if (description !== undefined && (description === null || isNaN(description) || String(description) === "")) {
          emptySymbolLookup[uid] = String(description);
        }

        var that = setAndGetSymbol(uid);

        if (!supportsGetters) {
          Object.defineProperty(that, "description", {
            configurable: true,
            enumerable: false,
            value: symbolDescription(that)
          });
        }

        return that;
      };

      var source = objectCreate(null);
      var sourceConstructor = {value: Symbol};
      var sourceMap = function (uid) {
        return source[uid];
        };
      var $defineProperty = function defineProperty(o, key, descriptor) {
        var uid = '' + key;
        if (onlySymbols(uid)) {
          setDescriptor(o, uid, descriptor.enumerable ?
            copyAsNonEnumerable(descriptor) : descriptor);
          addInternalIfNeeded(o, uid, !!descriptor.enumerable);
        } else {
          objectDefineProperty(o, key, descriptor);
        }
        return o;
      };

      var onlyInternalSymbols = function (obj) {
        return function (name) {
          return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
        };
      };
      var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
        }
      ;

      descriptor.value = $defineProperty;
      objectDefineProperty(Object, DP, descriptor);

      descriptor.value = $getOwnPropertySymbols;
      objectDefineProperty(Object, GOPS, descriptor);

      descriptor.value = function getOwnPropertyNames(o) {
        return gOPN(o).filter(onlyNonSymbols);
      };
      objectDefineProperty(Object, GOPN, descriptor);

      descriptor.value = function defineProperties(o, descriptors) {
        var symbols = $getOwnPropertySymbols(descriptors);
        if (symbols.length) {
        objectKeys(descriptors).concat(symbols).forEach(function (uid) {
          if (propertyIsEnumerable.call(descriptors, uid)) {
          $defineProperty(o, uid, descriptors[uid]);
          }
        });
        } else {
        $defineProperties(o, descriptors);
        }
        return o;
      };
      objectDefineProperty(Object, DPies, descriptor);

      descriptor.value = propertyIsEnumerable;
      objectDefineProperty(ObjectProto, PIE, descriptor);

      descriptor.value = Symbol;
      objectDefineProperty(global, 'Symbol', descriptor);

      // defining `Symbol.for(key)`
      descriptor.value = function (key) {
        var uid = prefix.concat(prefix, key, random);
        return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
      };
      objectDefineProperty(Symbol, 'for', descriptor);

      // defining `Symbol.keyFor(symbol)`
      descriptor.value = function (symbol) {
        if (onlyNonSymbols(symbol))
        throw new TypeError(symbol + ' is not a symbol');
        return hOP.call(source, symbol) ?
        symbol.slice(prefixLength * 2, -random.length) :
        void 0
        ;
      };
      objectDefineProperty(Symbol, 'keyFor', descriptor);

      descriptor.value = function getOwnPropertyDescriptor(o, key) {
        var descriptor = gOPD(o, key);
        if (descriptor && onlySymbols(key)) {
        descriptor.enumerable = propertyIsEnumerable.call(o, key);
        }
        return descriptor;
      };
      objectDefineProperty(Object, GOPD, descriptor);

      descriptor.value = function create(proto, descriptors) {
        return arguments.length === 1 || typeof descriptors === "undefined" ?
        objectCreate(proto) :
        createWithSymbols(proto, descriptors);
      };

      objectDefineProperty(Object, 'create', descriptor);

      var strictModeSupported = (function(){ return this; }).call(null) === null;
      if (strictModeSupported) {
        descriptor.value = function () {
          var str = toString.call(this);
          return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
        };
      } else {
        descriptor.value = function () {
          // https://github.com/Financial-Times/polyfill-library/issues/164#issuecomment-486965300
          // Polyfill.io this code is here for the situation where a browser does not
          // support strict mode and is executing `Object.prototype.toString.call(null)`.
          // This code ensures that we return the correct result in that situation however,
          // this code also introduces a bug where it will return the incorrect result for
          // `Object.prototype.toString.call(window)`. We can't have the correct result for
          // both `window` and `null`, so we have opted for `null` as we believe this is the more
          // common situation.
          if (this === window) {
            return '[object Null]';
          }

          var str = toString.call(this);
          return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
        };
      }
      objectDefineProperty(ObjectProto, 'toString', descriptor);

      setDescriptor = function (o, key, descriptor) {
        var protoDescriptor = gOPD(ObjectProto, key);
        delete ObjectProto[key];
        objectDefineProperty(o, key, descriptor);
        if (o !== ObjectProto) {
          objectDefineProperty(ObjectProto, key, protoDescriptor);
        }
      };

      // The abstract operation thisSymbolValue(value) performs the following steps:
      function thisSymbolValue(value) {
        // 1. If Type(value) is Symbol, return value.
        if (Type(value) === "symbol") {
          return value;
        }
        // 2. If Type(value) is Object and value has a [[SymbolData]] internal slot, then
        // a. Let s be value.[[SymbolData]].
        // b. Assert: Type(s) is Symbol.
        // c. Return s.
        // 3. Throw a TypeError exception.
        throw TypeError(value + " is not a symbol");
      }

      // Symbol.prototype.description
      if (function () {
        // supports getters
        try {
          var a = {};
          Object.defineProperty(a, "t", {
            configurable: true,
            enumerable: false,
            get: function() {
              return true;
            },
            set: undefined
          });
          return !!a.t;
        } catch (e) {
          return false;
        }
      }()) {
        var getInferredName;
        try {
          // eslint-disable-next-line no-new-func
          getInferredName = Function("s", "var v = s.valueOf(); return { [v]() {} }[v].name;");
          // eslint-disable-next-line no-empty
        } catch (e) { }

        var inferred = function () { };
        var supportsInferredNames = getInferredName && inferred.name === "inferred" ? getInferredName : null;
        

        // 19.4.3.2 get Symbol.prototype.description
        Object.defineProperty(global.Symbol.prototype, "description", {
          configurable: true,
          enumerable: false,
          get: function () {
            // 1. Let s be the this value.
            var s = this;
            return symbolDescription(s);
          }
        });
      }

    }(Object, 'getOwnPropertySymbols', self));
  }

  (function () {

    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
     }

    window.CustomEvent = CustomEvent;
  })();

  const baseMenuType = Symbol("BaseMenu");
  const baseMenuToggleType = Symbol("BaseMenuToggle");

  /**
   * Checks to see if the provided elements are instances of HTMLElement.
   *
   * The elements must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} elements - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isHTMLElement(elements) {
    try {
      if (typeof elements !== "object") {
        const type = typeof elements;

        throw new TypeError(
          `Elements given to isHTMLElement() must be inside of an object. ${type} given.`
        );
      }

      for (const key in elements) {
        if (!(elements[key] instanceof HTMLElement)) {
          const type = typeof elements[key];
          throw new TypeError(
            `${key} must be an instance of HTMLElement. ${type} given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided values are valid CSS selectors.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isCSSSelector(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isCSSSelector() must be inside of an object. ${type} given.`
        );
      }

      for (const key in values) {
        try {
          document.querySelector(values[key]);
        } catch (error) {
          throw new TypeError(
            `${key} must be a valid CSS selector. "${values[key]}" given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided values are booleans.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isBoolean(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isBoolean() must be inside of an object. ${type} given.`
        );
      }

      for (const key in values) {
        const type = typeof values[key];

        if (type !== "boolean") {
          throw new TypeError(`${key} must be a boolean. ${type} given.`);
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided values are numbers.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isNumber(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isNumber() must be inside of an object. ${type} given.`
        );
      }

      for (const key in values) {
        const type = typeof values[key];

        if (type !== "number") {
          throw new TypeError(`${key} must be a number. ${type} given.`);
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided values are strings.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isString(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isString() must be inside of an object. ${type} given.`
        );
      }

      for (const key in values) {
        const type = typeof values[key];

        if (type !== "string") {
          throw new TypeError(`${key} must be a string. ${type} given.`);
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided elements are a menus.
   *
   * The elements must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} elements - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isMenu(elements) {
    try {
      if (typeof elements !== "object") {
        const type = typeof elements;

        throw new TypeError(
          `Elements given to isMenu() must be inside of an object. ${type} given.`
        );
      }

      for (const key in elements) {
        if (!elements[key][baseMenuType]) {
          const type = typeof elements[key];

          throw new TypeError(
            `${key} must be an instance of BaseMenu. ${type} given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if the provided elements are using a specific tag.
   *
   * The elements must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * @param   {string} tagName  - The name of the tag.
   * @param   {object} elements - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isTag(tagName, elements) {
    if (isString({ tagName }) && isHTMLElement(elements)) {
      const tag = tagName.toLowerCase();
      let check = true;

      for (const key in elements) {
        if (elements[key].tagName.toLowerCase() !== tag) check = false;
      }

      return check;
    } else {
      return false;
    }
  }

  /**
   * Checks to see if the provided elements are a menu toggles.
   *
   * The elements must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} elements - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isMenuToggle(elements) {
    try {
      if (typeof elements !== "object") {
        const type = typeof elements;

        throw new TypeError(
          `Elements given to isMenuToggle() must be inside of an object. ${type} given.`
        );
      }

      for (const key in elements) {
        if (!elements[key][baseMenuToggleType]) {
          const type = typeof elements[key];

          throw new TypeError(
            `${key} must be an instance of BaseMenuToggle. ${type} given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Check to see if the provided values are valid focus states for a menu.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isValidState(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isValidState() must be inside of an object. ${type} given.`
        );
      }

      const validStates = ["none", "self", "child"];

      for (const key in values) {
        if (!validStates.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validStates.join(
            ", "
          )}. "${values[key]}" given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Check to see if the provided values are valid event types for a menu.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isValidEvent(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isValidEvent() must be inside of an object. ${type} given.`
        );
      }

      const validEvents = ["none", "mouse", "keyboard"];

      for (const key in values) {
        if (!validEvents.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validEvents.join(
            ", "
          )}. "${values[key]}" given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Checks to see if an event is supported by a node.
   *
   * @param   {string}      event   - The event type.
   * @param   {HTMLElement} element - The element to check.
   *
   * @returns {boolean} - The result.
   */
  function isEventSupported(event, element) {
    isString({ event });
    isHTMLElement({ element });

    const eventProp = `on${event}`;

    return typeof element[eventProp] !== "undefined";
  }

  /**
   * Checks to see if the provided value is either a string or an array of strings.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isValidClassList(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isValidClassList() must be inside of an object. ${type} given.`
        );
      }

      for (const key in values) {
        const type = typeof values[key];

        if (type !== "string") {
          if (Array.isArray(values[key])) {
            values[key].forEach(value => {
              isString({ classValue: value });
            });
          } else {
            throw new TypeError(
              `${key} must be a string or an array of strings. ${type} given.`
            );
          }
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Check to see if the provided values are valid hover types for a menu.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isValidHoverType(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;

        throw new TypeError(
          `Values given to isValidHoverType() must be inside of an object. ${type} given.`
        );
      }

      const validEvents = ["off", "on", "dynamic"];

      for (const key in values) {
        if (!validEvents.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validEvents.join(
            ", "
          )}. "${values[key]}" given.`
          );
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /*
   * A link or button that controls the visibility of a Menu.
   */
  class BaseMenuToggle {
    /**
     * {@inheritdoc}
     *
     * @param {object}               param0                       - The menu toggle object.
     * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
     * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
     * @param {BaseMenu}             param0.controlledMenu        - The menu controlled by this toggle.
     * @param {BaseMenu|null}        [param0.parentMenu = null]   - The menu containing this toggle.
     */
    constructor({
      menuToggleElement,
      parentElement,
      controlledMenu,
      parentMenu = null,
    }) {
      // Run validations.
      isHTMLElement({ menuToggleElement, parentElement });

      if (parentMenu !== null) {
        isMenu({ controlledMenu, parentMenu });
      } else {
        isMenu({ controlledMenu });
      }

      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement,
      };
      this.menuElements = {
        controlledMenu,
        parentMenu,
      };
      this.isOpen = false;

      this.expandEvent = new CustomEvent("accessibleMenuExpand", {
        bubbles: true,
        detail: { toggle: this },
      });
      this.collapseEvent = new CustomEvent("accessibleMenuCollapse", {
        bubbles: true,
        detail: { toggle: this },
      });

      this.initialize();
    }

    /**
     * Initialize the toggle by ensuring WAI-ARIA values are set,
     * handling click events, and adding new keydown events.
     */
    initialize() {
      const { closeClass } = this.elements.controlledMenu;

      // Add WAI-ARIA properties.
      this.dom.toggle.setAttribute("aria-haspopup", "true");
      this.dom.toggle.setAttribute("aria-expanded", "false");

      // If the toggle element is a button, there's no need to add a role.
      if (!isTag("button", { toggle: this.dom.toggle })) {
        this.dom.toggle.setAttribute("role", "button");
      }

      // Ensure both toggle and menu have IDs.
      if (
        this.dom.toggle.id === "" ||
        this.elements.controlledMenu.dom.menu.id === ""
      ) {
        const randomString = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 10);

        let id = this.dom.toggle.innerText.replace(/[^a-zA-Z0-9\s]/g, "");
        let finalID = randomString;

        if (
          !id.replace(/\s/g, "").length &&
          this.dom.toggle.getAttribute("aria-label")
        ) {
          id = this.dom.toggle
            .getAttribute("aria-label")
            .replace(/[^a-zA-Z0-9\s]/g, "");
        }

        if (id.replace(/\s/g, "").length > 0) {
          id = id.toLowerCase().replace(/\s+/g, "-");

          if (id.startsWith("-")) {
            id = id.substring(1);
          }

          if (id.endsWith("-")) {
            id = id.slice(0, -1);
          }

          finalID = `${id}-${finalID}`;
        }

        this.dom.toggle.id = this.dom.toggle.id || `${finalID}-menu-button`;
        this.elements.controlledMenu.dom.menu.id =
          this.elements.controlledMenu.dom.menu.id || `${finalID}-menu`;
      }

      // Set up proper aria label and control.
      this.elements.controlledMenu.dom.menu.setAttribute(
        "aria-labelledby",
        this.dom.toggle.id
      );
      this.dom.toggle.setAttribute(
        "aria-controls",
        this.elements.controlledMenu.dom.menu.id
      );

      // Add closed class.
      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(closeClass);
        } else if (Array.isArray(closeClass)) {
          closeClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      }
    }

    /**
     * The DOM elements within the toggle.
     *
     * @returns {object} - The DOM elements.
     */
    get dom() {
      return this.domElements;
    }

    /**
     * The elements within the toggle.
     *
     * @returns {object} - The elements.
     */
    get elements() {
      return this.menuElements;
    }

    /**
     * The open state on the menu.
     *
     * @returns {boolean} - The open state.
     */
    get isOpen() {
      return this.show;
    }

    /**
     * Set the open state on the menu.
     *
     * @param {boolean} value - The open state.
     */
    set isOpen(value) {
      isBoolean({ value });

      this.show = value;
    }

    /**
     * Expands the controlled menu.
     *
     * Alters ARIA attributes and classes.
     */
    expand() {
      const { closeClass, openClass } = this.elements.controlledMenu;

      this.dom.toggle.setAttribute("aria-expanded", "true");

      // Add the open class
      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(openClass);
        } else if (Array.isArray(openClass)) {
          openClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      }

      // Remove the close class.
      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
        } else if (Array.isArray(closeClass)) {
          closeClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.remove(value);
          });
        }
      }

      this.dom.toggle.dispatchEvent(this.expandEvent);
    }

    /**
     * Collapses the controlled menu.
     *
     * Alters ARIA attributes and classes.
     */
    collapse() {
      const { closeClass, openClass } = this.elements.controlledMenu;

      this.dom.toggle.setAttribute("aria-expanded", "false");

      // Add the close class
      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(closeClass);
        } else if (Array.isArray(closeClass)) {
          closeClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      }

      // Remove the open class.
      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(openClass);
        } else if (Array.isArray(openClass)) {
          openClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.remove(value);
          });
        }
      }

      this.dom.toggle.dispatchEvent(this.collapseEvent);
    }

    /**
     * Opens the controlled menu.
     */
    open() {
      this.isOpen = true;

      // Expand the controlled menu and close all siblings.
      this.expand();
      this.closeSiblings();

      // Set proper focus states to parent & child.
      if (this.elements.parentMenu) this.elements.parentMenu.focusState = "child";
      this.elements.controlledMenu.focusState = "self";
    }

    /**
     * Opens the controlled menu without the current focus entering it.
     */
    preview() {
      this.isOpen = true;

      // Expand the controlled menu and close all siblings.
      this.expand();
      this.closeSiblings();

      // Set proper focus states to parent & child.
      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }

      this.elements.controlledMenu.focusState = "none";
    }

    /**
     * Closes the controlled menu.
     */
    close() {
      if (this.isOpen) {
        this.isOpen = false;

        // Close the controlled menu and close all siblings.
        this.collapse();
        this.closeChildren();

        // Set proper focus states to parent & child.
        this.elements.controlledMenu.currentChild = 0;
        this.elements.controlledMenu.blur();

        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        }
      }
    }

    /**
     * Toggles the open state of the controlled menu.
     */
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Closes all sibling menus.
     */
    closeSiblings() {
      if (this.elements.parentMenu) {
        this.elements.parentMenu.elements.submenuToggles.forEach(toggle => {
          if (toggle !== this) toggle.close();
        });
      }
    }

    /**
     * Closes all child menus.
     */
    closeChildren() {
      this.elements.controlledMenu.elements.submenuToggles.forEach(toggle =>
        toggle.close()
      );
    }

    get [baseMenuToggleType]() {
      return true;
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /**
   * A basic navigation link contained inside of a Menu.
   */
  class BaseMenuItem {
    /**
     * {@inheritdoc}
     *
     * @param {object}              param0                         - The menu item object.
     * @param {HTMLElement}         param0.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}         param0.menuLinkElement         - The menu item's link in the DOM.
     * @param {BaseMenu}            param0.parentMenu              - The parent menu.
     * @param {boolean}             [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {BaseMenu|null}       [param0.childMenu = null]      - The child menu.
     * @param {BaseMenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
     */
    constructor({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem = false,
      childMenu = null,
      toggle = null,
    }) {
      // Run validations.
      isHTMLElement({ menuItemElement, menuLinkElement });
      isBoolean({ isSubmenuItem });

      if (childMenu !== null) {
        isMenu({ parentMenu, childMenu });
      } else {
        isMenu({ parentMenu });
      }

      if (toggle !== null) isMenuToggle({ toggle });

      this.domElements = {
        item: menuItemElement,
        link: menuLinkElement,
      };
      this.menuElements = {
        parentMenu,
        childMenu,
        toggle,
      };
      this.isController = isSubmenuItem;
    }

    /**
     * Initialize the menu item.
     */
    initialize() {}

    /**
     * The DOM elements within the menu item.
     *
     * @returns {object} - The DOM elements.
     */
    get dom() {
      return this.domElements;
    }

    /**
     * The elements within the menu item.
     *
     * @returns {object} - The elements.
     */
    get elements() {
      return this.menuElements;
    }

    /**
     * A flag marking a submenu item.
     *
     * @returns {boolean} - The submenu flag.
     */
    get isSubmenuItem() {
      return this.isController;
    }

    /**
     * Focuses the menu item's link and set proper tabIndex.
     */
    focus() {
      if (this.elements.parentMenu.currentEvent !== "mouse") {
        this.dom.link.focus();
      }
    }

    /**
     * Blurs the menu item's link and set proper tabIndex.
     */
    blur() {
      if (this.elements.parentMenu.currentEvent !== "mouse") {
        this.dom.link.blur();
      }
    }
  }

  /**
   * Retrieves the pressed key from an event.
   *
   * @param   {KeyboardEvent} event - The keyboard event.
   *
   * @returns {string} - The name of the key or an empty string.
   */
  function keyPress(event) {
    try {
      // Use event.key or event.keyCode to support older browsers.
      const key = event.key || event.keyCode;
      const keys = {
        Enter: key === "Enter" || key === 13,
        Space: key === " " || key === "Spacebar" || key === 32,
        Escape: key === "Escape" || key === "Esc" || key === 27,
        ArrowUp: key === "ArrowUp" || key === "Up" || key === 38,
        ArrowRight: key === "ArrowRight" || key === "Right" || key === 39,
        ArrowDown: key === "ArrowDown" || key === "Down" || key === 40,
        ArrowLeft: key === "ArrowLeft" || key === "Left" || key === 37,
        Home: key === "Home" || key === 36,
        End: key === "End" || key === 35,
        Character: !!key.match(/^[a-zA-Z]{1}$/),
        Tab: key === "Tab" || key === 9,
      };

      return Object.keys(keys).find(key => keys[key] === true) || "";
    } catch (error) {
      // Return an empty string if something goes wrong.
      return "";
    }
  }

  /**
   * Stops an event from taking action.
   *
   * @param {Event} event - The event.
   */
  function preventEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * An accessible navigation element in the DOM.
   */
  class BaseMenu {
    /**
     * {@inheritdoc}
     *
     * @param {object}               param0                               - The menu object.
     * @param {HTMLElement}          param0.menuElement                   - The menu element in the DOM.
     * @param {string}               [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
     * @param {string}               [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
     * @param {string}               [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
     * @param {string}               [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}               [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
     * @param {HTMLElement|null}     [param0.controllerElement = null]    - The element controlling the menu in the DOM.
     * @param {HTMLElement|null}     [param0.containerElement = null]     - The element containing the menu in the DOM.
     * @param {string|string[]|null} [param0.openClass = "show"]          - The class to apply when a menu is "open".
     * @param {string|string[]|null} [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
     * @param {boolean}              [param0.isTopLevel = false]          - A flag to mark the root menu.
     * @param {BaseMenu|null}        [param0.parentMenu = null]           - The parent menu to this menu.
     * @param {string}               [param0.hoverType = "off"]           - The type of hoverability a menu has.
     * @param {number}               [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    constructor({
      menuElement,
      menuItemSelector = "li",
      menuLinkSelector = "a",
      submenuItemSelector = "",
      submenuToggleSelector = "a",
      submenuSelector = "ul",
      controllerElement = null,
      containerElement = null,
      openClass = "show",
      closeClass = "hide",
      isTopLevel = true,
      parentMenu = null,
      hoverType = "off",
      hoverDelay = 250,
    }) {
      // Run validations.
      isBoolean({ isTopLevel });

      if (submenuItemSelector !== "") {
        isCSSSelector({
          menuItemSelector,
          menuLinkSelector,
          submenuItemSelector,
          submenuToggleSelector,
          submenuSelector,
        });
      } else {
        isCSSSelector({ menuItemSelector, menuLinkSelector });
      }

      if (controllerElement !== null || containerElement !== null) {
        isHTMLElement({ menuElement, controllerElement, containerElement });
      } else {
        isHTMLElement({ menuElement });
      }

      if (parentMenu !== null) isMenu({ parentMenu });

      this.domElements = {
        menu: menuElement,
        menuItems: [],
        submenuItems: [],
        submenuToggles: [],
        submenus: [],
        controller: controllerElement,
        container: containerElement,
      };
      this.domSelectors = {
        menuItems: menuItemSelector,
        menuLinks: menuLinkSelector,
        submenuItems: submenuItemSelector,
        submenuToggles: submenuToggleSelector,
        submenus: submenuSelector,
      };
      this.menuElements = {
        menuItems: [],
        submenuToggles: [],
        controller: null,
        parentMenu,
        rootMenu: isTopLevel ? this : null,
      };
      this.openClass = openClass || "";
      this.closeClass = closeClass || "";
      this.root = isTopLevel;
      this.currentChild = 0;
      this.focusState = "none";
      this.currentEvent = "none";
      this.hoverType = hoverType;
      this.hoverDelay = hoverDelay;

      // Set default class types.
      this.MenuType = BaseMenu;
      this.MenuItemType = BaseMenuItem;
      this.MenuToggleType = BaseMenuToggle;
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      const { MenuToggleType } = this;

      // Get the root menu if it doesn't exist.
      if (this.elements.rootMenu === null) this.findRootMenu(this);

      // Set all of the DOM elements.
      this.setDOMElements();

      if (this.isTopLevel) {
        if (this.dom.controller && this.dom.container) {
          // Create a new BaseMenuToggle to control the menu.
          const toggle = new MenuToggleType({
            menuToggleElement: this.dom.controller,
            parentElement: this.dom.container,
            controlledMenu: this,
            openClass: this.openClass,
            closeClass: this.closeClass,
          });

          this.menuElements.controller = toggle;
        }
      }

      this.createChildElements();
    }

    /**
     * The DOM elements within the menu.
     *
     * @returns {object} - The DOM elements.
     */
    get dom() {
      return this.domElements;
    }

    /**
     * The CSS selectors available to the menu.
     *
     * @returns {object} - The selectors.
     */
    get selectors() {
      return this.domSelectors;
    }

    /**
     * The elements within the menu.
     *
     * @returns {object} - The elements.
     */
    get elements() {
      return this.menuElements;
    }

    /**
     * The class(es) to apply when the menu is "open".
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's open class(es).
     *
     * @returns {string|string[]} - The class(es).
     */
    get openClass() {
      return this.isTopLevel
        ? this.submenuOpenClass
        : this.elements.rootMenu.openClass;
    }

    /**
     * The class(es) to apply when the menu is "closed".
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's close class(es).
     *
     * @returns {string|string[]} - The class(es).
     */
    get closeClass() {
      return this.isTopLevel
        ? this.submenuCloseClass
        : this.elements.rootMenu.closeClass;
    }

    /**
     * A flag marking the root menu.
     *
     * @returns {boolean} - The top-level flag.
     */
    get isTopLevel() {
      return this.root;
    }

    /**
     * The index of the currently selected menu item in the menu.
     *
     * @returns {number} - The index.
     */
    get currentChild() {
      return this.focussedChild;
    }

    /**
     * The current state of the menu's focus.
     *
     * @returns {string} - The state.
     */
    get focusState() {
      return this.state;
    }

    /**
     * This last event triggered on the menu.
     *
     * @returns {string} - The event type.
     */
    get currentEvent() {
      return this.event;
    }

    /**
     * The currently selected menu item.
     *
     * @returns {BaseMenuItem} - The menu item.
     */
    get currentMenuItem() {
      return this.elements.menuItems[this.currentChild];
    }

    /**
     * The type of hoverability for the menu.
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's hoverability.
     *
     * @returns {string} - The hover type.
     */
    get hoverType() {
      return this.isTopLevel ? this.hover : this.elements.rootMenu.hoverType;
    }

    /**
     * The delay time (in miliseconds) used for mouseout events to take place.
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's hover delay.
     *
     * @returns {number} - The delay time.
     */
    get hoverDelay() {
      return this.isTopLevel ? this.delay : this.elements.rootMenu.hoverDelay;
    }

    /**
     * Set the class to apply when the menu is "open".
     *
     * @param {string} value - The class.
     */
    set openClass(value) {
      isValidClassList({ openClass: value });

      this.submenuOpenClass = value;
    }

    /**
     * Set the class to apply when the menu is "closed".
     *
     * @param {string} value - The class.
     */
    set closeClass(value) {
      isValidClassList({ closeClass: value });

      this.submenuCloseClass = value;
    }

    /**
     * Set the index currently selected menu item in the menu.
     *
     * @param {number} value - The index.
     */
    set currentChild(value) {
      isNumber({ value });

      this.focussedChild = value;
    }

    /**
     * Set the state of the menu's focus.
     *
     * @param {string} value - The state.
     */
    set focusState(value) {
      isValidState({ value });

      this.state = value;
    }

    /**
     * Set the last event triggered on the menu.
     *
     * @param {string} value - The event type.
     */
    set currentEvent(value) {
      isValidEvent({ value });

      this.event = value;
    }

    /**
     * Set the type of hoverability for the menu.
     *
     * @param {string} value - The hover type.
     */
    set hoverType(value) {
      isValidHoverType({ value });

      this.hover = value;
    }

    /**
     * Set the delay time (in miliseconds) used for mouseout events to take place.
     *
     * @param {number} value - The delay time.
     */
    set hoverDelay(value) {
      isNumber({ value });

      this.delay = value;
    }

    /**
     * Sets DOM elements within the menu.
     *
     * @param {string}      elementType - The type of element to populate.
     * @param {HTMLElement} base        - The element used as the base for the querySelect.
     * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
     */
    setDOMElementType(elementType, base, filter) {
      if (typeof this.selectors[elementType] === "string") {
        if (base) isHTMLElement({ base });

        const baseElement = base || this.dom.menu;
        const baseFilter = item => item.parentElement === baseElement;
        const selector = this.selectors[elementType];
        const domElements = Array.from(baseElement.querySelectorAll(selector));

        if (typeof filter !== "undefined") {
          if (typeof filter === "function") {
            this.domElements[elementType] = domElements.filter(item =>
              filter(item)
            );
          } else {
            this.domElements[elementType] = domElements;
          }
        } else {
          this.domElements[elementType] = domElements.filter(item =>
            baseFilter(item)
          );
        }
      } else {
        throw new Error(
          `${elementType} is not a valid element type within the menu.`
        );
      }
    }

    /**
     * Adds an element to DOM elements within the menu.
     *
     * @param {string}      elementType - The type of element to populate.
     * @param {HTMLElement} base        - The element used as the base for the querySelect.
     * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
     */
    addDOMElementType(elementType, base, filter) {
      if (typeof this.selectors[elementType] === "string") {
        if (base) isHTMLElement({ base });

        const baseElement = base || this.dom.menu;
        const baseFilter = item => item.parentElement === baseElement;
        const selector = this.selectors[elementType];
        const domElements = Array.from(baseElement.querySelectorAll(selector));

        if (typeof filter !== "undefined") {
          if (typeof filter === "function") {
            this.domElements[elementType] = [
              ...this.domElements[elementType],
              ...domElements.filter(item => filter(item)),
            ];
          } else {
            this.domElements[elementType] = [
              ...this.domElements[elementType],
              ...domElements,
            ];
          }
        } else {
          this.domElements[elementType] = [
            ...this.domElements[elementType],
            ...domElements.filter(item => baseFilter(item)),
          ];
        }
      } else {
        throw new Error(
          `${elementType} is not a valid element type within the menu.`
        );
      }
    }

    /**
     * Clears DOM elements within the menu.
     *
     * @param {string} elementType - The type of element to clear.
     */
    clearDOMElementType(elementType) {
      if (elementType === "menu") return;

      if (Array.isArray(this.domElements[elementType])) {
        this.domElements[elementType] = [];
      } else if (typeof this.domElements[elementType] !== "undefined") {
        this.domElements[elementType] = null;
      } else {
        throw new Error(
          `${elementType} is not a valid element type within the menu.`
        );
      }
    }

    /**
     * Sets all DOM elements within the menu.
     */
    setDOMElements() {
      this.setDOMElementType("menuItems");

      if (this.selectors.submenuItems !== "") {
        this.setDOMElementType("submenuItems");

        this.clearDOMElementType("submenuToggles");
        this.clearDOMElementType("submenus");

        this.dom.submenuItems.forEach(item => {
          this.addDOMElementType("submenuToggles", item);
          this.addDOMElementType("submenus", item);
        });
      }
    }

    /**
     * Finds the root menu element.
     *
     * @param {BaseMenu} menu - The menu to check.
     */
    findRootMenu(menu) {
      if (menu.isTopLevel) {
        this.menuElements.rootMenu = menu;
      } else if (menu.elements.parentMenu !== null) {
        this.findRootMenu(menu.elements.parentMenu);
      } else {
        throw new Error("Cannot find root menu.");
      }
    }

    /**
     * Creates and initializes all menu items and submenus.
     */
    createChildElements() {
      const { MenuType, MenuItemType, MenuToggleType } = this;

      this.dom.menuItems.forEach(element => {
        let menuItem;

        if (this.dom.submenuItems.includes(element)) {
          // The menu's toggle controller DOM element.
          const toggler = element.querySelector(this.selectors.submenuToggles);
          // The actual menu DOM element.
          const submenu = element.querySelector(this.selectors.submenus);

          // Create the new menu and initialize it.
          const menu = new MenuType({
            menuElement: submenu,
            menuItemSelector: this.selectors.menuItems,
            menuLinkSelector: this.selectors.menuLinks,
            submenuItemSelector: this.selectors.submenuItems,
            submenuToggleSelector: this.selectors.submenuToggles,
            submenuSelector: this.selectors.submenus,
            openClass: this.openClass,
            closeClass: this.closeClass,
            isTopLevel: false,
            parentMenu: this,
            hoverType: this.hoverType,
            hoverDelay: this.hoverDelay,
          });

          // Create the new menu toggle.
          const toggle = new MenuToggleType({
            menuToggleElement: toggler,
            parentElement: element,
            controlledMenu: menu,
            parentMenu: this,
          });

          // Add the toggle to the list of toggles.
          this.menuElements.submenuToggles.push(toggle);

          // Create a new menu item.
          menuItem = new MenuItemType({
            menuItemElement: element,
            menuLinkElement: toggler,
            parentMenu: this,
            isSubmenuItem: true,
            childMenu: menu,
            toggle,
          });
        } else {
          const link = element.querySelector(this.selectors.menuLinks);

          // Create a new menu item.
          menuItem = new MenuItemType({
            menuItemElement: element,
            menuLinkElement: link,
            parentMenu: this,
          });
        }

        this.menuElements.menuItems.push(menuItem);
      });
    }

    /**
     * Handles focus events throughout the menu for proper menu use.
     */
    handleFocus() {
      this.elements.menuItems.forEach((menuItem, index) => {
        menuItem.dom.link.addEventListener("focus", () => {
          if (this.elements.parentMenu)
            this.elements.parentMenu.focusState = "child";
          if (menuItem.elements.childMenu)
            menuItem.elements.childMenu.focusState = "none";

          this.focusState = "self";
          this.currentChild = index;
        });
      });
    }

    /**
     * Handles click events throughout the menu for proper use.
     */
    handleClick() {
      // Close the menu if a click event happens outside of it.
      document.addEventListener("mouseup", event => {
        if (this.focusState !== "none") {
          this.currentEvent = "mouse";

          if (
            !this.dom.menu.contains(event.target) &&
            !this.dom.menu !== event.target
          ) {
            this.closeChildren();
            this.blur();

            if (this.elements.controller) {
              this.elements.controller.close();
            }
          }
        }
      });

      /**
       * Toggles a toggle element.
       *
       * @param {BaseMenu}       menu - This menu.
       * @param {BaseMenuToggle} toggle - The menu toggle
       * @param {Event}          event - A Javascript event.
       */
      function toggleToggle(menu, toggle, event) {
        preventEvent(event);

        menu.currentEvent = "mouse";

        toggle.toggle();

        if (toggle.isOpen) {
          menu.focusState = "self";
          toggle.elements.controlledMenu.focusState = "none";
        }
      }

      // Toggle submenus when their controllers are clicked.
      this.elements.submenuToggles.forEach(toggle => {
        if (isEventSupported("touchend", toggle.dom.toggle)) {
          toggle.dom.toggle.ontouchend = event => {
            toggleToggle(this, toggle, event);
          };
        } else {
          toggle.dom.toggle.onmouseup = event => {
            toggleToggle(this, toggle, event);
          };
        }
      });

      // Open the this menu if it's controller is clicked.
      if (this.isTopLevel && this.elements.controller) {
        if (isEventSupported("touchend", this.elements.controller.dom.toggle)) {
          this.elements.controller.dom.toggle.ontouchend = event => {
            toggleToggle(this, this.elements.controller, event);
          };
        } else {
          this.elements.controller.dom.toggle.onmouseup = event => {
            toggleToggle(this, this.elements.controller, event);
          };
        }
      }
    }

    /**
     * Handles hover events throughout the menu for proper use.
     */
    handleHover() {
      this.elements.submenuToggles.forEach(toggle => {
        toggle.dom.parent.addEventListener("mouseenter", () => {
          if (this.hoverType === "on") {
            this.currentEvent = "mouse";
            toggle.open();
          } else if (this.hoverType === "dynamic") {
            const isOpen = this.elements.submenuToggles.some(
              toggle => toggle.isOpen
            );
            if (!this.isTopLevel || isOpen) {
              this.currentEvent = "mouse";
              toggle.open();
            }
          }
        });

        toggle.dom.parent.addEventListener("mouseleave", () => {
          if (this.hoverType === "on") {
            setTimeout(() => {
              this.currentEvent = "mouse";
              toggle.close();
            }, this.hoverDelay);
          } else if (this.hoverType === "dynamic") {
            if (!this.isTopLevel) {
              this.currentEvent = "mouse";
              toggle.close();
            }
          }
        });
      });
    }

    /**
     * Handles keydown events throughout the menu for proper menu use.
     */
    handleKeydown() {
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.addEventListener("keydown", event => {
          this.currentEvent = "keyboard";

          const key = keyPress(event);

          if (key === "Space" || key === "Enter") {
            preventEvent(event);
          }
        });
      }
    }

    /**
     * Handles keyup events throughout the menu for proper menu use.
     */
    handleKeyup() {
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.addEventListener("keyup", event => {
          this.currentEvent = "keyboard";

          const key = keyPress(event);

          if (key === "Space" || key === "Enter") {
            preventEvent(event);
            this.elements.controller.open();
            this.focusFirstChild();
          }
        });
      }
    }

    /**
     * Focus the menu.
     */
    focus() {
      this.focusState = "self";

      if (this.currentEvent !== "mouse") {
        this.dom.menu.focus();
      }
    }

    /**
     * Unfocus the menu.
     */
    blur() {
      this.focusState = "none";

      if (this.currentEvent !== "mouse") {
        this.dom.menu.blur();
      }

      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.close();
      }
    }

    /**
     * Focues the menu's first child.
     */
    focusFirstChild() {
      this.blurCurrentChild();
      this.currentChild = 0;
      this.focusCurrentChild();
    }

    /**
     * Focus the menu's last child.
     */
    focusLastChild() {
      this.blurCurrentChild();
      this.currentChild = this.elements.menuItems.length - 1;
      this.focusCurrentChild();
    }

    /**
     * Focus the menu's next child.
     */
    focusNextChild() {
      if (this.currentChild === this.elements.menuItems.length - 1) {
        this.focusFirstChild();
      } else {
        this.blurCurrentChild();
        this.currentChild = this.currentChild + 1;
        this.focusCurrentChild();
      }
    }

    /**
     * Focus the menu's last child.
     */
    focusPreviousChild() {
      if (this.currentChild === 0) {
        this.focusLastChild();
      } else {
        this.blurCurrentChild();
        this.currentChild = this.currentChild - 1;
        this.focusCurrentChild();
      }
    }

    /**
     * Focus the menu's current child.
     */
    focusCurrentChild() {
      if (this.currentChild !== -1) {
        this.currentMenuItem.focus();
      }
    }

    /**
     * Blurs the menu's current child.
     */
    blurCurrentChild() {
      if (this.currentChild !== -1) {
        this.currentMenuItem.blur();
      }
    }

    /**
     * Focus the menu's next child starting with a specific letter.
     *
     * @param {string} char - The character to look for.
     */
    focusNextChildWithCharacter(char) {
      // Ensure the character is lowercase just to be safe.
      const match = char.toLowerCase();
      let index = this.currentChild + 1;
      let found = false;

      while (!found && index < this.elements.menuItems.length) {
        // Ensure the text in the item is lowercase just to be safe.
        const text = this.elements.menuItems[
          index
        ].dom.item.innerText.toLowerCase();

        // Focus the child if the text matches, otherwise move on.
        if (text.startsWith(match)) {
          found = true;
          this.currentChild = index;
          this.focusCurrentChild();
        }

        index++;
      }
    }

    /**
     * Focus the menu's controller.
     */
    focusController() {
      if (this.dom.controller) {
        if (this.currentEvent !== "mouse") {
          this.dom.controller.focus();
        }

        this.focusState = "none";
      }
    }

    /**
     * Focus the menu's container.
     */
    focusContainer() {
      if (this.dom.container) {
        if (this.currentEvent !== "mouse") {
          this.dom.container.focus();
        }

        this.focusState = "none";
      }
    }

    /**
     * Close all submenu children.
     */
    closeChildren() {
      this.elements.submenuToggles.forEach(toggle => toggle.close());
    }

    get [baseMenuType]() {
      return true;
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /**
   * A basic navigation link contained inside of a Menubar.
   */
  class MenubarItem extends BaseMenuItem {
    /**
     * {@inheritdoc}
     *
     * @param {object}             param0                         - The menu item object.
     * @param {HTMLElement}        param0.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}        param0.menuLinkElement         - The menu item's link in the DOM.
     * @param {Menubar}            param0.parentMenu              - The parent menu.
     * @param {boolean}            [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {Menubar|null}       [param0.childMenu = null]      - The child menu.
     * @param {MenubarToggle|null} [param0.toggle = null]         - The controller for the child menu.
     */
    constructor({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem = false,
      childMenu = null,
      toggle = null,
    }) {
      super({
        menuItemElement,
        menuLinkElement,
        parentMenu,
        isSubmenuItem,
        childMenu,
        toggle,
      });

      this.initialize();
    }

    /**
     * Initialize the menu item by setting its tab index.
     */
    initialize() {
      super.initialize();

      this.dom.item.setAttribute("role", "none");
      this.dom.link.setAttribute("role", "menuitem");
      this.dom.link.tabIndex = -1;
    }

    /**
     * Focuses the menu item's link and set proper tabIndex.
     */
    focus() {
      super.focus();

      if (this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = 0;
      }
    }

    /**
     * Blurs the menu item's link and set proper tabIndex.
     */
    blur() {
      super.blur();

      if (this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = -1;
      }
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /*
   * A link or button that controls the visibility of a Menubar.
   */
  class MenubarToggle extends BaseMenuToggle {
    /**
     * {@inheritdoc}
     *
     * @param {object}               param0                       - The menu toggle object.
     * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
     * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
     * @param {Menubar}              param0.controlledMenu        - The menu controlled by this toggle.
     * @param {string|string[]|null} [param0.openClass = "show"]  - The class to apply when the controlled menu is "open".
     * @param {string|string[]|null} [param0.closeClass = "hide"] - The class to apply when the controlled menu is "closed".
     * @param {Menubar|null}         [param0.parentMenu = null]   - The menu containing this toggle.
     */
    constructor({
      menuToggleElement,
      parentElement,
      controlledMenu,
      openClass = "show",
      closeClass = "hide",
      parentMenu = null,
    }) {
      super({
        menuToggleElement,
        parentElement,
        controlledMenu,
        openClass,
        closeClass,
        parentMenu,
      });

      this.initialize();
    }
  }

  /**
   * An accessible menubar navigation in the DOM.
   *
   * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html
   */
  class Menubar extends BaseMenu {
    /**
     * {@inheritdoc}
     *
     * @param {object}           param0                               - The menu object.
     * @param {HTMLElement}      param0.menuElement                   - The menu element in the DOM.
     * @param {string}           [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
     * @param {string}           [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
     * @param {string}           [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
     * @param {string}           [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}           [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
     * @param {HTMLElement|null} [param0.controllerElement = null]    - The element controlling the menu in the DOM.
     * @param {HTMLElement|null} [param0.containerElement = null]     - The element containing the menu in the DOM.
     * @param {string}           [param0.openClass = "show"]          - The class to apply when a menu is "open".
     * @param {string}           [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
     * @param {boolean}          [param0.isTopLevel = false]          - A flag to mark the root menu.
     * @param {Menubar|null}     [param0.parentMenu = null]           - The parent menu to this menu.
     * @param {string}           [param0.hoverType = "off"]           - The type of hoverability a menu has.
     * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    constructor({
      menuElement,
      menuItemSelector = "li",
      menuLinkSelector = "a",
      submenuItemSelector = "",
      submenuToggleSelector = "a",
      submenuSelector = "ul",
      controllerElement = null,
      containerElement = null,
      openClass = "show",
      closeClass = "hide",
      isTopLevel = true,
      parentMenu = null,
      hoverType = "off",
      hoverDelay = 250,
    }) {
      super({
        menuElement,
        menuItemSelector,
        menuLinkSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        controllerElement,
        containerElement,
        openClass,
        closeClass,
        isTopLevel,
        parentMenu,
        hoverType,
        hoverDelay,
      });

      this.MenuType = Menubar;
      this.MenuItemType = MenubarItem;
      this.MenuToggleType = MenubarToggle;

      this.initialize();
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      super.initialize();

      this.dom.menu.setAttribute("role", "menubar");

      this.handleFocus();
      this.handleClick();
      this.handleHover();
      this.handleKeydown();
      this.handleKeyup();

      this.elements.menuItems[0].dom.link.tabIndex = 0;
    }

    /**
     * Handles keydown events throughout the menu for proper menu use.
     */
    handleKeydown() {
      super.handleKeydown();

      this.dom.menu.addEventListener("keydown", event => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        if (key === "Tab") {
          // Hitting Tab:
          // - Moves focus out of the menu.
          if (this.elements.rootMenu.focusState !== "none") {
            this.elements.rootMenu.blur();
            this.elements.rootMenu.closeChildren();
          } else {
            this.elements.rootMenu.focus();
          }
        }

        // Prevent default event actions if we're handling the keyup event.
        if (key === "Character") {
          preventEvent(event);
        } else if (this.isTopLevel) {
          if (this.focusState === "self") {
            const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
            const submenuKeys = ["Space", "Enter", "ArrowDown", "ArrowUp"];
            const controllerKeys = ["Escape"];

            if (keys.includes(key)) {
              preventEvent(event);
            } else if (
              this.currentMenuItem.isSubmenuItem &&
              submenuKeys.includes(key)
            ) {
              preventEvent(event);
            } else if (this.elements.controller && controllerKeys.includes(key)) {
              preventEvent(event);
            }
          }
        } else {
          const keys = [
            "Escape",
            "ArrowRight",
            "ArrowLeft",
            "ArrowDown",
            "ArrowUp",
            "Home",
            "End",
          ];
          const submenuKeys = ["Space", "Enter"];

          if (keys.includes(key)) {
            preventEvent(event);
          } else if (
            this.currentMenuItem.isSubmenuItem &&
            submenuKeys.includes(key)
          ) {
            preventEvent(event);
          }
        }
      });
    }

    /**
     * Handles keyup events throughout the menu for proper menu use.
     */
    handleKeyup() {
      super.handleKeyup();

      this.dom.menu.addEventListener("keyup", event => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);
        const { altKey, crtlKey, metaKey } = event;
        const modifier = altKey || crtlKey || metaKey;

        if (key === "Character" && !modifier) {
          // Hitting Character:
          // - Moves focus to next item in the menubar having a name that starts with the typed character.
          // - If none of the items have a name starting with the typed character, focus does not move.
          preventEvent(event);
          this.focusNextChildWithCharacter(event.key);
        } else if (this.isTopLevel) {
          if (this.focusState === "self") {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Opens submenu and moves focus to first item in the submenu.
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.toggle.open();
                // This ensures the the menu is _visually_ open before the child is focussed.
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
              preventEvent(event);

              // Store the current item's info if its an open dropdown.
              const previousChildOpen =
                this.currentMenuItem.isSubmenuItem &&
                this.currentMenuItem.elements.toggle.isOpen;

              this.focusNextChild();

              // Open the newly focussed submenu if applicable.
              if (previousChildOpen) {
                if (this.currentMenuItem.isSubmenuItem) {
                  this.currentMenuItem.elements.toggle.preview();
                } else {
                  this.closeChildren();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
              preventEvent(event);

              // Store the current item's info if its an open dropdown.
              const previousChildOpen =
                this.currentMenuItem.isSubmenuItem &&
                this.currentMenuItem.elements.toggle.isOpen;

              this.focusPreviousChild();

              // Open the newly focussed submenu if applicable.
              if (previousChildOpen) {
                if (this.currentMenuItem.isSubmenuItem) {
                  this.currentMenuItem.elements.toggle.preview();
                } else {
                  this.closeChildren();
                }
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Opens submenu and moves focus to first item in the submenu.
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.toggle.open();
                // This ensures the the menu is _visually_ open before the child is focussed.
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Opens submenu and moves focus to last item in the submenu.
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.toggle.open();
                // This ensures the the menu is _visually_ open before the child is focussed.
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusLastChild();
                });
              }
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);
              this.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);
              this.focusLastChild();
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes menu.
              const hasOpenChild = this.elements.submenuToggles.some(
                toggle => toggle.isOpen
              );

              if (hasOpenChild) {
                preventEvent(event);
                this.closeChildren();
              } else if (
                this.isTopLevel &&
                this.elements.controller &&
                this.elements.controller.isOpen
              ) {
                preventEvent(event);
                this.elements.controller.close();
                this.focusController();
              }
            }
          }
        } else {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - Activates menu item, causing the link to be activated.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            }
          } else if (key === "Escape") {
            // Hitting Escape:
            // - Closes submenu.
            // - Moves focus to parent menubar item.
            preventEvent(event);
            this.elements.rootMenu.closeChildren();
            this.elements.rootMenu.focusCurrentChild();
          } else if (key === "ArrowRight") {
            // Hitting the Right Arrow:
            // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
            // - If focus is on an item that does not have a submenu:
            //   - Closes submenu.
            //   - Moves focus to next item in the menubar.
            //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.toggle.open();
              // This ensures the the menu is _visually_ open before the child is focussed.
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            } else {
              preventEvent(event);
              this.elements.rootMenu.closeChildren();
              this.elements.rootMenu.focusNextChild();

              if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
              }
            }
          } else if (key === "ArrowLeft") {
            // Hitting the Left Arrow:
            // - Closes submenu and moves focus to parent menu item.
            // - If parent menu item is in the menubar, also:
            //   - moves focus to previous item in the menubar.
            //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
            if (this.elements.parentMenu.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.elements.parentMenu.currentMenuItem.elements.toggle.close();
              this.elements.parentMenu.focusCurrentChild();

              if (this.elements.parentMenu === this.elements.rootMenu) {
                this.elements.rootMenu.closeChildren();
                this.elements.rootMenu.focusPreviousChild();

                if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                  this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                }
              }
            }
          } else if (key === "ArrowDown") {
            // Hitting the Down Arrow:
            // - Moves focus to the next item in the menubar.
            // - If focus is on the last item, moves focus to the first item.
            preventEvent(event);
            this.focusNextChild();
          } else if (key === "ArrowUp") {
            // Hitting the Up Arrow:
            // - Moves focus to the previous item in the menubar.
            // - If focus is on the first item, moves focus to the last item.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // Hitting Home:
            // - Moves focus to first item in the menubar.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - Moves focus to last item in the menubar.
            preventEvent(event);
            this.focusLastChild();
          }
        }
      });
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /**
   * A basic navigation link contained inside of a DisclosureMenu.
   */
  class DisclosureMenuItem extends BaseMenuItem {
    /**
     * {@inheritdoc}
     *
     * @param {object}                    param0                         - The menu item object.
     * @param {HTMLElement}               param0.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}               param0.menuLinkElement         - The menu item's link in the DOM.
     * @param {DisclosureMenu}            param0.parentMenu              - The parent menu.
     * @param {boolean}                   [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {DisclosureMenu|null}       [param0.childMenu = null]      - The child menu.
     * @param {DisclosureMenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
     */
    constructor({
      menuItemElement,
      menuLinkElement,
      parentMenu,
      isSubmenuItem = false,
      childMenu = null,
      toggle = null,
    }) {
      super({
        menuItemElement,
        menuLinkElement,
        parentMenu,
        isSubmenuItem,
        childMenu,
        toggle,
      });

      this.initialize();
    }
  }

  /* eslint-disable jsdoc/no-undefined-types */

  /*
   * A link or button that controls the visibility of a DisclosureMenu.
   */
  class DisclosureMenuToggle extends BaseMenuToggle {
    /**
     * {@inheritdoc}
     *
     * @param {object}               param0                       - The menu toggle object.
     * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
     * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
     * @param {DisclosureMenu}       param0.controlledMenu        - The menu controlled by this toggle.
     * @param {string|string[]|null} [param0.openClass = "show"]  - The class to apply when the controlled menu is "open".
     * @param {string|string[]|null} [param0.closeClass = "hide"] - The class to apply when the controlled menu is "closed".
     * @param {DisclosureMenu|null}  [param0.parentMenu = null]   - The menu containing this toggle.
     */
    constructor({
      menuToggleElement,
      parentElement,
      controlledMenu,
      openClass = "show",
      closeClass = "hide",
      parentMenu = null,
    }) {
      super({
        menuToggleElement,
        parentElement,
        controlledMenu,
        openClass,
        closeClass,
        parentMenu,
      });

      this.initialize();
    }
  }

  /**
   * An accessible disclosure menu in the DOM.
   *
   * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html
   */
  class DisclosureMenu extends BaseMenu {
    /**
     * {@inheritdoc}
     *
     * @param {object}              param0                               - The menu object.
     * @param {HTMLElement}         param0.menuElement                   - The menu element in the DOM.
     * @param {string}              [param0.menuItemSelector = "li"]     - The CSS selector string for menu items.
     * @param {string}              [param0.menuLinkSelector = "a"]      - The CSS selector string for menu links.
     * @param {string}              [param0.submenuItemSelector = ""]    - The CSS selector string for menu items containing submenus.
     * @param {string}              [param0.submenuToggleSelector = "a"] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}              [param0.submenuSelector = "ul"]      - The CSS selector string for submenus.
     * @param {HTMLElement|null}    [param0.controllerElement = null]    - The element controlling the menu in the DOM.
     * @param {HTMLElement|null}    [param0.containerElement = null]     - The element containing the menu in the DOM.
     * @param {string}              [param0.openClass = "show"]          - The class to apply when a menu is "open".
     * @param {string}              [param0.closeClass = "hide"]         - The class to apply when a menu is "closed".
     * @param {boolean}             [param0.isTopLevel = false]          - A flag to mark the root menu.
     * @param {DisclosureMenu|null} [param0.parentMenu = null]           - The parent menu to this menu.
     * @param {string}              [param0.hoverType = "off"]           - The type of hoverability a menu has.
     * @param {number}              [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    constructor({
      menuElement,
      menuItemSelector = "li",
      menuLinkSelector = "a",
      submenuItemSelector = "",
      submenuToggleSelector = "a",
      submenuSelector = "ul",
      controllerElement = null,
      containerElement = null,
      openClass = "show",
      closeClass = "hide",
      isTopLevel = true,
      parentMenu = null,
      hoverType = "off",
      hoverDelay = 250,
    }) {
      super({
        menuElement,
        menuItemSelector,
        menuLinkSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        controllerElement,
        containerElement,
        openClass,
        closeClass,
        isTopLevel,
        parentMenu,
        hoverType,
        hoverDelay,
      });

      // Set default class types.
      this.MenuType = DisclosureMenu;
      this.MenuItemType = DisclosureMenuItem;
      this.MenuToggleType = DisclosureMenuToggle;

      this.currentChild = -1;

      this.initialize();
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      super.initialize();

      this.handleFocus();
      this.handleClick();
      this.handleHover();
      this.handleKeydown();
      this.handleKeyup();
    }

    /**
     * Handles keydown events throughout the menu for proper menu use.
     */
    handleKeydown() {
      super.handleKeydown();

      this.dom.menu.addEventListener("keydown", event => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        // Prevent default event actions if we're handling the keyup event.
        if (this.focusState === "self") {
          const keys = [
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            "ArrowLeft",
            "Home",
            "End",
          ];
          const submenuKeys = ["Space", "Enter"];
          const controllerKeys = ["Escape"];
          const parentKeys = ["Escape"];

          if (keys.includes(key)) {
            preventEvent(event);
          } else if (
            this.currentMenuItem.isSubmenuItem &&
            submenuKeys.includes(key)
          ) {
            preventEvent(event);
          } else if (this.elements.controller && controllerKeys.includes(key)) {
            preventEvent(event);
          } else if (this.elements.parentMenu && parentKeys.includes(key)) {
            preventEvent(event);
          }
        }
      });
    }

    /**
     * Handles keyup events throughout the menu for proper menu use.
     */
    handleKeyup() {
      super.handleKeyup();

      this.dom.menu.addEventListener("keyup", event => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        if (this.focusState === "self") {
          if (key === "Space" || key === "Enter") {
            // Hitting Space or Enter:
            // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
            // - Click handling of other links in the menu is handled by the browser.
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.toggle.preview();
            }
          } else if (key === "Escape") {
            // Hitting Escape
            // - If a dropdown is open, closes it.
            // - If was within the closed dropdown, sets focus on the button that controls that dropdown.
            const hasOpenChild = this.elements.submenuToggles.some(
              toggle => toggle.isOpen
            );

            if (hasOpenChild) {
              preventEvent(event);
              this.closeChildren();
            } else if (this.elements.parentMenu) {
              preventEvent(event);
              this.elements.parentMenu.closeChildren();
              this.elements.parentMenu.focusCurrentChild();
            } else if (
              this.isTopLevel &&
              this.elements.controller &&
              this.elements.controller.isOpen
            ) {
              this.elements.controller.close();
              this.focusController();
            }
          } else if (key === "ArrowDown" || key === "ArrowRight") {
            // Hitting the Down or Right Arrow:
            // - If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.
            // - If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.
            // - If focus is on a link, and it is not the last link, moves focus to the next link.
            preventEvent(event);

            if (
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isOpen
            ) {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            } else {
              this.focusNextChild();
            }
          } else if (key === "ArrowUp" || key === "ArrowLeft") {
            // Hitting the Up or Left Arrow:
            // - If focus is on a button, and it is not the first button, moves focus to the previous button.
            // - If focus is on a link, and it is not the first link, moves focus to the previous link.
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            // Hitting Home:
            // - If focus is on a button, and it is not the first button, moves focus to the first button.
            // - If focus is on a link, and it is not the first link, moves focus to the first link.
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            // Hitting End:
            // - If focus is on a button, and it is not the last button, moves focus to the last button.
            // - If focus is on a link, and it is not the last link, moves focus to the last link.
            preventEvent(event);
            this.focusLastChild();
          }
        }
      });
    }

    /**
     * Focus the menu's next child.
     */
    focusNextChild() {
      if (this.currentChild < this.elements.menuItems.length - 1) {
        this.blurCurrentChild();
        this.currentChild = this.currentChild + 1;
        this.focusCurrentChild();
      }
    }

    /**
     * Focus the menu's last child.
     */
    focusPreviousChild() {
      if (this.currentChild > 0) {
        this.blurCurrentChild();
        this.currentChild = this.currentChild - 1;
        this.focusCurrentChild();
      }
    }
  }

  var rollup = {
    Menubar,
    DisclosureMenu,
  };

  return rollup;

}());
