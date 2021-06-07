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
    let name = "element";

    try {
      if (!(element instanceof HTMLElement)) {
        if (typeof element === "object") {
          for (const key in element) {
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
      throw new TypeError(`${name} must be an HTML Element.`);
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

    let name = "value";

    try {
      if (typeof value === "object") {
        for (const key in value) {
          name = key;

          if (typeof value[key] !== "string") throw Error;

          document.querySelector(value[key]);
        }
      } else {
        document.querySelector(value);
      }

      return true;
    } catch (error) {
      throw new TypeError(`${name} must be a valid CSS selector.`);
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
    let name = "value";

    try {
      if (typeof value !== "boolean") {
        if (typeof value === "object") {
          for (const key in value) {
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
      throw new TypeError(`${name} must be a boolean.`);
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
    let name = "value";

    try {
      if (typeof value !== "number") {
        if (typeof value === "object") {
          for (const key in value) {
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
      throw new TypeError(`${name} must be a number.`);
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
    let name = "value";

    try {
      if (typeof value !== "string") {
        if (typeof value === "object") {
          for (const key in value) {
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
      throw new TypeError(`${name} must be a string.`);
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
    let name = "event";

    try {
      if (!(event instanceof Event)) {
        if (typeof event === "object") {
          for (const key in event) {
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
      throw new TypeError(`${name} must be an Event.`);
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
    let name = "event";

    try {
      if (!(event instanceof KeyboardEvent)) {
        if (typeof event === "object") {
          for (const key in event) {
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
      throw new TypeError(`${name} must be a KeyboardEvent.`);
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
    let name = "element";

    try {
      if (!(element instanceof BaseMenu)) {
        if (typeof element === "object") {
          for (const key in element) {
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
      throw new TypeError(
        `${name} must be an instance of either BaseMenu, Menubar, or DisclosureMenu`
      );
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

    const tag = tagName.toLowerCase();

    if (!(element instanceof HTMLElement)) {
      let check = true;

      for (const key in element) {
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
    let name = "element";

    try {
      if (!(element instanceof MenuToggle)) {
        if (typeof element === "object" && !(element instanceof MenuToggle)) {
          for (const key in element) {
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
      throw new TypeError(`${name} must be a MenuToggle.`);
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

    const validStates = ["none", "self", "child"];
    let name = "value";

    try {
      if (typeof value === "object") {
        for (const key in value) {
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
      throw new Error(
        `${name} must be one of the following values: ${validStates.join(", ")}`
      );
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

    const validStates = ["none", "mouse", "keyboard"];
    let name = "value";

    try {
      if (typeof value === "object") {
        for (const key in value) {
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
      throw new Error(
        `${name} must be one of the following values: ${validStates.join(", ")}`
      );
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

    const eventProp = `on${event}`;

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
    let name = "value";

    try {
      if (typeof value !== "string") {
        if (typeof value === "object") {
          for (const key in value) {
            name = key;

            if (typeof value[key] !== "string") {
              if (Array.isArray(value[key])) {
                value[key].forEach(item => {
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
      throw new TypeError(
        `${name} must be either a string or an array of strings.`
      );
    }
  }

  /**
   * A link or button that controls the visibility of a menu.
   */
  class MenuToggle {
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
    constructor({
      menuToggleElement,
      parentElement,
      controlledMenu,
      openClass = "show",
      closeClass = "hide",
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
      this.openClass = openClass || "";
      this.closeClass = closeClass || "";
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
      // Add WAI-ARIA properties.
      this.dom.toggle.setAttribute("aria-haspopup", "true");
      this.dom.toggle.setAttribute("aria-expanded", "false");

      // If the toggle element is a button, there's no need to add a role.
      if (!isTag("button", this.dom.toggle)) {
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
      if (this.closeClass !== "") {
        if (typeof this.closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
        } else if (Array.isArray(this.closeClass)) {
          this.closeClass.forEach(value => {
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
     * The class to apply when the controlled menu is "open".
     *
     * @returns {string} - The class.
     */
    get openClass() {
      return this.controlledMenuOpenClass;
    }

    /**
     * The class to apply when the controlled menu is "closed".
     *
     * @returns {string} - The class.
     */
    get closeClass() {
      return this.controlledMenuCloseClass;
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
     * Set the class to apply when the controlled menu is "open".
     *
     * @param {string} value - The class.
     */
    set openClass(value) {
      isValidClassList({ openClass: value });

      this.controlledMenuOpenClass = value;
    }

    /**
     * Set the class to apply when the controlled menu is "closed".
     *
     * @param {string} value - The class.
     */
    set closeClass(value) {
      isValidClassList({ closeClass: value });

      this.controlledMenuCloseClass = value;
    }

    /**
     * Expands the controlled menu.
     *
     * Alters ARIA attributes and classes.
     */
    expand() {
      this.dom.toggle.setAttribute("aria-expanded", "true");

      // Add the open class
      if (this.openClass !== "") {
        if (typeof this.openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(this.openClass);
        } else if (Array.isArray(this.openClass)) {
          this.openClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      }

      // Remove the close class.
      if (this.closeClass !== "") {
        if (typeof this.closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(this.closeClass);
        } else if (Array.isArray(this.closeClass)) {
          this.closeClass.forEach(value => {
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
      this.dom.toggle.setAttribute("aria-expanded", "false");

      // Add the close class
      if (this.closeClass !== "") {
        if (typeof this.closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(this.closeClass);
        } else if (Array.isArray(this.closeClass)) {
          this.closeClass.forEach(value => {
            this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      }

      // Remove the open class.
      if (this.openClass !== "") {
        if (typeof this.openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(this.openClass);
        } else if (Array.isArray(this.openClass)) {
          this.openClass.forEach(value => {
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
  }

  /**
   * A basic navigation link contained inside of a Menu.
   */
  class MenuItem {
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

      this.initialize();
    }

    /**
     * Initialize the menu item by setting its tab index.
     */
    initialize() {
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

      if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = 0;
      }
    }

    /**
     * Blurs the menu item's link and set proper tabIndex.
     */
    blur() {
      if (this.elements.parentMenu.currentEvent !== "mouse") {
        this.dom.link.blur();
      }

      if (this.isMenubar && this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = -1;
      }
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

      return Object.keys(keys).find(key => keys[key] === true);
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
     * @param {boolean}              [param0.isHoverable = false]         - A flag to allow hover events on the menu.
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
      isHoverable = false,
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
      this.isHoverable = isHoverable;
      this.hoverDelay = hoverDelay;

      this.initialize();
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      // Get the root menu if it doesn't exist.
      if (this.elements.rootMenu === null) this.findRootMenu(this);

      // Set all of the DOM elements.
      this.setDOMElements();

      if (this.isTopLevel) {
        if (this.dom.controller && this.dom.container) {
          // Create a new MenuToggle to control the menu.
          const toggle = new MenuToggle({
            menuToggleElement: this.dom.controller,
            parentElement: this.dom.container,
            controlledMenu: this,
            openClass: this.openClass,
            closeClass: this.closeClass,
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
     * The class to apply when the menu is "open".
     *
     * @returns {string} - The class.
     */
    get openClass() {
      return this.submenuOpenClass;
    }

    /**
     * The class to apply when the menu is "closed".
     *
     * @returns {string} - The class.
     */
    get closeClass() {
      return this.submenuCloseClass;
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
     * @returns {MenuItem} - The menu item.
     */
    get currentMenuItem() {
      return this.elements.menuItems[this.currentChild];
    }

    /**
     * A flag to allow hover events on the menu.
     *
     * @returns {boolean} - The hoverable flag.
     */
    get isHoverable() {
      return this.hoverable;
    }

    /**
     * The delay time (in miliseconds) used for mouseout events to take place.
     *
     * @returns {number} - The delay time.
     */
    get hoverDelay() {
      return this.delay;
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
     * Set the flag to allow hover events on the menu.
     *
     * @param {boolean} value - The hoverable flag.
     */
    set isHoverable(value) {
      isBoolean({ value });

      this.hoverable = value;
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
     *
     * @param {object} MenuType - The menu type for created submenus.
     */
    createChildElements(MenuType = BaseMenu) {
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
            isHoverable: this.isHoverable,
            hoverDelay: this.hoverDelay,
          });

          // Create the new MenuToggle.
          const toggle = new MenuToggle({
            menuToggleElement: toggler,
            parentElement: element,
            controlledMenu: menu,
            openClass: this.openClass,
            closeClass: this.closeClass,
            parentMenu: this,
          });

          // Add the toggle to the list of toggles.
          this.menuElements.submenuToggles.push(toggle);

          // Create a new MenuItem.
          menuItem = new MenuItem({
            menuItemElement: element,
            menuLinkElement: toggler,
            parentMenu: this,
            isSubmenuItem: true,
            childMenu: menu,
            toggle,
          });
        } else {
          const link = element.querySelector(this.selectors.menuLinks);

          // Create a new MenuItem.
          menuItem = new MenuItem({
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
      // Use touch over mouse events when supported.
      const startEventType = isEventSupported("touchstart", this.dom.menu)
        ? "touchstart"
        : "mousedown";
      const endEventType = isEventSupported("touchend", this.dom.menu)
        ? "touchend"
        : "mouseup";

      /**
       * Toggles a toggle element.
       *
       * @param {BaseMenu}       menu   - This menu.
       * @param {BaseMenuToggle} toggle - The menu toggle
       * @param {Event}          event  - A Javascript event.
       */
      function toggleToggle(menu, toggle, event) {
        preventEvent(event);

        toggle.toggle();

        if (toggle.isOpen) {
          menu.focusState = "self";
          toggle.elements.controlledMenu.focusState = "none";
        }
      }

      // Close the menu if a click event happens outside of it.
      document.addEventListener(endEventType, event => {
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

      this.elements.menuItems.forEach((item, index) => {
        // Properly focus the current menu item.
        item.dom.link.addEventListener(startEventType, () => {
          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this.focusChild(index);
        });

        // Properly toggle submenus open and closed.
        if (item.isSubmenuItem) {
          item.elements.toggle.dom.toggle[`on${endEventType}`] = event => {
            this.currentEvent = "mouse";
            toggleToggle(this, item.elements.toggle, event);
          };
        }
      });

      // Open the this menu if it's controller is clicked.
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle[`on${endEventType}`] = event => {
          this.currentEvent = "mouse";
          toggleToggle(this, this.elements.controller, event);
        };
      }
    }

    /**
     * Handles hover events throughout the menu for proper use.
     */
    handleHover() {
      this.elements.submenuToggles.forEach(toggle => {
        toggle.dom.parent.addEventListener("mouseenter", () => {
          if (this.isHoverable) {
            this.currentEvent = "mouse";
            toggle.open();
          }
        });

        toggle.dom.parent.addEventListener("mouseleave", () => {
          if (this.isHoverable) {
            setTimeout(() => {
              this.currentEvent = "mouse";
              toggle.close();
            }, this.hoverDelay);
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

    /**
     * Blurs all children and submenu's children.
     */
    blurChildren() {
      this.elements.menuItems.forEach(menuItem => {
        menuItem.blur();

        if (menuItem.isSubmenuItem) {
          menuItem.elements.childMenu.blurChildren();
        }
      });
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
     * @param {boolean}          [param0.isHoverable = false]         - A flag to allow hover events on the menu.
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
      isHoverable = false,
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
        isHoverable,
        hoverDelay,
      });
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      super.initialize();

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
     * @param {boolean}             [param0.isHoverable = false]         - A flag to allow hover events on the menu.
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
      isHoverable = false,
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
        isHoverable,
        hoverDelay,
      });

      this.currentChild = -1;
    }

    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */
    initialize() {
      super.initialize();

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
