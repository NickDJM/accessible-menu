var AccessibleMenu = (function () {
  'use strict';

  function _typeof$9(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$9 = function _typeof(obj) { return typeof obj; }; } else { _typeof$9 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$9(obj); }

  /**
   * Check to see if the provided elements have a specific contructor.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * This is essentially just a wrapper function around checking instanceof with
   * more descriptive error message to help debugging.
   *
   * Will return true is the check is successful.
   *
   * @param   {object} contructor - The constructor to check for.
   * @param   {object} elements   - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */
  function isValidInstance(contructor, elements) {
    try {
      if (_typeof$9(elements) !== "object") {
        var elementsType = _typeof$9(elements);

        throw new TypeError("AccessibleMenu: Elements given to isValidInstance() must be inside of an object. ".concat(elementsType, " given."));
      }

      for (var key in elements) {
        if (!(elements[key] instanceof contructor)) {
          var elementType = _typeof$9(elements[key]);

          throw new TypeError("AccessibleMenu: ".concat(key, " must be an instance of ").concat(contructor.name, ". ").concat(elementType, " given."));
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  /**
   * Check to see if the provided values are of a specific type.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * This is essentially just a wrapper function around checking typeof with
   * more descriptive error message to help debugging.
   *
   * Will return true is the check is successful.
   *
   * @param   {string} type   - The type to check for.
   * @param   {object} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidType(type, values) {
    try {
      if (_typeof$9(values) !== "object") {
        var valuesType = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isValidType() must be inside of an object. ".concat(valuesType, " given."));
      }

      for (var key in values) {
        var valueType = _typeof$9(values[key]);

        if (valueType !== type) {
          throw new TypeError("AccessibleMenu: ".concat(key, " must be a ").concat(type, ". ").concat(valueType, " given."));
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
   * @param   {object.<string>} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isCSSSelector(values) {
    try {
      if (_typeof$9(values) !== "object") {
        var type = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isCSSSelector() must be inside of an object. ".concat(type, " given."));
      }

      for (var key in values) {
        try {
          if (values[key] === null) {
            throw new Error();
          }

          document.querySelector(values[key]);
        } catch (error) {
          throw new TypeError("AccessibleMenu: ".concat(key, " must be a valid CSS selector. \"").concat(values[key], "\" given."));
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  /**
   * Checks to see if the provided value is either a string or an array of strings.
   *
   * The values must be provided inside of an object
   * so the variable name can be retrieved in case of errors.
   *
   * Will return true is the check is successful.
   *
   * @param   {object.<string,string[]>} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidClassList(values) {
    try {
      if (_typeof$9(values) !== "object" || Array.isArray(values)) {
        var type = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isValidClassList() must be inside of an object. ".concat(type, " given."));
      }

      var _loop = function _loop(key) {
        var type = _typeof$9(values[key]);

        if (type !== "string") {
          if (Array.isArray(values[key])) {
            values[key].forEach(function (value) {
              if (typeof value !== "string") {
                throw new TypeError("AccessibleMenu: ".concat(key, " must be a string or an array of strings. An array containing non-strings given."));
              }
            });
          } else {
            throw new TypeError("AccessibleMenu: ".concat(key, " must be a string or an array of strings. ").concat(type, " given."));
          }
        } else {
          var obj = {};
          obj[key] = values[key];
          isCSSSelector(obj);
        }
      };

      for (var key in values) {
        _loop(key);
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
   * @param   {object.<string>} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidState(values) {
    try {
      if (_typeof$9(values) !== "object") {
        var type = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isValidState() must be inside of an object. ".concat(type, " given."));
      }

      var validStates = ["none", "self", "child"];

      for (var key in values) {
        if (!validStates.includes(values[key])) {
          throw new TypeError("AccessibleMenu: ".concat(key, " must be one of the following values: ").concat(validStates.join(", "), ". \"").concat(values[key], "\" given."));
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
   * @param   {object.<string>} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidEvent(values) {
    try {
      if (_typeof$9(values) !== "object") {
        var type = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isValidEvent() must be inside of an object. ".concat(type, " given."));
      }

      var validEvents = ["none", "mouse", "keyboard", "character"];

      for (var key in values) {
        if (!validEvents.includes(values[key])) {
          throw new TypeError("AccessibleMenu: ".concat(key, " must be one of the following values: ").concat(validEvents.join(", "), ". \"").concat(values[key], "\" given."));
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
   * @param   {object.<string>} values - The value(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isValidHoverType(values) {
    try {
      if (_typeof$9(values) !== "object") {
        var type = _typeof$9(values);

        throw new TypeError("AccessibleMenu: Values given to isValidHoverType() must be inside of an object. ".concat(type, " given."));
      }

      var validTypes = ["off", "on", "dynamic"];

      for (var key in values) {
        if (!validTypes.includes(values[key])) {
          throw new TypeError("AccessibleMenu: ".concat(key, " must be one of the following values: ").concat(validTypes.join(", "), ". \"").concat(values[key], "\" given."));
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
   * @param   {string}                tagName  - The name of the tag.
   * @param   {object.<HTMLEelement>} elements - The element(s) to check.
   *
   * @returns {boolean} - The result of the check.
   */

  function isTag(tagName, elements) {
    if (isValidType("string", {
      tagName: tagName
    }) && isValidInstance(HTMLElement, elements)) {
      var tag = tagName.toLowerCase();
      var check = true;

      for (var key in elements) {
        if (elements[key].tagName.toLowerCase() !== tag) check = false;
      }

      return check;
    } else {
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
    if (isValidType("string", {
      event: event
    }) && isValidInstance(HTMLElement, {
      element: element
    })) {
      var eventProp = "on".concat(event);
      return typeof element[eventProp] !== "undefined";
    } else {
      return false;
    }
  }

  function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$2(); }

  function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

  function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }

  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); return Constructor; }
  /**
   * A link or button that controls the visibility of a [BaseMenu]{@link BaseMenu.md}.
   */

  var BaseMenuToggle = /*#__PURE__*/function () {
    /**
     * @inheritdoc
     *
     * @param {object}        options                     - The options for generating the menu toggle.
     * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
     * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
     * @param {BaseMenu}      options.controlledMenu      - The menu controlled by this toggle.
     * @param {BaseMenu|null} [options.parentMenu = null] - The menu containing this toggle.
     */
    function BaseMenuToggle(_ref) {
      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu;

      _classCallCheck$b(this, BaseMenuToggle);

      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement
      };
      this.menuElements = {
        controlledMenu: controlledMenu,
        parentMenu: parentMenu
      };
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
    }
    /**
     * Initialize the toggle by ensuring WAI-ARIA values are set, handling click events, and adding new keydown events.
     *
     * Initialize does a lot of setup on the menu toggle.
     *
     * The most basic setup steps are to ensure that the toggle has `aria-haspopup` set to `"true"`, `aria-expanded` initially set to `"false"` and, if the toggle element is not a `<button>`, set the `role` to `"button"`.
     *
     * The next step to the initialization is to ensure both the toggle and the menu it controlls have IDs.
     *
     * If they do not, the following steps take place:
     * - Generate a random 10 character string,
     * - Get the innerText of the toggle,
     * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
     * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
     *
     * Once the ID's have been generated, the menu's "aria-labelledby" is set to the toggle's ID, and the toggle's "aria-controls" is set to the menu's ID.
     *
     * Finally, the collapse method is called to make sure the submenu is closed.
     */


    _createClass$9(BaseMenuToggle, [{
      key: "initialize",
      value: function initialize() {
        // Add WAI-ARIA properties.
        this.dom.toggle.setAttribute("aria-haspopup", "true");
        this.dom.toggle.setAttribute("aria-expanded", "false"); // If the toggle element is a button, there's no need to add a role.

        if (!isTag("button", {
          toggle: this.dom.toggle
        })) {
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
        this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id); // Make sure the menu is collapsed on initialization, but do not emit the collapse event.

        this.collapse(false);
      }
      /**
       * The DOM elements within the toggle.
       *
       * @type {object.<HTMLElement>}
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The elements within the toggle.
       *
       * @type {object.<BaseMenu>}
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * The open state on the menu.
       *
       * @type {boolean}
       */

    }, {
      key: "isOpen",
      get: function get() {
        return this.show;
      },
      set: function set(value) {
        isValidType("boolean", {
          value: value
        });
        this.show = value;
      }
      /**
       * Expands the controlled menu.
       *
       * Sets the toggle's `aria-expanded` to `"true"`, adds the open class to the toggle's parent menu item and controlled menu, and removed the closed class from the toggle's parent menu item and controlled menu.
       *
       * If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuExpand` which bubbles and contains the toggle object in `event.detail`.
       *
       * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
       */

    }, {
      key: "expand",
      value: function expand() {
        var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var _this$elements$contro = this.elements.controlledMenu,
            closeClass = _this$elements$contro.closeClass,
            openClass = _this$elements$contro.openClass;
        this.dom.toggle.setAttribute("aria-expanded", "true"); // Add the open class

        if (openClass !== "") {
          if (typeof openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(openClass);
          } else {
            var _this$elements$contro2;

            (_this$elements$contro2 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro2, _toConsumableArray$2(openClass));
          }
        } // Remove the close class.


        if (closeClass !== "") {
          if (typeof closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
          } else {
            var _this$elements$contro3;

            (_this$elements$contro3 = this.elements.controlledMenu.dom.menu.classList).remove.apply(_this$elements$contro3, _toConsumableArray$2(closeClass));
          }
        }

        if (emit) {
          this.dom.toggle.dispatchEvent(this.expandEvent);
        }
      }
      /**
       * Collapses the controlled menu.
       *
       * Sets the toggle's `aria-expanded` to `"false"`, adds the closed class to the toggle's parent menu item and controlled menu, and removed the open class from the toggle's parent menu item and controlled menu.
       *
       * If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuCollapse` which bubbles and contains the toggle object in `event.detail`.
       *
       * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
       */

    }, {
      key: "collapse",
      value: function collapse() {
        var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var _this$elements$contro4 = this.elements.controlledMenu,
            closeClass = _this$elements$contro4.closeClass,
            openClass = _this$elements$contro4.openClass;
        this.dom.toggle.setAttribute("aria-expanded", "false"); // Add the close class

        if (closeClass !== "") {
          if (typeof closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(closeClass);
          } else {
            var _this$elements$contro5;

            (_this$elements$contro5 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro5, _toConsumableArray$2(closeClass));
          }
        } // Remove the open class.


        if (openClass !== "") {
          if (typeof openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(openClass);
          } else {
            var _this$elements$contro6;

            (_this$elements$contro6 = this.elements.controlledMenu.dom.menu.classList).remove.apply(_this$elements$contro6, _toConsumableArray$2(openClass));
          }
        }

        if (emit) {
          this.dom.toggle.dispatchEvent(this.collapseEvent);
        }
      }
      /**
       * Opens the controlled menu.
       *
       * Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`,
       * calls {@link expand}, and sets {@link isOpen} to `true`.
       */

    }, {
      key: "open",
      value: function open() {
        // Set proper focus states to parent & child.
        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "child";
        }

        this.elements.controlledMenu.focusState = "self"; // Expand the controlled menu.

        this.expand(); // Set the open flag.

        this.isOpen = true;
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       *
       * Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`, and calls {@link expand}
       */

    }, {
      key: "preview",
      value: function preview() {
        // Set proper focus states to parent & child.
        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        }

        this.elements.controlledMenu.focusState = "none"; // Expand the controlled menu.

        this.expand(); // Set the open flag.

        this.isOpen = true;
      }
      /**
       * Closes the controlled menu.
       *
       * Sets the controlled menu's focus state to `"none"` and the parent menu's focus state to `"self"`,
       * blurs the controlled menus and sets it's current child index to 0,
       * calls {@link collapse}, and sets {@link isOpen} to `false`.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Reset controlled menu.
          this.elements.controlledMenu.currentChild = 0;
          this.elements.controlledMenu.blur(); // Set proper focus states to parent & child.

          if (this.elements.parentMenu) {
            this.elements.parentMenu.focusState = "self";
          }

          this.elements.controlledMenu.focusState = "none"; // Collapse the controlled menu.

          this.collapse(); // Set the open flag.

          this.isOpen = false;
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

        if (this.elements.parentMenu) {
          this.elements.parentMenu.elements.submenuToggles.forEach(function (toggle) {
            if (toggle !== _this) toggle.close();
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

    return BaseMenuToggle;
  }();

  function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); return Constructor; }

  /* eslint-disable jsdoc/no-undefined-types */

  /**
   * A basic navigation link contained inside of a [BaseMenu]{@link BaseMenu.md}.
   */
  var BaseMenuItem = /*#__PURE__*/function () {
    /**
     * @inheritdoc
     *
     * @param {object}          options                         - The options for generating the menu item.
     * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
     * @param {BaseMenu}        options.parentMenu              - The parent menu.
     * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
     * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
     */
    function BaseMenuItem(_ref) {
      var menuItemElement = _ref.menuItemElement,
          menuLinkElement = _ref.menuLinkElement,
          parentMenu = _ref.parentMenu,
          _ref$isSubmenuItem = _ref.isSubmenuItem,
          isSubmenuItem = _ref$isSubmenuItem === void 0 ? false : _ref$isSubmenuItem,
          _ref$childMenu = _ref.childMenu,
          childMenu = _ref$childMenu === void 0 ? null : _ref$childMenu,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? null : _ref$toggle;

      _classCallCheck$a(this, BaseMenuItem);

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
    }
    /**
     * Initialize the menu item.
     */


    _createClass$8(BaseMenuItem, [{
      key: "initialize",
      value: function initialize() {}
      /**
       * The DOM elements within the menu item.
       *
       * @type {object.<HTMLElement>}
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The elements within the menu item.
       *
       * @type {object.<BaseMenu,BaseMenuToggle>}
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * A flag marking a submenu item.
       *
       * @type {boolean}
       */

    }, {
      key: "isSubmenuItem",
      get: function get() {
        return this.isController;
      }
      /**
       * Focuses the menu item's link if triggering event is valid.
       */

    }, {
      key: "focus",
      value: function focus() {
        if (this.elements.parentMenu.shouldFocus) {
          this.dom.link.focus();
        }
      }
      /**
       * Blurs the menu item's link if triggering event is valid.
       */

    }, {
      key: "blur",
      value: function blur() {
        if (this.elements.parentMenu.shouldFocus) {
          this.dom.link.blur();
        }
      }
    }]);

    return BaseMenuItem;
  }();

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
        Character: isNaN(key) && !!key.match(/^[a-zA-Z]{1}$/),
        Tab: key === "Tab" || key === 9,
        Asterisk: key === "*" || key === 56
      };
      return Object.keys(keys).find(function (key) {
        return keys[key] === true;
      }) || "";
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

  function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }

  function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); return Constructor; }
  /**
   * An accessible navigation element in the DOM.
   *
   * This is intended to be used as a "base" to other menus and not to be used on it's own in the DOM.
   * Use a [DisclosureMenu]{@link DisclosureMenu.md}, [Menubar]{@link Menubar.md}, or [Treeview]{@link Treeview.md} instead.
   */

  var BaseMenu = /*#__PURE__*/function () {
    /**
     * @inheritdoc
     *
     * @param {object}                 options                             - The options for generating the menu.
     * @param {HTMLElement}            options.menuElement                 - The menu element in the DOM.
     * @param {string}                 [options.menuItemSelector = li]     - The CSS selector string for menu items.
     * @param {string}                 [options.menuLinkSelector = a]      - The CSS selector string for menu links.
     * @param {string}                 [options.submenuItemSelector]       - The CSS selector string for menu items containing submenus.
     * @param {string}                 [options.submenuToggleSelector = a] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}                 [options.submenuSelector = ul]      - The CSS selector string for submenus.
     * @param {?HTMLElement}           [options.controllerElement = null]  - The element controlling the menu in the DOM.
     * @param {?HTMLElement}           [options.containerElement = null]   - The element containing the menu in the DOM.
     * @param {?(string|string[])}     [options.openClass = show]          - The class to apply when a menu is "open".
     * @param {?(string|string[])}     [options.closeClass = hide]         - The class to apply when a menu is "closed".
     * @param {boolean}                [options.isTopLevel = false]        - A flag to mark the root menu.
     * @param {?BaseMenu}              [options.parentMenu = null]         - The parent menu to this menu.
     * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
     * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
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
          _ref$hoverType = _ref.hoverType,
          hoverType = _ref$hoverType === void 0 ? "off" : _ref$hoverType,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

      _classCallCheck$9(this, BaseMenu);

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
      this.submenuOpenClass = openClass || "";
      this.submenuCloseClass = closeClass || "";
      this.root = isTopLevel;
      this.focussedChild = 0;
      this.state = "none";
      this.event = "none";
      this.hover = hoverType;
      this.delay = hoverDelay; // Set default class types.

      this.MenuType = BaseMenu;
      this.MenuItemType = BaseMenuItem;
      this.MenuToggleType = BaseMenuToggle;
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     *
     * @throws {Error} Will throw an Error if the validate method returns `false`.
     */


    _createClass$7(BaseMenu, [{
      key: "initialize",
      value: function initialize() {
        if (!this.validate()) {
          throw new Error("AccesibleMenu: cannot initialize menu. See other error messaged for more information.");
        }

        var MenuToggleType = this.MenuToggleType; // Get the root menu if it doesn't exist.

        if (this.elements.rootMenu === null) this.findRootMenu(this); // Set all of the DOM elements.

        this.setDOMElements();

        if (this.isTopLevel) {
          if (this.dom.controller && this.dom.container) {
            // Create a new BaseMenuToggle to control the menu.
            var toggle = new MenuToggleType({
              menuToggleElement: this.dom.controller,
              parentElement: this.dom.container,
              controlledMenu: this
            });
            this.menuElements.controller = toggle;
          }
        }

        this.createChildElements();
      }
      /**
       * The DOM elements within the menu.
       *
       * @type {object.<HTMLElement,HTMLElement[]>}
       */

    }, {
      key: "dom",
      get: function get() {
        return this.domElements;
      }
      /**
       * The CSS selectors available to the menu.
       *
       * @type {object.<string>}
       */

    }, {
      key: "selectors",
      get: function get() {
        return this.domSelectors;
      }
      /**
       * The elements within the menu.
       *
       * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
       */

    }, {
      key: "elements",
      get: function get() {
        return this.menuElements;
      }
      /**
       * The class(es) to apply when the menu is "open".
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's open class(es).
       *
       * @type {string|string[]}
       */

    }, {
      key: "openClass",
      get: function get() {
        return this.isTopLevel ? this.submenuOpenClass : this.elements.rootMenu.openClass;
      }
      /**
       * The class(es) to apply when the menu is "closed".
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's close class(es).
       *
       * @type {string|string[]}
       */
      ,
      set: function set(value) {
        isValidClassList({
          openClass: value
        });

        if (this.submenuOpenClass !== value) {
          this.submenuOpenClass = value;
        }
      }
    }, {
      key: "closeClass",
      get: function get() {
        return this.isTopLevel ? this.submenuCloseClass : this.elements.rootMenu.closeClass;
      }
      /**
       * A flag marking the root menu.
       *
       * @type {boolean}
       */
      ,
      set: function set(value) {
        isValidClassList({
          closeClass: value
        });

        if (this.submenuCloseClass !== value) {
          this.submenuCloseClass = value;
        }
      }
    }, {
      key: "isTopLevel",
      get: function get() {
        return this.root;
      }
      /**
       * The index of the currently selected menu item in the menu.
       *
       * - Attempting to set a value < -1 will set the `currentChild` to -1.
       * - Attempting to set a value >= the number of menu items will set the `currentChild` to the number of menu items - 1.
       *
       * If the current menu has a parent menu _and_ the menu's current event is `"mouse"`,
       * The parent menu will have it's current child updated as well to help with transitioning
       * between mouse and keyboard naviation.
       *
       * @type {number}
       */

    }, {
      key: "currentChild",
      get: function get() {
        return this.focussedChild;
      }
      /**
       * The current state of the menu's focus.
       *
       * @type {string}
       */
      ,
      set: function set(value) {
        isValidType("number", {
          value: value
        });
        /**
         * Update the parent menu's current child to make sure clicks
         * and other jumps don't interfere with keyboard navigation.
         *
         * @param {BaseMenu} menu - The initial menu.
         */

        function setParentChild(menu) {
          var updateEvents = ["mouse", "character"];

          if (updateEvents.includes(menu.currentEvent) && menu.elements.parentMenu) {
            var index = 0;
            var found = false;

            while (!found && index < menu.elements.parentMenu.elements.menuItems.length) {
              var menuItem = menu.elements.parentMenu.elements.menuItems[index];

              if (menuItem.isSubmenuItem && menuItem.elements.toggle.elements.controlledMenu === menu) {
                found = true;
                menu.elements.parentMenu.currentEvent = menu.currentEvent;
                menu.elements.parentMenu.currentChild = index;
              }

              index++;
            }
          }
        }

        if (value < -1) {
          this.focussedChild = -1;
          setParentChild(this);
        } else if (value >= this.elements.menuItems.length) {
          this.focussedChild = this.elements.menuItems.length - 1;
          setParentChild(this);
        } else if (this.focusChild !== value) {
          this.focussedChild = value;
          setParentChild(this);
        }
      }
    }, {
      key: "focusState",
      get: function get() {
        return this.state;
      }
      /**
       * This last event triggered on the menu.
       *
       * @type {string}
       */
      ,
      set: function set(value) {
        isValidState({
          value: value
        });

        if (this.state !== value) {
          this.state = value;
        }
      }
    }, {
      key: "currentEvent",
      get: function get() {
        return this.event;
      }
      /**
       * The currently selected menu item.
       *
       * @type {BaseMenuItem}
       */
      ,
      set: function set(value) {
        isValidEvent({
          value: value
        });

        if (this.event !== value) {
          this.event = value;

          if (this.elements.submenuToggles.length > 0) {
            this.elements.submenuToggles.forEach(function (submenuToggle) {
              submenuToggle.elements.controlledMenu.currentEvent = value;
            });
          }
        }
      }
    }, {
      key: "currentMenuItem",
      get: function get() {
        return this.elements.menuItems[this.currentChild];
      }
      /**
       * The type of hoverability for the menu.
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's hoverability.
       *
       * @type {string}
       */

    }, {
      key: "hoverType",
      get: function get() {
        return this.root ? this.hover : this.elements.rootMenu.hoverType;
      }
      /**
       * The delay time (in miliseconds) used for mouseout events to take place.
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's hover delay.
       *
       * @type {number}
       */
      ,
      set: function set(value) {
        isValidHoverType({
          value: value
        });

        if (this.hover !== value) {
          this.hover = value;
        }
      }
    }, {
      key: "hoverDelay",
      get: function get() {
        return this.root ? this.delay : this.elements.rootMenu.hoverDelay;
      }
      /**
       * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
       *
       * Will return false unless any of the following criteria are met:
       * - The menu's `currentEvent` is `"keyboard"`.
       * - The menu's `currentEvent` is `"character"`.
       * - The menu's `currentEvent` is `"mouse"` _and_ the menu's `hoverType` is `"dynamic"`.
       *
       * @type {boolean}
       */
      ,
      set: function set(value) {
        isValidType("number", {
          value: value
        });

        if (this.delay !== value) {
          this.delay = value;
        }
      }
      /**
       * Validates all aspects of the menu to ensure proper functionality.
       *
       * @returns {boolean} - The result of the validation.
       */

    }, {
      key: "shouldFocus",
      get: function get() {
        var check = false;

        if (this.currentEvent === "keyboard" || this.currentEvent === "character") {
          check = true;
        }

        if (this.currentEvent === "mouse" && this.hoverType === "dynamic") {
          check = true;
        }

        return check;
      }
    }, {
      key: "validate",
      value: function validate() {
        var domElements = this.domElements,
            domSelectors = this.domSelectors,
            menuElements = this.menuElements,
            submenuOpenClass = this.submenuOpenClass,
            submenuCloseClass = this.submenuCloseClass,
            root = this.root,
            hover = this.hover,
            delay = this.delay;
        var check = true;

        if (domElements.container !== null || domElements.controller !== null) {
          if (!isValidInstance(HTMLElement, {
            menuElement: domElements.menu,
            controllerElement: domElements.controller,
            containerElement: domElements.container
          })) {
            check = false;
          }
        } else if (!isValidInstance(HTMLElement, {
          menuElement: domElements.menu
        })) {
          check = false;
        }

        if (domSelectors.submenuItems !== "") {
          if (!isCSSSelector({
            menuItemSelector: domSelectors.menuItems,
            menuLinkSelector: domSelectors.menuLinks,
            submenuItemSelector: domSelectors.submenuItems,
            submenuToggleSelector: domSelectors.submenuToggles,
            submenuSelector: domSelectors.submenus
          })) {
            check = false;
          }
        } else if (!isCSSSelector({
          menuItemSelector: domSelectors.menuItems,
          menuLinkSelector: domSelectors.menuLinks
        })) {
          check = false;
        }

        if (submenuOpenClass !== "" && !isValidClassList({
          openClass: submenuOpenClass
        })) {
          check = false;
        }

        if (submenuCloseClass !== "" && !isValidClassList({
          closeClass: submenuCloseClass
        })) {
          check = false;
        }

        if (!isValidType("boolean", {
          isTopLevel: root
        })) {
          check = false;
        }

        if (menuElements.parentMenu !== null && !isValidInstance(BaseMenu, {
          parentMenu: menuElements.parentMenu
        })) {
          check = false;
        }

        if (!isValidHoverType({
          hoverType: hover
        })) {
          check = false;
        }

        if (!isValidType("number", {
          hoverDelay: delay
        })) {
          check = false;
        }

        return check;
      }
      /**
       * Sets DOM elements within the menu.
       *
       * This will set the actual `domElement` property, so all existing items in a given `domElement` property will be removed when this is run.
       *
       * @param {string}      elementType - The type of element to populate.
       * @param {HTMLElement} base        - The element used as the base for the querySelect.
       * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
       */

    }, {
      key: "setDOMElementType",
      value: function setDOMElementType(elementType, base, filter) {
        if (typeof this.selectors[elementType] === "string") {
          if (base) isValidInstance(HTMLElement, {
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
       * This is an additive function, so existing items in a given `domElement` property will not be touched.
       *
       * @param {string}      elementType - The type of element to populate.
       * @param {HTMLElement} base        - The element used as the base for the querySelect.
       * @param {Function}    filter      - A filter to use to narrow down the DOM elements selected.
       */

    }, {
      key: "addDOMElementType",
      value: function addDOMElementType(elementType, base, filter) {
        if (typeof this.selectors[elementType] === "string") {
          if (base) isValidInstance(HTMLElement, {
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
              this.domElements[elementType] = [].concat(_toConsumableArray$1(this.domElements[elementType]), _toConsumableArray$1(domElements.filter(function (item) {
                return filter(item);
              })));
            } else {
              this.domElements[elementType] = [].concat(_toConsumableArray$1(this.domElements[elementType]), _toConsumableArray$1(domElements));
            }
          } else {
            this.domElements[elementType] = [].concat(_toConsumableArray$1(this.domElements[elementType]), _toConsumableArray$1(domElements.filter(function (item) {
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
       *
       * Utiliizes {@link setDOMElementType}, {@link clearDOMElementType}, and {@link addDOMElementType}.
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
       */

    }, {
      key: "createChildElements",
      value: function createChildElements() {
        var _this2 = this;

        var MenuType = this.MenuType,
            MenuItemType = this.MenuItemType,
            MenuToggleType = this.MenuToggleType;
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
              hoverType: _this2.hoverType,
              hoverDelay: _this2.hoverDelay
            }); // Create the new menu toggle.

            var toggle = new MenuToggleType({
              menuToggleElement: toggler,
              parentElement: element,
              controlledMenu: menu,
              parentMenu: _this2
            }); // Add the toggle to the list of toggles.

            _this2.menuElements.submenuToggles.push(toggle); // Create a new menu item.


            menuItem = new MenuItemType({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this2,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this2.selectors.menuLinks); // Create a new menu item.

            menuItem = new MenuItemType({
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
       *
       * - Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu to a "self" focus state, any parent menu to a "child" focus state, and any child menu to a "none" focus state.
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
       *
       * Depending on what is supported either `touchstart` and `touchend` or `mousedown` and `mouseup` will be used for all "click" event handling.
       *
       * - Adds a `touchend`/`mouseup` listener to the document so if the user clicks outside of the menu when it is open, the menu will close.
       * - Adds a `touchstart`/`mousedown` listener to every menu item that will blur all menu items in the entire menu structure (starting at the root menu) and then properly focus the clicked item.
       * - Adds a `touchend`/`mouseup` listener to every submenu item that will properly toggle the submenu open/closed.
       * - Adds a `touchend`/`mouseup` listener to the menu's controller (if the menu is the root menu) so when it is clicked it will properly toggle open/closed.
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

        this.elements.menuItems.forEach(function (item, index) {
          // Properly focus the current menu item.
          item.dom.link.addEventListener(startEventType, function () {
            _this4.currentEvent = "mouse";

            _this4.elements.rootMenu.blurChildren();

            _this4.focusChild(index);
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
       *
       * Adds `mouseenter` listeners to all menu items and `mouseleave` listeners to all submenu items which function differently depending on the menu's {@link hoverType}.
       *
       * *Hover Type "on"*
       * - When a `mouseenter` event triggers on any menu item the menu's {@link currentChild} value will change to that menu item.
       * - When a `mouseenter` event triggers on a submenu item the `preview()` method for the submenu item's toggle will be called.
       * - When a `mouseleave` event triggers on an open submenu item the `close()` method for the submenu item's toggle will be called after a delay set by the menu's {@link hoverDelay}.
       *
       * *Hover Type "dynamic"*
       * - When a `mouseenter` event triggers on any menu item the menu's {@link currentChild} value will change to that menu item.
       * - When a `mouseenter` event triggers on any menu item, and the menu's {@link focusState} is not `"none"`, the menu item will be focused.
       * - When a `mouseenter` event triggers on a submenu item, and a submenu is already open, the `preview()` method for the submenu item's toggle will be called.
       * - When a `mouseenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
       * - When a `mouseleave` event triggers on an open submenu item that is not a root-level submenu item the `close()` method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's {@link hoverDelay}.
       * - When a `mouseleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.
       *
       * *Hover Type "off"*
       * All `mouseenter` and `mouseleave` events are ignored.
       */

    }, {
      key: "handleHover",
      value: function handleHover() {
        var _this5 = this;

        this.elements.menuItems.forEach(function (menuItem, index) {
          menuItem.dom.link.addEventListener("mouseenter", function () {
            if (_this5.hoverType === "on") {
              _this5.currentEvent = "mouse";
              _this5.currentChild = index;

              if (menuItem.isSubmenuItem) {
                menuItem.elements.toggle.preview();
              }
            } else if (_this5.hoverType === "dynamic") {
              var isOpen = _this5.elements.submenuToggles.some(function (toggle) {
                return toggle.isOpen;
              });

              _this5.currentChild = index;

              if (!_this5.isTopLevel || _this5.focusState !== "none") {
                _this5.currentEvent = "mouse";

                _this5.focusCurrentChild();
              }

              if (menuItem.isSubmenuItem && (!_this5.isTopLevel || isOpen)) {
                _this5.currentEvent = "mouse";
                menuItem.elements.toggle.preview();
              }
            }
          });

          if (menuItem.isSubmenuItem) {
            menuItem.dom.item.addEventListener("mouseleave", function () {
              if (_this5.hoverType === "on") {
                setTimeout(function () {
                  _this5.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                }, _this5.hoverDelay);
              } else if (_this5.hoverType === "dynamic") {
                if (!_this5.isTopLevel) {
                  setTimeout(function () {
                    _this5.currentEvent = "mouse";
                    menuItem.elements.toggle.close();

                    _this5.focusCurrentChild();
                  }, _this5.hoverDelay);
                }
              }
            });
          }
        });
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       *
       * This method exists to assit the {@link handleKeyup} method.
       *
       * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
       *   - Blocks propagation on `Space`, `Enter`, and `Escape` keys.
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
       *
       * - Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
       *   - Opens the menu when the user hits `Space` or `Enter`.
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
       *
       * Sets the menu's {@link focusState} to `"self"` and focusses the menu if the menu's {@link shouldFocus} vallue is `true`.
       */

    }, {
      key: "focus",
      value: function focus() {
        this.focusState = "self";

        if (this.shouldFocus) {
          this.dom.menu.focus();
        }
      }
      /**
       * Unfocus the menu.
       *
       * Sets the menu's {@link focusState} to `"none"` and blurs the menu if the menu's {@link shouldFocus} vallue is `true`.
       */

    }, {
      key: "blur",
      value: function blur() {
        this.focusState = "none";

        if (this.shouldFocus) {
          this.dom.menu.blur();
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
       * Focuses the menu's child at a given index.
       *
       * @param {number} index - The index of the child to focus.
       */

    }, {
      key: "focusChild",
      value: function focusChild(index) {
        this.blurCurrentChild();
        this.currentChild = index;
        this.focusCurrentChild();
      }
      /**
       * Focues the menu's first child.
       */

    }, {
      key: "focusFirstChild",
      value: function focusFirstChild() {
        this.focusChild(0);
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusLastChild",
      value: function focusLastChild() {
        this.focusChild(this.elements.menuItems.length - 1);
      }
      /**
       * Focus the menu's next child.
       */

    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
        if (this.currentChild < this.elements.menuItems.length - 1) {
          this.focusChild(this.currentChild + 1);
        } else {
          this.focusCurrentChild();
        }
      }
      /**
       * Focus the menu's previous child.
       */

    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        if (this.currentChild > 0) {
          this.focusChild(this.currentChild - 1);
        } else {
          this.focusCurrentChild();
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
       * Focus the menu's controller.
       */

    }, {
      key: "focusController",
      value: function focusController() {
        if (this.dom.controller) {
          if (this.shouldFocus) {
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
          if (this.shouldFocus) {
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

  function _typeof$8(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$8(subClass, superClass); }

  function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf$8(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$8(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$8(this, result); }; }

  function _possibleConstructorReturn$8(self, call) { if (call && (_typeof$8(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$8(self); }

  function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$8(o) { _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$8(o); }
  /**
   * A basic navigation link contained inside of a [DisclosureMenu]{@link DisclousreMenu.md}.
   *
   * @augments BaseMenuItem
   */

  var DisclosureMenuItem = /*#__PURE__*/function (_BaseMenuItem) {
    _inherits$8(DisclosureMenuItem, _BaseMenuItem);

    var _super = _createSuper$8(DisclosureMenuItem);

    /**
     * @inheritdoc
     *
     * @param {object}                    options                         - The options for generating the menu item.
     * @param {HTMLElement}               options.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}               options.menuLinkElement         - The menu item's link in the DOM.
     * @param {DisclosureMenu}            options.parentMenu              - The parent menu.
     * @param {boolean}                   [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {DisclosureMenu|null}       [options.childMenu = null]      - The child menu.
     * @param {DisclosureMenuToggle|null} [options.toggle = null]         - The controller for the child menu.
     * @param {boolean}                   [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
     */
    function DisclosureMenuItem(_ref) {
      var _this;

      var menuItemElement = _ref.menuItemElement,
          menuLinkElement = _ref.menuLinkElement,
          parentMenu = _ref.parentMenu,
          _ref$isSubmenuItem = _ref.isSubmenuItem,
          isSubmenuItem = _ref$isSubmenuItem === void 0 ? false : _ref$isSubmenuItem,
          _ref$childMenu = _ref.childMenu,
          childMenu = _ref$childMenu === void 0 ? null : _ref$childMenu,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? null : _ref$toggle,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$8(this, DisclosureMenuItem);

      _this = _super.call(this, {
        menuItemElement: menuItemElement,
        menuLinkElement: menuLinkElement,
        parentMenu: parentMenu,
        isSubmenuItem: isSubmenuItem,
        childMenu: childMenu,
        toggle: toggle
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }

    return DisclosureMenuItem;
  }(BaseMenuItem);

  function _typeof$7(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); return Constructor; }

  function _get$6(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$6 = Reflect.get; } else { _get$6 = function _get(target, property, receiver) { var base = _superPropBase$6(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$6(target, property, receiver || target); }

  function _superPropBase$6(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$7(object); if (object === null) break; } return object; }

  function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$7(subClass, superClass); }

  function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf$7(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$7(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$7(this, result); }; }

  function _possibleConstructorReturn$7(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$7(self); }

  function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$7(o) { _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$7(o); }
  /**
   * A link or button that controls the visibility of a [DisclosureMenu]{@link DisclousreMenu.md}.
   *
   * @augments BaseMenuToggle
   */

  var DisclosureMenuToggle = /*#__PURE__*/function (_BaseMenuToggle) {
    _inherits$7(DisclosureMenuToggle, _BaseMenuToggle);

    var _super = _createSuper$7(DisclosureMenuToggle);

    /**
     * @inheritdoc
     *
     * @param {object}              options                     - The options for generating the menu toggle.
     * @param {HTMLElement}         options.menuToggleElement   - The toggle element in the DOM.
     * @param {HTMLElement}         options.parentElement       - The element containing the controlled menu.
     * @param {DisclosureMenu}      options.controlledMenu      - The menu controlled by this toggle.
     * @param {DisclosureMenu|null} [options.parentMenu = null] - The menu containing this toggle.
     * @param {boolean}             [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
     */
    function DisclosureMenuToggle(_ref) {
      var _this;

      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$7(this, DisclosureMenuToggle);

      _this = _super.call(this, {
        menuToggleElement: menuToggleElement,
        parentElement: parentElement,
        controlledMenu: controlledMenu,
        parentMenu: parentMenu
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Opens the controlled menu.
     */


    _createClass$6(DisclosureMenuToggle, [{
      key: "open",
      value: function open() {
        // Close all siblings.
        this.closeSiblings();

        _get$6(_getPrototypeOf$7(DisclosureMenuToggle.prototype), "open", this).call(this);
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Close all siblings.
        this.closeSiblings();

        _get$6(_getPrototypeOf$7(DisclosureMenuToggle.prototype), "preview", this).call(this);
      }
      /**
       * Closes the controlled menu.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Close all children.
          this.closeChildren();
        }

        _get$6(_getPrototypeOf$7(DisclosureMenuToggle.prototype), "close", this).call(this);
      }
    }]);

    return DisclosureMenuToggle;
  }(BaseMenuToggle);

  function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }

  function _get$5(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$5 = Reflect.get; } else { _get$5 = function _get(target, property, receiver) { var base = _superPropBase$5(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$5(target, property, receiver || target); }

  function _superPropBase$5(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$6(object); if (object === null) break; } return object; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$6(subClass, superClass); }

  function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf$6(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$6(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$6(this, result); }; }

  function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$6(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$6(self); }

  function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }
  /**
   * An accessible disclosure menu in the DOM.
   *
   * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html|Example Disclosure for Navigation Menus}
   *
   * @augments BaseMenu
   */

  var DisclosureMenu = /*#__PURE__*/function (_BaseMenu) {
    _inherits$6(DisclosureMenu, _BaseMenu);

    var _super = _createSuper$6(DisclosureMenu);

    /**
     * @inheritdoc
     *
     * @param {object}                 options                              - The options for generating the menu.
     * @param {HTMLElement}            options.menuElement                  - The menu element in the DOM.
     * @param {string}                 [options.menuItemSelector = li]      - The CSS selector string for menu items.
     * @param {string}                 [options.menuLinkSelector = a]       - The CSS selector string for menu links.
     * @param {string}                 [options.submenuItemSelector]        - The CSS selector string for menu items containing submenus.
     * @param {string}                 [options.submenuToggleSelector = a]  - The CSS selector string for submenu toggle buttons/links.
     * @param {string}                 [options.submenuSelector = ul]       - The CSS selector string for submenus.
     * @param {(HTMLElement|null)}     [options.controllerElement = null]   - The element controlling the menu in the DOM.
     * @param {(HTMLElement|null)}     [options.containerElement = null]    - The element containing the menu in the DOM.
     * @param {(string|string[]|null)} [options.openClass = show]           - The class to apply when a menu is "open".
     * @param {(string|string[]|null)} [options.closeClass = hide]          - The class to apply when a menu is "closed".
     * @param {boolean}                [options.isTopLevel = false]         - A flag to mark the root menu.
     * @param {(DisclosureMenu|null)}  [options.parentMenu = null]          - The parent menu to this menu.
     * @param {string}                 [options.hoverType = off]            - The type of hoverability a menu has.
     * @param {number}                 [options.hoverDelay = 250]           - The delay for closing menus if the menu is hoverable (in miliseconds).
     * @param {boolean}                [options.optionalKeySupport = false] - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
     * @param {boolean}                [options.initialize = true]          - A flag to initialize the menu immediately upon creation.
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
          _ref$hoverType = _ref.hoverType,
          hoverType = _ref$hoverType === void 0 ? "off" : _ref$hoverType,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay,
          _ref$optionalKeySuppo = _ref.optionalKeySupport,
          optionalKeySupport = _ref$optionalKeySuppo === void 0 ? false : _ref$optionalKeySuppo,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$6(this, DisclosureMenu);

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
        hoverType: hoverType,
        hoverDelay: hoverDelay
      }); // Set default class types.

      _this.MenuType = DisclosureMenu;
      _this.MenuItemType = DisclosureMenuItem;
      _this.MenuToggleType = DisclosureMenuToggle;
      _this.currentChild = -1;
      _this.optionalKeySupport = optionalKeySupport;

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's optionalKeySupport.
     *
     * @type {boolean}
     */


    _createClass$5(DisclosureMenu, [{
      key: "optionalKeySupport",
      get: function get() {
        return this.isTopLevel ? this.optionalSupport : this.elements.rootMenu.optionalKeySupport;
      },
      set: function set(value) {
        isValidType("boolean", {
          optionalKeySupport: value
        });
        this.optionalSupport = value;
      }
      /**
       * Initializes the menu.
       *
       * This will also initialize all menu items and sub menus.
       */

    }, {
      key: "initialize",
      value: function initialize() {
        try {
          _get$5(_getPrototypeOf$6(DisclosureMenu.prototype), "initialize", this).call(this);

          this.handleFocus();
          this.handleClick();
          this.handleHover();
          this.handleKeydown();
          this.handleKeyup();
        } catch (error) {
          console.error(error);
        }
      }
      /**
       * Handles click events throughout the menu for proper use.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this2 = this;

        _get$5(_getPrototypeOf$6(DisclosureMenu.prototype), "handleClick", this).call(this); // Use touch over mouse events when supported.


        var endEventType = isEventSupported("touchend", this.dom.menu) ? "touchend" : "mouseup"; // Close the menu if a click event happens outside of it.

        document.addEventListener(endEventType, function (event) {
          if (_this2.focusState !== "none") {
            _this2.currentEvent = "mouse";

            if (!_this2.dom.menu.contains(event.target) && !_this2.dom.menu !== event.target) {
              _this2.closeChildren();

              _this2.blur();

              if (_this2.elements.controller) {
                _this2.elements.controller.close();
              }
            }
          }
        });
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this3 = this;

        _get$5(_getPrototypeOf$6(DisclosureMenu.prototype), "handleKeydown", this).call(this);

        this.dom.menu.addEventListener("keydown", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event); // Prevent default event actions if we're handling the keyup event.

          if (_this3.focusState === "self") {
            var submenuKeys = ["Space", "Enter"];
            var controllerKeys = ["Escape"];
            var parentKeys = ["Escape"];

            if (_this3.optionalKeySupport) {
              var keys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", "End"];

              if (keys.includes(key)) {
                preventEvent(event);
              }
            } else if (_this3.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
              preventEvent(event);
            } else if (_this3.elements.controller && controllerKeys.includes(key)) {
              preventEvent(event);
            } else if (_this3.elements.parentMenu && parentKeys.includes(key)) {
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
        var _this4 = this;

        _get$5(_getPrototypeOf$6(DisclosureMenu.prototype), "handleKeyup", this).call(this);

        this.dom.menu.addEventListener("keyup", function (event) {
          _this4.currentEvent = "keyboard";
          var key = keyPress(event);

          if (_this4.focusState === "self") {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.
              if (_this4.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this4.currentMenuItem.elements.toggle.preview();
              } else {
                _this4.currentMenuItem.dom.link.click();
              }
            } else if (key === "Escape") {
              // Hitting Escape
              // - If a dropdown is open, closes it.
              // - If was within the closed dropdown, sets focus on the button that controls that dropdown.
              var hasOpenChild = _this4.elements.submenuToggles.some(function (toggle) {
                return toggle.isOpen;
              });

              if (hasOpenChild) {
                preventEvent(event);

                _this4.closeChildren();
              } else if (_this4.elements.parentMenu) {
                preventEvent(event);
                _this4.elements.parentMenu.currentEvent = _this4.currentEvent;

                _this4.elements.parentMenu.closeChildren();

                _this4.elements.parentMenu.focusCurrentChild();
              } else if (_this4.isTopLevel && _this4.elements.controller && _this4.elements.controller.isOpen) {
                _this4.elements.controller.close();

                _this4.focusController();
              }
            } else if (_this4.optionalKeySupport) {
              if (key === "ArrowDown" || key === "ArrowRight") {
                // Hitting the Down or Right Arrow:
                // - If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.
                // - If focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.
                // - If focus is on a link, and it is not the last link, moves focus to the next link.
                preventEvent(event);

                if (_this4.currentMenuItem.isSubmenuItem && _this4.currentMenuItem.elements.toggle.isOpen) {
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                  _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                } else {
                  _this4.focusNextChild();
                }
              } else if (key === "ArrowUp" || key === "ArrowLeft") {
                // Hitting the Up or Left Arrow:
                // - If focus is on a button, and it is not the first button, moves focus to the previous button.
                // - If focus is on a link, and it is not the first link, moves focus to the previous link.
                preventEvent(event);

                _this4.focusPreviousChild();
              } else if (key === "Home") {
                // Hitting Home:
                // - If focus is on a button, and it is not the first button, moves focus to the first button.
                // - If focus is on a link, and it is not the first link, moves focus to the first link.
                preventEvent(event);

                _this4.focusFirstChild();
              } else if (key === "End") {
                // Hitting End:
                // - If focus is on a button, and it is not the last button, moves focus to the last button.
                // - If focus is on a link, and it is not the last link, moves focus to the last link.
                preventEvent(event);

                _this4.focusLastChild();
              }
            }
          }
        });
      }
    }]);

    return DisclosureMenu;
  }(BaseMenu);

  function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }

  function _get$4(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$4 = Reflect.get; } else { _get$4 = function _get(target, property, receiver) { var base = _superPropBase$4(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$4(target, property, receiver || target); }

  function _superPropBase$4(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$5(object); if (object === null) break; } return object; }

  function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$5(subClass, superClass); }

  function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf$5(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$5(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$5(this, result); }; }

  function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$5(self); }

  function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }
  /**
   * A basic navigation link contained inside of a [Menubar]{@link Menubar.md}.
   *
   * @augments BaseMenuItem
   */

  var MenubarItem = /*#__PURE__*/function (_BaseMenuItem) {
    _inherits$5(MenubarItem, _BaseMenuItem);

    var _super = _createSuper$5(MenubarItem);

    /**
     * @inheritdoc
     *
     * @param {object}             options                         - The options for generating the menu item.
     * @param {HTMLElement}        options.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}        options.menuLinkElement         - The menu item's link in the DOM.
     * @param {Menubar}            options.parentMenu              - The parent menu.
     * @param {boolean}            [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {Menubar|null}       [options.childMenu = null]      - The child menu.
     * @param {MenubarToggle|null} [options.toggle = null]         - The controller for the child menu.
     * @param {boolean}            [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
     */
    function MenubarItem(_ref) {
      var _this;

      var menuItemElement = _ref.menuItemElement,
          menuLinkElement = _ref.menuLinkElement,
          parentMenu = _ref.parentMenu,
          _ref$isSubmenuItem = _ref.isSubmenuItem,
          isSubmenuItem = _ref$isSubmenuItem === void 0 ? false : _ref$isSubmenuItem,
          _ref$childMenu = _ref.childMenu,
          childMenu = _ref$childMenu === void 0 ? null : _ref$childMenu,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? null : _ref$toggle,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$5(this, MenubarItem);

      _this = _super.call(this, {
        menuItemElement: menuItemElement,
        menuLinkElement: menuLinkElement,
        parentMenu: parentMenu,
        isSubmenuItem: isSubmenuItem,
        childMenu: childMenu,
        toggle: toggle
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Initialize the menu item by setting its role and tab index.
     */


    _createClass$4(MenubarItem, [{
      key: "initialize",
      value: function initialize() {
        _get$4(_getPrototypeOf$5(MenubarItem.prototype), "initialize", this).call(this);

        this.dom.item.setAttribute("role", "none");
        this.dom.link.setAttribute("role", "menuitem");
        this.dom.link.tabIndex = -1;
      }
      /**
       * Focuses the menu item's link and set proper tabIndex.
       */

    }, {
      key: "focus",
      value: function focus() {
        _get$4(_getPrototypeOf$5(MenubarItem.prototype), "focus", this).call(this);

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
        _get$4(_getPrototypeOf$5(MenubarItem.prototype), "blur", this).call(this);

        if (this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = -1;
        }
      }
    }]);

    return MenubarItem;
  }(BaseMenuItem);

  function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }

  function _get$3(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$3 = Reflect.get; } else { _get$3 = function _get(target, property, receiver) { var base = _superPropBase$3(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$3(target, property, receiver || target); }

  function _superPropBase$3(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$4(object); if (object === null) break; } return object; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$4(subClass, superClass); }

  function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf$4(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$4(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$4(this, result); }; }

  function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }

  function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }
  /**
   * A link or button that controls the visibility of a [Menubar]{@link Menubar.md}.
   *
   * @augments BaseMenuToggle
   */

  var MenubarToggle = /*#__PURE__*/function (_BaseMenuToggle) {
    _inherits$4(MenubarToggle, _BaseMenuToggle);

    var _super = _createSuper$4(MenubarToggle);

    /**
     * @inheritdoc
     *
     * @param {object}       options                     - The options for generating the menu toggle.
     * @param {HTMLElement}  options.menuToggleElement   - The toggle element in the DOM.
     * @param {HTMLElement}  options.parentElement       - The element containing the controlled menu.
     * @param {Menubar}      options.controlledMenu      - The menu controlled by this toggle.
     * @param {Menubar|null} [options.parentMenu = null] - The menu containing this toggle.
     * @param {boolean}      [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
     */
    function MenubarToggle(_ref) {
      var _this;

      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$4(this, MenubarToggle);

      _this = _super.call(this, {
        menuToggleElement: menuToggleElement,
        parentElement: parentElement,
        controlledMenu: controlledMenu,
        parentMenu: parentMenu
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Opens the controlled menu.
     */


    _createClass$3(MenubarToggle, [{
      key: "open",
      value: function open() {
        // Close all siblings.
        this.closeSiblings();

        _get$3(_getPrototypeOf$4(MenubarToggle.prototype), "open", this).call(this);
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Close all siblings.
        this.closeSiblings();

        _get$3(_getPrototypeOf$4(MenubarToggle.prototype), "preview", this).call(this);
      }
      /**
       * Closes the controlled menu.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Close all children.
          this.closeChildren();
        }

        _get$3(_getPrototypeOf$4(MenubarToggle.prototype), "close", this).call(this);
      }
    }]);

    return MenubarToggle;
  }(BaseMenuToggle);

  function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

  function _get$2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$2 = Reflect.get; } else { _get$2 = function _get(target, property, receiver) { var base = _superPropBase$2(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$2(target, property, receiver || target); }

  function _superPropBase$2(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$3(object); if (object === null) break; } return object; }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$3(subClass, superClass); }

  function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf$3(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$3(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$3(this, result); }; }

  function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }

  function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }
  /**
   * An accessible menubar navigation in the DOM.
   *
   * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html|Navigation Menubar Example}
   *
   * @augments BaseMenu
   */

  var Menubar = /*#__PURE__*/function (_BaseMenu) {
    _inherits$3(Menubar, _BaseMenu);

    var _super = _createSuper$3(Menubar);

    /**
     * @inheritdoc
     *
     * @param {object}                 options                             - The options for generating the menu.
     * @param {HTMLElement}            options.menuElement                 - The menu element in the DOM.
     * @param {string}                 [options.menuItemSelector = li]     - The CSS selector string for menu items.
     * @param {string}                 [options.menuLinkSelector = a]      - The CSS selector string for menu links.
     * @param {string}                 [options.submenuItemSelector]       - The CSS selector string for menu items containing submenus.
     * @param {string}                 [options.submenuToggleSelector = a] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}                 [options.submenuSelector = ul]      - The CSS selector string for submenus.
     * @param {(HTMLElement|null)}     [options.controllerElement = null]  - The element controlling the menu in the DOM.
     * @param {(HTMLElement|null)}     [options.containerElement = null]   - The element containing the menu in the DOM.
     * @param {(string|string[]|null)} [options.openClass = show]          - The class to apply when a menu is "open".
     * @param {(string|string[]|null)} [options.closeClass = hide]         - The class to apply when a menu is "closed".
     * @param {boolean}                [options.isTopLevel = false]        - A flag to mark the root menu.
     * @param {(Menubar|null)}         [options.parentMenu = null]         - The parent menu to this menu.
     * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
     * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
     * @param {boolean}                [options.initialize = true]         - A flag to initialize the menu immediately upon creation.
     */
    function Menubar(_ref) {
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
          _ref$hoverType = _ref.hoverType,
          hoverType = _ref$hoverType === void 0 ? "off" : _ref$hoverType,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$3(this, Menubar);

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
        hoverType: hoverType,
        hoverDelay: hoverDelay
      });
      _this.MenuType = Menubar;
      _this.MenuItemType = MenubarItem;
      _this.MenuToggleType = MenubarToggle;

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass$2(Menubar, [{
      key: "initialize",
      value: function initialize() {
        try {
          _get$2(_getPrototypeOf$3(Menubar.prototype), "initialize", this).call(this);

          this.dom.menu.setAttribute("role", "menubar");
          this.handleFocus();
          this.handleClick();
          this.handleHover();
          this.handleKeydown();
          this.handleKeyup();
          this.elements.menuItems[0].dom.link.tabIndex = 0;
        } catch (error) {
          console.error(error);
        }
      }
      /**
       * Handles click events throughout the menu for proper use.
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this2 = this;

        _get$2(_getPrototypeOf$3(Menubar.prototype), "handleClick", this).call(this); // Use touch over mouse events when supported.


        var endEventType = isEventSupported("touchend", this.dom.menu) ? "touchend" : "mouseup"; // Close the menu if a click event happens outside of it.

        document.addEventListener(endEventType, function (event) {
          if (_this2.focusState !== "none") {
            _this2.currentEvent = "mouse";

            if (!_this2.dom.menu.contains(event.target) && !_this2.dom.menu !== event.target) {
              _this2.closeChildren();

              _this2.blur();

              if (_this2.elements.controller) {
                _this2.elements.controller.close();
              }
            }
          }
        });
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this3 = this;

        _get$2(_getPrototypeOf$3(Menubar.prototype), "handleKeydown", this).call(this);

        this.dom.menu.addEventListener("keydown", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event);

          if (key === "Tab") {
            // Hitting Tab:
            // - Moves focus out of the menu.
            if (_this3.elements.rootMenu.focusState !== "none") {
              _this3.elements.rootMenu.blur();

              _this3.elements.rootMenu.closeChildren();
            } else {
              _this3.elements.rootMenu.focus();
            }
          } // Prevent default event actions if we're handling the keyup event.


          if (key === "Character") {
            preventEvent(event);
          } else if (_this3.isTopLevel) {
            if (_this3.focusState === "self") {
              var keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
              var submenuKeys = ["Space", "Enter", "ArrowDown", "ArrowUp"];
              var controllerKeys = ["Escape"];

              if (keys.includes(key)) {
                preventEvent(event);
              } else if (_this3.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
                preventEvent(event);
              } else if (_this3.elements.controller && controllerKeys.includes(key)) {
                preventEvent(event);
              }
            }
          } else {
            var _keys = ["Escape", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
            var _submenuKeys = ["Space", "Enter"];

            if (_keys.includes(key)) {
              preventEvent(event);
            } else if (_this3.currentMenuItem.isSubmenuItem && _submenuKeys.includes(key)) {
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
        var _this4 = this;

        _get$2(_getPrototypeOf$3(Menubar.prototype), "handleKeyup", this).call(this);

        this.dom.menu.addEventListener("keyup", function (event) {
          _this4.currentEvent = "keyboard";
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
            _this4.elements.rootMenu.currentEvent = "character";

            _this4.focusNextChildWithCharacter(event.key);
          } else if (_this4.isTopLevel) {
            if (_this4.focusState === "self") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                  _this4.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                } else {
                  _this4.currentMenuItem.dom.link.click();
                }
              } else if (key === "ArrowRight") {
                // Hitting the Right Arrow:
                // - Moves focus to the next item in the menubar.
                // - If focus is on the last item, moves focus to the first item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var previousChildOpen = _this4.currentMenuItem.isSubmenuItem && _this4.currentMenuItem.elements.toggle.isOpen;

                _this4.focusNextChild(); // Open the newly focussed submenu if applicable.


                if (previousChildOpen) {
                  if (_this4.currentMenuItem.isSubmenuItem) {
                    _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                    _this4.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this4.closeChildren();
                  }
                }
              } else if (key === "ArrowLeft") {
                // Hitting the Left Arrow:
                // - Moves focus to the previous item in the menubar.
                // - If focus is on the first item, moves focus to the last item.
                // - If focus was on an open submenu and the newly focussed item has a submenu, open the submenu.
                preventEvent(event); // Store the current item's info if its an open dropdown.

                var _previousChildOpen = _this4.currentMenuItem.isSubmenuItem && _this4.currentMenuItem.elements.toggle.isOpen;

                _this4.focusPreviousChild(); // Open the newly focussed submenu if applicable.


                if (_previousChildOpen) {
                  if (_this4.currentMenuItem.isSubmenuItem) {
                    _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                    _this4.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this4.closeChildren();
                  }
                }
              } else if (key === "ArrowDown") {
                // Hitting the Down Arrow:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                  _this4.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                }
              } else if (key === "ArrowUp") {
                // Hitting the Up Arrow:
                // - Opens submenu and moves focus to last item in the submenu.
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                  _this4.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusLastChild();
                  });
                }
              } else if (key === "Home") {
                // Hitting Home:
                // - Moves focus to first item in the menubar.
                preventEvent(event);

                _this4.focusFirstChild();
              } else if (key === "End") {
                // Hitting End:
                // - Moves focus to last item in the menubar.
                preventEvent(event);

                _this4.focusLastChild();
              } else if (key === "Escape") {
                // Hitting Escape:
                // - Closes menu.
                var hasOpenChild = _this4.elements.submenuToggles.some(function (toggle) {
                  return toggle.isOpen;
                });

                if (hasOpenChild) {
                  preventEvent(event);

                  _this4.closeChildren();
                } else if (_this4.isTopLevel && _this4.elements.controller && _this4.elements.controller.isOpen) {
                  preventEvent(event);

                  _this4.elements.controller.close();

                  _this4.focusController();
                }
              }
            }
          } else {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              if (_this4.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                _this4.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                requestAnimationFrame(function () {
                  _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this4.elements.rootMenu.closeChildren();

              _this4.elements.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this4.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                _this4.currentMenuItem.elements.toggle.open(); // This ensures the the menu is _visually_ open before the child is focussed.


                requestAnimationFrame(function () {
                  _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              } else {
                preventEvent(event);

                _this4.elements.rootMenu.closeChildren();

                _this4.elements.rootMenu.focusNextChild();

                if (_this4.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                  _this4.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              if (_this4.elements.parentMenu.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                _this4.elements.parentMenu.currentMenuItem.elements.toggle.close();

                _this4.elements.parentMenu.focusCurrentChild();

                if (_this4.elements.parentMenu === _this4.elements.rootMenu) {
                  _this4.elements.rootMenu.closeChildren();

                  _this4.elements.rootMenu.focusPreviousChild();

                  if (_this4.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                    _this4.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard";

                    _this4.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                  }
                }
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              preventEvent(event);

              _this4.focusNextChild();
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              preventEvent(event);

              _this4.focusPreviousChild();
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);

              _this4.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);

              _this4.focusLastChild();
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
        // If the current child is the last child of the menu, focus the menu's first child.
        if (this.currentChild === this.elements.menuItems.length - 1) {
          this.focusFirstChild();
        } else {
          this.focusChild(this.currentChild + 1);
        }
      }
      /**
       * Focus the menu's previous child.
       */

    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        // If the current child is the first child of the menu, focus the menu's last child.
        if (this.currentChild === 0) {
          this.focusLastChild();
        } else {
          this.focusChild(this.currentChild - 1);
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
            this.focusChild(index);
          }

          index++;
        }
      }
    }]);

    return Menubar;
  }(BaseMenu);

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

  function _get$1(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get$1 = Reflect.get; } else { _get$1 = function _get(target, property, receiver) { var base = _superPropBase$1(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get$1(target, property, receiver || target); }

  function _superPropBase$1(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf$2(object); if (object === null) break; } return object; }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }

  function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf$2(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$2(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$2(this, result); }; }

  function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }

  function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
  /**
   * A basic navigation link contained inside of a [Treeview]{@link Treeview.md}.
   *
   * @augments BaseMenuItem
   */

  var TreeviewItem = /*#__PURE__*/function (_BaseMenuItem) {
    _inherits$2(TreeviewItem, _BaseMenuItem);

    var _super = _createSuper$2(TreeviewItem);

    /**
     * @inheritdoc
     *
     * @param {object}              options                         - The options for generating the menu item.
     * @param {HTMLElement}         options.menuItemElement         - The menu item in the DOM.
     * @param {HTMLElement}         options.menuLinkElement         - The menu item's link in the DOM.
     * @param {Treeview}            options.parentMenu              - The parent menu.
     * @param {boolean}             [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
     * @param {Treeview|null}       [options.childMenu = null]      - The child menu.
     * @param {TreeviewToggle|null} [options.toggle = null]         - The controller for the child menu.
     * @param {boolean}             [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
     */
    function TreeviewItem(_ref) {
      var _this;

      var menuItemElement = _ref.menuItemElement,
          menuLinkElement = _ref.menuLinkElement,
          parentMenu = _ref.parentMenu,
          _ref$isSubmenuItem = _ref.isSubmenuItem,
          isSubmenuItem = _ref$isSubmenuItem === void 0 ? false : _ref$isSubmenuItem,
          _ref$childMenu = _ref.childMenu,
          childMenu = _ref$childMenu === void 0 ? null : _ref$childMenu,
          _ref$toggle = _ref.toggle,
          toggle = _ref$toggle === void 0 ? null : _ref$toggle,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$2(this, TreeviewItem);

      _this = _super.call(this, {
        menuItemElement: menuItemElement,
        menuLinkElement: menuLinkElement,
        parentMenu: parentMenu,
        isSubmenuItem: isSubmenuItem,
        childMenu: childMenu,
        toggle: toggle
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Initialize the menu item by setting its role and tab index.
     */


    _createClass$1(TreeviewItem, [{
      key: "initialize",
      value: function initialize() {
        _get$1(_getPrototypeOf$2(TreeviewItem.prototype), "initialize", this).call(this);

        this.dom.item.setAttribute("role", "none");
        this.dom.link.setAttribute("role", "treeitem");
        this.dom.link.tabIndex = -1;
      }
      /**
       * Focuses the menu item's link and set proper tabIndex.
       */

    }, {
      key: "focus",
      value: function focus() {
        _get$1(_getPrototypeOf$2(TreeviewItem.prototype), "focus", this).call(this);

        this.dom.link.tabIndex = 0;
      }
      /**
       * Blurs the menu item's link and set proper tabIndex.
       */

    }, {
      key: "blur",
      value: function blur() {
        _get$1(_getPrototypeOf$2(TreeviewItem.prototype), "blur", this).call(this);

        this.dom.link.tabIndex = -1;
      }
    }]);

    return TreeviewItem;
  }(BaseMenuItem);

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

  function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
  /**
   * A link or button that controls the visibility of a [Treeview]{@link Treeview.md}.
   *
   * @augments BaseMenuToggle
   */

  var TreeviewToggle = /*#__PURE__*/function (_BaseMenuToggle) {
    _inherits$1(TreeviewToggle, _BaseMenuToggle);

    var _super = _createSuper$1(TreeviewToggle);

    /**
     * @inheritdoc
     *
     * @param {object}                  options                     - The options for generating the menu toggle.
     * @param {HTMLElement}             options.menuToggleElement   - The toggle element in the DOM.
     * @param {HTMLElement}             options.parentElement       - The element containing the controlled menu.
     * @param {TreeviewNavigation}      options.controlledMenu      - The menu controlled by this toggle.
     * @param {TreeviewNavigation|null} [options.parentMenu = null] - The menu containing this toggle.
     * @param {boolean}                 [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
     */
    function TreeviewToggle(_ref) {
      var _this;

      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck$1(this, TreeviewToggle);

      _this = _super.call(this, {
        menuToggleElement: menuToggleElement,
        parentElement: parentElement,
        controlledMenu: controlledMenu,
        parentMenu: parentMenu
      });

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }

    return TreeviewToggle;
  }(BaseMenuToggle);

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
   * An accessible treeview navigation in the DOM.
   *
   * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2a.html|Navigation Treeview Example Using Computed Properties}
   *
   * @augments BaseMenu
   */

  var Treeview = /*#__PURE__*/function (_BaseMenu) {
    _inherits(Treeview, _BaseMenu);

    var _super = _createSuper(Treeview);

    /**
     * @inheritdoc
     *
     * @param {object}                 options                             - The options for generating the menu.
     * @param {HTMLElement}            options.menuElement                 - The menu element in the DOM.
     * @param {string}                 [options.menuItemSelector = li]     - The CSS selector string for menu items.
     * @param {string}                 [options.menuLinkSelector = a]      - The CSS selector string for menu links.
     * @param {string}                 [options.submenuItemSelector]       - The CSS selector string for menu items containing submenus.
     * @param {string}                 [options.submenuToggleSelector = a] - The CSS selector string for submenu toggle buttons/links.
     * @param {string}                 [options.submenuSelector = ul]      - The CSS selector string for submenus.
     * @param {(HTMLElement|null)}     [options.controllerElement = null]  - The element controlling the menu in the DOM.
     * @param {(HTMLElement|null)}     [options.containerElement = null]   - The element containing the menu in the DOM.
     * @param {(string|string[]|null)} [options.openClass = show]          - The class to apply when a menu is "open".
     * @param {(string|string[]|null)} [options.closeClass = hide]         - The class to apply when a menu is "closed".
     * @param {boolean}                [options.isTopLevel = false]        - A flag to mark the root menu.
     * @param {(Treeview|null)}        [options.parentMenu = null]         - The parent menu to this menu.
     * @param {string}                 [options.hoverType = off]           - The type of hoverability a menu has.
     * @param {number}                 [options.hoverDelay = 250]          - The delay for closing menus if the menu is hoverable (in miliseconds).
     * @param {boolean}                [options.initialize = true]         - A flag to initialize the menu immediately upon creation.
     */
    function Treeview(_ref) {
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
          _ref$hoverType = _ref.hoverType,
          hoverType = _ref$hoverType === void 0 ? "off" : _ref$hoverType,
          _ref$hoverDelay = _ref.hoverDelay,
          hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;

      _classCallCheck(this, Treeview);

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
        hoverType: hoverType,
        hoverDelay: hoverDelay
      }); // Set default class types.

      _this.MenuType = Treeview;
      _this.MenuItemType = TreeviewItem;
      _this.MenuToggleType = TreeviewToggle;

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * Initializes the menu.
     *
     * This will also initialize all menu items and sub menus.
     */


    _createClass(Treeview, [{
      key: "initialize",
      value: function initialize() {
        try {
          _get(_getPrototypeOf(Treeview.prototype), "initialize", this).call(this);

          if (this.isTopLevel) {
            this.dom.menu.setAttribute("role", "tree");
            this.elements.menuItems[0].dom.link.tabIndex = 0;
          } else {
            this.dom.menu.setAttribute("role", "group");
          }

          this.handleFocus();
          this.handleClick();
          this.handleHover();
          this.handleKeydown();
          this.handleKeyup();
        } catch (error) {
          console.error(error);
        }
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this2 = this;

        _get(_getPrototypeOf(Treeview.prototype), "handleKeydown", this).call(this);

        this.dom.menu.addEventListener("keydown", function (event) {
          _this2.currentEvent = "keyboard";
          var key = keyPress(event);

          if (key === "Tab") {
            // Hitting Tab:
            // - Moves focus out of the menu.
            if (_this2.elements.rootMenu.focusState !== "none") {
              _this2.elements.rootMenu.blur();
            } else {
              _this2.elements.rootMenu.focus();
            }
          }

          if (_this2.focusState === "self") {
            var keys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "Asterisk", "Home", "End"];
            var submenuKeys = ["Enter", "ArrowRight"];
            var controllerKeys = ["Escape"];

            if (keys.includes(key)) {
              preventEvent(event);
            } else if (_this2.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
              preventEvent(event);
            } else if (_this2.elements.controller && controllerKeys.includes(key)) {
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

        _get(_getPrototypeOf(Treeview.prototype), "handleKeyup", this).call(this);

        this.dom.menu.addEventListener("keyup", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event);

          if (key === "Character") {
            // Hitting Character:
            // - Focus moves to the next node with a name that starts with the typed character.
            // - Search wraps to first node if a matching name is not found among the nodes that follow the focused node.
            // - Search ignores nodes that are descendants of closed nodes.
            preventEvent(event);
            _this3.elements.rootMenu.currentEvent = "character";

            _this3.focusNextNodeWithCharacter(event.key);
          } else if (_this3.focusState === "self") {
            if (key === "Enter" || key === "Space") {
              // Hitting Space or Enter:
              // - Performs the default action (e.g. onclick event) for the focused node.
              // - If focus is on a closed node, opens the node; focus does not move.
              preventEvent(event);

              if (_this3.currentMenuItem.isSubmenuItem) {
                if (_this3.currentMenuItem.elements.toggle.isOpen) {
                  _this3.currentMenuItem.elements.toggle.close();
                } else {
                  _this3.currentMenuItem.elements.toggle.preview();
                }
              } else {
                _this3.currentMenuItem.dom.link.click();
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Moves focus to the next node that is focusable without opening or closing a node.
              // - If focus is on the last node, does nothing.
              preventEvent(event);

              if (_this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.elements.toggle.isOpen) {
                _this3.blurCurrentChild();

                _this3.currentMenuItem.elements.childMenu.currentEvent = _this3.currentEvent;

                _this3.currentMenuItem.elements.childMenu.focusFirstChild();
              } else if (!_this3.isTopLevel && _this3.currentChild === _this3.elements.menuItems.length - 1) {
                _this3.blurCurrentChild();

                _this3.elements.parentMenu.currentEvent = _this3.currentEvent;

                _this3.elements.parentMenu.focusNextChild();
              } else {
                _this3.focusNextChild();
              }
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Moves focus to the previous node that is focusable without opening or closing a node.
              // - If focus is on the first node, does nothing.
              preventEvent(event);
              var previousMenuItem = _this3.elements.menuItems[_this3.currentChild - 1];

              if (previousMenuItem && previousMenuItem.isSubmenuItem && previousMenuItem.elements.toggle.isOpen) {
                _this3.blurCurrentChild();

                _this3.currentChild = _this3.currentChild - 1;
                _this3.currentMenuItem.elements.childMenu.currentEvent = _this3.currentEvent;

                _this3.currentMenuItem.elements.childMenu.focusLastChild();
              } else if (!_this3.isTopLevel && _this3.currentChild === 0) {
                _this3.blurCurrentChild();

                _this3.elements.parentMenu.currentEvent = _this3.currentEvent;

                _this3.elements.parentMenu.focusCurrentChild();
              } else {
                _this3.focusPreviousChild();
              }
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - When focus is on a closed node, opens the node; focus does not move.
              // - When focus is on a open node, moves focus to the first child node.
              // - When focus is on an end node, does nothing.
              if (_this3.currentMenuItem.isSubmenuItem) {
                preventEvent(event);

                if (_this3.currentMenuItem.elements.toggle.isOpen) {
                  _this3.blurCurrentChild();

                  _this3.currentMenuItem.elements.childMenu.currentEvent = _this3.currentEvent;

                  _this3.currentMenuItem.elements.childMenu.focusFirstChild();
                } else {
                  _this3.currentMenuItem.elements.toggle.preview();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - When focus is on an open node, closes the node.
              // - When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
              // - When focus is on a root node that is also either an end node or a closed node, does nothing.
              preventEvent(event);

              if (_this3.currentMenuItem.isSubmenuItem && _this3.currentMenuItem.elements.toggle.isOpen) {
                _this3.currentMenuItem.elements.childMenu.blurCurrentChild();

                _this3.currentMenuItem.elements.toggle.close();
              } else if (!_this3.isTopLevel) {
                _this3.blurCurrentChild();

                _this3.elements.parentMenu.currentEvent = _this3.currentEvent;

                _this3.elements.parentMenu.focusCurrentChild();
              }
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first node without opening or closing a node.
              preventEvent(event);

              _this3.blurCurrentChild();

              _this3.elements.rootMenu.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to the last node that can be focused without expanding any nodes that are closed.
              preventEvent(event);

              _this3.blurCurrentChild();

              _this3.elements.rootMenu.focusLastNode();
            } else if (key === "Asterisk") {
              // Hitting Asterisk:
              // - Expands all closed sibling nodes that are at the same level as the focused node.
              // - Focus does not move.
              preventEvent(event);

              _this3.openChildren();
            }
          }
        });
      }
      /**
       * Focus the menu's last node of the entire expanded menu.
       *
       * This includes all _open_ child menu items.
       */

    }, {
      key: "focusLastNode",
      value: function focusLastNode() {
        var numberOfItems = this.elements.menuItems.length - 1;
        var lastChild = this.elements.menuItems[numberOfItems];

        if (lastChild.isSubmenuItem && lastChild.elements.toggle.isOpen) {
          this.currentChild = numberOfItems;
          lastChild.elements.childMenu.currentEvent = this.currentEvent;
          lastChild.elements.childMenu.focusLastNode();
        } else {
          this.focusLastChild();
        }
      }
      /**
       * Open all submenu children.
       */

    }, {
      key: "openChildren",
      value: function openChildren() {
        this.elements.submenuToggles.forEach(function (toggle) {
          return toggle.preview();
        });
      }
      /**
       * Focus the menu's next node starting with a specific letter.
       *
       * Wraps to the first node if no match is found after the current node.
       *
       * This includes all _open_ child menu items.
       *
       * @param {string} char - The character to look for.
       */

    }, {
      key: "focusNextNodeWithCharacter",
      value: function focusNextNodeWithCharacter(char) {
        /**
         * Gets all the menu's items and submenu's items.
         *
         * @param {Treeview} menu - The menu.
         *
         * @returns {TreeviewItem[]} - The menu items.
         */
        function getOpenMenuItems(menu) {
          var menuItems = [];
          menu.elements.menuItems.forEach(function (menuItem) {
            menuItems.push(menuItem);

            if (menuItem.isSubmenuItem && menuItem.elements.toggle.isOpen) {
              menuItems = [].concat(_toConsumableArray(menuItems), _toConsumableArray(getOpenMenuItems(menuItem.elements.toggle.elements.controlledMenu)));
            }
          });
          return menuItems;
        } // Ensure the character is lowercase just to be safe.


        var match = char.toLowerCase(); // Sort the menu items so the child _after_ the current child is first to be searched.

        var menuItems = getOpenMenuItems(this.elements.rootMenu);
        var currentItem = menuItems.indexOf(this.currentMenuItem) + 1;
        var sortedMenuItems = [].concat(_toConsumableArray(menuItems.slice(currentItem)), _toConsumableArray(menuItems.slice(0, currentItem)));
        var ctr = 0;
        var found = false;

        while (!found && ctr < sortedMenuItems.length) {
          // Ensure the text in the item is lowercase just to be safe.
          var text = sortedMenuItems[ctr].dom.item.innerText.toLowerCase(); // Focus the child if the text matches, otherwise move on.

          if (text.startsWith(match)) {
            found = true;
            var menu = sortedMenuItems[ctr].elements.parentMenu;
            var index = menu.elements.menuItems.indexOf(sortedMenuItems[ctr]);
            this.elements.rootMenu.blurChildren();
            menu.focusChild(index);
          }

          ctr++;
        }
      }
    }]);

    return Treeview;
  }(BaseMenu);

  var rollup = {
    DisclosureMenu: DisclosureMenu,
    Menubar: Menubar,
    Treeview: Treeview
  };

  return rollup;

}());
//# sourceMappingURL=accessible-menu.js.map
