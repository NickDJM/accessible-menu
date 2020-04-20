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
   * Checks to see if the provided element is a valid CSS selector.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|string} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isCSSSelector(element) {
    var name = "element";

    try {
      if (typeof element !== "string") {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;
            if (typeof element[key] !== "string") throw Error;
            document.querySelector(element[key]);
          }
        } else {
          throw Error;
        }
      } else {
        document.querySelector(element);
      }

      return true;
    } catch (error) {
      throw new TypeError("".concat(name, " must be a valid CSS selector."));
    }
  }
  /**
   * Checks to see if the provided element is a boolean.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|boolean} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isBoolean(element) {
    var name = "element";

    try {
      if (typeof element !== "boolean") {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;
            if (typeof element[key] !== "boolean") throw Error;
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
   * Checks to see if the provided element is a number.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|number} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isNumber(element) {
    var name = "element";

    try {
      if (typeof element !== "number") {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;
            if (typeof element[key] !== "number") throw Error;
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
   * Checks to see if the provided element is an Event.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|Event} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isEvent(element) {
    var name = "event";

    try {
      if (!(element instanceof Event)) {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;
            if (!(element[key] instanceof Event)) throw Error;
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
   * Checks to see if the provided element is a KeyboardEvent.
   *
   * If you provide the element to check inside of an object
   * the name of the variable will be output in the error message.
   *
   * Will return true is the check is successful.
   *
   * @param   {object|KeyboardEvent} element - The element to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isKeyboardEvent(element) {
    var name = "event";

    try {
      if (!(element instanceof KeyboardEvent)) {
        if (_typeof(element) === "object") {
          for (var key in element) {
            name = key;
            if (!(element[key] instanceof KeyboardEvent)) throw Error;
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
   * Checks to see if the menu has everything it needs for submenus.
   *
   * Will return true is the check is successful.
   *
   * @param   {string} submenuItemSelector   - The CSS selector for submenu items.
   * @param   {string} submenuToggleSelector - The CSS selector for submenu togglers.
   * @param   {string} submenuSelector       - The CSS selector for submenus.
   *
   * @returns {boolean} - The result of the check.
   */

  function hasSubmenus(submenuItemSelector, submenuToggleSelector, submenuSelector) {
    // if none of the submenu selectors are provided, the menu has no submenus.
    if (submenuItemSelector === null && submenuToggleSelector === null && submenuSelector === null) return true;
    return isCSSSelector({
      submenuItemSelector: submenuItemSelector,
      submenuToggleSelector: submenuToggleSelector,
      submenuSelector: submenuSelector
    });
  }
  /**
   * Checks to see if the menu has everything is needs to be a dropdown.
   *
   * Will return true is the check is successful.
   *
   * @param   {HTMLElement} controllerElement - The toggle for the dropdown.
   * @param   {HTMLElement} containerElement  - The container for the dropdown.
   *
   * @returns {boolean} - The result of the check.
   */

  function isDropdown(controllerElement, containerElement) {
    // If neither of the selectors are provided, the menu isn't a dropdown.
    if (controllerElement === null && containerElement === null) return true;
    return isHTMLElement({
      controllerElement: controllerElement,
      containerElement: containerElement
    });
  }
  /**
   * Check to see if the provided element is a Menu.
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
            if (!(element[key] instanceof Menu)) throw Error;
          }
        } else {
          throw Error;
        }
      } else {
        return true;
      }
    } catch (error) {
      throw new TypeError("".concat(name, " must be a Menu."));
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
     * @param {HTMLElement} param0.parentElement        - The element containing the menu.
     * @param {Menu}        param0.menu                 - The menu controlled by the this toggle.
     * @param {string}      [param0.openClass = "show"] - The class to use when a submenu is open.
     * @param {Menu|null}   [param0.parentMenu = null]  - The menu containing the toggle.
     */
    function MenuToggle(_ref) {
      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          menu = _ref.menu,
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
      parentMenu !== null ? isMenu({
        menu: menu,
        parentMenu: parentMenu
      }) : isMenu({
        menu: menu
      });
      isCSSSelector({
        openClass: openClass
      });
      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement
      };
      this.elements = {
        menu: menu,
        parentMenu: parentMenu
      };
      this.openClass = openClass;
      this.show = false;
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
        this.element.setAttribute("aria-haspopup", "true");
        this.element.setAttribute("aria-expanded", "false");
        this.element.setAttribute("role", "button"); // Ensure both toggle and menu have IDs.

        if (this.element.id === "" || this.menu.element.id === "") {
          var randomString = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
          var id = "".concat(this.element.innerText.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s/g, "-"), "-").concat(randomString);
          this.element.id = this.element.id || "".concat(id, "-menu-button");
          this.menu.element.id = this.menu.element.id || "".concat(id, "-menu");
        } // Set up proper aria label and control.


        this.menu.element.setAttribute("aria-labelledby", this.element.id);
        this.element.setAttribute("aria-controls", this.menu.element.id); // Add new events.

        this.handleClick();
      }
      /**
       * The toggle element in the DOM.
       *
       * @returns {HTMLElement} - The toggle element.
       */

    }, {
      key: "expand",

      /**
       * Expands the submenu.
       */
      value: function expand() {
        // Assign new WAI-ARIA/class values.
        this.element.setAttribute("aria-expanded", "true");
        this.parentElement.classList.add(this.openClass);
        this.menu.element.classList.add(this.openClass);
      }
      /**
       * Opens the submenu.
       */

    }, {
      key: "open",
      value: function open() {
        // Set the open value.
        this.isOpen = true; // Expand the menu.

        this.expand(); // Close all sibling menus.

        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.parentMenu) this.parentMenu.currentFocus = "child";
        this.menu.currentFocus = "self"; // Set the new focus.

        this.menu.focusFirstChild();
      }
      /**
       * Opens the submenu without focus entering it.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Set the open value.
        this.isOpen = true; // Expand the menu.

        this.expand(); // Close all sibling menus.

        this.closeSiblings(); // Set proper focus states to parent & child.

        if (this.parentMenu) {
          this.parentMenu.currentFocus = "self";
          this.parentMenu.focusCurrentChild();
        }

        this.menu.currentFocus = "none";
      }
      /**
       * Closes the submenu.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Set the open value.
          this.isOpen = false; // Assign new WAI-ARIA/class values.

          this.element.setAttribute("aria-expanded", "false");
          this.parentElement.classList.remove(this.openClass);
          this.menu.element.classList.remove(this.openClass);
          this.menu.focusFirstChild(); // Close all child menus.

          this.closeChildren(); // Set proper focus states to parent & child.

          this.menu.blur();

          if (this.parentMenu) {
            this.parentMenu.currentFocus = "self"; // Set the new focus.

            this.parentMenu.focusCurrentChild();
          } else if (this.menu.isTopLevel) {
            this.menu.focusController();
          }
        }
      }
      /**
       * Toggles the open state of the menu.
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
          this.parentMenu.menuToggles.forEach(function (toggle) {
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
        this.menu.menuToggles.forEach(function (toggle) {
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
        this.element.addEventListener("click", function (event) {
          preventEvent(event);

          _this2.toggle();
        });
      }
    }, {
      key: "element",
      get: function get() {
        return this.domElements.toggle;
      }
      /**
       * The toggle's parent DOM element.
       *
       * @returns {HTMLElement} - The parent element.
       */

    }, {
      key: "parentElement",
      get: function get() {
        return this.domElements.parent;
      }
      /**
       * The menu controlled by the toggle.
       *
       * @returns {Menu} - The menu element.
       */

    }, {
      key: "menu",
      get: function get() {
        return this.elements.menu;
      }
      /**
       * The menu containing the toggle.
       *
       * @returns {Menu} - The menu element.
       */

    }, {
      key: "parentMenu",
      get: function get() {
        return this.elements.parentMenu;
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
       * Set the open state on the menu.
       *
       * @param {boolean} value - The open state.
       */
      ,
      set: function set(value) {
        if (typeof value !== "boolean") {
          throw new TypeError("Open state must be true or false.");
        }

        this.show = value;
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
      childMenu !== null ? isMenu({
        parentMenu: parentMenu,
        childMenu: childMenu
      }) : isMenu({
        parentMenu: parentMenu
      });
      isBoolean({
        isSubmenuItem: isSubmenuItem
      });
      if (toggle !== null) isMenuToggle({
        toggle: toggle
      });
      this.domElements = {
        menuItem: menuItemElement,
        link: menuLinkElement
      };
      this.elements = {
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
        this.element.setAttribute("role", "none");
        this.linkElement.setAttribute("role", "menuitem");
        this.linkElement.tabIndex = -1;
      }
      /**
       * The menu item element in the DOM.
       *
       * @returns {HTMLElement} - The menu item element.
       */

    }, {
      key: "focus",

      /**
       * Focuses the menu item's link and set proper tabIndex.
       */
      value: function focus() {
        this.linkElement.focus();

        if (this.parentMenu.isTopLevel) {
          this.linkElement.tabIndex = 0;
        }
      }
      /**
       * Blurs the menu item's link and set proper tabIndex.
       */

    }, {
      key: "blur",
      value: function blur() {
        this.linkElement.blur();

        if (this.parentMenu.isTopLevel) {
          this.linkElement.tabIndex = -1;
        }
      }
    }, {
      key: "element",
      get: function get() {
        return this.domElements.menuItem;
      }
      /**
       * The link element inside the menu item.
       *
       * @returns {HTMLElement} - The link.
       */

    }, {
      key: "linkElement",
      get: function get() {
        return this.domElements.link;
      }
      /**
       * The item's parent Menu.
       *
       * @returns {Menu} - The parent menu.
       */

    }, {
      key: "parentMenu",
      get: function get() {
        return this.elements.parentMenu;
      }
      /**
       * The item's child menu.
       *
       * @returns {Menu|null} - The menu.
       */

    }, {
      key: "childMenu",
      get: function get() {
        return this.elements.childMenu;
      }
      /**
       * The item's toggle.
       *
       * @returns {MenuToggle|null} - The toggle.
       */

    }, {
      key: "toggle",
      get: function get() {
        return this.elements.toggle;
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
     * @param {object}           param0                                - The menu object.
     * @param {HTMLElement}      param0.menuElement                    - The menu element in the DOM.
     * @param {string}           [param0.menuItemSelector = "li"]      - The selector string for menu items.
     * @param {string}           [param0.menuLinkSelector = "a"]       - The selector string for menu links.
     * @param {string|null}      [param0.submenuItemSelector = null]   - The selector string for submenu items.
     * @param {string|null}      [param0.submenuToggleSelector = null] - The selector string for submenu toggle triggers.
     * @param {string|null}      [param0.submenuSelector = null]       - The selector string for the submenu itself.
     * @param {string}           [param0.openClass = "show"]           - The class to use when a submenu is open.
     * @param {boolean}          [param0.isTopLevel = true]            - A flag to mark the root menu.
     * @param {HTMLElement|null} [param0.controllerElement = null]     - The element controlling the menu in the DOM.
     * @param {HTMLElement|null} [param0.containerElement = null]      - The element containing the menu in the DOM.
     * @param {Menu|null}        [param0.parentMenu = null]            - The menu containing this menu.
     * @param {boolean}          [param0.isHoverable = false]          - A flag to allow hover events on the menu.
     * @param {number}           [param0.hoverDelay = 500]             - The delay for closing menus if the menu is hoverable (in miliseconds).
     */
    function Menu(_ref) {
      var menuElement = _ref.menuElement,
          _ref$menuItemSelector = _ref.menuItemSelector,
          menuItemSelector = _ref$menuItemSelector === void 0 ? "li" : _ref$menuItemSelector,
          _ref$menuLinkSelector = _ref.menuLinkSelector,
          menuLinkSelector = _ref$menuLinkSelector === void 0 ? "a" : _ref$menuLinkSelector,
          _ref$submenuItemSelec = _ref.submenuItemSelector,
          submenuItemSelector = _ref$submenuItemSelec === void 0 ? null : _ref$submenuItemSelec,
          _ref$submenuToggleSel = _ref.submenuToggleSelector,
          submenuToggleSelector = _ref$submenuToggleSel === void 0 ? null : _ref$submenuToggleSel,
          _ref$submenuSelector = _ref.submenuSelector,
          submenuSelector = _ref$submenuSelector === void 0 ? null : _ref$submenuSelector,
          _ref$openClass = _ref.openClass,
          openClass = _ref$openClass === void 0 ? "show" : _ref$openClass,
          _ref$isTopLevel = _ref.isTopLevel,
          isTopLevel = _ref$isTopLevel === void 0 ? true : _ref$isTopLevel,
          _ref$controllerElemen = _ref.controllerElement,
          controllerElement = _ref$controllerElemen === void 0 ? null : _ref$controllerElemen,
          _ref$containerElement = _ref.containerElement,
          containerElement = _ref$containerElement === void 0 ? null : _ref$containerElement,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$isHoverable = _ref.isHoverable,
          isHoverable = _ref$isHoverable === void 0 ? false : _ref$isHoverable,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 500 : _ref$hoverDelay;

      _classCallCheck(this, Menu);

      // Run validations.
      isHTMLElement({
        menuElement: menuElement
      });
      isCSSSelector({
        menuItemSelector: menuItemSelector,
        menuLinkSelector: menuLinkSelector,
        openClass: openClass
      });
      isBoolean({
        isTopLevel: isTopLevel,
        isHoverable: isHoverable
      });
      isNumber({
        hoverDelay: hoverDelay
      });
      hasSubmenus(submenuItemSelector, submenuToggleSelector, submenuSelector);
      isDropdown(controllerElement, containerElement);
      if (parentMenu !== null) isMenu({
        parentMenu: parentMenu
      });
      this.domElements = {
        menu: menuElement,
        controller: controllerElement,
        container: containerElement,
        menuItems: Array.from(menuElement.querySelectorAll(menuItemSelector)).filter(function (item) {
          return item.parentElement === menuElement;
        }),
        submenuItems: Array.from(menuElement.querySelectorAll(submenuItemSelector)).filter(function (item) {
          return item.parentElement === menuElement;
        })
      };
      this.domSelectors = {
        "menu-items": menuItemSelector,
        "menu-links": menuLinkSelector,
        "submenu-items": submenuItemSelector,
        "submenu-toggle": submenuToggleSelector,
        submenu: submenuSelector
      };
      this.elements = {
        menuItems: [],
        menuToggles: [],
        controller: null,
        parentMenu: parentMenu,
        rootMenu: isTopLevel ? this : null
      };
      this.focussedChild = 0;
      this.focusState = "none";
      this.openClass = openClass;
      this.root = isTopLevel;
      this.hoverable = isHoverable;
      this.delay = hoverDelay;
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
        this.element.setAttribute("role", "menubar");
        if (this.rootMenu === null) this.findRootMenu(this);
        this.createMenuItems();
        this.handleKeydown();
        this.handleClick();
        if (this.isHoverable) this.handleHover();

        if (this.isTopLevel) {
          // Set initial tabIndex.
          this.currentMenuItem.linkElement.tabIndex = 0;
          this.handleFocus();

          if (this.controllerElement && this.containerElement) {
            // Create a new MenuToggle to control the menu.
            var toggle = new MenuToggle({
              menuToggleElement: this.controllerElement,
              parentElement: this.containerElement,
              menu: this,
              openClass: this.openClass
            });
            this.elements.controller = toggle;
          }
        }
      }
      /**
       * The menu element in the DOM.
       *
       * @returns {HTMLElement} - The menu.
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
          this.elements.rootMenu = menu;
        } else if (menu.parentMenu !== null) {
          this.findRootMenu(menu.parentMenu);
        } else {
          throw new Error("Cannot find root menu.");
        }
      }
      /**
       * Creates and initializes all menu items.
       */

    }, {
      key: "createMenuItems",
      value: function createMenuItems() {
        var _this = this;

        this.menuItemElements.forEach(function (element) {
          var menuItem;

          if (_this.submenuItemElements.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this.selector["submenu-toggle"]); // The actual menu DOM element.

            var submenu = element.querySelector(_this.selector.submenu); // Create the new Menu and initialize it.

            var menu = new Menu({
              menuElement: submenu,
              menuItemSelector: _this.selector["menu-items"],
              menuLinkSelector: _this.selector["menu-links"],
              submenuItemSelector: _this.selector["submenu-items"],
              submenuToggleSelector: _this.selector["submenu-toggle"],
              submenuSelector: _this.selector.submenu,
              openClass: _this.openClass,
              isTopLevel: false,
              parentMenu: _this,
              isHoverable: _this.isHoverable
            }); // Create the new MenuToggle.

            var toggle = new MenuToggle({
              menuToggleElement: toggler,
              parentElement: element,
              menu: menu,
              openClass: _this.openClass,
              parentMenu: _this
            }); // Add it to the list of submenu items.

            _this.elements.menuToggles.push(toggle); // Create a new MenuItem.


            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this.selector["menu-links"]); // Create a new MenuItem.

            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this
            });
          }

          _this.elements.menuItems.push(menuItem);
        });
      }
      /**
       * Sets up focusin/focusout handling.
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        var _this2 = this;

        this.menuItems.forEach(function (item) {
          // Properly enter menu on focus.
          item.linkElement.addEventListener("focusin", function () {
            if (_this2.currentFocus === "none") {
              _this2.currentFocus = "self";

              _this2.focusCurrentChild();
            }
          }); // Set tabIndex for the current menuItem.

          item.linkElement.addEventListener("focusout", function () {
            if (_this2.currentFocus === "none") {
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

        this.element.addEventListener("keydown", function (event) {
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this3.isTopLevel) {
            if (_this3.currentFocus === "none") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Opens submenu and moves focus to first item in the submenu.
                preventEvent(event);
                _this3.currentFocus = "self";

                _this3.focusFirstChild();
              }
            } else if (_this3.currentFocus === "self") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Activates menu item, causing the link to be activated.
                preventEvent(event);

                _this3.currentMenuItem.linkElement.click();
              } else if (key === "ArrowRight") {
                // Hitting the Right Arrow:
                // - Moves focus to the next item in the menubar.
                // - If focus is on the last item, moves focus to the first item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var previousChildOpen = _this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.toggle.isOpen;

                _this3.focusNextChild(); // Open the newly focussed submenu if applicable.


                if (previousChildOpen) {
                  if (_this3.currentMenuItem.isSubmenuItem) {
                    _this3.currentMenuItem.toggle.preview();
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

                var _previousChildOpen = _this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.toggle.isOpen;

                _this3.focusPreviousChild(); // Open the newly focussed submenu if applicable.


                if (_previousChildOpen) {
                  if (_this3.currentMenuItem.isSubmenuItem) {
                    _this3.currentMenuItem.toggle.preview();
                  } else {
                    _this3.closeChildren();
                  }
                }
              } else if (key === "ArrowDown") {
                // Hitting the Down Arrow:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this3.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this3.currentMenuItem.toggle.open();

                  _this3.currentMenuItem.childMenu.focusFirstChild();
                }
              } else if (key === "ArrowUp") {
                // Hitting the Up Arrow:
                // - Opens submenu and moves focus to last item in the submenu.
                if (_this3.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);

                  _this3.currentMenuItem.toggle.open();

                  _this3.currentMenuItem.childMenu.focusLastChild();
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
                if (_this3.controller !== null) {
                  // Hitting Escape:
                  // - Closes menu.
                  _this3.controller.close();
                }
              }
            }
          } else {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              preventEvent(event);

              _this3.currentMenuItem.linkElement.click();
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this3.rootMenu.closeChildren();

              _this3.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this3.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this3.currentMenuItem.toggle.open();
              } else {
                preventEvent(event);

                _this3.rootMenu.closeChildren();

                _this3.rootMenu.focusNextChild();

                if (_this3.rootMenu.currentMenuItem.isSubmenuItem) {
                  _this3.rootMenu.currentMenuItem.toggle.preview();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this3.parentMenu.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this3.parentMenu.currentMenuItem.toggle.close();

                if (_this3.parentMenu === _this3.rootMenu) {
                  _this3.rootMenu.closeChildren();

                  _this3.rootMenu.focusPreviousChild();

                  if (_this3.rootMenu.currentMenuItem.isSubmenuItem) {
                    _this3.rootMenu.currentMenuItem.toggle.preview();
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

          if (_this3.currentFocus !== "none") {
            if (key === "Tab") {
              // Hitting Tab:
              // - Moves focus out of the menu.
              _this3.rootMenu.blur();

              _this3.rootMenu.closeChildren();
            }
          }
        });
      }
      /**
       * Handle click events required for proper menu usage.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this4 = this;

        document.addEventListener("click", function (event) {
          if (!_this4.element.contains(event.target) && _this4.element !== event.target) {
            _this4.blur();

            _this4.closeChildren();

            if (_this4.controller) {
              _this4.controller.close();
            }
          }
        }); // Ensure proper menu focus is applied.

        this.menuItems.forEach(function (menuItem) {
          menuItem.linkElement.addEventListener("click", function () {
            _this4.focussedChild = _this4.menuItems.indexOf(menuItem);
          });
        });
      }
      /**
       * Handle hover events required for proper menu usage.
       */

    }, {
      key: "handleHover",
      value: function handleHover() {
        var _this5 = this;

        this.menuItems.forEach(function (menuItem) {
          if (menuItem.isSubmenuItem) {
            menuItem.element.addEventListener("mouseenter", function () {
              menuItem.toggle.open();
            });
            menuItem.element.addEventListener("mouseleave", function () {
              setTimeout(function () {
                menuItem.toggle.close();
              }, _this5.hoverDelay);
            });
          }
        });
      }
      /**
       * Focus the menu.
       */

    }, {
      key: "focus",
      value: function focus() {
        this.currentFocus = "self";
        this.element.focus();
      }
      /**
       * Unfocus the menu.
       */

    }, {
      key: "blur",
      value: function blur() {
        this.currentFocus = "none";
        this.element.blur();

        if (this.isTopLevel && this.controller) {
          this.controller.close();
        }
      }
      /**
       * Focues the menu's first child.
       */

    }, {
      key: "focusFirstChild",
      value: function focusFirstChild() {
        this.blurCurrentChild();
        this.focussedChild = 0;
        this.focusCurrentChild();
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusLastChild",
      value: function focusLastChild() {
        this.blurCurrentChild();
        this.focussedChild = this.menuItems.length - 1;
        this.focusCurrentChild();
      }
      /**
       * Focus the menu's next child.
       */

    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
        if (this.focussedChild === this.menuItems.length - 1) {
          this.focusFirstChild();
        } else {
          this.blurCurrentChild();
          this.focussedChild = this.focussedChild + 1;
          this.focusCurrentChild();
        }
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        if (this.focussedChild === 0) {
          this.focusLastChild();
        } else {
          this.blurCurrentChild();
          this.focussedChild = this.focussedChild - 1;
          this.focusCurrentChild();
        }
      }
      /**
       * Focus the menu's current child.
       */

    }, {
      key: "focusCurrentChild",
      value: function focusCurrentChild() {
        if (this.focussedChild !== -1) {
          this.currentMenuItem.focus();
        }
      }
      /**
       * Blurs the menu's current child.
       */

    }, {
      key: "blurCurrentChild",
      value: function blurCurrentChild() {
        if (this.focussedChild !== -1) {
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

        var index = this.focussedChild + 1;
        var found = false;

        while (!found && index < this.menuItems.length) {
          // Ensure the text in the item is lowercase just to be safe.
          var text = this.menuItems[index].element.innerText.toLowerCase(); // Focus the child if the text matches, otherwise move on.

          if (text.startsWith(match)) {
            found = true;
            this.focussedChild = index;
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
        if (this.controllerElement) {
          this.controllerElement.focus();
          this.currentFocus = "none";
        }
      }
      /**
       * Focus the menu's container.
       */

    }, {
      key: "focusContainer",
      value: function focusContainer() {
        if (this.containerElement) {
          this.containerElement.focus();
          this.currentFocus = "none";
        }
      }
      /**
       * Close all submenu children.
       */

    }, {
      key: "closeChildren",
      value: function closeChildren() {
        this.menuToggles.forEach(function (toggle) {
          return toggle.close();
        });
      }
    }, {
      key: "element",
      get: function get() {
        return this.domElements.menu;
      }
      /**
       * The menu's controller element in the DOM.
       *
       * @returns {HTMLElement|null} - The controller element.
       */

    }, {
      key: "controllerElement",
      get: function get() {
        return this.domElements.controller;
      }
      /**
       * The menu's container element in the DOM.
       *
       * @returns {HTMLElement|null} - The container element.
       */

    }, {
      key: "containerElement",
      get: function get() {
        return this.domElements.container;
      }
      /**
       * The menu item DOM elements contained in the menu.
       *
       * @returns {HTMLElement[]} - The menu items.
       */

    }, {
      key: "menuItemElements",
      get: function get() {
        return this.domElements.menuItems;
      }
      /**
       * The submenu item DOM elements contained in the menu.
       *
       * @returns {HTMLElement[]} - The submenu items.
       */

    }, {
      key: "submenuItemElements",
      get: function get() {
        return this.domElements.submenuItems;
      }
      /**
       * The menu items contained in the menu.
       *
       * @returns {MenuItem[]} - The menu items.
       */

    }, {
      key: "menuItems",
      get: function get() {
        return this.elements.menuItems;
      }
      /**
       * The menu toggles contained in the menu.
       *
       * @returns {MenuToggle[]} - The menu toggles.
       */

    }, {
      key: "menuToggles",
      get: function get() {
        return this.elements.menuToggles;
      }
      /**
       * The parent menu containing this menu.
       *
       * @returns {Menu|null} - The parent menu.
       */

    }, {
      key: "parentMenu",
      get: function get() {
        return this.elements.parentMenu;
      }
      /**
       * The root menu containing this menu.
       *
       * @returns {Menu|null} - The root menu.
       */

    }, {
      key: "rootMenu",
      get: function get() {
        return this.elements.rootMenu;
      }
      /**
       * The menu's controller toggle.
       *
       * @returns {MenuToggle} - The toggle.
       */

    }, {
      key: "controller",
      get: function get() {
        return this.elements.controller;
      }
      /**
       * The DOM Selectors for the menu.
       *
       * @returns {object} - The DOM Selectors.
       */

    }, {
      key: "selector",
      get: function get() {
        return this.domSelectors;
      }
      /**
       * The focus state of the menu.
       *
       * @returns {string} - The focus state (self, child, none).
       */

    }, {
      key: "currentFocus",
      get: function get() {
        return this.focusState;
      }
      /**
       * The class used for open submenus.
       *
       * @returns {string} - The open class.
       */
      ,

      /**
       * Set the focus state of the menu.
       *
       * @param {string} value - The focus state (self, child, none).
       */
      set: function set(value) {
        var states = ["self", "child", "none"];

        if (!states.includes(value)) {
          throw new Error("Focus state must be 'self', 'child', or 'none'.");
        }

        this.focusState = value;
      }
      /**
       * Set the class used for open submenus.
       *
       * @param {string} value - The open class.
       */

    }, {
      key: "openClass",
      get: function get() {
        return this.submenuOpenClass;
      }
      /**
       * The currently focussed menu item.
       *
       * @returns {MenuItem} - The menu item.
       */
      ,
      set: function set(value) {
        if (typeof value !== "string") {
          throw new TypeError("Class must be a string.");
        }

        this.submenuOpenClass = value;
      }
    }, {
      key: "currentMenuItem",
      get: function get() {
        return this.menuItems[this.focussedChild];
      }
      /**
       * A flag marking the root menu.
       *
       * @returns {boolean} - The top-level flag.
       */

    }, {
      key: "isTopLevel",
      get: function get() {
        return this.root;
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
       * The time delay (in miliseconds) for closing menus if the menu is hoverable.
       *
       * @returns {number} - The delay in ms.
       */

    }, {
      key: "hoverDelay",
      get: function get() {
        return this.delay;
      }
    }]);

    return Menu;
  }();

  return Menu;

}());
