var DisclosureMenu = (function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

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
      if (_typeof(elements) !== "object") {
        var elementsType = _typeof(elements);

        throw new TypeError("AccessibleMenu: Elements given to isValidInstance() must be inside of an object. ".concat(elementsType, " given."));
      }

      for (var key in elements) {
        if (!(elements[key] instanceof contructor)) {
          var elementType = _typeof(elements[key]);

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
      if (_typeof(values) !== "object") {
        var valuesType = _typeof(values);

        throw new TypeError("AccessibleMenu: Values given to isValidType() must be inside of an object. ".concat(valuesType, " given."));
      }

      for (var key in values) {
        var valueType = _typeof(values[key]);

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
      if (_typeof(values) !== "object") {
        var type = _typeof(values);

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
      if (_typeof(values) !== "object" || Array.isArray(values)) {
        var type = _typeof(values);

        throw new TypeError("AccessibleMenu: Values given to isValidClassList() must be inside of an object. ".concat(type, " given."));
      }

      var _loop = function _loop(key) {
        var type = _typeof(values[key]);

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
      if (_typeof(values) !== "object") {
        var type = _typeof(values);

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
      if (_typeof(values) !== "object") {
        var type = _typeof(values);

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
      if (_typeof(values) !== "object") {
        var type = _typeof(values);

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
   * @param   {string}               tagName  - The name of the tag.
   * @param   {object.<HTMLElement>} elements - The element(s) to check.
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

  /**
   * A link or button that controls the visibility of a {@link BaseMenu}.
   */

  var BaseMenuToggle = /*#__PURE__*/function () {
    /**
     * The DOM elements within the menu toggle.
     *
     * @type {object.<HTMLElement>}
     * @property {HTMLElement} toggle - The menu toggle.
     * @property {HTMLElement} parent - The menu containing this toggle.
     * @protected
     */

    /**
     * The declared accessible-menu elements within the menu toggle.
     *
     * @type {object.<BaseMenu>}
     * @property {BaseMenu} controlledMenu - The menu controlled by this toggle.
     * @property {BaseMenu} parentMenu     - The menu containing this toggle.
     * @protected
     */

    /**
     * The open state of the menu toggle.
     *
     * @type {boolean}
     * @protected
     */

    /**
     * Expand event.
     *
     * @event accessibleMenuExpand
     * @type {CustomEvent}
     * @property {object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     * @protected
     */

    /**
     * Collapse event.
     *
     * @event accessibleMenuCollapse
     * @type {CustomEvent}
     * @property {object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     * @protected
     */

    /**
     * Constructs the menu toggle.
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

      _classCallCheck(this, BaseMenuToggle);

      _defineProperty(this, "_dom", {
        toggle: null,
        parent: null
      });

      _defineProperty(this, "_elements", {
        controlledMenu: null,
        parentMenu: null
      });

      _defineProperty(this, "_open", false);

      _defineProperty(this, "_expandEvent", new CustomEvent("accessibleMenuExpand", {
        bubbles: true,
        detail: {
          toggle: this
        }
      }));

      _defineProperty(this, "_collapseEvent", new CustomEvent("accessibleMenuCollapse", {
        bubbles: true,
        detail: {
          toggle: this
        }
      }));

      // Set DOM elements.
      this._dom.toggle = menuToggleElement;
      this._dom.parent = parentElement; // Set menu elements.

      this._elements.controlledMenu = controlledMenu;
      this._elements.parentMenu = parentMenu;
    }
    /**
     * Initializes the menu toggle.
     *
     * Initialize does a lot of setup on the menu toggle.
     *
     * The most basic setup steps are to ensure that the toggle has `aria-haspopup`
     * set to "true", `aria-expanded` initially set to "false" and, if the toggle
     * element is not a `<button>`, set the `role` to "button".
     *
     * The next step to the initialization is to ensure both the toggle and the
     * menu it controlls have IDs.
     *
     * If they do not, the following steps take place:
     * - Generate a random 10 character string,
     * - Get the innerText of the toggle,
     * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
     * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
     *
     * Once the ID's have been generated, the menu's `aria-labelledby` is set to
     * the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.
     *
     * Finally, the collapse method is called to make sure the submenu is closed.
     */


    _createClass(BaseMenuToggle, [{
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
       * Get the DOM elements within the toggle.
       *
       * @type {object.<HTMLElement>}
       * @readonly
       * @see _dom
       */

    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
      /**
       * Get the declared accessible-menu elements within the menu toggle.
       *
       * @type {object.<BaseMenu>}
       * @readonly
       * @see _elements
       */

    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
      /**
       * Get the open state on the menu.
       *
       * @type {boolean}
       * @see _open
       */

    }, {
      key: "isOpen",
      get: function get() {
        return this._open;
      },
      set: function set(value) {
        isValidType("boolean", {
          value: value
        });
        this._open = value;
      }
      /**
       * Expands the controlled menu.
       *
       * Sets the toggle's `aria-expanded` to "true", adds the
       * {@link BaseMenu#openClass|open class} to the toggle's parent menu item
       * and controlled menu, and removed the {@link BaseMenu#closeClass|closed class}
       * from the toggle's parent menu item and controlled menu.
       *
       * If `emit` is set to `true`, this will also emit a custom event
       * called {@link accessibleMenuExpand}
       *
       * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
       * @fires accessibleMenuExpand
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

            (_this$elements$contro2 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro2, _toConsumableArray(openClass));
          }
        } // Remove the close class.


        if (closeClass !== "") {
          if (typeof closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
          } else {
            var _this$elements$contro3;

            (_this$elements$contro3 = this.elements.controlledMenu.dom.menu.classList).remove.apply(_this$elements$contro3, _toConsumableArray(closeClass));
          }
        }

        if (emit) {
          this.dom.toggle.dispatchEvent(this._expandEvent);
        }
      }
      /**
       * Collapses the controlled menu.
       *
       * Sets the toggle's `aria-expanded` to "false", adds the
       * {@link BaseMenu#closeClass|closed class} to the toggle's parent menu item
       * and controlled menu, and removes the {@link BaseMenu#openClass|open class}
       * from the toggle's parent menu item and controlled menu.
       *
       * If `emit` is set to `true`, this will also emit a custom event
       * called {@link accessibleMenuCollapse}
       *
       * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
       * @fires accessibleMenuCollapse
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

            (_this$elements$contro5 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro5, _toConsumableArray(closeClass));
          }
        } // Remove the open class.


        if (openClass !== "") {
          if (typeof openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.remove(openClass);
          } else {
            var _this$elements$contro6;

            (_this$elements$contro6 = this.elements.controlledMenu.dom.menu.classList).remove.apply(_this$elements$contro6, _toConsumableArray(openClass));
          }
        }

        if (emit) {
          this.dom.toggle.dispatchEvent(this._collapseEvent);
        }
      }
      /**
       * Opens the controlled menu.
       *
       * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
       * and the parent menu's focus state to "child", calls {@link BaseMenuToggle#expand|expand},
       * and sets the {@link BaseMenuToggle#isOpen|isOpen} value to `true`.
       */

    }, {
      key: "open",
      value: function open() {
        // Set proper focus state on the child.
        this.elements.controlledMenu.focusState = "self"; // Expand the controlled menu.

        this.expand(); // Set the open flag.

        this.isOpen = true;
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       *
       * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
       * and the parent menu's focus state to "child",
       * and calls {@link BaseMenuToggle#expand|expand}.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Set proper focus state on the parent.
        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        } // Expand the controlled menu.


        this.expand(); // Set the open flag.

        this.isOpen = true;
      }
      /**
       * Closes the controlled menu.
       *
       * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "none"
       * and the parent menu's focus state to "self", blurs the controlled menu
       * and sets it's {@link BaseMenu#currentChild|current child index} to 0,
       * calls {@link BaseMenuToggle#collapse|collapse}, and sets
       * the {@link BaseMenuToggle#isOpen|isOpen} value to `false`.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Reset controlled menu.
          this.elements.controlledMenu.currentChild = 0;
          this.elements.controlledMenu.blur(); // Set proper focus states on the parent.

          if (this.elements.parentMenu) {
            this.elements.parentMenu.focusState = "self";
          } // Collapse the controlled menu.


          this.collapse(); // Set the open flag.

          this.isOpen = false;
        }
      }
      /**
       * Toggles the open state of the controlled menu between `true` and `false`.
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

  /* eslint-disable jsdoc/no-undefined-types */

  /**
   * A basic navigation link contained inside of a {@link BaseMenu}.
   */
  var BaseMenuItem = /*#__PURE__*/function () {
    /**
     * The DOM elements within the menu item.
     *
     * @type {object.<HTMLElement>}
     * @property {HTMLElement} item - The menu item.
     * @property {HTMLElement} link - The menu item's link.
     * @protected
     */

    /**
     * The declared accessible-menu elements within the menu item.
     *
     * @type {object.<BaseMenu,BaseMenuToggle>}
     * @property {BaseMenu}        parentMenu - The menu containing this menu item.
     * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
     * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
     * @protected
     */

    /**
     * A flag marking a submenu item.
     *
     * @type {boolean}
     */

    /**
     * Constructs the menu item.
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

      _classCallCheck(this, BaseMenuItem);

      _defineProperty(this, "_dom", {
        item: null,
        link: null
      });

      _defineProperty(this, "_elements", {
        parentMenu: null,
        childMenu: null,
        toggle: null
      });

      _defineProperty(this, "_submenu", false);

      // Set DOM elements.
      this._dom.item = menuItemElement;
      this._dom.link = menuLinkElement; // Set menu elements.

      this._elements.parentMenu = parentMenu;
      this._elements.childMenu = childMenu;
      this._elements.toggle = toggle;
      this._submenu = isSubmenuItem;
    }
    /**
     * Initialize the menu item.
     */


    _createClass(BaseMenuItem, [{
      key: "initialize",
      value: function initialize() {}
      /**
       * The DOM elements within the menu item.
       *
       * @type {object.<HTMLElement>}
       * @readonly
       * @see _dom
       */

    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
      /**
       * The declared accessible-menu elements within the menu item.
       *
       * @type {object.<BaseMenu,BaseMenuToggle>}
       * @readonly
       * @see _elements
       */

    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
      /**
       * A flag marking a submenu item.
       *
       * @type {boolean}
       * @readonly
       * @see _submenu
       */

    }, {
      key: "isSubmenuItem",
      get: function get() {
        return this._submenu;
      }
      /**
       * Focuses the menu item's link if the parent menu's
       * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
       */

    }, {
      key: "focus",
      value: function focus() {
        if (this.elements.parentMenu.shouldFocus) {
          this.dom.link.focus();
        }
      }
      /**
       * Blurs the menu item's link if the parent menu's
       * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
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

  /**
   * An accessible navigation element in the DOM.
   *
   * This is intended to be used as a "base" to other menus and not to be used on
   * it's own in the DOM.
   *
   * Use a {@link DisclosureMenu}, {@link Menubar}, or {@link Treeview} instead.
   */

  var BaseMenu = /*#__PURE__*/function () {
    /**
     * The class to use when generating submenus.
     *
     * @type {typeof BaseMenu}
     * @protected
     */

    /**
     * The class to use when generating menu items.
     *
     * @type {typeof BaseMenuItem}
     * @protected
     */

    /**
     * The class to use when generating submenu toggles.
     *
     * @type {typeof BaseMenuToggle}
     * @protected
     */

    /**
     * The DOM elements within the menu.
     *
     * @type {object.<HTMLElement,HTMLElement[]>}
     * @property {HTMLElement}   menu           - The menu element.
     * @property {HTMLElement[]} menuItems      - An array of menu items.
     * @property {HTMLElement[]} submenuItems   - An array of menu items that also contain submenu elements.
     * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
     * @property {HTMLElement[]} submenus       - An array of submenu elements.
     * @property {HTMLElement}   controller     - The toggle for this menu.
     * @property {HTMLElement}   container      - The container for this menu.
     * @protected
     */

    /**
     * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
     *
     * @type {object.<string>}
     * @property {string} menuItems      - The CSS selector for menu items.
     * @property {string} menuLinks      - The CSS selector for menu links.
     * @property {string} submenuItems   - The CSS selector for menu items containing submenus.
     * @property {string} submenuToggles - The CSS selector for menu links that function as submenu toggles.
     * @property {string} submenus       - The CSS selector for for submenus.
     * @protected
     */

    /**
     * The declared accessible-menu elements within the menu.
     *
     * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
     * @property {BaseMenuItem[]}   menuItems      - An array of menu items.
     * @property {BaseMenuToggle[]} submenuToggles - An array of menu toggles.
     * @property {?BaseMenuToggle}  controller     - A menu toggle that controls this menu.
     * @property {?BaseMenu}        parentMenu     - The parent menu.
     * @property {?BaseMenu}        rootMenu       - The root menu of the menu tree.
     * @protected
     */

    /**
     * The class(es) to apply when the menu is open.
     *
     * @type {string|string[]}
     * @protected
     */

    /**
     * The class(es) to apply when the menu is closed.
     *
     * @type {string|string[]}
     * @protected
     */

    /**
     * A flag marking the root menu.
     *
     * @type {boolean}
     * @protected
     */

    /**
     * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
     *
     * @type {number}
     * @protected
     */

    /**
     * The current state of the menu's focus.
     *
     * @type {string}
     * @protected
     */

    /**
     * This last event triggered on the menu.
     *
     * @type {string}
     * @protected
     */

    /**
     * The type of hoverability for the menu.
     *
     * @type {string}
     * @protected
     */

    /**
     * The delay time (in miliseconds) used for mouseout events to take place.
     *
     * @type {number}
     * @protected
     */

    /**
     * Constructs the menu.
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

      _classCallCheck(this, BaseMenu);

      _defineProperty(this, "_MenuType", BaseMenu);

      _defineProperty(this, "_MenuItemType", BaseMenuItem);

      _defineProperty(this, "_MenuToggleType", BaseMenuToggle);

      _defineProperty(this, "_dom", {
        menu: null,
        menuItems: [],
        submenuItems: [],
        submenuToggles: [],
        submenus: [],
        controller: null,
        container: null
      });

      _defineProperty(this, "_selectors", {
        menuItems: "",
        menuLinks: "",
        submenuItems: "",
        submenuToggles: "",
        submenus: ""
      });

      _defineProperty(this, "_elements", {
        menuItems: [],
        submenuToggles: [],
        controller: null,
        parentMenu: null,
        rootMenu: null
      });

      _defineProperty(this, "_openClass", "show");

      _defineProperty(this, "_closeClass", "hide");

      _defineProperty(this, "_root", true);

      _defineProperty(this, "_currentChild", 0);

      _defineProperty(this, "_focusState", "none");

      _defineProperty(this, "_currentEvent", "none");

      _defineProperty(this, "_hoverType", "off");

      _defineProperty(this, "_hoverDelay", 250);

      // Set DOM elements.
      this._dom.menu = menuElement;
      this._dom.controller = controllerElement;
      this._dom.container = containerElement; // Set DOM selectors.

      this._selectors.menuItems = menuItemSelector;
      this._selectors.menuLinks = menuLinkSelector;
      this._selectors.submenuItems = submenuItemSelector;
      this._selectors.submenuToggles = submenuToggleSelector;
      this._selectors.submenus = submenuSelector; // Set menu elements.

      this._elements.menuItems = [];
      this._elements.submenuToggles = [];
      this._elements.controller = null;
      this._elements.parentMenu = parentMenu;
      this._elements.rootMenu = isTopLevel ? this : null; // Set open/close classes.

      this._openClass = openClass || "";
      this._closeClass = closeClass || ""; // Set root.

      this._root = isTopLevel; // Set hover settings.

      this._hoverType = hoverType;
      this._hoverDelay = hoverDelay;
    }
    /**
     * Initializes the menu.
     *
     * The following steps will be taken to initialize the menu:
     * - {@link BaseMenu#validate|Validate} that the menu can initialize,
     * - find the root menu of the menu tree if it isn't already set,
     * - populate all DOM elements within the {@link BaseMenu#dom|dom},
     * - if the current menu is the root menu _and_ has a controller, initialize
     *   the controller, and
     * - populate the menu elements within the {@link BaseMenu#elements|elements}
     *
     * @throws {Error} Will throw an Error if validate returns `false`.
     */


    _createClass(BaseMenu, [{
      key: "initialize",
      value: function initialize() {
        if (!this.validate()) {
          throw new Error("AccesibleMenu: cannot initialize menu. See other error messages for more information.");
        } // Get the root menu if it doesn't exist.


        if (this.elements.rootMenu === null) this.findRootMenu(this); // Set all of the DOM elements.

        this.setDOMElements();

        if (this.isTopLevel) {
          if (this.dom.controller && this.dom.container) {
            // Create a new BaseMenuToggle to control the menu.
            var toggle = new this._MenuToggleType({
              menuToggleElement: this.dom.controller,
              parentElement: this.dom.container,
              controlledMenu: this
            });
            this._elements.controller = toggle;
          }
        }

        this.createChildElements();
      }
      /**
       * The DOM elements within the menu.
       *
       * @type {object.<HTMLElement,HTMLElement[]>}
       * @readonly
       * @see _dom
       */

    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
      /**
       * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
       *
       * @type {object.<string>}
       * @readonly
       * @see _selectors
       */

    }, {
      key: "selectors",
      get: function get() {
        return this._selectors;
      }
      /**
       * The declared accessible-menu elements within the menu.
       *
       * @type {object.<BaseMenu,BaseMenuToggle,BaseMenuItem[],BaseMenuToggle[]>}
       * @readonly
       * @see _elements
       */

    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
      /**
       * The class(es) to apply when the menu is open.
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's open class(es).
       *
       * @type {string|string[]}
       * @see _openClass
       */

    }, {
      key: "openClass",
      get: function get() {
        return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
      }
      /**
       * The class(es) to apply when the menu is closed.
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's close class(es).
       *
       * @type {string|string[]}
       * @see _closeClass
       */
      ,
      set: function set(value) {
        isValidClassList({
          openClass: value
        });

        if (this._openClass !== value) {
          this._openClass = value;
        }
      }
    }, {
      key: "closeClass",
      get: function get() {
        return this.isTopLevel ? this._closeClass : this.elements.rootMenu.closeClass;
      }
      /**
       * The flag marking the root menu.
       *
       * @type {boolean}
       * @readonly
       * @see _root
       */
      ,
      set: function set(value) {
        isValidClassList({
          closeClass: value
        });

        if (this._closeClass !== value) {
          this._closeClass = value;
        }
      }
    }, {
      key: "isTopLevel",
      get: function get() {
        return this._root;
      }
      /**
       * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
       *
       * - Attempting to set a value less than -1 will set the current child to -1.
       * - Attempting to set a value greater than or equal to the number of menu items
       *   will set the current child to the index of the last menu item in the menu.
       *
       * If the current menu has a parent menu _and_ the menu's
       * {@link BaseMenu#currentEvent|current event} is "mouse", The parent menu
       * will have it's current child updated as well to help with transitioning
       * between mouse and keyboard naviation.
       *
       * @type {number}
       * @see _currentChild
       */

    }, {
      key: "currentChild",
      get: function get() {
        return this._currentChild;
      }
      /**
       * The current state of the menu's focus.
       *
       * - If the menu has submenus, setting the focus state to "none" or "self" will
       *   update all child menus to have the focus state of "none".
       * - If the menu has a parent menu, setting the focus state to "self" or "child"
       *   will update all parent menus to have the focus state of "child".
       *
       * @type {string}
       * @see _focusState
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
          this._currentChild = -1;
          setParentChild(this);
        } else if (value >= this.elements.menuItems.length) {
          this._currentChild = this.elements.menuItems.length - 1;
          setParentChild(this);
        } else if (this.focusChild !== value) {
          this._currentChild = value;
          setParentChild(this);
        }
      }
    }, {
      key: "focusState",
      get: function get() {
        return this._focusState;
      }
      /**
       * The last event triggered on the menu.
       *
       * @type {string}
       * @see _currentEvent
       */
      ,
      set: function set(value) {
        isValidState({
          value: value
        });

        if (this._focusState !== value) {
          this._focusState = value;
        }

        if (this.elements.submenuToggles.length > 0 && (value === "self" || value === "none")) {
          this.elements.submenuToggles.forEach(function (toggle) {
            toggle.elements.controlledMenu.focusState = "none";
          });
        }

        if (this.elements.parentMenu && (value === "self" || value === "child")) {
          this.elements.parentMenu.focusState = "child";
        }
      }
    }, {
      key: "currentEvent",
      get: function get() {
        return this._currentEvent;
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

        if (this._currentEvent !== value) {
          this._currentEvent = value;

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
       * @see _hoverType
       */

    }, {
      key: "hoverType",
      get: function get() {
        return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
      }
      /**
       * The delay time (in miliseconds) used for mouseout events to take place.
       *
       * This functions differently for root vs. submenus.
       * Submenus will always inherit their root menu's hover delay.
       *
       * @type {number}
       * @see _hoverDelay
       */
      ,
      set: function set(value) {
        isValidHoverType({
          value: value
        });

        if (this._hoverType !== value) {
          this._hoverType = value;
        }
      }
    }, {
      key: "hoverDelay",
      get: function get() {
        return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
      }
      /**
       * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
       *
       * This will be `false` unless any of the following criteria are met:
       * - The menu's {@link BaseMenu#currentEvent|current event} is "keyboard".
       * - The menu's current event is "character".
       * - The menu's current event is "mouse" _and_ the menu's
       *   {@link BaseMenu_hoverTypeType|hover type} is "dynamic".
       *
       * @type {boolean}
       */
      ,
      set: function set(value) {
        isValidType("number", {
          value: value
        });

        if (this._hoverDelay !== value) {
          this._hoverDelay = value;
        }
      }
      /**
       * Validates all aspects of the menu to ensure proper functionality.
       *
       * @return {boolean} - The result of the validation.
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
        var check = true;

        if (this._dom.container !== null || this._dom.controller !== null) {
          if (!isValidInstance(HTMLElement, {
            menuElement: this._dom.menu,
            controllerElement: this._dom.controller,
            containerElement: this._dom.container
          })) {
            check = false;
          }
        } else if (!isValidInstance(HTMLElement, {
          menuElement: this._dom.menu
        })) {
          check = false;
        }

        if (this._selectors.submenuItems !== "") {
          if (!isCSSSelector({
            menuItemSelector: this._selectors.menuItems,
            menuLinkSelector: this._selectors.menuLinks,
            submenuItemSelector: this._selectors.submenuItems,
            submenuToggleSelector: this._selectors.submenuToggles,
            submenuSelector: this._selectors.submenus
          })) {
            check = false;
          }
        } else if (!isCSSSelector({
          menuItemSelector: this._selectors.menuItems,
          menuLinkSelector: this._selectors.menuLinks
        })) {
          check = false;
        }

        if (this._openClass !== "" && !isValidClassList({
          openClass: this._openClass
        })) {
          check = false;
        }

        if (this._closeClass !== "" && !isValidClassList({
          closeClass: this._closeClass
        })) {
          check = false;
        }

        if (!isValidType("boolean", {
          isTopLevel: this._root
        })) {
          check = false;
        }

        if (this._elements.parentMenu !== null && !isValidInstance(BaseMenu, {
          parentMenu: this._elements.parentMenu
        })) {
          check = false;
        }

        if (!isValidHoverType({
          hoverType: this._hoverType
        })) {
          check = false;
        }

        if (!isValidType("number", {
          hoverDelay: this._hoverDelay
        })) {
          check = false;
        }

        return check;
      }
      /**
       * Sets DOM elements within the menu.
       *
       * This will set the actual `domElement` property, so all existing items in a
       * given `domElement` property will be removed when this is run.
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
              this._dom[elementType] = domElements.filter(function (item) {
                return filter(item);
              });
            } else {
              this._dom[elementType] = domElements;
            }
          } else {
            this._dom[elementType] = domElements.filter(function (item) {
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
       * This is an additive function, so existing items in a given `domElement`
       * property will not be touched.
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
              this._dom[elementType] = [].concat(_toConsumableArray(this._dom[elementType]), _toConsumableArray(domElements.filter(function (item) {
                return filter(item);
              })));
            } else {
              this._dom[elementType] = [].concat(_toConsumableArray(this._dom[elementType]), _toConsumableArray(domElements));
            }
          } else {
            this._dom[elementType] = [].concat(_toConsumableArray(this._dom[elementType]), _toConsumableArray(domElements.filter(function (item) {
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

        if (Array.isArray(this._dom[elementType])) {
          this._dom[elementType] = [];
        } else if (typeof this._dom[elementType] !== "undefined") {
          this._dom[elementType] = null;
        } else {
          throw new Error("".concat(elementType, " is not a valid element type within the menu."));
        }
      }
      /**
       * Sets all DOM elements within the menu.
       *
       * Utiliizes {@link BaseMenu#setDOMElementType|setDOMElementType},
       * {@link BaseMenu#clearDOMElementType|clearDOMElementType},
       * and {@link BaseMenu#addDOMElementType|addDOMElementType}.
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
          this._elements.rootMenu = menu;
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

        this.dom.menuItems.forEach(function (element) {
          var menuItem;

          if (_this2.dom.submenuItems.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this2.selectors.submenuToggles); // The actual menu DOM element.

            var submenu = element.querySelector(_this2.selectors.submenus); // Create the new menu and initialize it.

            var menu = new _this2._MenuType({
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

            var toggle = new _this2._MenuToggleType({
              menuToggleElement: toggler,
              parentElement: element,
              controlledMenu: menu,
              parentMenu: _this2
            }); // Add the toggle to the list of toggles.

            _this2._elements.submenuToggles.push(toggle); // Create a new menu item.


            menuItem = new _this2._MenuItemType({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this2,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this2.selectors.menuLinks); // Create a new menu item.

            menuItem = new _this2._MenuItemType({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this2
            });
          }

          _this2._elements.menuItems.push(menuItem);
        });
      }
      /**
       * Handles focus events throughout the menu for proper menu use.
       *
       * - Adds a `focus` listener to every menu item so when it gains focus,
       *   it will set the item's containing menu's {@link BaseMenu#focusState|focus state}
       *   to "self".
       */

    }, {
      key: "handleFocus",
      value: function handleFocus() {
        var _this3 = this;

        this.elements.menuItems.forEach(function (menuItem, index) {
          menuItem.dom.link.addEventListener("focus", function () {
            _this3.focusState = "self";
            _this3.currentChild = index;
          });
        });
      }
      /**
       * Handles click events throughout the menu for proper use.
       *
       * Depending on what is supported either `touchstart` and `touchend` or
       * `mousedown` and `mouseup` will be used for all "click" event handling.
       *
       * - Adds a `touchend`/`mouseup` listener to the document so if the user clicks
       *   outside of the menu when it is open, the menu will close.
       * - Adds a `touchstart`/`mousedown` listener to every menu item that will blur
       *   all menu items in the entire menu structure (starting at the root menu) and
       *   then properly focus the clicked item.
       * - Adds a `touchend`/`mouseup` listener to every submenu item that will properly
       *   toggle the submenu open/closed.
       * - Adds a `touchend`/`mouseup` listener to the menu's controller
       *   (if the menu is the root menu) so when it is clicked it will properly
       *   toggle open/closed.
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
       * Adds `mouseenter` listeners to all menu items and `mouseleave` listeners
       * to all submenu items which function differently depending on
       * the menu's {@link BaseMenu_hoverTypeType|hover type}.
       *
       * **Hover Type "on"**
       * - When a `mouseenter` event triggers on any menu item the menu's
       *   {@link BaseMenu#currentChild| current child} value will change to that
       *   menu item.
       * - When a `mouseenter` event triggers on a submenu item the
       *   {@link BaseMenuToggle#preview|preview method} for the submenu item's
       *   toggle will be called.
       * - When a `mouseleave` event triggers on an open submenu item the
       *   {@link BaseMenuToggle#close|close method} for the submenu item's toggle
       *   will be called after a delay set by the menu's {@link BaseMenu_hoverTypeDelay|hover delay}.
       *
       * **Hover Type "dynamic"**
       * - When a `mouseenter` event triggers on any menu item the menu's
       *   current child value will change to that menu item.
       * - When a `mouseenter` event triggers on any menu item, and the menu's
       *   {@link BaseMenu#focusState|focus state} is not "none", the menu item
       *   will be focused.
       * - When a `mouseenter` event triggers on a submenu item, and a submenu is
       *   already open, the preview method for the submenu item's toggle will be called.
       * - When a `mouseenter` event triggers on a submenu item, and no submenu is
       *   open, no submenu-specific methods will be called.
       * - When a `mouseleave` event triggers on an open submenu item that is not a
       *   root-level submenu item the close method for the submenu item's toggle
       *   will be called and the submenu item will be focused after a delay set by
       *   the menu's hover delay.
       * - When a `mouseleave` event triggers on an open submenu item that is a
       *   root-level submenu item no submenu-specific methods will be called.
       *
       * **Hover Type "off"**
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
                if (_this5.hoverDelay > 0) {
                  setTimeout(function () {
                    _this5.currentEvent = "mouse";
                    menuItem.elements.toggle.close();
                  }, _this5.hoverDelay);
                } else {
                  _this5.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                }
              } else if (_this5.hoverType === "dynamic") {
                if (!_this5.isTopLevel) {
                  if (_this5.hoverDelay > 0) {
                    setTimeout(function () {
                      _this5.currentEvent = "mouse";
                      menuItem.elements.toggle.close();

                      _this5.focusCurrentChild();
                    }, _this5.hoverDelay);
                  } else {
                    _this5.currentEvent = "mouse";
                    menuItem.elements.toggle.close();

                    _this5.focusCurrentChild();
                  }
                }
              }
            });
          }
        });
      }
      /**
       * Handles keydown events throughout the menu for proper menu use.
       *
       * This method exists to assit the {@link BaseMenu#handleKeyup|handleKeyup method}.
       *
       * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
       *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
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
       *   - Opens the menu when the user hits "Space" or "Enter".
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
       * Sets the menu's {@link BaseMenu#focusState|focus state} to "self" and
       * focusses the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
       * value is `true`.
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
       * Sets the menu's {@link BaseMenu#focusState|focus state} to "none"
       * and blurs the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
       * vallue is `true`.
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
        this.focusState = "self";

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
        this.focusState = "none";

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

  /**
   * A basic navigation link contained inside of a {@link DisclousreMenu}.
   *
   * @extends BaseMenuItem
   */

  var DisclosureMenuItem = /*#__PURE__*/function (_BaseMenuItem) {
    _inherits(DisclosureMenuItem, _BaseMenuItem);

    var _super = _createSuper(DisclosureMenuItem);

    /**
     * Constructs the menu item.
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

      _classCallCheck(this, DisclosureMenuItem);

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

  /**
   * A link or button that controls the visibility of a {@link DisclousreMenu}.
   *
   * @extends BaseMenuToggle
   */

  var DisclosureMenuToggle = /*#__PURE__*/function (_BaseMenuToggle) {
    _inherits(DisclosureMenuToggle, _BaseMenuToggle);

    var _super = _createSuper(DisclosureMenuToggle);

    /**
     * Constructs the menu toggle.
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

      _classCallCheck(this, DisclosureMenuToggle);

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
     *
     * Calls the {@link DisclosureMenuToggle#closeSiblings| closeSiblings method}
     * and _then_ {@link BaseMenuToggle#open|BaseMenuToggle's open method}.
     */


    _createClass(DisclosureMenuToggle, [{
      key: "open",
      value: function open() {
        // Close all siblings.
        this.closeSiblings();

        _get(_getPrototypeOf(DisclosureMenuToggle.prototype), "open", this).call(this);
      }
      /**
       * Opens the controlled menu without the current focus entering it.
       *
       * Calls the {@link DisclosureMenuToggle#closeSiblings| closeSiblings method}
       * and _then_ {@link BaseMenuToggle#preview|BaseMenuToggle's preview method}.
       */

    }, {
      key: "preview",
      value: function preview() {
        // Close all siblings.
        this.closeSiblings();

        _get(_getPrototypeOf(DisclosureMenuToggle.prototype), "preview", this).call(this);
      }
      /**
       * Closes the controlled menu.
       *
       * Calls the {@link DisclosureMenuToggle#closeChildren| closeChildren method}
       * and _then_ {@link BaseMenuToggle#close|BaseMenuToggle's close method}.
       */

    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          // Close all children.
          this.closeChildren();
        }

        _get(_getPrototypeOf(DisclosureMenuToggle.prototype), "close", this).call(this);
      }
    }]);

    return DisclosureMenuToggle;
  }(BaseMenuToggle);

  /**
   * An accessible disclosure menu in the DOM.
   *
   * See {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html|Example Disclosure for Navigation Menus}
   *
   * @extends BaseMenu
   */

  var DisclosureMenu = /*#__PURE__*/function (_BaseMenu) {
    _inherits(DisclosureMenu, _BaseMenu);

    var _super = _createSuper(DisclosureMenu);

    /**
     * The class to use when generating submenus.
     *
     * @type {typeof DisclosureMenu}
     * @public
     */

    /**
     * The class to use when generating menu items.
     *
     * @type {typeof DisclosureMenuItem}
     * @public
     */

    /**
     * The class to use when generating submenu toggles.
     *
     * @type {typeof DisclosureMenuToggle}
     * @public
     */

    /**
     * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
     *
     * @type {number}
     * @protected
     */

    /**
     * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
     *
     * @type {boolean}
     * @protected
     */

    /**
     * Constructs the menu.
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
        hoverType: hoverType,
        hoverDelay: hoverDelay
      }); // Set optional key support.

      _defineProperty(_assertThisInitialized(_this), "_MenuType", DisclosureMenu);

      _defineProperty(_assertThisInitialized(_this), "_MenuItemType", DisclosureMenuItem);

      _defineProperty(_assertThisInitialized(_this), "_MenuToggleType", DisclosureMenuToggle);

      _defineProperty(_assertThisInitialized(_this), "_currentChild", -1);

      _defineProperty(_assertThisInitialized(_this), "_optionalSupport", false);

      _this._optionalSupport = optionalKeySupport;

      if (initialize) {
        _this.initialize();
      }

      return _this;
    }
    /**
     * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's optionalKeySupport.
     *
     * @type {boolean}
     * @see _optionalSupport
     */


    _createClass(DisclosureMenu, [{
      key: "optionalKeySupport",
      get: function get() {
        return this.isTopLevel ? this._optionalSupport : this.elements.rootMenu.optionalKeySupport;
      },
      set: function set(value) {
        isValidType("boolean", {
          optionalKeySupport: value
        });
        this._optionalSupport = value;
      }
      /**
       * Initializes the menu.
       *
       * Initialize will call the {@link BaseMenu#initialize|BaseMenu's initialize method}
       * as well as set up {@link DisclosureMenu#handleFocus|focus},
       * {@link DisclosureMenu#handleClick|click},
       * {@link DisclosureMenu#handleHover|hover},
       * {@link DisclosureMenu#handleKeydown|keydown}, and
       * {@link DisclosureMenu#handleKeyup|keyup} events for the menu.
       *
       * If the BaseMenu's initialize method throws an error,
       * this will catch it and log it to the console.
       */

    }, {
      key: "initialize",
      value: function initialize() {
        try {
          _get(_getPrototypeOf(DisclosureMenu.prototype), "initialize", this).call(this);

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
       * Validates all aspects of the menu to ensure proper functionality.
       *
       * @return {boolean} - The result of the validation.
       */

    }, {
      key: "validate",
      value: function validate() {
        var check = _get(_getPrototypeOf(DisclosureMenu.prototype), "validate", this).call(this);

        if (!isValidType("boolean", {
          optionalKeySupport: this._optionalSupport
        })) {
          check = false;
        }

        return check;
      }
      /**
       * Handles click events throughout the menu for proper use.
       *
       * Depending on what is supported either `touchstart` and `touchend` or
       * `mousedown` and `mouseup` will be used for all "click" event handling.
       *
       * - Adds all event listeners listed in
       *   {@link BaseMenu#handleClick|BaseMenu's handleClick method}, and
       * - adds a `touchend`/`mouseup` listener to the `document` so if the user
       *   clicks outside of the menu it will close if it is open.
       *
       */

    }, {
      key: "handleClick",
      value: function handleClick() {
        var _this2 = this;

        _get(_getPrototypeOf(DisclosureMenu.prototype), "handleClick", this).call(this); // Use touch over mouse events when supported.


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
       *
       * This method exists to assist the {@link DisclosureMenu#handleKeyup|handleKeyup method}.
       * - Adds all `keydown` listeners from {@link BaseMenu#handleKeydown|BaseMenu's handleKeydown method}
       * - Adds a `keydown` listener to the menu/all submenus.
       *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
       *   - _If_ {@link DisclosureMenu#optionalKeySupport|optional keyboard support}
       *     is enabled, blocks propagation on the following keys:
       *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this3 = this;

        _get(_getPrototypeOf(DisclosureMenu.prototype), "handleKeydown", this).call(this);

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
       *
       * Adds all `keyup` listeners from {@link BaseMenu#handleKeyup|BaseMenu's handleKeyup method}.
       *
       * Adds the following keybindings (explanations are taken from the
       * {@link https://www.w3.org/TR/wai-aria-practices-1.2/examples/disclosure/disclosure-navigation.html#kbd_label|WAI ARIA Pracitices Example Disclosure for Navigation Menus}):
       *
       * | Key | Function |
       * | --- | --- |
       * | _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
       * | _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
       * | _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
       * | _Down Arrow_ or _Right Arrow_ (Optional}) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
       * | _Up Arrow_ or _Left Arrow_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
       * | _Home_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
       * | _End_ (Optional}) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
       *
       * The optional keybindings are controlled by the menu's {@link DisclosureMenu#optionalKeySupport|optionalKeySupport} value.
       */

    }, {
      key: "handleKeyup",
      value: function handleKeyup() {
        var _this4 = this;

        _get(_getPrototypeOf(DisclosureMenu.prototype), "handleKeyup", this).call(this);

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

  return DisclosureMenu;

}());
//# sourceMappingURL=disclosure-menu.js.map
