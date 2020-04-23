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

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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
        if (_typeof(element) === "object") {
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
      if (_typeof(value) === "object") {
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
        if (_typeof(value) === "object") {
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
        if (_typeof(value) === "object") {
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
        if (_typeof(value) === "object") {
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
        if (_typeof(event) === "object") {
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
        if (_typeof(event) === "object") {
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
   * @param   {object|Menu} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isMenu(element) {
    var name = "element";

    try {
      if (!(element instanceof Menu)) {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;

            if (!(element[key] instanceof Menu)) {
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
      throw new TypeError("".concat(name, " must be an instance of Menu"));
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
        if (_typeof(element) === "object" && !(element instanceof MenuToggle)) {
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
      if (_typeof(value) === "object") {
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
      if (_typeof(value) === "object") {
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

  /**
   * A link or button that controls the visibility of a menu.
   */

  var MenuToggle =
  /*#__PURE__*/
  function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}      param0                      - The menu toggle object.
     * @param {HTMLElement} param0.menuToggleElement    - The toggle element in the DOM.
     * @param {HTMLElement} param0.parentElement        - The element containing the controlled menu.
     * @param {Menu}        param0.controlledMenu       - The menu controlled by this toggle.
     * @param {string}      [param0.openClass = "show"] - The class to apply when the controlled menu is "open".
     * @param {Menu|null}   [param0.parentMenu = null]  - The menu containing this toggle.
     */
    function MenuToggle(_ref) {
      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu;

      _classCallCheck(this, MenuToggle);

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
      this.openClass = openClass;
      this.isOpen = false;
      this.initialize();
    }
    /**
     * Initialize the toggle by ensuring WAI-ARIA values are set,
     * handling click events, and adding new keydown events.
     */


    _createClass(MenuToggle, [{
      key: "initialize",
      value: function initialize() {
        // Add WAI-ARIA properties.
        this.dom.toggle.setAttribute("aria-haspopup", "true");
        this.dom.toggle.setAttribute("aria-expanded", "false");
        this.dom.toggle.setAttribute("role", "button"); // Ensure both toggle and menu have IDs.

        if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
          var randomString = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
          var id = "".concat(this.dom.toggle.innerText.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, "-"), "-").concat(randomString);
          this.dom.toggle.id = this.dom.toggle.id || "".concat(id, "-menu-button");
          this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || "".concat(id, "-menu");
        } // Set up proper aria label and control.


        this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby", this.dom.toggle.id);
        this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id); // Add new events.

        this.handleClick();
      }
      /**
       * The DOM elements within the toggle.
       *
       * @returns {object} - The DOM elements.
       */

    }, {
      key: "expand",

      /**
       * Expands the controlled menu.
       *
       * Alters ARIA attributes and classes.
       */
      value: function expand() {
        this.dom.toggle.setAttribute("aria-expanded", "true");
        this.dom.parent.classList.add(this.openClass);
        this.elements.controlledMenu.dom.menu.classList.add(this.openClass);
      }
      /**
       * Opens the submenu.
       */

    }, {
      key: "open",
      value: function open() {
        // Set the open value.
        this.isOpen = true; // Expand the controlled menu and close all siblings.

        this.expand();
        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.elements.parentMenu) this.elements.parentMenu.focusState = "child";
        this.elements.controlledMenu.focusState = "self";

        if (!(event instanceof MouseEvent)) {
          // Set the new focus.
          this.elements.controlledMenu.focusFirstChild();
        }
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Set the open value.
        this.isOpen = true; // Expand the controlled menu and close all siblings.

        this.expand();
        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";

          if (!(event instanceof MouseEvent)) {
            this.elements.parentMenu.focusCurrentChild();
          }
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
          this.isOpen = false; // Assign new WAI-ARIA/class values.

          this.dom.toggle.setAttribute("aria-expanded", "false");
          this.dom.parent.classList.remove(this.openClass);
          this.elements.controlledMenu.dom.menu.classList.remove(this.openClass);

          if (!(event instanceof MouseEvent)) {
            this.elements.controlledMenu.focusFirstChild();
          } // Close all child menus.


          this.closeChildren(); // Set proper focus states to parent & child.

          this.elements.controlledMenu.blur();

          if (this.elements.parentMenu) {
            this.elements.parentMenu.focusState = "self";

            if (!(event instanceof MouseEvent)) {
              // Set the new focus.
              this.elements.parentMenu.focusCurrentChild();
            }
          } else if (this.elements.controlledMenu.isTopLevel && !(event instanceof MouseEvent)) {
            this.elements.controlledMenu.focusController();
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
        var _this = this;

        try {
          this.elements.parentMenu.elements.submenuToggles.forEach(function (toggle) {
            if (toggle !== _this) toggle.close();
          });
        } catch (error) {// Fail quietly. No parent exists.
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
      /**
       * Handle click events required for proper menu usage.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this2 = this;

        // Handle toggling the menu on click.
        this.dom.toggle.addEventListener("click", function (event) {
          preventEvent();

          _this2.toggle();
        });
      }
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

      /**
       * Set the open state on the menu.
       *
       * @param {boolean} value - The open state.
       */
      set: function set(value) {
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
      },
      set: function set(value) {
        isString({
          value: value
        });
        this.controlledMenuOpenClass = value;
      }
    }]);

    return MenuToggle;
  }();

  /**
   * A basic navigation link contained inside of a Menu.
   */

  var MenuItem =
  /*#__PURE__*/
  function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}          param0                         - The menu item object.
     * @param {HTMLElement}     param0.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}     param0.menuLinkElement         - The menu item's link in the DOM.
     * @param {Menu}            param0.parentMenu              - The parent menu.
     * @param {boolean}         [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {Menu|null}       [param0.childMenu = null]      - The child menu.
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

      _classCallCheck(this, MenuItem);

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


    _createClass(MenuItem, [{
      key: "initialize",
      value: function initialize() {
        this.dom.item.setAttribute("role", "none");
        this.dom.link.setAttribute("role", "menuitem");
        this.dom.link.tabIndex = -1;
      }
      /**
       * The DOM elements within the menu item.
       *
       * @returns {object} - The DOM elements.
       */

    }, {
      key: "focus",

      /**
       * Focuses the menu item's link and set proper tabIndex.
       */
      value: function focus() {
        if (this.elements.parentMenu.currentEvent !== "mouse") {
          this.dom.link.focus();
        }

        if (this.elements.parentMenu.isTopLevel) {
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

        if (this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = -1;
        }
      }
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
    }]);

    return MenuItem;
  }();

  /**
   * An accessible navigation element in the DOM.
   */

  var Menu =
  /*#__PURE__*/
  function () {
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
     * @param {boolean}          [param0.isTopLevel = false]          - A flag to mark the root menu.
     * @param {Menu|null}        [param0.parentMenu = null]           - The parent menu to this menu.
     * @param {boolean}          [param0.isHoverable = false]         - A flag to allow hover events on the menu.
     * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    function Menu(_ref) {
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
          _ref$isTopLevel = _ref.isTopLevel,
          isTopLevel = _ref$isTopLevel === void 0 ? true : _ref$isTopLevel,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$isHoverable = _ref.isHoverable,
          isHoverable = _ref$isHoverable === void 0 ? false : _ref$isHoverable,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

      _classCallCheck(this, Menu);

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
        menuItems: Array.from(menuElement.querySelectorAll(menuItemSelector)).filter(function (item) {
          return item.parentElement === menuElement;
        }),
        submenuItems: Array.from(menuElement.querySelectorAll(submenuItemSelector)).filter(function (item) {
          return item.parentElement === menuElement;
        }),
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
      this.openClass = openClass;
      this.root = isTopLevel;
      this.currentChild = 0;
      this.focusState = "none";
      this.currentEvent = "none";
      this.isHoverable = isHoverable;
      this.hoverDelay = hoverDelay;
      this.initialize();
    }
    /**
     * Initializes the menu with proper tab indexing and properties.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass(Menu, [{
      key: "initialize",
      value: function initialize() {
        this.dom.menu.setAttribute("role", "menubar");
        if (this.elements.rootMenu === null) this.findRootMenu(this);
        this.createMenuItems();
        this.handleKeydown();
        this.handleClick();
        if (this.isHoverable) this.handleHover();

        if (this.isTopLevel) {
          var link = this.currentMenuItem.dom.link; // Set initial tabIndex.

          link.tabIndex = 0;
          this.handleFocus();

          if (this.dom.controller && this.dom.container) {
            // Create a new MenuToggle to control the menu.
            var toggle = new MenuToggle({
              menuToggleElement: this.dom.controller,
              parentElement: this.dom.container,
              controlledMenu: this,
              openClass: this.openClass
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
      key: "findRootMenu",

      /**
       * Finds the root Menu element.
       *
       * @param {Menu} menu - The menu to check.
       */
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
       */

    }, {
      key: "createMenuItems",
      value: function createMenuItems() {
        var _this = this;

        this.dom.menuItems.forEach(function (element) {
          var menuItem;

          if (_this.dom.submenuItems.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this.selectors.submenuToggles); // The actual menu DOM element.

            var submenu = element.querySelector(_this.selectors.submenus); // Create the new Menu and initialize it.

            var menu = new Menu({
              menuElement: submenu,
              menuItemSelector: _this.selectors.menuItems,
              menuLinkSelector: _this.selectors.menuLinks,
              submenuItemSelector: _this.selectors.submenuItems,
              submenuToggleSelector: _this.selectors.submenuToggles,
              submenuSelector: _this.selectors.submenus,
              openClass: _this.openClass,
              isTopLevel: false,
              parentMenu: _this,
              isHoverable: _this.isHoverable,
              hoverDelay: _this.hoverDelay
            }); // Create the new MenuToggle.

            var toggle = new MenuToggle({
              menuToggleElement: toggler,
              parentElement: element,
              controlledMenu: menu,
              openClass: _this.openClass,
              parentMenu: _this
            }); // Add the toggle to the list of toggles.

            _this.menuElements.submenuToggles.push(toggle); // Create a new MenuItem.


            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this.selectors.menuLinks); // Create a new MenuItem.

            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this
            });
          }

          _this.menuElements.menuItems.push(menuItem);
        });
      }
      /**
       * Sets up focusin/focusout handling.
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        var _this2 = this;

        this.elements.menuItems.forEach(function (menuItem) {
          // Properly enter menu on focus.
          menuItem.dom.link.addEventListener("focusin", function () {
            if (_this2.focusState === "none") {
              _this2.focusState = "self";

              _this2.focusCurrentChild();
            }
          }); // Set tabIndex for the current menuItem.

          menuItem.dom.link.addEventListener("focusout", function (event) {
            if (_this2.focusState === "none") {
              _this2.blur();

              _this2.closeChildren();
            }
          });
        });
      }
      /**
       * Sets up the hijacked keydown events.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this3 = this;

        this.dom.menu.addEventListener("keydown", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this3.isTopLevel) {
            if (_this3.focusState === "none") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Opens submenu and moves focus to first item in the submenu.
                preventEvent(event);
                _this3.focusState = "self";

                _this3.focusFirstChild();
              }
            } else if (_this3.focusState === "self") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Activates menu item, causing the link to be activated.
                preventEvent(event);

                _this3.currentMenuItem.dom.link.click();
              } else if (key === "ArrowRight") {
                // Hitting the Right Arrow:
                // - Moves focus to the next item in the menubar.
                // - If focus is on the last item, moves focus to the first item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var previousChildOpen = _this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.elements.toggle.isOpen;

                _this3.focusNextChild(); // Open the newly focussed submenu if applicable.


                if (previousChildOpen) {
                  if (_this3.currentMenuItem.isSubmenuItem) {
                    _this3.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this3.closeChildren();
                  }
                }
              } else if (key === "ArrowLeft") {
                // Hitting the Left Arrow:
                // - Moves focus to the previous item in the menubar.
                // - If focus is on the first item, moves focus to the last item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var _previousChildOpen = _this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.elements.toggle.isOpen;

                _this3.focusPreviousChild(); // Open the newly focussed submenu if applicable.


                if (_previousChildOpen) {
                  if (_this3.currentMenuItem.isSubmenuItem) {
                    _this3.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this3.closeChildren();
                  }
                }
              } else if (key === "ArrowDown") {
                // Hitting the Down Arrow:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this3.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this3.currentMenuItem.elements.toggle.open();

                  _this3.currentMenuItem.elements.childMenu.focusFirstChild();
                }
              } else if (key === "ArrowUp") {
                // Hitting the Up Arrow:
                // - Opens submenu and moves focus to last item in the submenu.
                if (_this3.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this3.currentMenuItem.elements.toggle.open();

                  _this3.currentMenuItem.elements.childMenu.focusLastChild();
                }
              } else if (key === "Home") {
                // Hitting Home:
                // - Moves focus to first item in the menubar.
                preventEvent(event);

                _this3.focusFirstChild();
              } else if (key === "End") {
                // Hitting End:
                // - Moves focus to last item in the menubar.
                preventEvent(event);

                _this3.focusLastChild();
              } else if (key === "Escape") {
                if (_this3.elements.controller !== null) {
                  // Hitting Escape:
                  // - Closes menu.
                  _this3.elements.controller.close();
                }
              }
            }
          } else {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              preventEvent(event);

              _this3.currentMenuItem.dom.link.click();
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this3.elements.rootMenu.closeChildren();

              _this3.elements.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this3.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this3.currentMenuItem.elements.toggle.open();
              } else {
                preventEvent(event);

                _this3.elements.rootMenu.closeChildren();

                _this3.elements.rootMenu.focusNextChild();

                if (_this3.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                  _this3.elements.rootMenu.currentMenuItem.elements.toggle.preview(event);
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this3.elements.parentMenu.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this3.elements.parentMenu.currentMenuItem.elements.toggle.close(event);

                if (_this3.elements.parentMenu === _this3.elements.rootMenu) {
                  _this3.elements.rootMenu.closeChildren();

                  _this3.elements.rootMenu.focusPreviousChild();

                  if (_this3.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                    _this3.elements.rootMenu.currentMenuItem.elements.toggle.preview(event);
                  }
                }
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              preventEvent(event);

              _this3.focusNextChild();
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              preventEvent(event);

              _this3.focusPreviousChild();
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);

              _this3.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);

              _this3.focusLastChild();
            }
          }

          if (key === "Character" && !modifier) {
            // Hitting Character:
            // - Moves focus to next item in the menubar having a name that starts with the typed character.
            // - If none of the items have a name starting with the typed character, focus does not move.
            preventEvent(event);

            _this3.focusNextChildWithCharacter(event.key);
          }

          if (_this3.focusState !== "none") {
            if (key === "Tab") {
              // Hitting Tab:
              // - Moves focus out of the menu.
              _this3.elements.rootMenu.blur();

              _this3.elements.rootMenu.closeChildren();
            }
          }
        });
      }
      /**
       * Adds click events throughout the menu for proper use.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this4 = this;

        document.addEventListener("click", function (event) {
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
        }); // Ensure proper menu focus is applied.

        this.elements.menuItems.forEach(function (menuItem) {
          menuItem.dom.link.addEventListener("click", function () {
            _this4.currentEvent = "mouse";
            _this4.currentChild = _this4.elements.menuItems.indexOf(menuItem);
          });
        });
      }
      /**
       * Adds hover events throughout the menu for proper use.
       */

    }, {
      key: "handleHover",
      value: function handleHover() {
        var _this5 = this;

        this.elements.submenuToggles.forEach(function (toggle) {
          toggle.dom.parent.addEventListener("mouseenter", function () {
            _this5.currentEvent = "mouse";
            toggle.open();
          });
          toggle.dom.parent.addEventListener("mouseleave", function () {
            setTimeout(function () {
              _this5.currentEvent = "mouse";
              toggle.close();
            }, _this5.hoverDelay);
          });
        });
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
      value: function focusNextChildWithCharacter(_char) {
        // Ensure the character is lowercase just to be safe.
        var match = _char.toLowerCase();

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
       * A flag marking the root menu.
       *
       * @returns {boolean} - The top-level flag.
       */
      ,

      /**
       * Set the class to apply when the menu is "open".
       *
       * @param {string} value - The class.
       */
      set: function set(value) {
        isString({
          value: value
        });
        this.submenuOpenClass = value;
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
    }]);

    return Menu;
  }();

  return Menu;

}());
