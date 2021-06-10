var AccessibleMenu = (function () {
  'use strict';

  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  if (!Array.from) {
    Array.from = function () {
      var toStr = Object.prototype.toString;

      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };

      var toInteger = function toInteger(value) {
        var number = Number(value);

        if (isNaN(number)) {
          return 0;
        }

        if (number === 0 || !isFinite(number)) {
          return number;
        }

        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };

      var maxSafeInteger = Math.pow(2, 53) - 1;

      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      }; // The length property of the from method is 1.


      return function from(arrayLike
      /*, mapFn, thisArg */
      ) {
        // 1. Let C be the this value.
        var C = this; // 2. Let items be ToObject(arrayLike).

        var items = Object(arrayLike); // 3. ReturnIfAbrupt(items).

        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        } // 4. If mapfn is undefined, then let mapping be false.


        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;

        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.


          if (arguments.length > 2) {
            T = arguments[2];
          }
        } // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).


        var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).

        var A = isCallable(C) ? Object(new C(len)) : new Array(len); // 16. Let k be 0.

        var k = 0; // 17. Repeat, while k < len… (also steps a - h)

        var kValue;

        while (k < len) {
          kValue = items[k];

          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }

          k += 1;
        } // 18. Let putStatus be Put(A, "length", len, true).


        A.length = len; // 20. Return A.

        return A;
      };
    }();
  }

  if (!Array.includes) {
    Array.prototype.includes = function (search) {
      return !!~this.indexOf(search);
    };
  }

  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function value(predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw TypeError('"this" is null or not defined');
        }

        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

        if (typeof predicate !== 'function') {
          throw TypeError('predicate must be a function');
        } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


        var thisArg = arguments[1]; // 5. Let k be 0.

        var k = 0; // 6. Repeat, while k < len

        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];

          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          } // e. Increase k by 1.


          k++;
        } // 7. Return undefined.


        return undefined;
      },
      configurable: true,
      writable: true
    });
  }

  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      value: function value(search, rawPos) {
        var pos = rawPos > 0 ? rawPos | 0 : 0;
        return this.substring(pos, pos + search.length) === search;
      }
    });
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
      if (this_len === undefined || this_len > this.length) {
        this_len = this.length;
      }

      return this.substring(this_len - search.length, this_len) === search;
    };
  }

  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    window.CustomEvent = CustomEvent;
  })();

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
  /**
   * Checks to see if the provided element is an HTMLElement.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|HTMLElement} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isHTMLElement(element) {
    var name = "element";

    try {
      if (!(element instanceof HTMLElement)) {
        if (_typeof$2(element) === "object") {
          for (var key in element) {
            name = key;

            if (!(element[key] instanceof HTMLElement)) {
              throw Error;
            }
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be an HTML Element."));
    }
  }
  /**
   * Checks to see if the provided value is a valid CSS selector.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isCSSSelector(value) {
    isString(value);
    var name = "value";

    try {
      if (_typeof$2(value) === "object") {
        for (var key in value) {
          name = key;
          if (typeof value[key] !== "string") throw Error;
          document.querySelector(value[key]);
        }
      } else {
        document.querySelector(value);
      }

      return true;
    } catch (error) {
      throw new TypeError("".concat(name, " must be a valid CSS selector."));
    }
  }
  /**
   * Checks to see if the provided value is a boolean.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|boolean} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isBoolean(value) {
    var name = "value";

    try {
      if (typeof value !== "boolean") {
        if (_typeof$2(value) === "object") {
          for (var key in value) {
            name = key;
            if (typeof value[key] !== "boolean") throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a boolean."));
    }
  }
  /**
   * Checks to see if the provided value is a number.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|number} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isNumber(value) {
    var name = "value";

    try {
      if (typeof value !== "number") {
        if (_typeof$2(value) === "object") {
          for (var key in value) {
            name = key;
            if (typeof value[key] !== "number") throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a number."));
    }
  }
  /**
   * Checks to see if the provided value is a string.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isString(value) {
    var name = "value";

    try {
      if (typeof value !== "string") {
        if (_typeof$2(value) === "object") {
          for (var key in value) {
            name = key;
            if (typeof value[key] !== "string") throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a string."));
    }
  }
  /**
   * Checks to see if the provided event is an Event.
   *
   * If you provide the event to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|Event} event - The event to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isEvent(event) {
    var name = "event";

    try {
      if (!(event instanceof Event)) {
        if (_typeof$2(event) === "object") {
          for (var key in event) {
            name = key;
            if (!(event[key] instanceof Event)) throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be an Event."));
    }
  }
  /**
   * Checks to see if the provided event is a KeyboardEvent.
   *
   * If you provide the event to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|KeyboardEvent} event - The event to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isKeyboardEvent(event) {
    var name = "event";

    try {
      if (!(event instanceof KeyboardEvent)) {
        if (_typeof$2(event) === "object") {
          for (var key in event) {
            name = key;
            if (!(event[key] instanceof KeyboardEvent)) throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a KeyboardEvent."));
    }
  }
  /**
   * Checks to see if the provided element is a menu.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|BaseMenu} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isMenu(element) {
    var name = "element";

    try {
      if (!(element instanceof BaseMenu)) {
        if (_typeof$2(element) === "object") {
          for (var key in element) {
            name = key;

            if (!(element[key] instanceof BaseMenu)) {
              throw Error;
            }
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be an instance of either BaseMenu, Menubar, or DisclosureMenu"));
    }
  }
  /**
   * Checks to see if the provided element is using a specific tag.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * @param   {string}             tagName - The name of the tag.
   * @param   {object|HTMLElement} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isTag(tagName, element) {
    isString(tagName);
    isHTMLElement(element);
    var tag = tagName.toLowerCase();

    if (!(element instanceof HTMLElement)) {
      var check = true;

      for (var key in element) {
        if (element[key].tagName.toLowerCase() !== tag) check = false;
      }

      return check;
    } else {
      return element.tagName.toLowerCase() === tag;
    }
  }
  /**
   * Check to see if the provided element is a MenuToggle.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|MenuToggle} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isMenuToggle(element) {
    var name = "element";

    try {
      if (!(element instanceof MenuToggle)) {
        if (_typeof$2(element) === "object" && !(element instanceof MenuToggle)) {
          for (var key in element) {
            name = key;
            if (!(element[key] instanceof MenuToggle)) throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a MenuToggle."));
    }
  }
  /**
   * Check to see if the provided value is a valid focus state for a menu.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidState(value) {
    isString(value);
    var validStates = ["none", "self", "child"];
    var name = "value";

    try {
      if (_typeof$2(value) === "object") {
        for (var key in value) {
          name = key;

          if (!validStates.includes(value[key])) {
            throw Error;
          }
        }
      } else if (!validStates.includes(value)) {
        throw Error;
      } else {
        return true;
      }
    } catch (error) {
      throw new Error("".concat(name, " must be one of the following values: ").concat(validStates.join(", ")));
    }
  }
  /**
   * Check to see if the provided value is a valid event type for a menu.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidEvent(value) {
    isString(value);
    var validStates = ["none", "mouse", "keyboard"];
    var name = "value";

    try {
      if (_typeof$2(value) === "object") {
        for (var key in value) {
          name = key;

          if (!validStates.includes(value[key])) {
            throw Error;
          }
        }
      } else if (!validStates.includes(value)) {
        throw Error;
      } else {
        return true;
      }
    } catch (error) {
      throw new Error("".concat(name, " must be one of the following values: ").concat(validStates.join(", ")));
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
    isString(event);
    isHTMLElement(element);
    var eventProp = "on".concat(event);
    return typeof element[eventProp] !== "undefined";
  }
  /**
   * Checks to see if the provided value is either a string or an array of strings.
   *
   * If you provide the value to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string|string[]} value - The value to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidClassList(value) {
    var name = "value";

    try {
      if (typeof value !== "string") {
        if (_typeof$2(value) === "object") {
          for (var key in value) {
            name = key;

            if (typeof value[key] !== "string") {
              if (Array.isArray(value[key])) {
                value[key].forEach(function (item) {
                  isString(item);
                });
              } else {
                throw Error;
              }
            }
          }
        } else if (Array.isArray(value)) {
          isString(value);
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be either a string or an array of strings."));
    }
  }

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }
  /**
   * A link or button that controls the visibility of a menu.
   */

  var MenuToggle = /*#__PURE__*/function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}               param0                       - The menu toggle object.
     * @param {HTMLElement}          param0.menuToggleElement     - The toggle element in the DOM.
     * @param {HTMLElement}          param0.parentElement         - The element containing the controlled menu.
     * @param {BaseMenu}             param0.controlledMenu        - The menu controlled by this toggle.
     * @param {string|string[]|null} [param0.openClass = "show"]  - The class to apply when the controlled menu is "open".
     * @param {string|string[]|null} [param0.closeClass = "hide"] - The class to apply when the controlled menu is "closed".
     * @param {BaseMenu|null}        [param0.parentMenu = null]   - The menu containing this toggle.
     */
    function MenuToggle(_ref) {
      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$closeClass = _ref.closeClass,
          closeClass = _ref$closeClass === void 0 ? "hide" : _ref$closeClass,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu;

      _classCallCheck$4(this, MenuToggle);

      // Run validations.
      isHTMLElement({
        menuToggleElement: menuToggleElement,
        parentElement: parentElement
      });

      if (parentMenu !== null) {
        isMenu({
          controlledMenu: controlledMenu,
          parentMenu: parentMenu
        });
      } else {
        isMenu({
          controlledMenu: controlledMenu
        });
      }

      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement
      };
      this.menuElements = {
        controlledMenu: controlledMenu,
        parentMenu: parentMenu
      };
      this.openClass = openClass || "";
      this.closeClass = closeClass || "";
      this.isOpen = false;
      this.expandEvent = new CustomEvent("accessibleMenuExpand", {
        bubbles: true,
        detail: {
          toggle: this
        }
      });
      this.collapseEvent = new CustomEvent("accessibleMenuCollapse", {
        bubbles: true,
        detail: {
          toggle: this
        }
      });
      this.initialize();
    }
    /**
     * Initialize the toggle by ensuring WAI-ARIA values are set,
     * handling click events, and adding new keydown events.
     */


    _createClass$4(MenuToggle, [{
      key: "initialize",
      value: function initialize() {
        var _this = this;

        // Add WAI-ARIA properties.
        this.dom.toggle.setAttribute("aria-haspopup", "true");
        this.dom.toggle.setAttribute("aria-expanded", "false"); // If the toggle element is a button, there's no need to add a role.

        if (!isTag("button", this.dom.toggle)) {
          this.dom.toggle.setAttribute("role", "button");
        } // Ensure both toggle and menu have IDs.


        if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
          var randomString = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
          var id = this.dom.toggle.innerText.replace(/[^a-zA-Z0-9\s]/g, "");
          var finalID = randomString;

          if (!id.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label")) {
            id = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "");
          }

          if (id.replace(/\s/g, "").length > 0) {
            id = id.toLowerCase().replace(/\s+/g, "-");

            if (id.startsWith("-")) {
              id = id.substring(1);
            }

            if (id.endsWith("-")) {
              id = id.slice(0, -1);
            }

            finalID = "".concat(id, "-").concat(finalID);
          }

          this.dom.toggle.id = this.dom.toggle.id || "".concat(finalID, "-menu-button");
          this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || "".concat(finalID, "-menu");
        } // Set up proper aria label and control.


        this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby", this.dom.toggle.id);
        this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id); // Add closed class.

        if (this.closeClass !== "") {
          if (typeof this.closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
          } else if (Array.isArray(this.closeClass)) {
            this.closeClass.forEach(function (value) {
              _this.elements.controlledMenu.dom.menu.classList.add(value);
            });
          }
        }
      }
      /**
       * The DOM elements within the toggle.
       *
       * @returns {object} - The DOM elements.
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The elements within the toggle.
       *
       * @returns {object} - The elements.
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * The open state on the menu.
       *
       * @returns {boolean} - The open state.
       */

    }, {
      key: "isOpen",
      get: function get() {
        return this.show;
      }
      /**
       * The class to apply when the controlled menu is "open".
       *
       * @returns {string} - The class.
       */
      ,
      set:
      /**
       * Set the open state on the menu.
       *
       * @param {boolean} value - The open state.
       */
      function set(value) {
        isBoolean({
          value: value
        });
        this.show = value;
      }
      /**
       * Set the class to apply when the controlled menu is "open".
       *
       * @param {string} value - The class.
       */

    }, {
      key: "openClass",
      get: function get() {
        return this.controlledMenuOpenClass;
      }
      /**
       * The class to apply when the controlled menu is "closed".
       *
       * @returns {string} - The class.
       */
      ,
      set: function set(value) {
        isValidClassList({
          openClass: value
        });
        this.controlledMenuOpenClass = value;
      }
      /**
       * Set the class to apply when the controlled menu is "closed".
       *
       * @param {string} value - The class.
       */

    }, {
      key: "closeClass",
      get: function get() {
        return this.controlledMenuCloseClass;
      },
      set: function set(value) {
        isValidClassList({
          closeClass: value
        });
        this.controlledMenuCloseClass = value;
      }
      /**
       * Expands the controlled menu.
       *
       * Alters ARIA attributes and classes.
       */

    }, {
      key: "expand",
      value: function expand() {
        var _this2 = this;

        this.dom.toggle.setAttribute("aria-expanded", "true"); // Add the open class

        if (this.openClass !== "") {
          if (typeof this.openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(this.openClass);
          } else if (Array.isArray(this.openClass)) {
            this.openClass.forEach(function (value) {
              _this2.elements.controlledMenu.dom.menu.classList.add(value);
            });
          }
        } // Remove the close class.


        if (this.closeClass !== "") {
          if (typeof this.closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(this.closeClass);
          } else if (Array.isArray(this.closeClass)) {
            this.closeClass.forEach(function (value) {
              _this2.elements.controlledMenu.dom.menu.classList.remove(value);
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

    }, {
      key: "collapse",
      value: function collapse() {
        var _this3 = this;

        this.dom.toggle.setAttribute("aria-expanded", "false"); // Add the close class

        if (this.closeClass !== "") {
          if (typeof this.closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
          } else if (Array.isArray(this.closeClass)) {
            this.closeClass.forEach(function (value) {
              _this3.elements.controlledMenu.dom.menu.classList.add(value);
            });
          }
        } // Remove the open class.


        if (this.openClass !== "") {
          if (typeof this.openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(this.openClass);
          } else if (Array.isArray(this.openClass)) {
            this.openClass.forEach(function (value) {
              _this3.elements.controlledMenu.dom.menu.classList.remove(value);
            });
          }
        }

        this.dom.toggle.dispatchEvent(this.collapseEvent);
      }
      /**
       * Opens the controlled menu.
       */

    }, {
      key: "open",
      value: function open() {
        this.isOpen = true; // Expand the controlled menu and close all siblings.

        this.expand();
        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.elements.parentMenu) this.elements.parentMenu.focusState = "child";
        this.elements.controlledMenu.focusState = "self";
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       */

    }, {
      key: "preview",
      value: function preview() {
        this.isOpen = true; // Expand the controlled menu and close all siblings.

        this.expand();
        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        }

        this.elements.controlledMenu.focusState = "none";
      }
      /**
       * Closes the controlled menu.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          this.isOpen = false; // Close the controlled menu and close all siblings.

          this.collapse();
          this.closeChildren(); // Set proper focus states to parent & child.

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

    }, {
      key: "toggle",
      value: function toggle() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
      /**
       * Closes all sibling menus.
       */

    }, {
      key: "closeSiblings",
      value: function closeSiblings() {
        var _this4 = this;

        if (this.elements.parentMenu) {
          this.elements.parentMenu.elements.submenuToggles.forEach(function (toggle) {
            if (toggle !== _this4) toggle.close();
          });
        }
      }
      /**
       * Closes all child menus.
       */

    }, {
      key: "closeChildren",
      value: function closeChildren() {
        this.elements.controlledMenu.elements.submenuToggles.forEach(function (toggle) {
          return toggle.close();
        });
      }
    }]);

    return MenuToggle;
  }();

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }
  /**
   * A basic navigation link contained inside of a Menu.
   */

  var MenuItem = /*#__PURE__*/function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}          param0                         - The menu item object.
     * @param {HTMLElement}     param0.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}     param0.menuLinkElement         - The menu item's link in the DOM.
     * @param {BaseMenu}        param0.parentMenu              - The parent menu.
     * @param {boolean}         [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {BaseMenu|null}   [param0.childMenu = null]      - The child menu.
     * @param {MenuToggle|null} [param0.toggle = null]         - The controller for the child menu.
     */
    function MenuItem(_ref) {
      var menuItemElement = _ref.menuItemElement,
          menuLinkElement = _ref.menuLinkElement,
          parentMenu = _ref.parentMenu,
          _ref$isSubmenuItem = _ref.isSubmenuItem,
          isSubmenuItem = _ref$isSubmenuItem === void 0 ? false : _ref$isSubmenuItem,
          _ref$childMenu = _ref.childMenu,
          childMenu = _ref$childMenu === void 0 ? null : _ref$childMenu,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? null : _ref$toggle;

      _classCallCheck$3(this, MenuItem);

      // Run validations.
      isHTMLElement({
        menuItemElement: menuItemElement,
        menuLinkElement: menuLinkElement
      });
      isBoolean({
        isSubmenuItem: isSubmenuItem
      });

      if (childMenu !== null) {
        isMenu({
          parentMenu: parentMenu,
          childMenu: childMenu
        });
      } else {
        isMenu({
          parentMenu: parentMenu
        });
      }

      if (toggle !== null) isMenuToggle({
        toggle: toggle
      });
      this.domElements = {
        item: menuItemElement,
        link: menuLinkElement
      };
      this.menuElements = {
        parentMenu: parentMenu,
        childMenu: childMenu,
        toggle: toggle
      };
      this.isController = isSubmenuItem;
      this.initialize();
    }
    /**
     * Initialize the menu item by setting its tab index.
     */


    _createClass$3(MenuItem, [{
      key: "initialize",
      value: function initialize() {
        this.isMenubar = this.elements.parentMenu instanceof Menubar;

        if (this.isMenubar) {
          this.dom.item.setAttribute("role", "none");
          this.dom.link.setAttribute("role", "menuitem");
          this.dom.link.tabIndex = -1;
        }
      }
      /**
       * The DOM elements within the menu item.
       *
       * @returns {object} - The DOM elements.
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The elements within the menu item.
       *
       * @returns {object} - The elements.
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * A flag marking a submenu item.
       *
       * @returns {boolean} - The submenu flag.
       */

    }, {
      key: "isSubmenuItem",
      get: function get() {
        return this.isController;
      }
      /**
       * Focuses the menu item's link and set proper tabIndex.
       */

    }, {
      key: "focus",
      value: function focus() {
        if (this.elements.parentMenu.currentEvent !== "mouse") {
          this.dom.link.focus();
        }

        if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = 0;
        }
      }
      /**
       * Blurs the menu item's link and set proper tabIndex.
       */

    }, {
      key: "blur",
      value: function blur() {
        if (this.elements.parentMenu.currentEvent !== "mouse") {
          this.dom.link.blur();
        }

        if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = -1;
        }
      }
    }]);

    return MenuItem;
  }();

  /**
   * Retrieves the pressed key from an event.
   *
   * @param   {KeyboardEvent} event - The keyboard event.
   *
   * @returns {string} - The name of the key.
   */

  function keyPress(event) {
    // Run validation.
    isKeyboardEvent(event);

    try {
      // Use event.key or event.keyCode to support older browsers.
      var key = event.key || event.keyCode;
      var keys = {
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
        Tab: key === "Tab" || key === 9
      };
      return Object.keys(keys).find(function (key) {
        return keys[key] === true;
      });
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
    // Run validation.
    isEvent(event);
    event.preventDefault();
    event.stopPropagation();
  }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }
  /**
   * An accessible navigation element in the DOM.
   */

  var BaseMenu = /*#__PURE__*/function () {
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
     * @param {boolean}              [param0.isHoverable = false]         - A flag to allow hover events on the menu.
     * @param {number}               [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    function BaseMenu(_ref) {
      var menuElement = _ref.menuElement,
          _ref$menuItemSelector = _ref.menuItemSelector,
          menuItemSelector = _ref$menuItemSelector === void 0 ? "li" : _ref$menuItemSelector,
          _ref$menuLinkSelector = _ref.menuLinkSelector,
          menuLinkSelector = _ref$menuLinkSelector === void 0 ? "a" : _ref$menuLinkSelector,
          _ref$submenuItemSelec = _ref.submenuItemSelector,
          submenuItemSelector = _ref$submenuItemSelec === void 0 ? "" : _ref$submenuItemSelec,
          _ref$submenuToggleSel = _ref.submenuToggleSelector,
          submenuToggleSelector = _ref$submenuToggleSel === void 0 ? "a" : _ref$submenuToggleSel,
          _ref$submenuSelector = _ref.submenuSelector,
          submenuSelector = _ref$submenuSelector === void 0 ? "ul" : _ref$submenuSelector,
          _ref$controllerElemen = _ref.controllerElement,
          controllerElement = _ref$controllerElemen === void 0 ? null : _ref$controllerElemen,
          _ref$containerElement = _ref.containerElement,
          containerElement = _ref$containerElement === void 0 ? null : _ref$containerElement,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$closeClass = _ref.closeClass,
          closeClass = _ref$closeClass === void 0 ? "hide" : _ref$closeClass,
          _ref$isTopLevel = _ref.isTopLevel,
          isTopLevel = _ref$isTopLevel === void 0 ? true : _ref$isTopLevel,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$isHoverable = _ref.isHoverable,
          isHoverable = _ref$isHoverable === void 0 ? false : _ref$isHoverable,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

      _classCallCheck$2(this, BaseMenu);

      // Run validations.
      isBoolean({
        isTopLevel: isTopLevel
      });

      if (submenuItemSelector !== "") {
        isCSSSelector({
          menuItemSelector: menuItemSelector,
          menuLinkSelector: menuLinkSelector,
          submenuItemSelector: submenuItemSelector,
          submenuToggleSelector: submenuToggleSelector,
          submenuSelector: submenuSelector
        });
      } else {
        isCSSSelector({
          menuItemSelector: menuItemSelector,
          menuLinkSelector: menuLinkSelector
        });
      }

      if (controllerElement !== null || containerElement !== null) {
        isHTMLElement({
          menuElement: menuElement,
          controllerElement: controllerElement,
          containerElement: containerElement
        });
      } else {
        isHTMLElement({
          menuElement: menuElement
        });
      }

      if (parentMenu !== null) isMenu({
        parentMenu: parentMenu
      });
      this.domElements = {
        menu: menuElement,
        menuItems: [],
        submenuItems: [],
        submenuToggles: [],
        submenus: [],
        controller: controllerElement,
        container: containerElement
      };
      this.domSelectors = {
        menuItems: menuItemSelector,
        menuLinks: menuLinkSelector,
        submenuItems: submenuItemSelector,
        submenuToggles: submenuToggleSelector,
        submenus: submenuSelector
      };
      this.menuElements = {
        menuItems: [],
        submenuToggles: [],
        controller: null,
        parentMenu: parentMenu,
        rootMenu: isTopLevel ? this : null
      };
      this.openClass = openClass || "";
      this.closeClass = closeClass || "";
      this.root = isTopLevel;
      this.currentChild = 0;
      this.focusState = "none";
      this.currentEvent = "none";
      this.isHoverable = isHoverable;
      this.hoverDelay = hoverDelay;
      this.initialize();
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass$2(BaseMenu, [{
      key: "initialize",
      value: function initialize() {
        // Get the root menu if it doesn't exist.
        if (this.elements.rootMenu === null) this.findRootMenu(this); // Set all of the DOM elements.

        this.setDOMElements();

        if (this.isTopLevel) {
          if (this.dom.controller && this.dom.container) {
            // Create a new MenuToggle to control the menu.
            var toggle = new MenuToggle({
              menuToggleElement: this.dom.controller,
              parentElement: this.dom.container,
              controlledMenu: this,
              openClass: this.openClass,
              closeClass: this.closeClass
            });
            this.menuElements.controller = toggle;
          }
        }
      }
      /**
       * The DOM elements within the menu.
       *
       * @returns {object} - The DOM elements.
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The CSS selectors available to the menu.
       *
       * @returns {object} - The selectors.
       */

    }, {
      key: "selectors",
      get: function get() {
        return this.domSelectors;
      }
      /**
       * The elements within the menu.
       *
       * @returns {object} - The elements.
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * The class to apply when the menu is "open".
       *
       * @returns {string} - The class.
       */

    }, {
      key: "openClass",
      get: function get() {
        return this.submenuOpenClass;
      }
      /**
       * The class to apply when the menu is "closed".
       *
       * @returns {string} - The class.
       */
      ,
      set:
      /**
       * Set the class to apply when the menu is "open".
       *
       * @param {string} value - The class.
       */
      function set(value) {
        isValidClassList({
          openClass: value
        });
        this.submenuOpenClass = value;
      }
      /**
       * Set the class to apply when the menu is "closed".
       *
       * @param {string} value - The class.
       */

    }, {
      key: "closeClass",
      get: function get() {
        return this.submenuCloseClass;
      }
      /**
       * A flag marking the root menu.
       *
       * @returns {boolean} - The top-level flag.
       */
      ,
      set: function set(value) {
        isValidClassList({
          closeClass: value
        });
        this.submenuCloseClass = value;
      }
      /**
       * Set the index currently selected menu item in the menu.
       *
       * @param {number} value - The index.
       */

    }, {
      key: "isTopLevel",
      get: function get() {
        return this.root;
      }
      /**
       * The index of the currently selected menu item in the menu.
       *
       * @returns {number} - The index.
       */

    }, {
      key: "currentChild",
      get: function get() {
        return this.focussedChild;
      }
      /**
       * The current state of the menu's focus.
       *
       * @returns {string} - The state.
       */
      ,
      set: function set(value) {
        isNumber({
          value: value
        });
        this.focussedChild = value;
      }
      /**
       * Set the state of the menu's focus.
       *
       * @param {string} value - The state.
       */

    }, {
      key: "focusState",
      get: function get() {
        return this.state;
      }
      /**
       * This last event triggered on the menu.
       *
       * @returns {string} - The event type.
       */
      ,
      set: function set(value) {
        isValidState({
          value: value
        });
        this.state = value;
      }
      /**
       * Set the last event triggered on the menu.
       *
       * @param {string} value - The event type.
       */

    }, {
      key: "currentEvent",
      get: function get() {
        return this.event;
      }
      /**
       * The currently selected menu item.
       *
       * @returns {MenuItem} - The menu item.
       */
      ,
      set: function set(value) {
        isValidEvent({
          value: value
        });
        this.event = value;
      }
      /**
       * Set the flag to allow hover events on the menu.
       *
       * @param {boolean} value - The hoverable flag.
       */

    }, {
      key: "currentMenuItem",
      get: function get() {
        return this.elements.menuItems[this.currentChild];
      }
      /**
       * A flag to allow hover events on the menu.
       *
       * @returns {boolean} - The hoverable flag.
       */

    }, {
      key: "isHoverable",
      get: function get() {
        return this.hoverable;
      }
      /**
       * The delay time (in miliseconds) used for mouseout events to take place.
       *
       * @returns {number} - The delay time.
       */
      ,
      set: function set(value) {
        isBoolean({
          value: value
        });
        this.hoverable = value;
      }
      /**
       * Set the delay time (in miliseconds) used for mouseout events to take place.
       *
       * @param {number} value - The delay time.
       */

    }, {
      key: "hoverDelay",
      get: function get() {
        return this.delay;
      },
      set: function set(value) {
        isNumber({
          value: value
        });
        this.delay = value;
      }
      /**
       * Sets DOM elements within the menu.
       *
       * @param {string}      elementType - The type of element to populate.
       * @param {HTMLElement} base        - The element used as the base for the querySelect.
       * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
       */

    }, {
      key: "setDOMElementType",
      value: function setDOMElementType(elementType, base, filter) {
        if (typeof this.selectors[elementType] === "string") {
          if (base) isHTMLElement({
            base: base
          });
          var baseElement = base || this.dom.menu;

          var baseFilter = function baseFilter(item) {
            return item.parentElement === baseElement;
          };

          var selector = this.selectors[elementType];
          var domElements = Array.from(baseElement.querySelectorAll(selector));

          if (typeof filter !== "undefined") {
            if (typeof filter === "function") {
              this.domElements[elementType] = domElements.filter(function (item) {
                return filter(item);
              });
            } else {
              this.domElements[elementType] = domElements;
            }
          } else {
            this.domElements[elementType] = domElements.filter(function (item) {
              return baseFilter(item);
            });
          }
        } else {
          throw new Error("".concat(elementType, " is not a valid element type within the menu."));
        }
      }
      /**
       * Adds an element to DOM elements within the menu.
       *
       * @param {string}      elementType - The type of element to populate.
       * @param {HTMLElement} base        - The element used as the base for the querySelect.
       * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
       */

    }, {
      key: "addDOMElementType",
      value: function addDOMElementType(elementType, base, filter) {
        if (typeof this.selectors[elementType] === "string") {
          if (base) isHTMLElement({
            base: base
          });
          var baseElement = base || this.dom.menu;

          var baseFilter = function baseFilter(item) {
            return item.parentElement === baseElement;
          };

          var selector = this.selectors[elementType];
          var domElements = Array.from(baseElement.querySelectorAll(selector));

          if (typeof filter !== "undefined") {
            if (typeof filter === "function") {
              this.domElements[elementType] = [].concat(_toConsumableArray(this.domElements[elementType]), _toConsumableArray(domElements.filter(function (item) {
                return filter(item);
              })));
            } else {
              this.domElements[elementType] = [].concat(_toConsumableArray(this.domElements[elementType]), _toConsumableArray(domElements));
            }
          } else {
            this.domElements[elementType] = [].concat(_toConsumableArray(this.domElements[elementType]), _toConsumableArray(domElements.filter(function (item) {
              return baseFilter(item);
            })));
          }
        } else {
          throw new Error("".concat(elementType, " is not a valid element type within the menu."));
        }
      }
      /**
       * Clears DOM elements within the menu.
       *
       * @param {string} elementType - The type of element to clear.
       */

    }, {
      key: "clearDOMElementType",
      value: function clearDOMElementType(elementType) {
        if (elementType === "menu") return;

        if (Array.isArray(this.domElements[elementType])) {
          this.domElements[elementType] = [];
        } else if (typeof this.domElements[elementType] !== "undefined") {
          this.domElements[elementType] = null;
        } else {
          throw new Error("".concat(elementType, " is not a valid element type within the menu."));
        }
      }
      /**
       * Sets all DOM elements within the menu.
       */

    }, {
      key: "setDOMElements",
      value: function setDOMElements() {
        var _this = this;

        this.setDOMElementType("menuItems");

        if (this.selectors.submenuItems !== "") {
          this.setDOMElementType("submenuItems");
          this.clearDOMElementType("submenuToggles");
          this.clearDOMElementType("submenus");
          this.dom.submenuItems.forEach(function (item) {
            _this.addDOMElementType("submenuToggles", item);

            _this.addDOMElementType("submenus", item);
          });
        }
      }
      /**
       * Finds the root menu element.
       *
       * @param {BaseMenu} menu - The menu to check.
       */

    }, {
      key: "findRootMenu",
      value: function findRootMenu(menu) {
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
       *
       * @param {object} MenuType - The menu type for created submenus.
       */

    }, {
      key: "createChildElements",
      value: function createChildElements() {
        var _this2 = this;

        var MenuType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : BaseMenu;
        this.dom.menuItems.forEach(function (element) {
          var menuItem;

          if (_this2.dom.submenuItems.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this2.selectors.submenuToggles); // The actual menu DOM element.

            var submenu = element.querySelector(_this2.selectors.submenus); // Create the new menu and initialize it.

            var menu = new MenuType({
              menuElement: submenu,
              menuItemSelector: _this2.selectors.menuItems,
              menuLinkSelector: _this2.selectors.menuLinks,
              submenuItemSelector: _this2.selectors.submenuItems,
              submenuToggleSelector: _this2.selectors.submenuToggles,
              submenuSelector: _this2.selectors.submenus,
              openClass: _this2.openClass,
              closeClass: _this2.closeClass,
              isTopLevel: false,
              parentMenu: _this2,
              isHoverable: _this2.isHoverable,
              hoverDelay: _this2.hoverDelay
            }); // Create the new MenuToggle.

            var toggle = new MenuToggle({
              menuToggleElement: toggler,
              parentElement: element,
              controlledMenu: menu,
              openClass: _this2.openClass,
              closeClass: _this2.closeClass,
              parentMenu: _this2
            }); // Add the toggle to the list of toggles.

            _this2.menuElements.submenuToggles.push(toggle); // Create a new MenuItem.


            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this2,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this2.selectors.menuLinks); // Create a new MenuItem.

            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this2
            });
          }

          _this2.menuElements.menuItems.push(menuItem);
        });
      }
      /**
       * Handles focus events throughout the menu for proper menu use.
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        var _this3 = this;

        this.elements.menuItems.forEach(function (menuItem, index) {
          menuItem.dom.link.addEventListener("focus", function () {
            if (_this3.elements.parentMenu) _this3.elements.parentMenu.focusState = "child";
            if (menuItem.elements.childMenu) menuItem.elements.childMenu.focusState = "none";
            _this3.focusState = "self";
            _this3.currentChild = index;
          });
        });
      }
      /**
       * Handles click events throughout the menu for proper use.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this4 = this;

        // Use touch over mouse events when supported.
        var startEventType = isEventSupported("touchstart", this.dom.menu) ? "touchstart" : "mousedown";
        var endEventType = isEventSupported("touchend", this.dom.menu) ? "touchend" : "mouseup";
        /**
         * Toggles a toggle element.
         *
         * @param {BaseMenu}   menu   - This menu.
         * @param {MenuToggle} toggle - The menu toggle
         * @param {Event}      event  - A Javascript event.
         */

        function toggleToggle(menu, toggle, event) {
          preventEvent(event);
          toggle.toggle();

          if (toggle.isOpen) {
            menu.focusState = "self";
            toggle.elements.controlledMenu.focusState = "none";
          }
        } // Close the menu if a click event happens outside of it.


        document.addEventListener(endEventType, function (event) {
          if (_this4.focusState !== "none") {
            _this4.currentEvent = "mouse";

            if (!_this4.dom.menu.contains(event.target) && !_this4.dom.menu !== event.target) {
              _this4.closeChildren();

              _this4.blur();

              if (_this4.elements.controller) {
                _this4.elements.controller.close();
              }
            }
          }
        });
        this.elements.menuItems.forEach(function (item, index) {
          // Properly focus the current menu item.
          item.dom.link.addEventListener(startEventType, function () {
            _this4.currentEvent = "mouse";

            _this4.elements.rootMenu.blurChildren();

            _this4.currentChild = index;

            _this4.focusCurrentChild();
          }); // Properly toggle submenus open and closed.

          if (item.isSubmenuItem) {
            item.elements.toggle.dom.toggle["on".concat(endEventType)] = function (event) {
              _this4.currentEvent = "mouse";
              toggleToggle(_this4, item.elements.toggle, event);
            };
          }
        }); // Open the this menu if it's controller is clicked.

        if (this.isTopLevel && this.elements.controller) {
          this.elements.controller.dom.toggle["on".concat(endEventType)] = function (event) {
            _this4.currentEvent = "mouse";
            toggleToggle(_this4, _this4.elements.controller, event);
          };
        }
      }
      /**
       * Handles hover events throughout the menu for proper use.
       */

    }, {
      key: "handleHover",
      value: function handleHover() {
        var _this5 = this;

        this.elements.submenuToggles.forEach(function (toggle) {
          toggle.dom.parent.addEventListener("mouseenter", function () {
            if (_this5.isHoverable) {
              _this5.currentEvent = "mouse";
              toggle.open();
            }
          });
          toggle.dom.parent.addEventListener("mouseleave", function () {
            if (_this5.isHoverable) {
              setTimeout(function () {
                _this5.currentEvent = "mouse";
                toggle.close();
              }, _this5.hoverDelay);
            }
          });
        });
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this6 = this;

        if (this.isTopLevel && this.elements.controller) {
          this.elements.controller.dom.toggle.addEventListener("keydown", function (event) {
            _this6.currentEvent = "keyboard";
            var key = keyPress(event);

            if (key === "Space" || key === "Enter") {
              preventEvent(event);
            }
          });
        }
      }
      /**
       * Handles keyup events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeyup",
      value: function handleKeyup() {
        var _this7 = this;

        if (this.isTopLevel && this.elements.controller) {
          this.elements.controller.dom.toggle.addEventListener("keyup", function (event) {
            _this7.currentEvent = "keyboard";
            var key = keyPress(event);

            if (key === "Space" || key === "Enter") {
              preventEvent(event);

              _this7.elements.controller.open();

              _this7.focusFirstChild();
            }
          });
        }
      }
      /**
       * Focus the menu.
       */

    }, {
      key: "focus",
      value: function focus() {
        this.focusState = "self";

        if (this.currentEvent !== "mouse") {
          this.dom.menu.focus();
        }
      }
      /**
       * Unfocus the menu.
       */

    }, {
      key: "blur",
      value: function blur() {
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

    }, {
      key: "focusFirstChild",
      value: function focusFirstChild() {
        this.blurCurrentChild();
        this.currentChild = 0;
        this.focusCurrentChild();
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusLastChild",
      value: function focusLastChild() {
        this.blurCurrentChild();
        this.currentChild = this.elements.menuItems.length - 1;
        this.focusCurrentChild();
      }
      /**
       * Focus the menu's next child.
       */

    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
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

    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
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

    }, {
      key: "focusCurrentChild",
      value: function focusCurrentChild() {
        if (this.currentChild !== -1) {
          this.currentMenuItem.focus();
        }
      }
      /**
       * Blurs the menu's current child.
       */

    }, {
      key: "blurCurrentChild",
      value: function blurCurrentChild() {
        if (this.currentChild !== -1) {
          this.currentMenuItem.blur();
        }
      }
      /**
       * Focus the menu's next child starting with a specific letter.
       *
       * @param {string} char - The character to look for.
       */

    }, {
      key: "focusNextChildWithCharacter",
      value: function focusNextChildWithCharacter(char) {
        // Ensure the character is lowercase just to be safe.
        var match = char.toLowerCase();
        var index = this.currentChild + 1;
        var found = false;

        while (!found && index < this.elements.menuItems.length) {
          // Ensure the text in the item is lowercase just to be safe.
          var text = this.elements.menuItems[index].dom.item.innerText.toLowerCase(); // Focus the child if the text matches, otherwise move on.

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

    }, {
      key: "focusController",
      value: function focusController() {
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

    }, {
      key: "focusContainer",
      value: function focusContainer() {
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

    }, {
      key: "closeChildren",
      value: function closeChildren() {
        this.elements.submenuToggles.forEach(function (toggle) {
          return toggle.close();
        });
      }
      /**
       * Blurs all children and submenu's children.
       */

    }, {
      key: "blurChildren",
      value: function blurChildren() {
        this.elements.menuItems.forEach(function (menuItem) {
          menuItem.blur();

          if (menuItem.isSubmenuItem) {
            menuItem.elements.childMenu.blurChildren();
          }
        });
      }
    }]);

    return BaseMenu;
  }();

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

  function _get$1(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$1 = Reflect.get; } else { _get$1 = function _get(target, property, receiver) { var base = _superPropBase$1(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$1(target, property, receiver || target); }

  function _superPropBase$1(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$1(object); if (object === null) break; } return object; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

  function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
  /**
   * An accessible menubar navigation in the DOM.
   *
   * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html
   */

  var Menubar = /*#__PURE__*/function (_BaseMenu) {
    _inherits$1(Menubar, _BaseMenu);

    var _super = _createSuper$1(Menubar);

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
     * @param {boolean}          [param0.isHoverable = false]         - A flag to allow hover events on the menu.
     * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    function Menubar(_ref) {
      var menuElement = _ref.menuElement,
          _ref$menuItemSelector = _ref.menuItemSelector,
          menuItemSelector = _ref$menuItemSelector === void 0 ? "li" : _ref$menuItemSelector,
          _ref$menuLinkSelector = _ref.menuLinkSelector,
          menuLinkSelector = _ref$menuLinkSelector === void 0 ? "a" : _ref$menuLinkSelector,
          _ref$submenuItemSelec = _ref.submenuItemSelector,
          submenuItemSelector = _ref$submenuItemSelec === void 0 ? "" : _ref$submenuItemSelec,
          _ref$submenuToggleSel = _ref.submenuToggleSelector,
          submenuToggleSelector = _ref$submenuToggleSel === void 0 ? "a" : _ref$submenuToggleSel,
          _ref$submenuSelector = _ref.submenuSelector,
          submenuSelector = _ref$submenuSelector === void 0 ? "ul" : _ref$submenuSelector,
          _ref$controllerElemen = _ref.controllerElement,
          controllerElement = _ref$controllerElemen === void 0 ? null : _ref$controllerElemen,
          _ref$containerElement = _ref.containerElement,
          containerElement = _ref$containerElement === void 0 ? null : _ref$containerElement,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$closeClass = _ref.closeClass,
          closeClass = _ref$closeClass === void 0 ? "hide" : _ref$closeClass,
          _ref$isTopLevel = _ref.isTopLevel,
          isTopLevel = _ref$isTopLevel === void 0 ? true : _ref$isTopLevel,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$isHoverable = _ref.isHoverable,
          isHoverable = _ref$isHoverable === void 0 ? false : _ref$isHoverable,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

      _classCallCheck$1(this, Menubar);

      return _super.call(this, {
        menuElement: menuElement,
        menuItemSelector: menuItemSelector,
        menuLinkSelector: menuLinkSelector,
        submenuItemSelector: submenuItemSelector,
        submenuToggleSelector: submenuToggleSelector,
        submenuSelector: submenuSelector,
        controllerElement: controllerElement,
        containerElement: containerElement,
        openClass: openClass,
        closeClass: closeClass,
        isTopLevel: isTopLevel,
        parentMenu: parentMenu,
        isHoverable: isHoverable,
        hoverDelay: hoverDelay
      });
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass$1(Menubar, [{
      key: "initialize",
      value: function initialize() {
        _get$1(_getPrototypeOf$1(Menubar.prototype), "initialize", this).call(this);

        this.dom.menu.setAttribute("role", "menubar");
        this.createChildElements(Menubar);
        this.handleFocus();
        this.handleClick();
        if (this.isHoverable) this.handleHover();
        this.handleKeydown();
        this.handleKeyup();
        this.elements.menuItems[0].dom.link.tabIndex = 0;
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this = this;

        _get$1(_getPrototypeOf$1(Menubar.prototype), "handleKeydown", this).call(this);

        this.dom.menu.addEventListener("keydown", function (event) {
          _this.currentEvent = "keyboard";
          var key = keyPress(event);

          if (key === "Tab") {
            // Hitting Tab:
            // - Moves focus out of the menu.
            if (_this.elements.rootMenu.focusState !== "none") {
              _this.elements.rootMenu.blur();

              _this.elements.rootMenu.closeChildren();
            } else {
              _this.elements.rootMenu.focus();
            }
          } // Prevent default event actions if we're handling the keyup event.


          if (key === "Character") {
            preventEvent(event);
          } else if (_this.isTopLevel) {
            if (_this.focusState === "self") {
              var keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
              var submenuKeys = ["Space", "Enter", "ArrowDown", "ArrowUp"];
              var controllerKeys = ["Escape"];

              if (keys.includes(key)) {
                preventEvent(event);
              } else if (_this.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
                preventEvent(event);
              } else if (_this.elements.controller && controllerKeys.includes(key)) {
                preventEvent(event);
              }
            }
          } else {
            var _keys = ["Escape", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
            var _submenuKeys = ["Space", "Enter"];

            if (_keys.includes(key)) {
              preventEvent(event);
            } else if (_this.currentMenuItem.isSubmenuItem && _submenuKeys.includes(key)) {
              preventEvent(event);
            }
          }
        });
      }
      /**
       * Handles keyup events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeyup",
      value: function handleKeyup() {
        var _this2 = this;

        _get$1(_getPrototypeOf$1(Menubar.prototype), "handleKeyup", this).call(this);

        this.dom.menu.addEventListener("keyup", function (event) {
          _this2.currentEvent = "keyboard";
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (key === "Character" && !modifier) {
            // Hitting Character:
            // - Moves focus to next item in the menubar having a name that starts with the typed character.
            // - If none of the items have a name starting with the typed character, focus does not move.
            preventEvent(event);

            _this2.focusNextChildWithCharacter(event.key);
          } else if (_this2.isTopLevel) {
            if (_this2.focusState === "self") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this2.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this2.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this2.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                }
              } else if (key === "ArrowRight") {
                // Hitting the Right Arrow:
                // - Moves focus to the next item in the menubar.
                // - If focus is on the last item, moves focus to the first item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var previousChildOpen = _this2.currentMenuItem.isSubmenuItem && _this2.currentMenuItem.elements.toggle.isOpen;

                _this2.focusNextChild(); // Open the newly focussed submenu if applicable.


                if (previousChildOpen) {
                  if (_this2.currentMenuItem.isSubmenuItem) {
                    _this2.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this2.closeChildren();
                  }
                }
              } else if (key === "ArrowLeft") {
                // Hitting the Left Arrow:
                // - Moves focus to the previous item in the menubar.
                // - If focus is on the first item, moves focus to the last item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var _previousChildOpen = _this2.currentMenuItem.isSubmenuItem && _this2.currentMenuItem.elements.toggle.isOpen;

                _this2.focusPreviousChild(); // Open the newly focussed submenu if applicable.


                if (_previousChildOpen) {
                  if (_this2.currentMenuItem.isSubmenuItem) {
                    _this2.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this2.closeChildren();
                  }
                }
              } else if (key === "ArrowDown") {
                // Hitting the Down Arrow:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this2.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this2.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this2.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                }
              } else if (key === "ArrowUp") {
                // Hitting the Up Arrow:
                // - Opens submenu and moves focus to last item in the submenu.
                if (_this2.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this2.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this2.currentMenuItem.elements.childMenu.focusLastChild();
                  });
                }
              } else if (key === "Home") {
                // Hitting Home:
                // - Moves focus to first item in the menubar.
                preventEvent(event);

                _this2.focusFirstChild();
              } else if (key === "End") {
                // Hitting End:
                // - Moves focus to last item in the menubar.
                preventEvent(event);

                _this2.focusLastChild();
              } else if (key === "Escape") {
                // Hitting Escape:
                // - Closes menu.
                var hasOpenChild = _this2.elements.submenuToggles.some(function (toggle) {
                  return toggle.isOpen;
                });

                if (hasOpenChild) {
                  preventEvent(event);

                  _this2.closeChildren();
                } else if (_this2.isTopLevel && _this2.elements.controller && _this2.elements.controller.isOpen) {
                  preventEvent(event);

                  _this2.elements.controller.close();

                  _this2.focusController();
                }
              }
            }
          } else {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              if (_this2.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this2.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                requestAnimationFrame(function () {
                  _this2.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this2.elements.rootMenu.closeChildren();

              _this2.elements.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this2.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this2.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                requestAnimationFrame(function () {
                  _this2.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              } else {
                preventEvent(event);

                _this2.elements.rootMenu.closeChildren();

                _this2.elements.rootMenu.focusNextChild();

                if (_this2.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                  _this2.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this2.elements.parentMenu.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this2.elements.parentMenu.currentMenuItem.elements.toggle.close();

                _this2.elements.parentMenu.focusCurrentChild();

                if (_this2.elements.parentMenu === _this2.elements.rootMenu) {
                  _this2.elements.rootMenu.closeChildren();

                  _this2.elements.rootMenu.focusPreviousChild();

                  if (_this2.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                    _this2.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                  }
                }
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              preventEvent(event);

              _this2.focusNextChild();
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              preventEvent(event);

              _this2.focusPreviousChild();
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);

              _this2.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);

              _this2.focusLastChild();
            }
          }
        });
      }
    }]);

    return Menubar;
  }(BaseMenu);

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
  /**
   * An accessible disclosure menu in the DOM.
   *
   * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html
   */

  var DisclosureMenu = /*#__PURE__*/function (_BaseMenu) {
    _inherits(DisclosureMenu, _BaseMenu);

    var _super = _createSuper(DisclosureMenu);

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
     * @param {boolean}             [param0.isHoverable = false]         - A flag to allow hover events on the menu.
     * @param {number}              [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    function DisclosureMenu(_ref) {
      var _this;

      var menuElement = _ref.menuElement,
          _ref$menuItemSelector = _ref.menuItemSelector,
          menuItemSelector = _ref$menuItemSelector === void 0 ? "li" : _ref$menuItemSelector,
          _ref$menuLinkSelector = _ref.menuLinkSelector,
          menuLinkSelector = _ref$menuLinkSelector === void 0 ? "a" : _ref$menuLinkSelector,
          _ref$submenuItemSelec = _ref.submenuItemSelector,
          submenuItemSelector = _ref$submenuItemSelec === void 0 ? "" : _ref$submenuItemSelec,
          _ref$submenuToggleSel = _ref.submenuToggleSelector,
          submenuToggleSelector = _ref$submenuToggleSel === void 0 ? "a" : _ref$submenuToggleSel,
          _ref$submenuSelector = _ref.submenuSelector,
          submenuSelector = _ref$submenuSelector === void 0 ? "ul" : _ref$submenuSelector,
          _ref$controllerElemen = _ref.controllerElement,
          controllerElement = _ref$controllerElemen === void 0 ? null : _ref$controllerElemen,
          _ref$containerElement = _ref.containerElement,
          containerElement = _ref$containerElement === void 0 ? null : _ref$containerElement,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$closeClass = _ref.closeClass,
          closeClass = _ref$closeClass === void 0 ? "hide" : _ref$closeClass,
          _ref$isTopLevel = _ref.isTopLevel,
          isTopLevel = _ref$isTopLevel === void 0 ? true : _ref$isTopLevel,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$isHoverable = _ref.isHoverable,
          isHoverable = _ref$isHoverable === void 0 ? false : _ref$isHoverable,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

      _classCallCheck(this, DisclosureMenu);

      _this = _super.call(this, {
        menuElement: menuElement,
        menuItemSelector: menuItemSelector,
        menuLinkSelector: menuLinkSelector,
        submenuItemSelector: submenuItemSelector,
        submenuToggleSelector: submenuToggleSelector,
        submenuSelector: submenuSelector,
        controllerElement: controllerElement,
        containerElement: containerElement,
        openClass: openClass,
        closeClass: closeClass,
        isTopLevel: isTopLevel,
        parentMenu: parentMenu,
        isHoverable: isHoverable,
        hoverDelay: hoverDelay
      });
      _this.currentChild = -1;
      return _this;
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass(DisclosureMenu, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(DisclosureMenu.prototype), "initialize", this).call(this);

        this.createChildElements(DisclosureMenu);
        this.handleFocus();
        this.handleClick();
        if (this.isHoverable) this.handleHover();
        this.handleKeydown();
        this.handleKeyup();
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this2 = this;

        _get(_getPrototypeOf(DisclosureMenu.prototype), "handleKeydown", this).call(this);

        this.dom.menu.addEventListener("keydown", function (event) {
          _this2.currentEvent = "keyboard";
          var key = keyPress(event); // Prevent default event actions if we're handling the keyup event.

          if (_this2.focusState === "self") {
            var keys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End"];
            var submenuKeys = ["Space", "Enter"];
            var controllerKeys = ["Escape"];
            var parentKeys = ["Escape"];

            if (keys.includes(key)) {
              preventEvent(event);
            } else if (_this2.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
              preventEvent(event);
            } else if (_this2.elements.controller && controllerKeys.includes(key)) {
              preventEvent(event);
            } else if (_this2.elements.parentMenu && parentKeys.includes(key)) {
              preventEvent(event);
            }
          }
        });
      }
      /**
       * Handles keyup events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeyup",
      value: function handleKeyup() {
        var _this3 = this;

        _get(_getPrototypeOf(DisclosureMenu.prototype), "handleKeyup", this).call(this);

        this.dom.menu.addEventListener("keyup", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event);

          if (_this3.focusState === "self") {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
              // - Click handling of other links in the menu is handled by the browser.
              if (_this3.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this3.currentMenuItem.elements.toggle.preview();
              }
            } else if (key === "Escape") {
              // Hitting Escape
              // - If a dropdown is open, closes it.
              // - If was within the closed dropdown, sets focus on the button that controls that dropdown.
              var hasOpenChild = _this3.elements.submenuToggles.some(function (toggle) {
                return toggle.isOpen;
              });

              if (hasOpenChild) {
                preventEvent(event);

                _this3.closeChildren();
              } else if (_this3.elements.parentMenu) {
                preventEvent(event);

                _this3.elements.parentMenu.closeChildren();

                _this3.elements.parentMenu.focusCurrentChild();
              } else if (_this3.isTopLevel && _this3.elements.controller && _this3.elements.controller.isOpen) {
                _this3.elements.controller.close();

                _this3.focusController();
              }
            } else if (key === "ArrowDown" || key === "ArrowRight") {
              // Hitting the Down or Right Arrow:
              // - If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.
              // - If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.
              // - If focus is on a link, and it is not the last link, moves focus to the next link.
              preventEvent(event);

              if (_this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.elements.toggle.isOpen) {
                _this3.currentMenuItem.elements.childMenu.focusFirstChild();
              } else {
                _this3.focusNextChild();
              }
            } else if (key === "ArrowUp" || key === "ArrowLeft") {
              // Hitting the Up or Left Arrow:
              // - If focus is on a button, and it is not the first button, moves focus to the previous button.
              // - If focus is on a link, and it is not the first link, moves focus to the previous link.
              preventEvent(event);

              _this3.focusPreviousChild();
            } else if (key === "Home") {
              // Hitting Home:
              // - If focus is on a button, and it is not the first button, moves focus to the first button.
              // - If focus is on a link, and it is not the first link, moves focus to the first link.
              preventEvent(event);

              _this3.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - If focus is on a button, and it is not the last button, moves focus to the last button.
              // - If focus is on a link, and it is not the last link, moves focus to the last link.
              preventEvent(event);

              _this3.focusLastChild();
            }
          }
        });
      }
      /**
       * Focus the menu's next child.
       */

    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
        if (this.currentChild < this.elements.menuItems.length - 1) {
          this.blurCurrentChild();
          this.currentChild = this.currentChild + 1;
          this.focusCurrentChild();
        }
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        if (this.currentChild > 0) {
          this.blurCurrentChild();
          this.currentChild = this.currentChild - 1;
          this.focusCurrentChild();
        }
      }
    }]);

    return DisclosureMenu;
  }(BaseMenu);

  var rollup = {
    Menubar: Menubar,
    DisclosureMenu: DisclosureMenu
  };

  return rollup;

}());
//# sourceMappingURL=accessibleMenu.js.map
