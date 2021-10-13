var Menubar = (function () {
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
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

  var BaseMenuToggle = function () {
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
      this._dom.toggle = menuToggleElement;
      this._dom.parent = parentElement;
      this._elements.controlledMenu = controlledMenu;
      this._elements.parentMenu = parentMenu;
    }
    _createClass(BaseMenuToggle, [{
      key: "initialize",
      value: function initialize() {
        this.dom.toggle.setAttribute("aria-haspopup", "true");
        this.dom.toggle.setAttribute("aria-expanded", "false");
        if (!isTag("button", {
          toggle: this.dom.toggle
        })) {
          this.dom.toggle.setAttribute("role", "button");
        }
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
        }
        this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby", this.dom.toggle.id);
        this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id);
        this._collapse(false);
      }
    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
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
    }, {
      key: "_expand",
      value: function _expand() {
        var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var _this$elements$contro = this.elements.controlledMenu,
            closeClass = _this$elements$contro.closeClass,
            openClass = _this$elements$contro.openClass;
        this.dom.toggle.setAttribute("aria-expanded", "true");
        if (openClass !== "") {
          if (typeof openClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(openClass);
          } else {
            var _this$elements$contro2;
            (_this$elements$contro2 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro2, _toConsumableArray(openClass));
          }
        }
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
    }, {
      key: "_collapse",
      value: function _collapse() {
        var emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var _this$elements$contro4 = this.elements.controlledMenu,
            closeClass = _this$elements$contro4.closeClass,
            openClass = _this$elements$contro4.openClass;
        this.dom.toggle.setAttribute("aria-expanded", "false");
        if (closeClass !== "") {
          if (typeof closeClass === "string") {
            this.elements.controlledMenu.dom.menu.classList.add(closeClass);
          } else {
            var _this$elements$contro5;
            (_this$elements$contro5 = this.elements.controlledMenu.dom.menu.classList).add.apply(_this$elements$contro5, _toConsumableArray(closeClass));
          }
        }
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
    }, {
      key: "open",
      value: function open() {
        this.elements.controlledMenu.focusState = "self";
        this._expand();
        this.isOpen = true;
      }
    }, {
      key: "preview",
      value: function preview() {
        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        }
        this._expand();
        this.isOpen = true;
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          this.elements.controlledMenu.currentChild = 0;
          this.elements.controlledMenu.blur();
          if (this.elements.parentMenu) {
            this.elements.parentMenu.focusState = "self";
          }
          this._collapse();
          this.isOpen = false;
        }
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
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

  var BaseMenuItem = function () {
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
      this._dom.item = menuItemElement;
      this._dom.link = menuLinkElement;
      this._elements.parentMenu = parentMenu;
      this._elements.childMenu = childMenu;
      this._elements.toggle = toggle;
      this._submenu = isSubmenuItem;
    }
    _createClass(BaseMenuItem, [{
      key: "initialize",
      value: function initialize() {}
    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
    }, {
      key: "isSubmenuItem",
      get: function get() {
        return this._submenu;
      }
    }, {
      key: "focus",
      value: function focus() {
        if (this.elements.parentMenu.shouldFocus) {
          this.dom.link.focus();
        }
      }
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

  function keyPress(event) {
    try {
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
      return "";
    }
  }
  function preventEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  var BaseMenu = function () {
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
      this._dom.menu = menuElement;
      this._dom.controller = controllerElement;
      this._dom.container = containerElement;
      this._selectors.menuItems = menuItemSelector;
      this._selectors.menuLinks = menuLinkSelector;
      this._selectors.submenuItems = submenuItemSelector;
      this._selectors.submenuToggles = submenuToggleSelector;
      this._selectors.submenus = submenuSelector;
      this._elements.menuItems = [];
      this._elements.submenuToggles = [];
      this._elements.controller = null;
      this._elements.parentMenu = parentMenu;
      this._elements.rootMenu = isTopLevel ? this : null;
      this._openClass = openClass || "";
      this._closeClass = closeClass || "";
      this._root = isTopLevel;
      this._hoverType = hoverType;
      this._hoverDelay = hoverDelay;
    }
    _createClass(BaseMenu, [{
      key: "initialize",
      value: function initialize() {
        if (!this._validate()) {
          throw new Error("AccesibleMenu: cannot initialize menu. See other error messages for more information.");
        }
        if (this.elements.rootMenu === null) this._findRootMenu(this);
        this._setDOMElements();
        if (this.isTopLevel) {
          if (this.dom.controller && this.dom.container) {
            var toggle = new this._MenuToggleType({
              menuToggleElement: this.dom.controller,
              parentElement: this.dom.container,
              controlledMenu: this
            });
            this._elements.controller = toggle;
          }
        }
        this._createChildElements();
      }
    }, {
      key: "dom",
      get: function get() {
        return this._dom;
      }
    }, {
      key: "selectors",
      get: function get() {
        return this._selectors;
      }
    }, {
      key: "elements",
      get: function get() {
        return this._elements;
      }
    }, {
      key: "isTopLevel",
      get: function get() {
        return this._root;
      }
    }, {
      key: "openClass",
      get: function get() {
        return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
      }
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
      key: "currentChild",
      get: function get() {
        return this._currentChild;
      }
      ,
      set: function set(value) {
        isValidType("number", {
          value: value
        });
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
    }, {
      key: "hoverType",
      get: function get() {
        return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
      }
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
      ,
      set: function set(value) {
        isValidType("number", {
          value: value
        });
        if (this._hoverDelay !== value) {
          this._hoverDelay = value;
        }
      }
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
      key: "_validate",
      value: function _validate() {
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
    }, {
      key: "_setDOMElementType",
      value: function _setDOMElementType(elementType) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dom.menu;
        var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (typeof this.selectors[elementType] === "string") {
          if (!Array.isArray(this.dom[elementType])) {
            throw new Error("AccessibleMenu: The \"".concat(elementType, "\" element cannot be set through _setDOMElementType."));
          }
          if (base !== this.dom.menu) isValidInstance(HTMLElement, {
            base: base
          });
          var domElements = Array.from(base.querySelectorAll(this.selectors[elementType]));
          var filteredElements = domElements.filter(function (item) {
            return item.parentElement === base;
          });
          if (overwrite) {
            this._dom[elementType] = filteredElements;
          } else {
            this._dom[elementType] = [].concat(_toConsumableArray(this._dom[elementType]), _toConsumableArray(filteredElements));
          }
        } else {
          throw new Error("AccessibleMenu: \"".concat(elementType, "\" is not a valid element type within the menu."));
        }
      }
    }, {
      key: "_resetDOMElementType",
      value: function _resetDOMElementType(elementType) {
        if (typeof this.dom[elementType] !== "undefined") {
          if (!Array.isArray(this.dom[elementType])) {
            throw new Error("AccessibleMenu: The \"".concat(elementType, "\" element cannot be reset through _resetDOMElementType."));
          }
          this._dom[elementType] = [];
        } else {
          throw new Error("AccessibleMenu: \"".concat(elementType, "\" is not a valid element type within the menu."));
        }
      }
    }, {
      key: "_setDOMElements",
      value: function _setDOMElements() {
        var _this = this;
        this._setDOMElementType("menuItems");
        if (this.selectors.submenuItems !== "") {
          this._setDOMElementType("submenuItems");
          this._resetDOMElementType("submenuToggles");
          this._resetDOMElementType("submenus");
          this.dom.submenuItems.forEach(function (item) {
            _this._setDOMElementType("submenuToggles", item, false);
            _this._setDOMElementType("submenus", item, false);
          });
        }
      }
    }, {
      key: "_findRootMenu",
      value: function _findRootMenu(menu) {
        if (menu.isTopLevel) {
          this._elements.rootMenu = menu;
        } else if (menu.elements.parentMenu !== null) {
          this._findRootMenu(menu.elements.parentMenu);
        } else {
          throw new Error("Cannot find root menu.");
        }
      }
    }, {
      key: "_createChildElements",
      value: function _createChildElements() {
        var _this2 = this;
        this.dom.menuItems.forEach(function (element) {
          var menuItem;
          if (_this2.dom.submenuItems.includes(element)) {
            var toggler = element.querySelector(_this2.selectors.submenuToggles);
            var submenu = element.querySelector(_this2.selectors.submenus);
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
            });
            var toggle = new _this2._MenuToggleType({
              menuToggleElement: toggler,
              parentElement: element,
              controlledMenu: menu,
              parentMenu: _this2
            });
            _this2._elements.submenuToggles.push(toggle);
            menuItem = new _this2._MenuItemType({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this2,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector(_this2.selectors.menuLinks);
            menuItem = new _this2._MenuItemType({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this2
            });
          }
          _this2._elements.menuItems.push(menuItem);
        });
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        var _this3 = this;
        this.elements.menuItems.forEach(function (menuItem, index) {
          menuItem.dom.link.addEventListener("focus", function () {
            _this3.focusState = "self";
            _this3.currentChild = index;
          });
        });
      }
    }, {
      key: "_handleClick",
      value: function _handleClick() {
        var _this4 = this;
        function toggleToggle(menu, toggle, event) {
          preventEvent(event);
          toggle.toggle();
          if (toggle.isOpen) {
            menu.focusState = "self";
            toggle.elements.controlledMenu.focusState = "none";
          }
        }
        this.elements.menuItems.forEach(function (item, index) {
          item.dom.link.addEventListener("pointerdown", function () {
            _this4.currentEvent = "mouse";
            _this4.elements.rootMenu.blurChildren();
            _this4.focusChild(index);
          }, {
            passive: true
          });
          if (item.isSubmenuItem) {
            item.elements.toggle.dom.toggle.addEventListener("pointerup", function (event) {
              _this4.currentEvent = "mouse";
              toggleToggle(_this4, item.elements.toggle, event);
            });
          }
        });
        if (this.isTopLevel && this.elements.controller) {
          this.elements.controller.dom.toggle.addEventListener("pointerup", function (event) {
            _this4.currentEvent = "mouse";
            toggleToggle(_this4, _this4.elements.controller, event);
          });
        }
      }
    }, {
      key: "_handleHover",
      value: function _handleHover() {
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
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown() {
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
    }, {
      key: "_handleKeyup",
      value: function _handleKeyup() {
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
    }, {
      key: "focus",
      value: function focus() {
        this.focusState = "self";
        if (this.shouldFocus) {
          this.dom.menu.focus();
        }
      }
    }, {
      key: "blur",
      value: function blur() {
        this.focusState = "none";
        if (this.shouldFocus) {
          this.dom.menu.blur();
        }
      }
    }, {
      key: "focusCurrentChild",
      value: function focusCurrentChild() {
        this.focusState = "self";
        if (this.currentChild !== -1) {
          this.currentMenuItem.focus();
        }
      }
    }, {
      key: "focusChild",
      value: function focusChild(index) {
        this.blurCurrentChild();
        this.currentChild = index;
        this.focusCurrentChild();
      }
    }, {
      key: "focusFirstChild",
      value: function focusFirstChild() {
        this.focusChild(0);
      }
    }, {
      key: "focusLastChild",
      value: function focusLastChild() {
        this.focusChild(this.elements.menuItems.length - 1);
      }
    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
        if (this.currentChild < this.elements.menuItems.length - 1) {
          this.focusChild(this.currentChild + 1);
        } else {
          this.focusCurrentChild();
        }
      }
    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        if (this.currentChild > 0) {
          this.focusChild(this.currentChild - 1);
        } else {
          this.focusCurrentChild();
        }
      }
    }, {
      key: "blurCurrentChild",
      value: function blurCurrentChild() {
        this.focusState = "none";
        if (this.currentChild !== -1) {
          this.currentMenuItem.blur();
        }
      }
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
    }, {
      key: "closeChildren",
      value: function closeChildren() {
        this.elements.submenuToggles.forEach(function (toggle) {
          return toggle.close();
        });
      }
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

  var MenubarItem = function (_BaseMenuItem) {
    _inherits(MenubarItem, _BaseMenuItem);
    var _super = _createSuper(MenubarItem);
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
      _classCallCheck(this, MenubarItem);
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
    _createClass(MenubarItem, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(MenubarItem.prototype), "initialize", this).call(this);
        this.dom.item.setAttribute("role", "none");
        this.dom.link.setAttribute("role", "menuitem");
        this.dom.link.tabIndex = -1;
      }
    }, {
      key: "focus",
      value: function focus() {
        _get(_getPrototypeOf(MenubarItem.prototype), "focus", this).call(this);
        if (this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = 0;
        }
      }
    }, {
      key: "blur",
      value: function blur() {
        _get(_getPrototypeOf(MenubarItem.prototype), "blur", this).call(this);
        if (this.elements.parentMenu.isTopLevel) {
          this.dom.link.tabIndex = -1;
        }
      }
    }]);
    return MenubarItem;
  }(BaseMenuItem);

  var MenubarToggle = function (_BaseMenuToggle) {
    _inherits(MenubarToggle, _BaseMenuToggle);
    var _super = _createSuper(MenubarToggle);
    function MenubarToggle(_ref) {
      var _this;
      var menuToggleElement = _ref.menuToggleElement,
          parentElement = _ref.parentElement,
          controlledMenu = _ref.controlledMenu,
          _ref$parentMenu = _ref.parentMenu,
          parentMenu = _ref$parentMenu === void 0 ? null : _ref$parentMenu,
          _ref$initialize = _ref.initialize,
          initialize = _ref$initialize === void 0 ? true : _ref$initialize;
      _classCallCheck(this, MenubarToggle);
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
    _createClass(MenubarToggle, [{
      key: "open",
      value: function open() {
        this.closeSiblings();
        _get(_getPrototypeOf(MenubarToggle.prototype), "open", this).call(this);
      }
    }, {
      key: "preview",
      value: function preview() {
        this.closeSiblings();
        _get(_getPrototypeOf(MenubarToggle.prototype), "preview", this).call(this);
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen) {
          this.closeChildren();
        }
        _get(_getPrototypeOf(MenubarToggle.prototype), "close", this).call(this);
      }
    }]);
    return MenubarToggle;
  }(BaseMenuToggle);

  var Menubar = function (_BaseMenu) {
    _inherits(Menubar, _BaseMenu);
    var _super = _createSuper(Menubar);
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
      _classCallCheck(this, Menubar);
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
      _defineProperty(_assertThisInitialized(_this), "_MenuType", Menubar);
      _defineProperty(_assertThisInitialized(_this), "_MenuItemType", MenubarItem);
      _defineProperty(_assertThisInitialized(_this), "_MenuToggleType", MenubarToggle);
      if (initialize) {
        _this.initialize();
      }
      return _this;
    }
    _createClass(Menubar, [{
      key: "initialize",
      value: function initialize() {
        try {
          _get(_getPrototypeOf(Menubar.prototype), "initialize", this).call(this);
          this.dom.menu.setAttribute("role", "menubar");
          this._handleFocus();
          this._handleClick();
          this._handleHover();
          this._handleKeydown();
          this._handleKeyup();
          if (this.isTopLevel) {
            this.elements.menuItems[0].dom.link.tabIndex = 0;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, {
      key: "_handleClick",
      value: function _handleClick() {
        var _this2 = this;
        _get(_getPrototypeOf(Menubar.prototype), "_handleClick", this).call(this);
        document.addEventListener("pointerup", function (event) {
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
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown() {
        var _this3 = this;
        _get(_getPrototypeOf(Menubar.prototype), "_handleKeydown", this).call(this);
        this.dom.menu.addEventListener("keydown", function (event) {
          _this3.currentEvent = "keyboard";
          var key = keyPress(event);
          if (key === "Tab") {
            if (_this3.elements.rootMenu.focusState !== "none") {
              _this3.elements.rootMenu.blur();
              _this3.elements.rootMenu.closeChildren();
            } else {
              _this3.elements.rootMenu.focus();
            }
          }
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
    }, {
      key: "_handleKeyup",
      value: function _handleKeyup() {
        var _this4 = this;
        _get(_getPrototypeOf(Menubar.prototype), "_handleKeyup", this).call(this);
        this.dom.menu.addEventListener("keyup", function (event) {
          _this4.currentEvent = "keyboard";
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;
          if (key === "Character" && !modifier) {
            preventEvent(event);
            _this4.elements.rootMenu.currentEvent = "character";
            _this4.focusNextChildWithCharacter(event.key);
          } else if (_this4.isTopLevel) {
            if (_this4.focusState === "self") {
              if (key === "Space" || key === "Enter") {
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  _this4.currentMenuItem.elements.toggle.open();
                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                } else {
                  _this4.currentMenuItem.dom.link.click();
                }
              } else if (key === "ArrowRight") {
                preventEvent(event);
                var previousChildOpen = _this4.currentMenuItem.isSubmenuItem && _this4.currentMenuItem.elements.toggle.isOpen;
                _this4.focusNextChild();
                if (previousChildOpen) {
                  if (_this4.currentMenuItem.isSubmenuItem) {
                    _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                    _this4.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this4.closeChildren();
                  }
                }
              } else if (key === "ArrowLeft") {
                preventEvent(event);
                var _previousChildOpen = _this4.currentMenuItem.isSubmenuItem && _this4.currentMenuItem.elements.toggle.isOpen;
                _this4.focusPreviousChild();
                if (_previousChildOpen) {
                  if (_this4.currentMenuItem.isSubmenuItem) {
                    _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                    _this4.currentMenuItem.elements.toggle.preview();
                  } else {
                    _this4.closeChildren();
                  }
                }
              } else if (key === "ArrowDown") {
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  _this4.currentMenuItem.elements.toggle.open();
                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                  });
                }
              } else if (key === "ArrowUp") {
                if (_this4.currentMenuItem.isSubmenuItem) {
                  preventEvent(event);
                  _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  _this4.currentMenuItem.elements.toggle.open();
                  requestAnimationFrame(function () {
                    _this4.currentMenuItem.elements.childMenu.focusLastChild();
                  });
                }
              } else if (key === "Home") {
                preventEvent(event);
                _this4.focusFirstChild();
              } else if (key === "End") {
                preventEvent(event);
                _this4.focusLastChild();
              } else if (key === "Escape") {
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
              if (_this4.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                _this4.currentMenuItem.elements.toggle.open();
                requestAnimationFrame(function () {
                  _this4.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "Escape") {
              preventEvent(event);
              _this4.elements.rootMenu.closeChildren();
              _this4.elements.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              if (_this4.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                _this4.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                _this4.currentMenuItem.elements.toggle.open();
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
              preventEvent(event);
              _this4.focusNextChild();
            } else if (key === "ArrowUp") {
              preventEvent(event);
              _this4.focusPreviousChild();
            } else if (key === "Home") {
              preventEvent(event);
              _this4.focusFirstChild();
            } else if (key === "End") {
              preventEvent(event);
              _this4.focusLastChild();
            }
          }
        });
      }
    }, {
      key: "focusNextChild",
      value: function focusNextChild() {
        if (this.currentChild === this.elements.menuItems.length - 1) {
          this.focusFirstChild();
        } else {
          this.focusChild(this.currentChild + 1);
        }
      }
    }, {
      key: "focusPreviousChild",
      value: function focusPreviousChild() {
        if (this.currentChild === 0) {
          this.focusLastChild();
        } else {
          this.focusChild(this.currentChild - 1);
        }
      }
    }, {
      key: "focusNextChildWithCharacter",
      value: function focusNextChildWithCharacter(char) {
        var match = char.toLowerCase();
        var index = this.currentChild + 1;
        var found = false;
        while (!found && index < this.elements.menuItems.length) {
          var text = "";
          if (this.elements.menuItems[index].dom.item.innerText) {
            text = this.elements.menuItems[index].dom.item.innerText;
          } else {
            text = this.elements.menuItems[index].dom.item.textContent;
          }
          text = text.replace(/[\s]/g, "").toLowerCase().charAt(0);
          if (text === match) {
            found = true;
            this.focusChild(index);
          }
          index++;
        }
      }
    }]);
    return Menubar;
  }(BaseMenu);

  return Menubar;

})();
//# sourceMappingURL=menubar.js.map
