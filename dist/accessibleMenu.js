"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccessibleMenu = function () {
  'use strict'; // Custom validation for params.

  var validate = {
    event: function event(value) {
      if (!(value instanceof Event)) {
        throw new TypeError("event must be an event.");
      }
    },
    keyboardEvent: function keyboardEvent(value) {
      if (!(value instanceof KeyboardEvent)) {
        throw new TypeError("event must be a keyboard event.");
      }
    }
  };
  /**
   * Retrieves the pressed key from an event.
   *
   * @param   {KeyboardEvent} event - The keyboard event.
   *
   * @returns {string} - The name of the key.
   */

  function keyPress(event) {
    // Run validation.
    validate.keyboardEvent(event);

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
    validate.event(event);
    event.preventDefault();
    event.stopPropagation();
  } // Custom validation for params.


  var validate$1 = {
    menuToggleElement: function menuToggleElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuToggleElement must be an HTML Element.");
      }
    },
    parentElement: function parentElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("parentElement must be an HTML Element.");
      }
    },
    menu: function menu(value) {
      // Ensure value is an Menu element.
      if (!(value instanceof Menu)) {
        throw new TypeError("menu must be a Menu.");
      }
    },
    openClass: function openClass(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw TypeError("openClass must be a string.");
      } // Ensure value is a valid CSS class name.


      var invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");

      if (invalidCharacters.length > 0) {
        throw Error("openClass must be a valid CSS class.");
      }
    },
    parentMenu: function parentMenu(value) {
      // Value is allowed to be null.
      if (value === null) return; // Ensure value is an Menu element.

      if (!(value instanceof Menu)) {
        throw new TypeError("parentMenu must be a Menu.");
      }
    }
  };
  /**
   * A link or button that controls the visibility of a menu.
   *
   * Must be initialized to be fully functional.
   */

  var MenuToggle =
  /*#__PURE__*/
  function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}           param0                   - The menu toggle object.
     * @param {HTMLElement}      param0.menuToggleElement - The toggle element in the DOM.
     * @param {HTMLElement}      param0.parentElement     - The element containing the menu.
     * @param {Menu}             param0.menu              - The menu controlled by the this toggle.
     * @param {string}           param0.openClass         - The class to use when a submenu is open.
     * @param {Menu|null}        param0.parentMenu        - The menu containing the toggle.
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
      validate$1.menuToggleElement(menuToggleElement);
      validate$1.parentElement(parentElement);
      validate$1.menu(menu);
      validate$1.openClass(openClass);
      validate$1.parentMenu(parentMenu);
      this.domElements = {
        toggle: menuToggleElement,
        parent: parentElement
      };
      this.elements = {
        menu: menu,
        parentMenu: parentMenu
      };
      this.openClass = openClass;
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
      key: "open",

      /**
       * Opens the submenu.
       */
      value: function open() {
        if (!this.isOpen) {
          // Set the open value.
          this.isOpen = true; // Assign new WAI-ARIA/class values.

          this.element.setAttribute("aria-expanded", "true");
          this.parentElement.classList.add(this.openClass);
          this.menu.element.classList.add(this.openClass); // Close all sibling menus.

          this.closeSiblings(); // Set proper focus states to parent & child.

          if (this.parentMenu) this.parentMenu.currentFocus = "child";
          this.menu.currentFocus = "self"; // Set the new focus.

          this.menu.focusFirstChild();
        }
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
          this.menu.element.classList.remove(this.openClass); // Close all child menus.

          this.closeChildren(); // Set proper focus states to parent & child.

          this.menu.currentFocus = "none";

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

  var validate$2 = {
    childMenu: function childMenu(value) {
      if (!(value instanceof Submenu)) {
        throw new TypeError("childMenu must be a Submenu.");
      }
    },
    toggle: function toggle(_toggle) {
      if (!(_toggle instanceof MenuToggle)) {
        throw new TypeError("toggle must be a MenuToggle.");
      }
    }
  };
  /**
   * A navigation link containing a submenu.
   */

  var submenuItem =
  /*#__PURE__*/
  function (_MenuItem) {
    _inherits(submenuItem, _MenuItem);

    /**
     * {@inheritdoc}
     *
     * @param {object}       param0                 - The menu item object.
     * @param {HTMLElement}  param0.menuItemElement - The menu item in the DOM.
     * @param {Menu|Submenu} param0.parentMenu      - The parent menu.
     * @param {Submenu}      param0.childMenu       - The child menu.
     * @param {MenuToggle}   param0.toggle          - The controller for the child menu.
     */
    function submenuItem(_ref2) {
      var _this3;

      var menuItemElement = _ref2.menuItemElement,
          parentMenu = _ref2.parentMenu,
          childMenu = _ref2.childMenu,
          toggle = _ref2.toggle;

      _classCallCheck(this, submenuItem);

      validate$2.childMenu(childMenu);
      validate$2.toggle(toggle);
      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(submenuItem).call(this, {
        menuItemElement: menuItemElement,
        parentMenu: parentMenu
      }));
      _this3.elements = _objectSpread({}, _this3.elements, {
        childMenu: childMenu,
        toggle: toggle
      });
      return _this3;
    }
    /**
     * The link element inside the menu item.
     *
     * @returns {HTMLElement} - The link.
     */


    _createClass(submenuItem, [{
      key: "linkElement",
      get: function get() {
        return this.toggle.element;
      }
      /**
       * The item's child menu.
       *
       * @returns {Submenu} - The menu.
       */

    }, {
      key: "childMenu",
      get: function get() {
        return this.elements.childMenu;
      }
      /**
       * The item's toggle.
       *
       * @returns {MenuToggle} - The toggle.
       */

    }, {
      key: "toggle",
      get: function get() {
        return this.elements.toggle;
      }
    }]);

    return submenuItem;
  }(MenuItem);

  var validate$3 = {
    parentMenu: function parentMenu(value) {
      if (!(value instanceof Menu || value instanceof Submenu)) {
        throw new TypeError("parentMenu must be either a Menu or a Submenu.");
      }
    }
  };
  /**
   * A Menu nested inside of another Menu.
   *
   * Must be initialized to be fully functional.
   */

  var Submenu =
  /*#__PURE__*/
  function (_Menu) {
    _inherits(Submenu, _Menu);

    /**
     * {@inheritdoc}
     *
     * @param {object}       param0                       - The menu object.
     * @param {HTMLElement}  param0.menuElement           - The menu element in the DOM.
     * @param {string}       param0.menuItemSelector      - The selector string for menu items.
     * @param {string}       param0.submenuItemSelector   - The selector string for submenu items.
     * @param {string}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}       param0.submenuSelector       - The selector string for the submenu itself.
     * @param {string}       param0.openClass             - The class to use when a submenu is open.
     * @param {Menu|Submenu} param0.parentMenu            - The menu containing this menu.
     */
    function Submenu(_ref3) {
      var _this4;

      var menuElement = _ref3.menuElement,
          menuItemSelector = _ref3.menuItemSelector,
          submenuItemSelector = _ref3.submenuItemSelector,
          submenuToggleSelector = _ref3.submenuToggleSelector,
          submenuSelector = _ref3.submenuSelector,
          openClass = _ref3.openClass,
          parentMenu = _ref3.parentMenu;

      _classCallCheck(this, Submenu);

      validate$3.parentMenu(parentMenu);
      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Submenu).call(this, {
        menuElement: menuElement,
        menuItemSelector: menuItemSelector,
        submenuItemSelector: submenuItemSelector,
        submenuToggleSelector: submenuToggleSelector,
        submenuSelector: submenuSelector,
        openClass: openClass
      }));
      _this4.elements = _objectSpread({}, _this4.elements, {
        parentMenu: parentMenu
      });
      return _this4;
    }
    /**
     * Set up the menu.
     */


    _createClass(Submenu, [{
      key: "initialize",
      value: function initialize() {
        // Get the root menu.
        this.findRootMenu(this.parentMenu);

        _get(_getPrototypeOf(Submenu.prototype), "initialize", this).call(this);

        this.element.setAttribute("aria-rolle", "menu");
      }
      /**
       * The menu's parent menu.
       *
       * @returns {Menu|Submenu} - The menu.
       */

    }, {
      key: "findRootMenu",
      value: function findRootMenu(menu) {
        if (menu instanceof Menu) {
          this.rootMenu = this.parentMenu;
        } else if (menu instanceof Submenu) {
          this.findRootMenu(menu.parentMenu);
        } else {
          throw new TypeError("menu must be a Menu or a Submenu");
        }
      }
    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this5 = this;

        this.currentMenuItem.linkElement.addEventListener("keydown", function (event) {
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this5.currentFocus === "self") {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              preventEvent(event);

              _this5.currentMenuItem.linkElement.click();
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this5.rootMenu.closeChildren();

              _this5.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              preventEvent(event);

              if (_this5.currentMenuItem instanceof submenuItem) {
                _this5.currentMenuItem.toggle.open();
              } else {
                _this5.rootMenu.closeChildren();

                _this5.rootMenu.focusNextChild();

                if (_this5.rootMenu.currentMenuItem instanceof submenuItem) {
                  _this5.rootMenu.currentMenuItem.toggle.open();

                  _this5.rootMenu.currentMenuItem.childMenu.focus();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              preventEvent(event);

              if (_this5.currentMenuItem instanceof submenuItem) {
                _this5.currentMenuItem.toggle.close();

                if (_this5.parentMenu === _this5.rootMenu) {
                  _this5.rootMenu.closeChildren();

                  _this5.rootMenu.focusPreviousChild();

                  if (_this5.rootMenu.currentMenuItem instanceof submenuItem) {
                    _this5.rootMenu.currentMenuItem.toggle.open();

                    _this5.rootMenu.currentMenuItem.childMenu.focus();
                  }
                }
              }
            } else if (key === "ArrowDown") {
              // Hitting the Down Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              preventEvent(event);

              _this5.focusNextChild();
            } else if (key === "ArrowUp") {
              // Hitting the Up Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              preventEvent(event);

              _this5.focusPreviousChild();
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);

              _this5.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);

              _this5.focusLastChild();
            } else if (key === "Character" && !modifier) {
              // Hitting Character:
              // - Moves focus to next item in the menubar having a name that starts with the typed character.
              // - If none of the items have a name starting with the typed character, focus does not move.
              preventEvent(event);

              _this5.focusNextChildWithCharacter(event.key);
            }
          }
        });
      }
    }, {
      key: "parentMenu",
      get: function get() {
        return this.elements.parentMenu;
      }
      /**
       * The menu's root parent menu.
       *
       * @returns {Menu} - The menu.
       */

    }, {
      key: "rootMenu",
      get: function get() {
        return this.elements.rootMenu;
      }
      /**
       * Set the menu's root parent menu.
       *
       * @param {Menu} menu - The menu.
       */
      ,
      set: function set(menu) {
        if (!(menu instanceof Menu)) {
          throw new TypeError("menu must be a Menu.");
        }

        this.elements.rootMenu = menu;
      }
    }]);

    return Submenu;
  }(Menu); // Custom validation for params.


  var validate$4 = {
    menuItemElement: function menuItemElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuItemElement must be an HTML Element.");
      }
    },
    parentMenu: function parentMenu(value) {
      // Ensure value is an Menu or Submenu element.
      if (!(value instanceof Menu || value instanceof Submenu)) {
        throw new TypeError("parentMenu must be a Menu or a Submenu.");
      }
    }
  };
  /**
   * A basic navigation link contained inside of a Menu.
   *
   * Must be initialized to be fully functional.
   */

  var MenuItem =
  /*#__PURE__*/
  function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}      param0                 - The menu item object.
     * @param {HTMLElement} param0.menuItemElement - The menu item in the DOM.
     * @param {Menu}        param0.parentMenu      - The parent menu.
     */
    function MenuItem(_ref4) {
      var menuItemElement = _ref4.menuItemElement,
          parentMenu = _ref4.parentMenu;

      _classCallCheck(this, MenuItem);

      // Run validations.
      validate$4.menuItemElement(menuItemElement);
      validate$4.parentMenu(parentMenu);
      this.domElements = {
        menuItem: menuItemElement,
        link: menuItemElement.querySelector("a")
      };
      this.elements = {
        parentMenu: parentMenu
      };
    }
    /**
     * Initialize the menu item by setting its tab index.
     */


    _createClass(MenuItem, [{
      key: "initialize",
      value: function initialize() {
        this.element.setAttribute("role", "menuitem");
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
       * Focuses the menu item's link.
       */
      value: function focus() {
        this.linkElement.focus();
      }
      /**
       * Blurs the menu item's link.
       */

    }, {
      key: "blur",
      value: function blur() {
        this.linkElement.blur();
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
    }]);

    return MenuItem;
  }(); // Custom validation for params.


  var validate$5 = {
    menuElement: function menuElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuElement must be an HTML Element.");
      }
    },
    menuItemSelector: function menuItemSelector(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw new TypeError("menuItemSelector must be a CSS selector string.");
      }
    },
    hasSubmenus: function hasSubmenus(container, toggle, menu) {
      if (container === null && toggle === null && menu === null) return; // Ensure container is a string.

      if (typeof container !== "string") {
        throw new TypeError("submenuItemSelector must be a CSS selector string.");
      } // Ensure toggle is a string.


      if (typeof container !== "string") {
        throw new TypeError("submenuToggleSelector must be a CSS selector string.");
      } // Ensure menu is a string.


      if (typeof menu !== "string") {
        throw new TypeError("submenuSelector must be a CSS selector string.");
      }
    },
    openClass: function openClass(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw TypeError("openClass must be a string.");
      } // Ensure value is a valid CSS class name.


      var invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");

      if (invalidCharacters.length > 0) {
        throw Error("openClass must be a valid CSS class.");
      }
    },
    isDropdown: function isDropdown(controller, container) {
      // Values are allowed to be null if both are null.
      if (controller === null && container === null) return; // Ensure value is an HTML element.

      if (!(controller instanceof HTMLElement)) {
        throw new TypeError("controllerElement must be an HTML Element if containerElement is provided.");
      }

      if (!(container instanceof HTMLElement)) {
        throw new TypeError("containerElement must be an HTML Element if controllerElement is provided.");
      }
    }
  };
  /**
   * An accessible navigation element in the DOM.
   *
   * Must be initialized to be fully functional.
   */

  var Menu =
  /*#__PURE__*/
  function () {
    /**
     * {@inheritdoc}
     *
     * @param {object}            param0                       - The menu object.
     * @param {HTMLElement}       param0.menuElement           - The menu element in the DOM.
     * @param {string|null}       param0.menuItemSelector      - The selector string for menu items.
     * @param {string|null}       param0.submenuItemSelector   - The selector string for submenu items.
     * @param {string|null}       param0.submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}            param0.submenuSelector       - The selector string for the submenu itself.
     * @param {string}            param0.openClass             - The class to use when a submenu is open.
     * @param {HTMLElement|null}  param0.controllerElement     - The element controlling the menu in the DOM.
     * @param {HTMLElement|null}  param0.containerElement      - The element containing the menu in the DOM.
     */
    function Menu(_ref5) {
      var menuElement = _ref5.menuElement,
          menuItemSelector = _ref5.menuItemSelector,
          _ref5$submenuItemSele = _ref5.submenuItemSelector,
          submenuItemSelector = _ref5$submenuItemSele === void 0 ? null : _ref5$submenuItemSele,
          _ref5$submenuToggleSe = _ref5.submenuToggleSelector,
          submenuToggleSelector = _ref5$submenuToggleSe === void 0 ? null : _ref5$submenuToggleSe,
          _ref5$submenuSelector = _ref5.submenuSelector,
          submenuSelector = _ref5$submenuSelector === void 0 ? null : _ref5$submenuSelector,
          _ref5$openClass = _ref5.openClass,
          openClass = _ref5$openClass === void 0 ? "show" : _ref5$openClass,
          _ref5$controllerEleme = _ref5.controllerElement,
          controllerElement = _ref5$controllerEleme === void 0 ? null : _ref5$controllerEleme,
          _ref5$containerElemen = _ref5.containerElement,
          containerElement = _ref5$containerElemen === void 0 ? null : _ref5$containerElemen;

      _classCallCheck(this, Menu);

      // Run validations.
      validate$5.menuElement(menuElement);
      validate$5.menuItemSelector(menuItemSelector);
      validate$5.hasSubmenus(submenuItemSelector, submenuToggleSelector, submenuSelector);
      validate$5.openClass(openClass);
      validate$5.isDropdown(controllerElement, containerElement);
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
        "submenu-items": submenuItemSelector,
        "submenu-toggle": submenuToggleSelector,
        submenu: submenuSelector
      };
      this.elements = {
        menuItems: [],
        menuToggles: [],
        controller: null
      };
      this.focussedChild = -1;
      this.focusState = "none";
      this.openClass = openClass;
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
        this.element.tabIndex = 0;
        this.createMenuItems();
        this.handleKeydown();
        this.handleClick();

        if (this.controllerElement && this.containerElement) {
          // Create a new MenuToggle to control the menu.
          var toggle = new MenuToggle({
            menuToggleElement: this.controllerElement,
            parentElement: this.containerElement,
            menu: this,
            openClass: this.openClass
          });
          toggle.initialize();
          this.elements.controller = toggle;
        }
      }
      /**
       * The menu element in the DOM.
       *
       * @returns {HTMLElement} - The menu.
       */

    }, {
      key: "createMenuItems",

      /**
       * Creates and initializes all menu items.
       */
      value: function createMenuItems() {
        var _this6 = this;

        this.menuItemElements.forEach(function (element) {
          var menuItem;

          if (_this6.submenuItemElements.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this6.selector["submenu-toggle"]); // The actual menu DOM element.

            var submenu = element.querySelector(_this6.selector.submenu); // Create the new Menu and initialize it.

            var menu = new Submenu({
              menuElement: submenu,
              menuItemSelector: _this6.selector["menu-items"],
              submenuItemSelector: _this6.selector["submenu-items"],
              submenuToggleSelector: _this6.selector["submenu-toggle"],
              submenuSelector: _this6.selector.submenu,
              submenuOpenClass: _this6.openClass,
              parentMenu: _this6
            });
            menu.initialize(); // Create the new MenuToggle.

            var toggle = new MenuToggle({
              menuToggleElement: toggler,
              parentElement: element,
              menu: menu,
              openClass: _this6.openClass,
              parentMenu: _this6
            });
            toggle.initialize(); // Add it to the list of submenu items.

            _this6.elements.menuToggles.push(toggle);

            menuItem = new submenuItem({
              menuItemElement: element,
              parentMenu: _this6,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            // Create a new MenuItem.
            menuItem = new MenuItem({
              menuItemElement: element,
              parentMenu: _this6
            });
          }

          menuItem.initialize();

          _this6.elements.menuItem.push(menuItem);
        });
      }
      /**
       * Sets up the hijacked keydown events.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this7 = this;

        this.element.addEventListener("keydown", function (event) {
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this7.currentFocus === "none") {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Opens submenu and moves focus to first item in the submenu.
              preventEvent(event);
              _this7.currentFocus = "self";

              _this7.focusFirstChild();
            }
          } else if (_this7.currentFocus === "self") {
            if (key === "RightArrow") {
              // Hitting the Right Arrow:
              // - Moves focus to the next item in the menubar.
              // - If focus is on the last item, moves focus to the first item.
              preventEvent(event);

              _this7.focusNextChild();
            } else if (key === "LeftArrow") {
              // Hitting the Left Arrow:
              // - Moves focus to the previous item in the menubar.
              // - If focus is on the first item, moves focus to the last item.
              preventEvent(event);

              _this7.focusPreviousChild();
            } else if (key === "DownArrow") {
              // Hitting the Down Arrow:
              // - Opens submenu and moves focus to first item in the submenu.
              if (_this7.currentMenuItem instanceof submenuItem) {
                _this7.currentMenuItem.toggle.open();

                _this7.currentMenuItem.childMenu.focusFirstChild();
              }
            } else if (key === "UpArrow") {
              // Hitting the Up Arrow:
              // - Opens submenu and moves focus to last item in the submenu.
              if (_this7.currentMenuItem instanceof submenuItem) {
                _this7.currentMenuItem.toggle.open();

                _this7.currentMenuItem.childMenu.focusLastChild();
              }
            } else if (key === "Home") {
              // Hitting Home:
              // - Moves focus to first item in the menubar.
              preventEvent(event);

              _this7.focusFirstChild();
            } else if (key === "End") {
              // Hitting End:
              // - Moves focus to last item in the menubar.
              preventEvent(event);

              _this7.focusLastChild();
            } else if (key === "Character" && !modifier) {
              // Hitting Character:
              // - Moves focus to next item in the menubar having a name that starts with the typed character.
              // - If none of the items have a name starting with the typed character, focus does not move.
              preventEvent(event);

              _this7.focusNextChildWithCharacter(event.key);
            }
          }

          if (_this7.currentFocus !== "none") {
            if (key === "Tab") {
              // Hitting Tab:
              // - Moves focus out of the menu.
              _this7.blur();

              _this7.closeChildren();
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
        var _this8 = this;

        document.addEventListener("click", function (event) {
          if (!_this8.element.contains(event.target) && _this8.element !== event.target) {
            _this8.blur();

            _this8.closeChildren();

            if (_this8.controller) {
              _this8.controller.close();
            }
          }
        });
      }
      /**
       * Focus the menu.
       */

    }, {
      key: "focus",
      value: function focus() {
        this.focussedChild = 0;
        this.currentFocus = "self";
        this.element.focus();
      }
      /**
       * Unfocus the menu.
       */

    }, {
      key: "blur",
      value: function blur() {
        this.focussedChild = -1;
        this.currentFocus = "none";
        this.element.blur();
      }
      /**
       * Focues the menu's first child.
       */

    }, {
      key: "focusFirstChild",
      value: function focusFirstChild() {
        this.focussedChild = 0;
        this.focusCurrentChild();
      }
      /**
       * Focus the menu's last child.
       */

    }, {
      key: "focusLastChild",
      value: function focusLastChild() {
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
          this.menuItems[this.focussedChild].focus();
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
       * @returns {HTMLElement} - The controller element.
       */

    }, {
      key: "controllerElement",
      get: function get() {
        return this.domElements.controller;
      }
      /**
       * The menu's container element in the DOM.
       *
       * @returns {HTMLElement} - The container element.
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
       * @returns {MenuItem|SubmenuItem[]} - The menu items.
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
       * @returns {MenuItem|SubmenuItem} - The menu item.
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
    }]);

    return Menu;
  }();

  return Menu;
}();
