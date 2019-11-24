"use strict";

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
  } // Basic validation for the class.


  var validate$1 = {
    menuToggleElement: function menuToggleElement(element) {
      // Ensure element is an HTML element.
      if (!(element instanceof HTMLElement)) {
        throw new TypeError("menuToggleElement must be an HTML Element.");
      }
    },
    parentElement: function parentElement(element) {
      // Ensure element is an HTML element.
      if (!(element instanceof HTMLElement)) {
        throw new TypeError("parentElement must be an HTML Element.");
      }
    },
    menu: function menu(_menu) {
      // Ensure menu is an Menu element.
      if (!(_menu instanceof Menu)) {
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
    parentMenu: function parentMenu(menu) {
      // Menu can be null.
      if (menu === null) return; // Ensure menu is an Menu element.

      if (!(menu instanceof Menu)) {
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
  }(); // Basic validation for the class.


  var validate$2 = {
    menuItemElement: function menuItemElement(element) {
      // Ensure element is an HTML element.
      if (!(element instanceof HTMLElement)) {
        throw new TypeError("menuItemElement must be an HTML Element.");
      }
    },
    menuLinkElement: function menuLinkElement(element) {
      // Ensure element is an HTML element.
      if (!(element instanceof HTMLElement)) {
        throw new TypeError("menuLinkElement must be an HTML Element.");
      }
    },
    parentMenu: function parentMenu(menu) {
      // Ensure menu is a Menu element.
      if (!(menu instanceof Menu)) {
        throw new TypeError("parentMenu must be a Menu.");
      }
    },
    isSubmenuItem: function isSubmenuItem(flag) {
      // Ensure flag is a boolean.
      if (typeof flag !== "boolean") {
        throw new TypeError("isSubmenuItem must be true or false");
      }
    },
    childMenu: function childMenu(menu) {
      // Menu can be null.
      if (menu === null) return; // Ensure menu is a Menu element.

      if (!(menu instanceof Menu)) {
        throw new TypeError("childMenu must be a Menu.");
      }
    },
    toggle: function toggle(_toggle) {
      // Toggle can be null.
      if (_toggle === null) return; // Ensure toggle is a MenuToggle element.

      if (!(_toggle instanceof MenuToggle)) {
        throw new TypeError("toggle must be a MenuToggle.");
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
     * @param {object}          param0                 - The menu item object.
     * @param {HTMLElement}     param0.menuItemElement - The menu item in the DOM.
     * @param {HTMLElement}     param0.menuLinkElement - The menu item's link in the DOM.
     * @param {Menu}            param0.parentMenu      - The parent menu.
     * @param {boolean}         param0.isSubmenuItem   - A flag to mark if the menu item is controlling a submenu.
     * @param {Menu|null}       param0.childMenu       - The child menu.
     * @param {MenuToggle|null} param0.toggle          - The controller for the child menu.
     */
    function MenuItem(_ref2) {
      var menuItemElement = _ref2.menuItemElement,
          menuLinkElement = _ref2.menuLinkElement,
          parentMenu = _ref2.parentMenu,
          _ref2$isSubmenuItem = _ref2.isSubmenuItem,
          isSubmenuItem = _ref2$isSubmenuItem === void 0 ? false : _ref2$isSubmenuItem,
          _ref2$childMenu = _ref2.childMenu,
          childMenu = _ref2$childMenu === void 0 ? null : _ref2$childMenu,
          _ref2$toggle = _ref2.toggle,
          toggle = _ref2$toggle === void 0 ? null : _ref2$toggle;

      _classCallCheck(this, MenuItem);

      // Run validations.
      validate$2.menuItemElement(menuItemElement);
      validate$2.menuLinkElement(menuLinkElement);
      validate$2.parentMenu(parentMenu);
      validate$2.isSubmenuItem(isSubmenuItem);
      validate$2.childMenu(childMenu);
      validate$2.toggle(toggle);
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
  }(); // Basic validation for the class.


  var validate$3 = {
    menuElement: function menuElement(element) {
      // Ensure element is an HTML element.
      if (!(element instanceof HTMLElement)) {
        throw new TypeError("menuElement must be an HTML Element.");
      }
    },
    menuItemSelector: function menuItemSelector(selector) {
      // Ensure selector is a string.
      if (typeof selector !== "string") {
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
    isTopLevel: function isTopLevel(flag) {
      // Ensure flag is a boolean.
      if (typeof flag !== "boolean") {
        throw new TypeError("isTopLevel must be true of false.");
      }
    },
    isDropdown: function isDropdown(controller, container) {
      // Values are allowed to be null if both are null.
      if (controller === null && container === null) return; // Ensure controller is an HTML element.

      if (!(controller instanceof HTMLElement)) {
        throw new TypeError("controllerElement must be an HTML Element if containerElement is provided.");
      } // Ensure container is an HTML element.


      if (!(container instanceof HTMLElement)) {
        throw new TypeError("containerElement must be an HTML Element if controllerElement is provided.");
      }
    },
    parentMenu: function parentMenu(menu) {
      // Menu can be null.
      if (menu === null) return; // Ensure menu is a Menu element.

      if (!(menu instanceof Menu)) {
        throw new TypeError("parentMenu must be a Menu.");
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
     * @param {object}           param0                       - The menu object.
     * @param {HTMLElement}      param0.menuElement           - The menu element in the DOM.
     * @param {string|null}      param0.menuItemSelector      - The selector string for menu items.
     * @param {string|null}      param0.submenuItemSelector   - The selector string for submenu items.
     * @param {string|null}      param0.submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}           param0.submenuSelector       - The selector string for the submenu itself.
     * @param {string}           param0.openClass             - The class to use when a submenu is open.
     * @param {boolean}          param0.isTopLevel            - A flag to mark the root menu.
     * @param {HTMLElement|null} param0.controllerElement     - The element controlling the menu in the DOM.
     * @param {HTMLElement|null} param0.containerElement      - The element containing the menu in the DOM.
     * @param {Menu|null}        param0.parentMenu            - The menu containing this menu.
     */
    function Menu(_ref3) {
      var menuElement = _ref3.menuElement,
          menuItemSelector = _ref3.menuItemSelector,
          _ref3$submenuItemSele = _ref3.submenuItemSelector,
          submenuItemSelector = _ref3$submenuItemSele === void 0 ? null : _ref3$submenuItemSele,
          _ref3$submenuToggleSe = _ref3.submenuToggleSelector,
          submenuToggleSelector = _ref3$submenuToggleSe === void 0 ? null : _ref3$submenuToggleSe,
          _ref3$submenuSelector = _ref3.submenuSelector,
          submenuSelector = _ref3$submenuSelector === void 0 ? null : _ref3$submenuSelector,
          _ref3$openClass = _ref3.openClass,
          openClass = _ref3$openClass === void 0 ? "show" : _ref3$openClass,
          _ref3$isTopLevel = _ref3.isTopLevel,
          isTopLevel = _ref3$isTopLevel === void 0 ? true : _ref3$isTopLevel,
          _ref3$controllerEleme = _ref3.controllerElement,
          controllerElement = _ref3$controllerEleme === void 0 ? null : _ref3$controllerEleme,
          _ref3$containerElemen = _ref3.containerElement,
          containerElement = _ref3$containerElemen === void 0 ? null : _ref3$containerElemen,
          _ref3$parentMenu = _ref3.parentMenu,
          parentMenu = _ref3$parentMenu === void 0 ? null : _ref3$parentMenu;

      _classCallCheck(this, Menu);

      // Run validations.
      validate$3.menuElement(menuElement);
      validate$3.menuItemSelector(menuItemSelector);
      validate$3.hasSubmenus(submenuItemSelector, submenuToggleSelector, submenuSelector);
      validate$3.openClass(openClass);
      validate$3.isTopLevel(isTopLevel);
      validate$3.isDropdown(controllerElement, containerElement);
      validate$3.parentMenu(parentMenu);
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
        controller: null,
        parentMenu: parentMenu,
        rootMenu: isTopLevel ? this : null
      };
      this.focussedChild = -1;
      this.focusState = "none";
      this.openClass = openClass;
      this.root = isTopLevel;
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
        this.element.tabIndex = 0;
        if (this.rootMenu === null) this.findRootMenu(this);
        this.createMenuItems();
        this.handleKeydown();
        this.handleClick();

        if (this.isTopLevel && this.controllerElement && this.containerElement) {
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
        var _this3 = this;

        this.menuItemElements.forEach(function (element) {
          var menuItem;

          if (_this3.submenuItemElements.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this3.selector["submenu-toggle"]); // The actual menu DOM element.

            var submenu = element.querySelector(_this3.selector.submenu); // Create the new Menu and initialize it.

            var menu = new Menu({
              menuElement: submenu,
              menuItemSelector: _this3.selector["menu-items"],
              submenuItemSelector: _this3.selector["submenu-items"],
              submenuToggleSelector: _this3.selector["submenu-toggle"],
              submenuSelector: _this3.selector.submenu,
              openClass: _this3.openClass,
              isTopLevel: false,
              parentMenu: _this3
            }); // Create the new MenuToggle.

            var toggle = new MenuToggle({
              menuToggleElement: toggler,
              parentElement: element,
              menu: menu,
              openClass: _this3.openClass,
              parentMenu: _this3
            }); // Add it to the list of submenu items.

            _this3.elements.menuToggles.push(toggle); // Create a new MenuItem.


            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: toggler,
              parentMenu: _this3,
              isSubmenuItem: true,
              childMenu: menu,
              toggle: toggle
            });
          } else {
            var link = element.querySelector("a"); // Create a new MenuItem.

            menuItem = new MenuItem({
              menuItemElement: element,
              menuLinkElement: link,
              parentMenu: _this3
            });
          }

          _this3.elements.menuItems.push(menuItem);
        });
      }
      /**
       * Sets up the hijacked keydown events.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this4 = this;

        this.element.addEventListener("keydown", function (event) {
          var key = keyPress(event);
          var altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this4.isTopLevel) {
            if (_this4.currentFocus === "none") {
              if (key === "Space" || key === "Enter") {
                // Hitting Space or Enter:
                // - Opens submenu and moves focus to first item in the submenu.
                preventEvent(event);
                _this4.currentFocus = "self";

                _this4.focusFirstChild();
              }
            } else if (_this4.currentFocus === "self") {
              if (key === "ArrowRight") {
                // Hitting the Right Arrow:
                // - Moves focus to the next item in the menubar.
                // - If focus is on the last item, moves focus to the first item.
                preventEvent(event);

                _this4.focusNextChild();
              } else if (key === "ArrowLeft") {
                // Hitting the Left Arrow:
                // - Moves focus to the previous item in the menubar.
                // - If focus is on the first item, moves focus to the last item.
                preventEvent(event);

                _this4.focusPreviousChild();
              } else if (key === "ArrowDown") {
                // Hitting the Down Arrow:
                // - Opens submenu and moves focus to first item in the submenu.
                if (_this4.currentMenuItem.isSubmenuItem) {
                  _this4.currentMenuItem.toggle.open();

                  _this4.currentMenuItem.childMenu.focusFirstChild();
                }
              } else if (key === "ArrowUp") {
                // Hitting the Up Arrow:
                // - Opens submenu and moves focus to last item in the submenu.
                if (_this4.currentMenuItem.isSubmenuItem) {
                  _this4.currentMenuItem.toggle.open();

                  _this4.currentMenuItem.childMenu.focusLastChild();
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
                if (_this4.controller !== null) {
                  // Hitting Escape:
                  // - Closes menu.
                  _this4.controller.close();
                }
              }
            }
          } else {
            if (key === "Space" || key === "Enter") {
              // Hitting Space or Enter:
              // - Activates menu item, causing the link to be activated.
              preventEvent(event);

              _this4.currentMenuItem.linkElement.click();
            } else if (key === "Escape") {
              // Hitting Escape:
              // - Closes submenu.
              // - Moves focus to parent menubar item.
              preventEvent(event);

              _this4.rootMenu.closeChildren();

              _this4.rootMenu.focusCurrentChild();
            } else if (key === "ArrowRight") {
              // Hitting the Right Arrow:
              // - If focus is on an item with a submenu, opens the submenu and places focus on the first item.
              // - If focus is on an item that does not have a submenu:
              //   - Closes submenu.
              //   - Moves focus to next item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              preventEvent(event);

              if (_this4.currentMenuItem.isSubmenuItem) {
                _this4.currentMenuItem.toggle.open();
              } else {
                _this4.rootMenu.closeChildren();

                _this4.rootMenu.focusNextChild();

                if (_this4.rootMenu.currentMenuItem.isSubmenuItem) {
                  _this4.rootMenu.currentMenuItem.toggle.open();
                }
              }
            } else if (key === "ArrowLeft") {
              // Hitting the Left Arrow:
              // - Closes submenu and moves focus to parent menu item.
              // - If parent menu item is in the menubar, also:
              //   - moves focus to previous item in the menubar.
              //   - Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
              preventEvent(event);

              if (_this4.parentMenu.currentMenuItem.isSubmenuItem) {
                _this4.parentMenu.currentMenuItem.toggle.close();

                if (_this4.parentMenu === _this4.rootMenu) {
                  _this4.rootMenu.closeChildren();

                  _this4.rootMenu.focusPreviousChild();

                  if (_this4.rootMenu.currentMenuItem.isSubmenuItem) {
                    _this4.rootMenu.currentMenuItem.toggle.open();
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

          if (key === "Character" && !modifier) {
            // Hitting Character:
            // - Moves focus to next item in the menubar having a name that starts with the typed character.
            // - If none of the items have a name starting with the typed character, focus does not move.
            preventEvent(event);

            _this4.focusNextChildWithCharacter(event.key);
          }

          if (_this4.currentFocus !== "none") {
            if (key === "Tab") {
              // Hitting Tab:
              // - Moves focus out of the menu.
              _this4.rootMenu.blur();

              _this4.rootMent.closeChildren();
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
        var _this5 = this;

        document.addEventListener("click", function (event) {
          if (!_this5.element.contains(event.target) && _this5.element !== event.target) {
            _this5.blur();

            _this5.closeChildren();

            if (_this5.controller) {
              _this5.controller.close();
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
    }]);

    return Menu;
  }();

  return Menu;
}();
