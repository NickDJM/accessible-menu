"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccessibleMenu = function () {
  'use strict';

  var validate = {
    menuItemElement: function menuItemElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuItemElement must be an HTML Element.");
      }
    },
    parentMenu: function parentMenu(value) {
      // Ensure value is an Menu element.
      if (!(value instanceof Menu)) {
        throw new TypeError("parentMenu must be a Menu.");
      }
    }
  };

  var MenuItem =
  /*#__PURE__*/
  function () {
    /**
     * Construct the menu item.
     *
     * @param {object} menuItemElement - The menu item in the DOM.
     * @param {Menu}   parentMenu      - The parent menu.
     */
    function MenuItem(menuItemElement, parentMenu) {
      _classCallCheck(this, MenuItem);

      // Run validations.
      validate.menuItemElement(menuItemElement);
      validate.parentMenu(parentMenu);
      this.domElements = {
        menuItem: menuItemElement,
        link: menuItemElement.querySelector("a")
      };
      this.elements = {
        parent: parentMenu
      };
    }
    /**
     * Initialize the menu item by setting its tab index.
     */


    _createClass(MenuItem, [{
      key: "initialize",
      value: function initialize() {
        this.element.setAttribute("role", "menuitem");
        this.link.tabIndex = -1;
      }
      /**
       * The menu item element in the DOM.
       *
       * @returns {object} - The menu item element.
       */

    }, {
      key: "focus",

      /**
       * Focuses the menu item's link.
       */
      value: function focus() {
        this.element.querySelector("a").focus();
      }
    }, {
      key: "element",
      get: function get() {
        return this.domElements.menuItem;
      }
      /**
       * The link element inside the menu item.
       *
       * @returns {object} - The link.
       */

    }, {
      key: "link",
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
        return this.elements.parent;
      }
    }]);

    return MenuItem;
  }();

  var validate$1 = {
    menuToggleElement: function menuToggleElement(value) {
      // Ensure value is an HTML element.
      if (!(value instanceof HTMLElement)) {
        throw new TypeError("menuToggleElement must be an HTML Element.");
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
    },
    parentMenuItem: function parentMenuItem(value) {
      // Value is allowed to be null.
      if (value === null) return;

      if (!(value instanceof MenuItem)) {
        throw new TypeError("parentMenuItem must be a MenuItem.");
      }
    },
    rootMenu: function rootMenu(value) {
      // Value is allowed to be null.
      if (value === null) return; // Ensure value is an Menu element.

      if (!(value instanceof Menu)) {
        throw new TypeError("rootMenu must be a Menu.");
      }
    }
  };

  var MenuToggle =
  /*#__PURE__*/
  function () {
    /**
     * Construct the menu toggle.
     *
     * @param {object}   menuToggleElement - The toggle element in the DOM.
     * @param {Menu}     menu              - The menu controlled by the this toggle.
     * @param {string}   openClass         - The class to use when a submenu is open.
     * @param {Menu}     parentMenu        - The menu containing the toggle.
     * @param {MenuItem} parentMenuItem    - The menu item containing the toggle.
     * @param {Menu}     rootMenu          - The root menu containing the toggle.
     */
    function MenuToggle(menuToggleElement, menu) {
      var openClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "show";
      var parentMenu = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var parentMenuItem = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var rootMenu = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

      _classCallCheck(this, MenuToggle);

      // Run validations.
      validate$1.menuToggleElement(menuToggleElement);
      validate$1.menu(menu);
      validate$1.openClass(openClass);
      validate$1.parentMenu(parentMenu);
      validate$1.parentMenuItem(parentMenuItem);
      validate$1.rootMenu(rootMenu);
      this.domElements = {
        toggle: menuToggleElement
      };
      this.elements = {
        menuItem: parentMenuItem,
        menu: menu,
        parentMenu: parentMenu,
        rootMenu: rootMenu || parentMenu
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
        var _this = this;

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
        this.element.setAttribute("aria-controls", this.menu.element.id); // Handle toggling the menu on click.

        this.element.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        }); // Add new keydown events.

        this.handleKeydown();
      }
      /**
       * The toggle element in the DOM.
       *
       * @returns {object} - The toggle element.
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
          this.menuItem.element.classList.add(this.openClass);
          this.menu.element.classList.add(this.openClass); // Close all sibling menus.

          this.closeSiblings(); // Set proper focus states to parent & child.

          this.parentMenu.currentFocus = "child";
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
          this.menuItem.element.classList.remove(this.openClass);
          this.menu.element.classList.remove(this.openClass); // Close all child menus.

          this.closeChildren(); // Set proper focus states to parent & child.

          this.menu.currentFocus = "none";
          this.parentMenu.currentFocus = "self"; // Set the new focus.

          this.parentMenu.focusCurrentChild();
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
        var _this2 = this;

        try {
          this.parentMenu.menuToggles.forEach(function (toggle) {
            if (toggle !== _this2) toggle.close();
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
       * Sets up the hijacked keydown events.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this3 = this;

        /**
         * Short cut to preventing default event actions.
         *
         * @param {object} event - The event.
         */
        function preventDefault(event) {
          event.preventDefault();
          event.stopPropagation();
        }

        this.menu.element.addEventListener("keydown", function (event) {
          var key = event.key;

          if (key === "Escape") {
            // The Escape key should close the current menu.
            preventDefault(event);

            _this3.close();
          } else if (_this3.parentMenu.isTopLevel && key === "ArrowRight") {
            // The Right Arrow key should focus the next menu item in the parent menu.
            preventDefault(event);

            _this3.close();

            _this3.parentMenu.focusNextChild();
          } else if (_this3.parentMenu.isTopLevel && key === "ArrowLeft") {
            // The Left Arrow key should focus the next menu item in the parent menu.
            preventDefault(event);

            _this3.close();

            _this3.parentMenu.focusPreviousChild();
          }
        });
        this.menuItem.element.addEventListener("keydown", function (event) {
          var key = event.key;

          if (_this3.menu.currentFocus === "none" && _this3.parentMenu.isTopLevel) {
            if (key === "ArrowUp") {
              // The Up Arrow key should open the submenu and select the last child.
              preventDefault(event);

              _this3.open();

              _this3.menu.focusLastChild();
            } else if (key === "ArrowDown") {
              // The Down Arrow key should open the submenu and select the first child.
              preventDefault(event);

              _this3.open();
            }
          }
        });
      }
    }, {
      key: "element",
      get: function get() {
        return this.domElements.toggle;
      }
      /**
       * The toggle's parent MenuItem.
       *
       * @returns {MenuItem} - The parent menu item.
       */

    }, {
      key: "menuItem",
      get: function get() {
        return this.elements.menuItem;
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
       * The root menu containing the toggle.
       *
       * @returns {Menu} - The root menu element.
       */

    }, {
      key: "rootMenu",
      get: function get() {
        return this.elements.rootMenu;
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
       * @param {boolean} state - The open state.
       */
      ,
      set: function set(state) {
        if (typeof state !== "boolean") {
          throw new TypeError("Open state must be true or false.");
        }

        this.show = state;
      }
    }]);

    return MenuToggle;
  }();

  var validate$2 = {
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
    submenuItemSelector: function submenuItemSelector(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw new TypeError("submenuItemSelector must be a CSS selector string.");
      }
    },
    submenuToggleSelector: function submenuToggleSelector(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw new TypeError("submenuToggleSelector must be a CSS selector string.");
      }
    },
    submenuSelector: function submenuSelector(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw new TypeError("submenuSelector must be a CSS selector string.");
      }
    },
    submenuOpenClass: function submenuOpenClass(value) {
      // Ensure value is a string.
      if (typeof value !== "string") {
        throw TypeError("submenuOpenClass must be a string.");
      } // Ensure value is a valid CSS class name.


      var invalidCharacters = value.replace(/[_a-zA-Z0-9-]/g, "");

      if (invalidCharacters.length > 0) {
        throw Error("submenuOpenClass must be a valid CSS class.");
      }
    },
    isTopLevel: function isTopLevel(value) {
      // Ensure value is a string.
      if (typeof value !== "boolean") {
        throw new TypeError("isTopLevel must be true or false");
      }
    }
  };

  var Menu =
  /*#__PURE__*/
  function () {
    /**
     * Constructs the menu.
     *
     * @param {object}  menuElement           - The menu element in the DOM.
     * @param {string}  menuItemSelector      - The selector string for menu items.
     * @param {string}  submenuItemSelector   - The selector string for submenu items.
     * @param {string}  submenuToggleSelector - The selector string for submenu toggle triggers.
     * @param {string}  submenuSelector       - The selector string for the submenu itself.
     * @param {string}  submenuOpenClass      - The class to use when a submenu is open.
     * @param {boolean} isTopLevel            - Flags the menu as a top-level menu.
     */
    function Menu(menuElement, menuItemSelector, submenuItemSelector, submenuToggleSelector, submenuSelector) {
      var submenuOpenClass = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "show";
      var isTopLevel = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

      _classCallCheck(this, Menu);

      // Run validations.
      validate$2.menuElement(menuElement);
      validate$2.menuItemSelector(menuItemSelector);
      validate$2.submenuItemSelector(submenuItemSelector);
      validate$2.submenuToggleSelector(submenuToggleSelector);
      validate$2.submenuSelector(submenuSelector);
      validate$2.submenuOpenClass(submenuOpenClass);
      validate$2.isTopLevel(isTopLevel);
      this.domElements = {
        menu: menuElement,
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
        menuToggles: []
      };
      this.focussedChild = -1;
      this.focusState = "none";
      this.openClass = submenuOpenClass;
      this.root = isTopLevel;
    }
    /**
     * Initializes the menu with proper tab indexing and properties.
     *
     * This will also initialize all menu items and sub menus.
     *
     * @returns {undefined}
     */


    _createClass(Menu, [{
      key: "initialize",
      value: function initialize() {
        this.element.setAttribute("role", "menu");
        this.element.tabIndex = 0;
        this.createMenuItems();
        this.handleKeydown();
        this.handleClick();
      }
      /**
       * The menu element in the DOM.
       *
       * @returns {object} - The menu.
       */

    }, {
      key: "createMenuItems",

      /**
       * Creates and initializes all menu items.
       */
      value: function createMenuItems() {
        var _this4 = this;

        this.menuItemElements.forEach(function (element) {
          // Create a new MenuItem.
          var menuItem = new MenuItem(element, _this4); // Add the item to the list of menu items.

          _this4.elements.menuItems.push(menuItem); // Initialize the menu item.


          menuItem.initialize(); // If the menu item is a dropdown, create a SubmenuItem,
          // otherwise create a normal MenuItem.

          if (_this4.submenuItemElements.includes(element)) {
            // The menu's toggle controller DOM element.
            var toggler = element.querySelector(_this4.selector["submenu-toggle"]); // The actual menu DOM element.

            var submenu = element.querySelector(_this4.selector.submenu); // Create the new Menu and initialize it.

            var menu = new Menu(submenu, _this4.selector["menu-items"], _this4.selector["submenu-items"], _this4.selector["submenu-toggle"], _this4.selector.submenu, _this4.openClass, false);
            menu.initialize(); // Create the new MenuToggle.

            var toggle = new MenuToggle(toggler, menu, _this4.openClass, _this4, menuItem);
            toggle.initialize(); // Add it to the list of submenu items.

            _this4.elements.menuToggles.push(toggle);
          }
        });
      }
      /**
       * Sets up the hijacked keydown events.
       */

    }, {
      key: "handleKeydown",
      value: function handleKeydown() {
        var _this5 = this;

        /**
         * Short cut to preventing default event actions.
         *
         * @param {object} event - The event.
         */
        function preventDefault(event) {
          event.preventDefault();
          event.stopPropagation();
        }

        this.element.addEventListener("keydown", function (event) {
          var key = event.key,
              code = event.code,
              altKey = event.altKey,
              crtlKey = event.crtlKey,
              metaKey = event.metaKey;
          var modifier = altKey || crtlKey || metaKey;

          if (_this5.currentFocus === "none") {
            if (key === "Enter" || key === " " && code === "Space") {
              // The Enter & Space keys should enter the menu.
              preventDefault(event);
              _this5.currentFocus = "self";

              _this5.focusFirstChild();
            }
          } else if (_this5.currentFocus === "self") {
            if (key === "Escape") {
              // The Escape key should exit the menu.
              preventDefault(event);

              _this5.focus();

              _this5.currentFocus = "none";
            } else if (!_this5.isTopLevel && key === "ArrowUp") {
              // The Up Arrow key should focus the previous menu item in submenus.
              preventDefault(event);

              _this5.focusPreviousChild();
            } else if (_this5.isTopLevel && key === "ArrowRight") {
              // The Right Arrow key should focus the next menu item.
              preventDefault(event);

              _this5.focusNextChild();
            } else if (!_this5.isTopLevel && key === "ArrowDown") {
              // The Down Arrow key should focus the next item in submenus.
              preventDefault(event);

              _this5.focusNextChild();
            } else if (_this5.isTopLevel && key === "ArrowLeft") {
              // The Left Arrow key should focus the previous menu item.
              preventDefault(event);

              _this5.focusPreviousChild();
            } else if (key === "Home") {
              // The Home key should focus the first menu item.
              preventDefault(event);

              _this5.focusFirstChild();
            } else if (key === "End") {
              // The End key should focus the last menu item.
              preventDefault(event);

              _this5.focusLastChild();
            } else if (key.match(/^[a-zA-Z]{1}$/) && !modifier) {
              // The A-Z keys should focus the next menu item starting with that letter.
              preventDefault(event);

              _this5.focusNextChildWithCharacter(key);
            }
          }

          if (_this5.currentFocus !== "none") {
            if (key === "Tab") {
              // The Tab key should select the next element outside of the menu.
              _this5.blur();

              _this5.closeChildren();
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
        var _this6 = this;

        document.addEventListener("click", function (event) {
          if (!_this6.element.contains(event.target) && _this6.element !== event.target) {
            _this6.blur();

            _this6.closeChildren();
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
       * The menu item DOM elements contained in the menu.
       *
       * @returns {object[]} - The menu items.
       */

    }, {
      key: "menuItemElements",
      get: function get() {
        return this.domElements.menuItems;
      }
      /**
       * The submenu item DOM elements contained in the menu.
       *
       * @returns {object[]} - The submenu items.
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
       * @param {boolean} state - The focus state (self, child, none).
       */
      set: function set(state) {
        var states = ["self", "child", "none"];

        if (!states.includes(state)) {
          throw new Error("Focus state must be 'self', 'child', or 'none'.");
        }

        this.focusState = state;
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
       * The flag to mark as a top-level menu.
       *
       * @returns {boolean} - The top-level flag.
       */
      ,
      set: function set(value) {
        if (typeof value !== "string") {
          throw new TypeError("Class must be a string.");
        }

        this.submenuOpenClass = value;
      }
    }, {
      key: "isTopLevel",
      get: function get() {
        return this.root;
      },
      set: function set(value) {
        if (typeof value !== "boolean") {
          throw new TypeError("Top-level flag must be true or false.");
        }

        this.root = value;
      }
    }]);

    return Menu;
  }();

  return Menu;
}();
