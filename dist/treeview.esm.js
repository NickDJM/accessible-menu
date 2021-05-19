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
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

        throw new TypeError("AccessibleMenu: ".concat(key, " must be an instance of ").concat(contructor, ". ").concat(elementType, " given."));
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
 * @param   {object} values - The value(s) to check.
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
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */

function isValidClassList(values) {
  try {
    if (_typeof(values) !== "object") {
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
 * @param   {object} values - The value(s) to check.
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
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */

function isValidEvent(values) {
  try {
    if (_typeof(values) !== "object") {
      var type = _typeof(values);

      throw new TypeError("AccessibleMenu: Values given to isValidEvent() must be inside of an object. ".concat(type, " given."));
    }

    var validEvents = ["none", "mouse", "keyboard"];

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
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */

function isValidHoverType(values) {
  try {
    if (_typeof(values) !== "object") {
      var type = _typeof(values);

      throw new TypeError("AccessibleMenu: Values given to isValidHoverType() must be inside of an object. ".concat(type, " given."));
    }

    var validEvents = ["off", "on", "dynamic"];

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
  isValidType("string", {
    event: event
  });
  isValidInstance(HTMLElement, {
    element: element
  });
  var eventProp = "on".concat(event);
  return typeof element[eventProp] !== "undefined";
}

/*
 * A link or button that controls the visibility of a Menu.
 */

var BaseMenuToggle = /*#__PURE__*/function () {
  /**
   * {@inheritdoc}
   *
   * @param {object}        param0                     - The menu toggle object.
   * @param {HTMLElement}   param0.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}   param0.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}      param0.controlledMenu      - The menu controlled by this toggle.
   * @param {BaseMenu|null} [param0.parentMenu = null] - The menu containing this toggle.
   */
  function BaseMenuToggle(_ref) {
    var menuToggleElement = _ref.menuToggleElement,
        parentElement = _ref.parentElement,
        controlledMenu = _ref.controlledMenu,
        _ref$parentMenu = _ref.parentMenu,
        parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu;

    _classCallCheck(this, BaseMenuToggle);

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
    this.initialize();
  }
  /**
   * Initialize the toggle by ensuring WAI-ARIA values are set,
   * handling click events, and adding new keydown events.
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
     * Set the open state on the menu.
     *
     * @param {boolean} value - The open state.
     */
    ,
    set: function set(value) {
      isValidType("boolean", {
        value: value
      });
      this.show = value;
    }
    /**
     * Expands the controlled menu.
     *
     * Alters ARIA attributes and classes.
     *
     * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
     */

  }, {
    key: "expand",
    value: function expand() {
      var _this = this;

      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$elements$contro = this.elements.controlledMenu,
          closeClass = _this$elements$contro.closeClass,
          openClass = _this$elements$contro.openClass;
      this.dom.toggle.setAttribute("aria-expanded", "true"); // Add the open class

      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(openClass);
        } else if (Array.isArray(openClass)) {
          openClass.forEach(function (value) {
            _this.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      } // Remove the close class.


      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
        } else if (Array.isArray(closeClass)) {
          closeClass.forEach(function (value) {
            _this.elements.controlledMenu.dom.menu.classList.remove(value);
          });
        }
      }

      if (emit) {
        this.dom.toggle.dispatchEvent(this.expandEvent);
      }
    }
    /**
     * Collapses the controlled menu.
     *
     * Alters ARIA attributes and classes.
     *
     * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
     */

  }, {
    key: "collapse",
    value: function collapse() {
      var _this2 = this;

      var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$elements$contro2 = this.elements.controlledMenu,
          closeClass = _this$elements$contro2.closeClass,
          openClass = _this$elements$contro2.openClass;
      this.dom.toggle.setAttribute("aria-expanded", "false"); // Add the close class

      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(closeClass);
        } else if (Array.isArray(closeClass)) {
          closeClass.forEach(function (value) {
            _this2.elements.controlledMenu.dom.menu.classList.add(value);
          });
        }
      } // Remove the open class.


      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(openClass);
        } else if (Array.isArray(openClass)) {
          openClass.forEach(function (value) {
            _this2.elements.controlledMenu.dom.menu.classList.remove(value);
          });
        }
      }

      if (emit) {
        this.dom.toggle.dispatchEvent(this.collapseEvent);
      }
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
      var _this3 = this;

      if (this.elements.parentMenu) {
        this.elements.parentMenu.elements.submenuToggles.forEach(function (toggle) {
          if (toggle !== _this3) toggle.close();
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
 * A basic navigation link contained inside of a Menu.
 */
var BaseMenuItem = /*#__PURE__*/function () {
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


  _createClass(BaseMenuItem, [{
    key: "initialize",
    value: function initialize() {}
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
     * Focuses the menu item's link if triggering event is valid.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.elements.parentMenu.currentEvent === "keyboard" || this.elements.parentMenu.currentEvent === "mouse" && this.elements.parentMenu.hoverType === "dynamic") {
        this.dom.link.focus();
      }
    }
    /**
     * Blurs the menu item's link if triggering event is valid.
     */

  }, {
    key: "blur",
    value: function blur() {
      if (this.elements.parentMenu.currentEvent === "keyboard" || this.elements.parentMenu.currentEvent === "mouse" && this.elements.parentMenu.hoverType === "dynamic") {
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
      Character: !!key.match(/^[a-zA-Z]{1}$/),
      Tab: key === "Tab" || key === 9
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
   * @param {string}               [param0.hoverType = "off"]           - The type of hoverability a menu has.
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
        _ref$hoverType = _ref.hoverType,
        hoverType = _ref$hoverType === void 0 ? "off" : _ref$hoverType,
        _ref$hoverDelay = _ref.hoverDelay,
        hoverDelay = _ref$hoverDelay === void 0 ? 250 : _ref$hoverDelay;

    _classCallCheck(this, BaseMenu);

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
   */


  _createClass(BaseMenu, [{
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
            controlledMenu: this,
            openClass: this.openClass,
            closeClass: this.closeClass
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
     * The class(es) to apply when the menu is "open".
     *
     * This functions differently for root vs. submenus.
     * Submenus will always inherit their root menu's open class(es).
     *
     * @returns {string|string[]} - The class(es).
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
     * @returns {string|string[]} - The class(es).
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
      return this.isTopLevel ? this.submenuCloseClass : this.elements.rootMenu.closeClass;
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
      isValidType("number", {
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
     * @returns {BaseMenuItem} - The menu item.
     */
    ,
    set: function set(value) {
      isValidEvent({
        value: value
      });
      this.event = value;
    }
    /**
     * Set the type of hoverability for the menu.
     *
     * @param {string} value - The hover type.
     */

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
     * @returns {string} - The hover type.
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
     * @returns {number} - The delay time.
     */
    ,
    set: function set(value) {
      isValidHoverType({
        value: value
      });
      this.hover = value;
    }
    /**
     * Set the delay time (in miliseconds) used for mouseout events to take place.
     *
     * @param {number} value - The delay time.
     */

  }, {
    key: "hoverDelay",
    get: function get() {
      return this.root ? this.delay : this.elements.rootMenu.hoverDelay;
    },
    set: function set(value) {
      isValidType("number", {
        value: value
      });
      this.delay = value;
    }
    /**
     * Validates all aspects of the menu to ensure proper functionality.
     *
     * @returns {boolean} - The result of the validation.
     */

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
        submenuOpenClass: submenuOpenClass
      })) {
        check = false;
      }

      if (submenuCloseClass !== "" && !isValidClassList({
        submenuCloseClass: submenuCloseClass
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
      } // Close the menu if a click event happens outside of it.


      document.addEventListener("mouseup", function (event) {
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
      }); // Toggle submenus when their controllers are clicked.

      this.elements.submenuToggles.forEach(function (toggle) {
        if (isEventSupported("touchend", toggle.dom.toggle)) {
          toggle.dom.toggle.ontouchend = function (event) {
            toggleToggle(_this4, toggle, event);
          };
        } else {
          toggle.dom.toggle.onmouseup = function (event) {
            toggleToggle(_this4, toggle, event);
          };
        }
      }); // Open the this menu if it's controller is clicked.

      if (this.isTopLevel && this.elements.controller) {
        if (isEventSupported("touchend", this.elements.controller.dom.toggle)) {
          this.elements.controller.dom.toggle.ontouchend = function (event) {
            toggleToggle(_this4, _this4.elements.controller, event);
          };
        } else {
          this.elements.controller.dom.toggle.onmouseup = function (event) {
            toggleToggle(_this4, _this4.elements.controller, event);
          };
        }
      }
    }
    /**
     * Handles hover events throughout the menu for proper use.
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

      if (this.currentEvent === "keyboard" || this.currentEvent === "mouse" && this.hoverType === "dynamic") {
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

      if (this.currentEvent === "keyboard" || this.currentEvent === "mouse" && this.hoverType === "dynamic") {
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
      if (this.currentChild < this.elements.menuItems.length - 1) {
        this.blurCurrentChild();
        this.currentChild = this.currentChild + 1;
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
  }]);

  return BaseMenu;
}();

/**
 * A basic navigation link contained inside of a Treeview.
 */

var TreeviewItem = /*#__PURE__*/function (_BaseMenuItem) {
  _inherits(TreeviewItem, _BaseMenuItem);

  var _super = _createSuper(TreeviewItem);

  /**
   * {@inheritdoc}
   *
   * @param {object}              param0                         - The menu item object.
   * @param {HTMLElement}         param0.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}         param0.menuLinkElement         - The menu item's link in the DOM.
   * @param {Treeview}            param0.parentMenu              - The parent menu.
   * @param {boolean}             [param0.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {Treeview|null}       [param0.childMenu = null]      - The child menu.
   * @param {TreeviewToggle|null} [param0.toggle = null]         - The controller for the child menu.
   * @param {boolean}             [param0.initialize = true]     - A flag to initialize the menu item immediately upon creation.
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

    _classCallCheck(this, TreeviewItem);

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

  return TreeviewItem;
}(BaseMenuItem);

/*
 * A link or button that controls the visibility of a TreeviewNavigation.
 */

var TreeviewNavigationToggle = /*#__PURE__*/function (_BaseMenuToggle) {
  _inherits(TreeviewNavigationToggle, _BaseMenuToggle);

  var _super = _createSuper(TreeviewNavigationToggle);

  /**
   * {@inheritdoc}
   *
   * @param {object}                  param0                     - The menu toggle object.
   * @param {HTMLElement}             param0.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}             param0.parentElement       - The element containing the controlled menu.
   * @param {TreeviewNavigation}      param0.controlledMenu      - The menu controlled by this toggle.
   * @param {TreeviewNavigation|null} [param0.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                 [param0.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  function TreeviewNavigationToggle(_ref) {
    var _this;

    var menuToggleElement = _ref.menuToggleElement,
        parentElement = _ref.parentElement,
        controlledMenu = _ref.controlledMenu,
        _ref$parentMenu = _ref.parentMenu,
        parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
        _ref$initialize = _ref.initialize,
        initialize = _ref$initialize === void 0 ? true : _ref$initialize;

    _classCallCheck(this, TreeviewNavigationToggle);

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

  return TreeviewNavigationToggle;
}(BaseMenuToggle);

/**
 * An accessible treeview navigation in the DOM.
 *
 * See https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2a.html
 * or https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2b.html
 */

var Treeview = /*#__PURE__*/function (_BaseMenu) {
  _inherits(Treeview, _BaseMenu);

  var _super = _createSuper(Treeview);

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
   * @param {Treeview|null}    [param0.parentMenu = null]           - The parent menu to this menu.
   * @param {string}           [param0.hoverType = "off"]           - The type of hoverability a menu has.
   * @param {number}           [param0.hoverDelay = 250]            - The delay for closing menus if the menu is hoverable (in miliseconds).
   * @param {boolean}          [param0.initialize = true]           - A flag to initialize the menu immediately upon creation.
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
    _this.MenuToggleType = TreeviewNavigationToggle;

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

        this.handleFocus();
        this.handleClick();
        this.handleHover();
      } catch (error) {
        console.error(error);
      }
    }
  }]);

  return Treeview;
}(BaseMenu);

export default Treeview;
//# sourceMappingURL=treeview.esm.js.map
