function w(r, e) {
  r === "" || r.length === 0 || (typeof r == "string" ? e.classList.add(r) : e.classList.add(...r));
}
function k(r, e) {
  r === "" || r.length === 0 || (typeof r == "string" ? e.classList.remove(r) : e.classList.remove(...r));
}
function A(r, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e)
      if (!(e[t] instanceof r)) {
        const s = typeof e[t];
        throw new TypeError(
          `${t} must be an instance of ${r.name}. "${s}" given.`
        );
      }
    return {
      status: !0,
      error: null
    };
  } catch (t) {
    return {
      status: !1,
      error: t
    };
  }
}
function h(r, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e) {
      const s = typeof e[t];
      if (s !== r)
        throw new TypeError(`${t} must be a ${r}. "${s}" given.`);
    }
    return {
      status: !0,
      error: null
    };
  } catch (t) {
    return {
      status: !1,
      error: t
    };
  }
}
function x(r) {
  try {
    if (typeof r != "object") {
      const e = typeof r;
      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in r)
      try {
        if (r[e] === null)
          throw new Error();
        document.querySelector(r[e]);
      } catch {
        throw new TypeError(
          `${e} must be a valid query selector. "${r[e]}" given.`
        );
      }
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function D(r) {
  try {
    if (typeof r != "object" || Array.isArray(r)) {
      const e = typeof r;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in r) {
      const t = typeof r[e];
      if (t !== "string")
        if (Array.isArray(r[e]))
          r[e].forEach((s) => {
            if (typeof s != "string")
              throw new TypeError(
                `${e} must be a string or an array of strings. An array containing non-strings given.`
              );
          });
        else
          throw new TypeError(
            `${e} must be a string or an array of strings. "${t}" given.`
          );
      else {
        const s = {};
        s[e] = r[e], x(s);
      }
    }
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function V(r) {
  try {
    if (typeof r != "object") {
      const t = typeof r;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "self", "child"];
    for (const t in r)
      if (!e.includes(r[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${r[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function P(r) {
  try {
    if (typeof r != "object") {
      const t = typeof r;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "mouse", "keyboard", "character"];
    for (const t in r)
      if (!e.includes(r[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${r[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function j(r) {
  try {
    if (typeof r != "object") {
      const t = typeof r;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["off", "on", "dynamic"];
    for (const t in r)
      if (!e.includes(r[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${r[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function $(r, e) {
  if (h("string", { tagName: r }).status && A(HTMLElement, e).status) {
    const t = r.toLowerCase();
    let s = !0;
    for (const n in e)
      e[n].tagName.toLowerCase() !== t && (s = !1);
    return s;
  } else
    return !1;
}
class L {
  /**
   * The DOM elements within the menu toggle.
   *
   * @protected
   *
   * @type {Object<HTMLElement>}
   *
   * @property {HTMLElement} toggle - The menu toggle.
   * @property {HTMLElement} parent - The menu containing this toggle.
   */
  _dom = {
    toggle: null,
    parent: null
  };
  /**
   * The declared accessible-menu elements within the menu toggle.
   *
   * @protected
   *
   * @type {Object<BaseMenu>}
   *
   * @property {BaseMenu} controlledMenu - The menu controlled by this toggle.
   * @property {BaseMenu} parentMenu     - The menu containing this toggle.
   */
  _elements = {
    controlledMenu: null,
    parentMenu: null
  };
  /**
   * The open state of the menu toggle.
   *
   * @protected
   *
   * @type {boolean}
   */
  _open = !1;
  /**
   * The event that is triggered when the menu toggle expands.
   *
   * @protected
   *
   * @event accessibleMenuExpand
   *
   * @type {CustomEvent}
   *
   * @property {boolean}                bubbles - A flag to bubble the event.
   * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _expandEvent = new CustomEvent("accessibleMenuExpand", {
    bubbles: !0,
    detail: { toggle: this }
  });
  /**
   * The event that is triggered when the menu toggle collapses.
   *
   * @protected
   *
   * @event accessibleMenuCollapse
   *
   * @type {CustomEvent}
   *
   * @property {boolean}                bubbles - A flag to bubble the event.
   * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
   */
  _collapseEvent = new CustomEvent("accessibleMenuCollapse", {
    bubbles: !0,
    detail: { toggle: this }
  });
  /**
   * Constructs a new `BaseMenuToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}    options.controlledMenu      - The menu controlled by this toggle.
   * @param {?BaseMenu}   [options.parentMenu = null] - The menu containing this toggle.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: n = null
  }) {
    this._dom.toggle = e, this._dom.parent = t, this._elements.controlledMenu = s, this._elements.parentMenu = n;
  }
  /**
   * Initializes the menu toggle.
   *
   * The first steps are to ensure that the toggle and controlled menu have IDs
   * using the setIds method, and to set the ARIA attributes on the toggle
   * and controlled menu using the setAriaAttributes method.
   *
   * Then the collapse method is called to make sure the submenu is closed.
   */
  initialize() {
    this._setIds(), this._setAriaAttributes(), this._collapse(!1);
  }
  /**
   * The DOM elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The declared accessible-menu elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<BaseMenu>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * The open state on the toggle.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open;
  }
  set isOpen(e) {
    h("boolean", { isOpen: e }), this._open = e;
  }
  /**
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `menu-button-${toggle-inner-text}-${key}`
   * - Set the menu's ID to: `menu-${toggle-inner-text}-${key}`
   *
   * @protected
   */
  _setIds() {
    if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
      let e = this.dom.toggle.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "", t = this.elements.controlledMenu.key;
      !e.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label") && (e = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), e.replace(/\s/g, "").length > 0 && (e = e.toLowerCase().replace(/\s+/g, "-"), e.startsWith("-") && (e = e.substring(1)), e.endsWith("-") && (e = e.slice(0, -1)), t = `${e}-${t}`), this.dom.toggle.id = this.dom.toggle.id || `menu-button-${t}`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `menu-${t}`;
    }
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * is initially set to "false".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    this.dom.toggle.setAttribute("aria-expanded", "false"), this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    );
  }
  /**
   * Expands the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "true", adds the
   * open class to the toggle's parent menu item
   * and controlled menu, and removes the closed class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuExpand
   *
   * @protected
   *
   * @fires accessibleMenuExpand
   *
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  _expand(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: n, openDuration: i } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"), this.elements.controlledMenu.elements.rootMenu.hasOpened = !0, n !== "" ? (w(n, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      k(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        w(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            k(
              n,
              this.elements.controlledMenu.dom.menu
            );
          }, i);
        });
      });
    })) : (w(s, this.elements.controlledMenu.dom.menu), k(t, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._expandEvent);
  }
  /**
   * Collapses the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "false", adds the
   * closed class to the toggle's parent menu item
   * and controlled menu, and removes the open class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuCollapse
   *
   * @protected
   *
   * @fires accessibleMenuCollapse
   *
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  _collapse(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: n, closeDuration: i } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"), n !== "" ? (w(n, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      k(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        w(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            k(
              n,
              this.elements.controlledMenu.dom.menu
            );
          }, i);
        });
      });
    })) : (w(t, this.elements.controlledMenu.dom.menu), k(s, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._collapseEvent);
  }
  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isOpen value to `true`.
   *
   * @public
   */
  open() {
    this.elements.controlledMenu.focusState = "self", this.isOpen || (this._expand(), this.isOpen = !0);
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
   *
   * @public
   */
  preview() {
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this.isOpen || (this._expand(), this.isOpen = !0);
  }
  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's focus state to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's current child index to 0,
   * calls collapse, and sets
   * the isOpen value to `false`.
   *
   * @public
   */
  close() {
    this.isOpen && (this.elements.controlledMenu.blur(), this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._collapse(), this.isOpen = !1);
  }
  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   *
   * @public
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  /**
   * Closes all sibling menus.
   *
   * @public
   */
  closeSiblings() {
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((e) => {
      e !== this && e.close();
    });
  }
  /**
   * Closes all child menus.
   *
   * @public
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (e) => e.close()
    );
  }
}
class O {
  /**
   * The DOM elements within the menu item.
   *
   * @protected
   *
   * @type {Object<HTMLElement>}
   *
   * @property {HTMLElement} item - The menu item.
   * @property {HTMLElement} link - The menu item's link.
   */
  _dom = {
    item: null,
    link: null
  };
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @protected
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @property {BaseMenu}        parentMenu - The menu containing this menu item.
   * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
   * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
   */
  _elements = {
    parentMenu: null,
    childMenu: null,
    toggle: null
  };
  /**
   * A flag marking a submenu item.
   *
   * @protected
   *
   * @type {boolean}
   */
  _submenu = !1;
  /**
   * Constructs a new `BaseMenuItem`.
   *
   * @param {object}          options                         - The options for generating the menu item.
   * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
   * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null
  }) {
    this._dom.item = e, this._dom.link = t, this._elements.parentMenu = s, this._elements.childMenu = i, this._elements.toggle = l, this._submenu = n;
  }
  /**
   * Initialize the menu item.
   */
  initialize() {
  }
  /**
   * The DOM elements within the menu item.
   *
   * @readonly
   *
   * @type {Object<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @readonly
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * A flag marking a submenu item.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _submenu
   */
  get isSubmenuItem() {
    return this._submenu;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  focus() {
    this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
      this.dom.link.focus();
    });
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  blur() {
    this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
      this.dom.link.blur();
    });
  }
}
function y(r) {
  try {
    const e = r.key || r.keyCode, t = {
      Enter: e === "Enter" || e === 13,
      Space: e === " " || e === "Spacebar" || e === 32,
      Escape: e === "Escape" || e === "Esc" || e === 27,
      ArrowUp: e === "ArrowUp" || e === "Up" || e === 38,
      ArrowRight: e === "ArrowRight" || e === "Right" || e === 39,
      ArrowDown: e === "ArrowDown" || e === "Down" || e === 40,
      ArrowLeft: e === "ArrowLeft" || e === "Left" || e === 37,
      Home: e === "Home" || e === 36,
      End: e === "End" || e === 35,
      Character: isNaN(e) && !!e.match(/^[a-zA-Z]{1}$/),
      Tab: e === "Tab" || e === 9,
      Asterisk: e === "*" || e === 56
    };
    return Object.keys(t).find((s) => t[s] === !0) || "";
  } catch {
    return "";
  }
}
function o(r) {
  r.preventDefault(), r.stopPropagation();
}
class I {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof BaseMenu}
   */
  _MenuType = I;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof BaseMenuItem}
   */
  _MenuItemType = O;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof BaseMenuToggle}
   */
  _MenuToggleType = L;
  /**
   * The DOM elements within the menu.
   *
   * @protected
   *
   * @type {Object<HTMLElement, HTMLElement[]>}
   *
   * @property {HTMLElement}   menu           - The menu element.
   * @property {HTMLElement[]} menuItems      - An array of menu items.
   * @property {HTMLElement[]} submenuItems   - An array of menu items that also contain submenu elements.
   * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
   * @property {HTMLElement[]} submenus       - An array of submenu elements.
   * @property {HTMLElement}   controller     - The toggle for this menu.
   * @property {HTMLElement}   container      - The container for this menu.
   */
  _dom = {
    menu: null,
    menuItems: [],
    submenuItems: [],
    submenuToggles: [],
    submenus: [],
    controller: null,
    container: null
  };
  /**
   * The query selectors used by the menu to populate the dom.
   *
   * @protected
   *
   * @type {Object<string>}
   *
   * @property {string} menuItems      - The query selector for menu items.
   * @property {string} menuLinks      - The query selector for menu links.
   * @property {string} submenuItems   - The query selector for menu items containing submenus.
   * @property {string} submenuToggles - The query selector for menu links that function as submenu toggles.
   * @property {string} submenus       - The query selector for for submenus.
   */
  _selectors = {
    menuItems: "",
    menuLinks: "",
    submenuItems: "",
    submenuToggles: "",
    submenus: ""
  };
  /**
   * The declared accessible-menu elements within the menu.
   *
   * @protected
   *
   * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
   *
   * @property {BaseMenuItem[]}   menuItems      - An array of menu items.
   * @property {BaseMenuToggle[]} submenuToggles - An array of menu toggles.
   * @property {?BaseMenuToggle}  controller     - A menu toggle that controls this menu.
   * @property {?BaseMenu}        parentMenu     - The parent menu.
   * @property {?BaseMenu}        rootMenu       - The root menu of the menu tree.
   */
  _elements = {
    menuItems: [],
    submenuToggles: [],
    controller: null,
    parentMenu: null,
    rootMenu: null
  };
  /**
   * The class(es) to apply when the menu is open.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _openClass = "show";
  /**
   * The class(es) to apply when the menu is closed.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _closeClass = "hide";
  /**
   * The class(es) to apply when the menu is transitioning between states.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _transitionClass = "transitioning";
  /**
   * The duration time (in milliseconds) for the transition between open and closed states.
   *
   * @protected
   *
   * @type {number}
   */
  _transitionDuration = 250;
  /**
   * The duration time (in milliseconds) for the transition from closed to open states.
   *
   * @protected
   *
   * @type {number}
   */
  _openDuration = -1;
  /**
   * The duration time (in milliseconds) for the transition from open to closed states.
   *
   * @protected
   *
   * @type {number}
   */
  _closeDuration = -1;
  /**
   * A flag marking the root menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _root = !0;
  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = 0;
  /**
   * The current state of the menu's focus.
   *
   * @protected
   *
   * @type {string}
   */
  _focusState = "none";
  /**
   * This last event triggered on the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _currentEvent = "none";
  /**
   * The type of hoverability for the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _hoverType = "off";
  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _hoverDelay = 250;
  /**
   * The delay time (in milliseconds) used for pointerenter events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _enterDelay = -1;
  /**
   * The delay time (in milliseconds) used for pointerleave events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _leaveDelay = -1;
  /**
   * The prefix to use for CSS custom properties.
   *
   * @protected
   *
   * @type {string}
   */
  _prefix = "am-";
  /**
   * A variable to hold the hover timeout function.
   *
   * @protected
   *
   * @type {?Function}
   */
  _hoverTimeout = null;
  /**
   * A flag to check if the menu can dynamically hover based on if a menu has been opened already.
   *
   * @protected
   *
   * @type {boolean}
   */
  _hasOpened = !1;
  /**
   * The key used to generate IDs throughout the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _key = "";
  /**
   * An array of error messages generated by the menu.
   *
   * @protected
   *
   * @type {string[]}
   */
  _errors = [];
  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.openDuration = -1]                - The duration of the transition from "closed" to "open" states (in milliseconds).
   * @param {boolean}            [options.closeDuration = -1]               - The duration of the transition from "open" to "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = false]               - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing menus if the menu is hoverable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                       - The key used to generate IDs throughout the menu.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "li:has(ul)",
    submenuToggleSelector: i = "a",
    submenuSelector: l = "ul",
    controllerElement: u = null,
    containerElement: c = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    transitionDuration: p = 250,
    openDuration: m = -1,
    closeDuration: _ = -1,
    isTopLevel: g = !0,
    parentMenu: M = null,
    hoverType: b = "off",
    hoverDelay: C = 250,
    enterDelay: T = -1,
    leaveDelay: E = -1,
    prefix: v = "am-",
    key: S = null
  }) {
    this._dom.menu = e, this._dom.controller = u, this._dom.container = c, this._selectors.menuItems = t, this._selectors.menuLinks = s, this._selectors.submenuItems = n, this._selectors.submenuToggles = i, this._selectors.submenus = l, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = M, this._elements.rootMenu = g ? this : null, this._openClass = a || "", this._closeClass = d || "", this._transitionClass = f || "", this._transitionDuration = p, this._openDuration = m, this._closeDuration = _, this._prefix = v || "", this._key = S || "", this._root = g, this._hoverType = b, this._hoverDelay = C, this._enterDelay = T, this._leaveDelay = E;
  }
  /**
   * Initializes the menu.
   *
   * The following steps will be taken to initialize the menu:
   * - Validate that the menu can initialize.
   * - Find the root menu of the menu tree if it isn't already set.
   * - Populate all DOM elements within the dom.
   * - If the current menu is the root menu, set the ID's on the menu, controller,
   *   and container.
   * - If the current menu is the root menu _and_ has a controller, initialize
   *   the controller.
   * - If the current menu is the root menu, add it to the AccessibleMenu storage in the window.
   * - Populate the menu elements within the elements.
   * - Set the transition duration custom prop for the menu.
   *
   * @public
   *
   * @throws {Error} Will throw an Error if validate returns `false`.
   */
  initialize() {
    if (!this._validate())
      throw new Error(
        `AccessibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(
          `
 - `
        )}`
      );
    if (this.elements.rootMenu === null && this._findRootMenu(this), this._generateKey(), this._setDOMElements(), this.isTopLevel) {
      if (this._setIds(), this.dom.controller && this.dom.container) {
        const e = new this._MenuToggleType({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this
        });
        $("button", { toggle: e.dom.toggle }) || e.dom.toggle.setAttribute("role", "button"), e.dom.toggle.setAttribute("aria-controls", this.dom.menu.id), this._elements.controller = e;
      }
      window.AccessibleMenu = window.AccessibleMenu || {
        menus: {}
      }, typeof window.AccessibleMenu.menus != "object" && (window.AccessibleMenu.menus = {}), window.AccessibleMenu.menus[this.dom.menu.id] = this;
    }
    this._createChildElements(), this._setTransitionDurations();
  }
  /**
   * The DOM elements within the menu.
   *
   * @readonly
   *
   * @type {Object<HTMLElement, HTMLElement[]>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The query selectors used by the menu to populate the dom.
   *
   * @readonly
   *
   * @type {Object<string>}
   *
   * @see _selectors
   */
  get selectors() {
    return this._selectors;
  }
  /**
   * The declared accessible-menu elements within the menu.
   *
   * @readonly
   *
   * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * The flag marking the root menu.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _root
   */
  get isTopLevel() {
    return this._root;
  }
  /**
   * The key used to generate IDs throughout the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their parent menu's key suffixed with their position.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _key
   */
  get key() {
    if (this.isTopLevel)
      return this._key;
    const e = this.elements.parentMenu.dom.submenus.indexOf(this.dom.menu) || 0;
    return `${this.elements.parentMenu.key}-${e}`;
  }
  /**
   * An array of error messages generated by the menu.
   *
   * @readonly
   *
   * @type {string[]}
   *
   * @see _errors
   */
  get errors() {
    return this._errors;
  }
  /**
   * The class(es) to apply when the menu is open.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's open class(es).
   *
   * @type {string|string[]}
   *
   * @see _openClass
   */
  get openClass() {
    return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
  }
  set openClass(e) {
    D({ openClass: e }), this._openClass !== e && (this._openClass = e);
  }
  /**
   * The class(es) to apply when the menu is closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @type {string|string[]}
   *
   * @see _closeClass
   */
  get closeClass() {
    return this.isTopLevel ? this._closeClass : this.elements.rootMenu.closeClass;
  }
  set closeClass(e) {
    D({ closeClass: e }), this._closeClass !== e && (this._closeClass = e);
  }
  /**
   * The class(es) to apply when the menu is transitioning between open and closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition class(es).
   *
   * @type {string|string[]}
   *
   * @see _transitionClass
   */
  get transitionClass() {
    return this.isTopLevel ? this._transitionClass : this.elements.rootMenu.transitionClass;
  }
  set transitionClass(e) {
    D({ transitionClass: e }), this._transitionClass !== e && (this._transitionClass = e);
  }
  /**
   * The duration time (in milliseconds) for the transition between open and closed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition duration.
   *
   * Setting this value will also set the --am-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _transitionDuration
   */
  get transitionDuration() {
    return this.isTopLevel ? this._transitionDuration : this.elements.rootMenu.transitionDuration;
  }
  set transitionDuration(e) {
    h("number", { transitionDuration: e }), this._transitionDuration !== e && (this._transitionDuration = e, this._setTransitionDurations());
  }
  /**
   * The duration time (in milliseconds) for the transition from closed to open states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's openDuration.
   *
   * If openDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-open-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _openDuration
   */
  get openDuration() {
    return this._openDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._openDuration : this.elements.rootMenu.openDuration;
  }
  set openDuration(e) {
    h("number", { openDuration: e }), this._openDuration !== e && (this._openDuration = e, this._setTransitionDurations());
  }
  /**
   * The duration time (in milliseconds) for the transition from open to closed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's closeDuration.
   *
   * If closeDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-close-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _closeDuration
   */
  get closeDuration() {
    return this._closeDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._closeDuration : this.elements.rootMenu.closeDuration;
  }
  set closeDuration(e) {
    h("number", { closeDuration: e }), this._closeDuration !== e && (this._closeDuration = e, this._setTransitionDurations());
  }
  /**
   * The index of the currently selected menu item in the menu.
   *
   * - Attempting to set a value less than -1 will set the current child to -1.
   * - Attempting to set a value greater than or equal to the number of menu items
   *   will set the current child to the index of the last menu item in the menu.
   *
   * If the current menu has a parent menu _and_ the menu's
   * current event is "mouse", The parent menu
   * will have it's current child updated as well to help with transitioning
   * between mouse and keyboard navigation.
   *
   * @type {number}
   *
   * @see _currentChild
   */
  get currentChild() {
    return this._currentChild;
  }
  set currentChild(e) {
    h("number", { currentChild: e });
    function t(s) {
      if (["mouse", "character"].includes(s.currentEvent) && s.elements.parentMenu) {
        let i = 0, l = !1;
        for (; !l && i < s.elements.parentMenu.elements.menuItems.length; ) {
          const u = s.elements.parentMenu.elements.menuItems[i];
          u.isSubmenuItem && u.elements.toggle.elements.controlledMenu === s && (l = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = i), i++;
        }
      }
    }
    e < -1 ? (this._currentChild = -1, t(this)) : e >= this.elements.menuItems.length ? (this._currentChild = this.elements.menuItems.length - 1, t(this)) : this.focusChild !== e && (this._currentChild = e, t(this));
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
   *
   * @see _focusState
   */
  get focusState() {
    return this._focusState;
  }
  set focusState(e) {
    V({ focusState: e }), this._focusState !== e && (this._focusState = e), this.elements.submenuToggles.length > 0 && (e === "self" || e === "none") && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.focusState = "none";
    }), this.elements.parentMenu && (e === "self" || e === "child") && (this.elements.parentMenu.focusState = "child");
  }
  /**
   * The last event triggered on the menu.
   *
   * @type {string}
   *
   * @see _currentEvent
   */
  get currentEvent() {
    return this._currentEvent;
  }
  set currentEvent(e) {
    P({ currentEvent: e }), this._currentEvent !== e && (this._currentEvent = e, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.currentEvent = e;
    }));
  }
  /**
   * The currently selected menu item.
   *
   * @readonly
   *
   * @type {BaseMenuItem}
   */
  get currentMenuItem() {
    return this.elements.menuItems[this.currentChild];
  }
  /**
   * The type of hoverability for the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hoverability.
   *
   * @type {string}
   *
   * @see _hoverType
   */
  get hoverType() {
    return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
  }
  set hoverType(e) {
    j({ hoverType: e }), this._hoverType !== e && (this._hoverType = e);
  }
  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @type {number}
   *
   * @see _hoverDelay
   */
  get hoverDelay() {
    return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
  }
  set hoverDelay(e) {
    h("number", { hoverDelay: e }), this._hoverDelay !== e && (this._hoverDelay = e);
  }
  /**
   * The delay time (in milliseconds) used for pointerenter events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's enter delay.
   *
   * If enterDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _enterDelay
   */
  get enterDelay() {
    return this._enterDelay === -1 ? this.hoverDelay : this._root ? this._enterDelay : this.elements.rootMenu.enterDelay;
  }
  set enterDelay(e) {
    h("number", { enterDelay: e }), this._enterDelay !== e && (this._enterDelay = e);
  }
  /**
   * The delay time (in milliseconds) used for pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's leave delay.
   *
   * If leaveDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _leaveDelay
   */
  get leaveDelay() {
    return this._leaveDelay === -1 ? this.hoverDelay : this._root ? this._leaveDelay : this.elements.rootMenu.leaveDelay;
  }
  set leaveDelay(e) {
    h("number", { leaveDelay: e }), this._leaveDelay !== e && (this._leaveDelay = e);
  }
  /**
   * The prefix to use for CSS custom properties.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's prefix.
   *
   * @type {string}
   *
   * @see _prefix
   */
  get prefix() {
    return this._root ? this._prefix : this.elements.rootMenu.prefix;
  }
  set prefix(e) {
    h("string", { prefix: e }), this._prefix !== e && (this._prefix = e);
  }
  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * This will be `false` unless any of the following criteria are met:
   * - The menu's current event is "keyboard".
   * - The menu's current event is "character".
   * - The menu's current event is "mouse" _and_ the menu's
   *   hover type is "dynamic".
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    let e = !1;
    return (this.currentEvent === "keyboard" || this.currentEvent === "character") && (e = !0), this.currentEvent === "mouse" && this.hoverType === "dynamic" && (e = !0), e;
  }
  /**
   * A flag to check if the menu can dynamically hover.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hasOpened.
   *
   * @type {boolean}
   *
   * @see _hasOpened
   */
  get hasOpened() {
    return this._root ? this._hasOpened : this.elements.rootMenu.hasOpened;
  }
  set hasOpened(e) {
    h("boolean", { hasOpened: e }), this._hasOpened !== e && (this._hasOpened = e);
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let e = !0, t;
    this._dom.container !== null || this._dom.controller !== null ? t = A(HTMLElement, {
      menuElement: this._dom.menu,
      controllerElement: this._dom.controller,
      containerElement: this._dom.container
    }) : t = A(HTMLElement, {
      menuElement: this._dom.menu
    }), t.status || (this._errors.push(t.error.message), e = !1);
    let s;
    if (this._selectors.submenuItems !== "" ? s = x({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks,
      submenuItemSelector: this._selectors.submenuItems,
      submenuToggleSelector: this._selectors.submenuToggles,
      submenuSelector: this._selectors.submenus
    }) : s = x({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks
    }), s.status || (this._errors.push(s.error.message), e = !1), this._openClass !== "") {
      const m = D({ openClass: this._openClass });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    if (this._closeClass !== "") {
      const m = D({
        closeClass: this._closeClass
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    if (this._transitionClass !== "") {
      const m = D({
        transitionClass: this._transitionClass
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    const n = h("number", {
      transitionDuration: this._transitionDuration
    });
    n.status || (this._errors.push(n.error.message), e = !1);
    const i = h("number", {
      openDuration: this._openDuration
    });
    i.status || (this._errors.push(i.error.message), e = !1);
    const l = h("number", {
      closeDuration: this._closeDuration
    });
    l.status || (this._errors.push(l.error.message), e = !1);
    const u = h("boolean", { isTopLevel: this._root });
    if (u.status || (this._errors.push(u.error.message), e = !1), this._elements.parentMenu !== null) {
      const m = A(I, {
        parentMenu: this._elements.parentMenu
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    const c = j({ hoverType: this._hoverType });
    c.status || (this._errors.push(c.error.message), e = !1);
    const a = h("number", {
      hoverDelay: this._hoverDelay
    });
    a.status || (this._errors.push(a.error.message), e = !1);
    const d = h("number", {
      enterDelay: this._enterDelay
    });
    d.status || (this._errors.push(d.error.message), e = !1);
    const f = h("number", {
      leaveDelay: this._leaveDelay
    });
    if (f.status || (this._errors.push(f.error.message), e = !1), this._key !== "") {
      const m = h("string", { key: this._key });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    const p = h("string", { prefix: this._prefix });
    return p.status || (this._errors.push(p.error.message), e = !1), e;
  }
  /**
   * Sets DOM elements within the menu.
   *
   * Elements that are not stored inside an array cannot be set through this method.
   *
   * @protected
   *
   * @param {string}      elementType            - The type of element to populate.
   * @param {HTMLElement} [base = this.dom.menu] - The element used as the base for the querySelect.
   * @param {boolean}     [overwrite = true]     - A flag to set if the existing elements will be overwritten.
   */
  _setDOMElementType(e, t = this.dom.menu, s = !0) {
    if (typeof this.selectors[e] == "string") {
      if (!Array.isArray(this.dom[e]))
        throw new Error(
          `AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`
        );
      t !== this.dom.menu && A(HTMLElement, { base: t });
      const i = Array.from(
        t.querySelectorAll(this.selectors[e])
      ).filter(
        (l) => l.parentElement === t
      );
      s ? this._dom[e] = i : this._dom[e] = [
        ...this._dom[e],
        ...i
      ];
    } else
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type within the menu.`
      );
  }
  /**
   * Resets DOM elements within the menu.
   *
   * Elements that are not stored inside an array cannot be reset through this method.
   *
   * @protected
   *
   * @param {string} elementType - The type of element to clear.
   */
  _resetDOMElementType(e) {
    if (typeof this.dom[e] < "u") {
      if (!Array.isArray(this.dom[e]))
        throw new Error(
          `AccessibleMenu: The "${e}" element cannot be reset through _resetDOMElementType.`
        );
      this._dom[e] = [];
    } else
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type within the menu.`
      );
  }
  /**
   * Sets all DOM elements within the menu.
   *
   * Utilizes _setDOMElementType and
   * _resetDOMElementType.
   *
   * @protected
   */
  _setDOMElements() {
    this._setDOMElementType("menuItems"), this.selectors.submenuItems !== "" && (this._setDOMElementType("submenuItems"), this._resetDOMElementType("submenuToggles"), this._resetDOMElementType("submenus"), this.dom.submenuItems.forEach((e) => {
      this._setDOMElementType("submenuToggles", e, !1), this._setDOMElementType("submenus", e, !1);
    }));
  }
  /**
   * Generates a key for the menu.
   *
   * @param {boolean} [regenerate = false] - A flag to determine if the key should be regenerated.
   */
  _generateKey(e = !1) {
    (this.key === "" || e) && (this._key = Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 10));
  }
  /**
   * Sets the IDs of the menu and it's elements if they do not already exist.
   *
   * The generated IDs use the key and follow the format:
   *  - menu: `menu-${key}`
   *  - container: `menu-container-${key}`
   *  - controller: `menu-controller-${key}`
   */
  _setIds() {
    this.dom.menu.id = this.dom.menu.id || `menu-${this.key}`, this.dom.container && (this.dom.container.id = this.dom.container.id || `menu-container-${this.key}`), this.dom.controller && (this.dom.controller.id = this.dom.controller.id || `menu-controller-${this.key}`);
  }
  /**
   * Finds the root menu element.
   *
   * @protected
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  _findRootMenu(e) {
    if (e.isTopLevel)
      this._elements.rootMenu = e;
    else if (e.elements.parentMenu !== null)
      this._findRootMenu(e.elements.parentMenu);
    else
      throw new Error("Cannot find root menu.");
  }
  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let t;
      if (this.dom.submenuItems.includes(e)) {
        const s = e.querySelector(this.selectors.submenuToggles), n = e.querySelector(this.selectors.submenus), i = new this._MenuType({
          menuElement: n,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuToggles,
          submenuSelector: this.selectors.submenus,
          openClass: this.openClass,
          closeClass: this.closeClass,
          transitionClass: this.transitionClass,
          transitionDuration: this.transitionDuration,
          openDuration: this.openDuration,
          closeDuration: this.closeDuration,
          isTopLevel: !1,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay
        }), l = new this._MenuToggleType({
          menuToggleElement: s,
          parentElement: e,
          controlledMenu: i,
          parentMenu: this
        });
        this._elements.submenuToggles.push(l), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: i,
          toggle: l
        });
      } else {
        const s = e.querySelector(this.selectors.menuLinks);
        t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this
        });
      }
      this._elements.menuItems.push(t);
    });
  }
  /**
   * Clears the hover timeout.
   *
   * @protected
   */
  _clearTimeout() {
    clearTimeout(this._hoverTimeout);
  }
  /**
   * Sets the hover timeout.
   *
   * @protected
   *
   * @param {Function} callback - The callback function to execute.
   * @param {number}   delay    - The delay time in milliseconds.
   */
  _setTimeout(e, t) {
    h("function", { callback: e }), h("number", { delay: t }), this._hoverTimeout = setTimeout(e, t);
  }
  /**
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's focus state
   *   to "self".
   * - Adds a `focusout` listener to the menu so when the menu loses focus,
   *   it will close.
   *
   * @protected
   */
  _handleFocus() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("focus", () => {
        this.focusState = "self", this.currentChild = t;
      });
    }), this.dom.menu.addEventListener("focusout", (e) => {
      this.currentEvent !== "keyboard" || e.relatedTarget === null || this.dom.menu.contains(e.relatedTarget) || (this.focusState = "none", this.closeChildren());
    });
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds a `click` listener to every menu item that will blur
   *   all menu items in the entire menu structure (starting at the root menu) and
   *   then properly focus the clicked item.
   * - Adds a `click` listener to every submenu item that will properly
   *   toggle the submenu open/closed.
   * - Adds a `click` listener to the menu's controller
   *   (if the menu is the root menu) so when it is clicked it will properly
   *   toggle open/closed.
   *
   * @protected
   */
  _handleClick() {
    function e(t, s, n) {
      o(n), n.button === 0 && (s.toggle(), s.isOpen && (t.focusState = "self", s.elements.controlledMenu.focusState = "none"));
    }
    this.elements.menuItems.forEach((t, s) => {
      t.dom.link.addEventListener(
        "click",
        () => {
          this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this._clearTimeout(), this.focusChild(s);
        },
        { passive: !0 }
      ), t.isSubmenuItem && t.elements.toggle.dom.toggle.addEventListener("click", (n) => {
        this.currentEvent = "mouse", e(this, t.elements.toggle, n);
      });
    }), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("click", (t) => {
      this.currentEvent = "mouse", e(this, this.elements.controller, t);
    }), document.addEventListener("click", (t) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(t.target) && !this.dom.menu !== t.target && (this.elements.rootMenu.hasOpened = this.elements.submenuToggles.some(
        (s) => s.isOpen
      )));
    });
  }
  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's hover type.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *    current child value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   preview method for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   close method for the submenu item's toggle
   *   will be called after a delay set by the menu's hover delay.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   focus state is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a non-submenu item, and a submenu
   *   is already open, the closeChildren method for the menu will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `pointerleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `pointerleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.closeChildren();
        }, this.enterDelay)) : this.closeChildren())));
      }), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), e.dom.item.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
      }));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
   *
   * @protected
   */
  _handleKeydown() {
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "keydown",
      (e) => {
        this.currentEvent = "keyboard";
        const t = y(e);
        (t === "Space" || t === "Enter") && o(e);
      }
    );
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * - Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
   *   - Toggles the menu when the user hits "Space" or "Enter".
   *
   * @protected
   */
  _handleKeyup() {
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      (t === "Space" || t === "Enter") && (o(e), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
    });
  }
  /**
   * Sets the transition durations of the menu as a CSS custom properties.
   *
   * The custom properties are:
   *   - `--am-transition-duration`,
   *   - `--am-open-transition-duration`, and
   *   - `--am-close-transition-duration`.
   *
   * The prefix of `am-` can be changed by setting the menu's prefix value.
   *
   * @protected
   */
  _setTransitionDurations() {
    this.dom.menu.style.setProperty(
      `--${this.prefix}transition-duration`,
      `${this.transitionDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}open-transition-duration`,
      `${this.openDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}close-transition-duration`,
      `${this.closeDuration}ms`
    );
  }
  /**
   * Focus the menu.
   *
   * Sets the menu's focus state to "self" and
   * focusses the menu if the menu's shouldFocus
   * value is `true`.
   *
   * @public
   */
  focus() {
    this.focusState = "self", this.shouldFocus && this.dom.menu.focus();
  }
  /**
   * Unfocus the menu.
   *
   * Sets the menu's focus state to "none"
   * and blurs the menu if the menu's shouldFocus
   * value is `true`.
   *
   * @public
   */
  blur() {
    this.focusState = "none", this.shouldFocus && this.dom.menu.blur();
  }
  /**
   * Focus the menu's current child.
   *
   * @public
   */
  focusCurrentChild() {
    this.focusState = "self", this.currentChild !== -1 && this.currentMenuItem.focus();
  }
  /**
   * Focuses the menu's child at a given index.
   *
   * @public
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(e) {
    this.blurCurrentChild(), this.currentChild = e, this.focusCurrentChild();
  }
  /**
   * Focuses the menu's first child.
   *
   * @public
   */
  focusFirstChild() {
    this.focusChild(0);
  }
  /**
   * Focus the menu's last child.
   *
   * @public
   */
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }
  /**
   * Focus the menu's next child.
   *
   * @public
   */
  focusNextChild() {
    this.currentChild < this.elements.menuItems.length - 1 ? this.focusChild(this.currentChild + 1) : this.focusCurrentChild();
  }
  /**
   * Focus the menu's previous child.
   *
   * @public
   */
  focusPreviousChild() {
    this.currentChild > 0 ? this.focusChild(this.currentChild - 1) : this.focusCurrentChild();
  }
  /**
   * Blurs the menu's current child.
   *
   * @public
   */
  blurCurrentChild() {
    this.focusState = "none", this.currentChild !== -1 && this.currentMenuItem.blur();
  }
  /**
   * Focus the menu's controller.
   *
   * @public
   */
  focusController() {
    this.dom.controller && (this.shouldFocus && this.dom.controller.focus(), this.focusState = "none");
  }
  /**
   * Focus the menu's container.
   *
   * @public
   */
  focusContainer() {
    this.dom.container && (this.shouldFocus && this.dom.container.focus(), this.focusState = "none");
  }
  /**
   * Close all submenu children.
   *
   * @public
   */
  closeChildren() {
    this.elements.submenuToggles.forEach((e) => e.close());
  }
  /**
   * Blurs all children and submenu's children.
   *
   * @public
   */
  blurChildren() {
    this.elements.menuItems.forEach((e) => {
      e.blur(), e.isSubmenuItem && e.elements.childMenu.blurChildren();
    });
  }
}
class R extends O {
  /**
   * Constructs a new `DisclosureMenuItem`.
   *
   * @param {object}                options                         - The options for generating the menu item.
   * @param {HTMLElement}           options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}           options.menuLinkElement         - The menu item's link in the DOM.
   * @param {DisclosureMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}               [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?DisclosureMenu}       [options.childMenu = null]      - The child menu.
   * @param {?DisclosureMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}               [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: u = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), u && this.initialize();
  }
}
class U extends L {
  /**
   * Constructs a new `DisclosureMenuToggle`.
   *
   * @param {object}          options                     - The options for generating the menu toggle.
   * @param {HTMLElement}     options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}     options.parentElement       - The element containing the controlled menu.
   * @param {DisclosureMenu}  options.controlledMenu      - The menu controlled by this toggle.
   * @param {?DisclosureMenu} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}         [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Ensures the toggle element has a `role` of "button" if it is not
   * already a button.
   *
   * Then using the toggle and menu's IDs, the toggle's `aria-controls`
   * is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes(), $("button", { toggle: this.dom.toggle }) || this.dom.toggle.setAttribute("role", "button"), this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    );
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @public
   */
  open() {
    this.closeSiblings(), super.open();
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @public
   */
  preview() {
    this.closeSiblings(), super.preview();
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @public
   */
  close() {
    this.isOpen && this.closeChildren(), super.close();
  }
}
class F extends I {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof DisclosureMenu}
   */
  _MenuType = F;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof DisclosureMenuItem}
   */
  _MenuItemType = R;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof DisclosureMenuToggle}
   */
  _MenuToggleType = U;
  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = -1;
  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _optionalSupport = !1;
  /**
   * Constructs a new `DisclosureMenu`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = button]   - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.openDuration = -1]                - The duration of the transition from "closed" to "open" states (in milliseconds).
   * @param {boolean}            [options.closeDuration = -1]               - The duration of the transition from "open" to "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                - A flag to mark the root menu.
   * @param {?DisclosureMenu}    [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {boolean}            [options.optionalKeySupport = false]       - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                       - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "li:has(ul)",
    submenuToggleSelector: i = "button",
    submenuSelector: l = "ul",
    controllerElement: u = null,
    containerElement: c = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    transitionDuration: p = 250,
    openDuration: m = -1,
    closeDuration: _ = -1,
    isTopLevel: g = !0,
    parentMenu: M = null,
    hoverType: b = "off",
    hoverDelay: C = 250,
    enterDelay: T = -1,
    leaveDelay: E = -1,
    optionalKeySupport: v = !1,
    prefix: S = "am-",
    key: K = null,
    initialize: N = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: t,
      menuLinkSelector: s,
      submenuItemSelector: n,
      submenuToggleSelector: i,
      submenuSelector: l,
      controllerElement: u,
      containerElement: c,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      transitionDuration: p,
      openDuration: m,
      closeDuration: _,
      isTopLevel: g,
      parentMenu: M,
      hoverType: b,
      hoverDelay: C,
      enterDelay: T,
      leaveDelay: E,
      prefix: S,
      key: K
    }), this._optionalSupport = v, N && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call BaseMenu's initialize method
   * as well as set up focus,
   * click,
   * hover,
   * keydown, and
   * keyup events for the menu.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @type {boolean}
   *
   * @see _optionalSupport
   */
  get optionalKeySupport() {
    return this.isTopLevel ? this._optionalSupport : this.elements.rootMenu.optionalKeySupport;
  }
  set optionalKeySupport(e) {
    h("boolean", { optionalKeySupport: e }), this._optionalSupport = e;
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let e = super._validate();
    const t = h("boolean", {
      optionalKeySupport: this._optionalSupport
    });
    return t.status || (this._errors.push(t.error.message), e = !1), e;
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `click` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("click", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close(), this.elements.rootMenu.hasOpened = !1));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ optional keyboard support
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      if (this.focusState === "self") {
        const s = ["Space", "Enter"], n = ["Escape"], i = ["Escape"], l = [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End"
        ];
        (s.includes(t) || this.optionalKeySupport && l.includes(t) || this.elements.controller && n.includes(t) || this.elements.parentMenu && i.includes(t)) && o(e);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * WAI ARIA Practices Example Disclosure for Navigation Menus):
   *
   * | Key | Function |
   * | --- | --- |
   * | _Tab_ or _Shift + Tab_ | Move keyboard focus among top-level buttons, and if a dropdown is open, into and through links in the dropdown. |
   * | _Space_ or _Enter_ | <ul><li>If focus is on a disclosure button, activates the button, which toggles the visibility of the dropdown.</li><li>If focus is on a link:<ul><li>If any link has aria-current set, removes it.</li><li>Sets aria-current="page" on the focused link.</li><li>Activates the focused link.</li></ul></li></ul> |
   * | _Escape_ | If a dropdown is open, closes it and sets focus on the button that controls that dropdown. |
   * | _Down Arrow_ or _Right Arrow_ (Optional}) | <ul><li>If focus is on a button and its dropdown is collapsed, and it is not the last button, moves focus to the next button.</li><li>if focus is on a button and its dropdown is expanded, moves focus to the first link in the dropdown.</li><li>If focus is on a link, and it is not the last link, moves focus to the next link.</li></ul> |
   * | _Up Arrow_ or _Left Arrow_ (Optional}) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the previous button.</li><li>If focus is on a link, and it is not the first link, moves focus to the previous link.</li></ul> |
   * | _Home_ (Optional) | <ul><li>If focus is on a button, and it is not the first button, moves focus to the first button.</li><li>If focus is on a link, and it is not the first link, moves focus to the first link.</li></ul> |
   * | _End_ (Optional) | <ul><li>If focus is on a button, and it is not the last button, moves focus to the last button.</li><li>If focus is on a link, and it is not the last link, moves focus to the last link.</li></ul> |
   *
   * The optional keybindings are controlled by the menu's optionalKeySupport value.
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      this.focusState === "self" && (t === "Space" || t === "Enter" ? (o(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click()) : t === "Escape" ? this.elements.submenuToggles.some(
        (n) => n.isOpen
      ) ? (o(e), this.closeChildren()) : this.elements.parentMenu ? (o(e), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (t === "ArrowDown" || t === "ArrowRight" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : t === "ArrowUp" || t === "ArrowLeft" ? (o(e), this.focusPreviousChild()) : t === "Home" ? (o(e), this.focusFirstChild()) : t === "End" && (o(e), this.focusLastChild())));
    });
  }
}
class W extends O {
  /**
   * Constructs a new `MenubarItem`.
   *
   * @param {object}         options                         - The options for generating the menu item.
   * @param {HTMLElement}    options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}    options.menuLinkElement         - The menu item's link in the DOM.
   * @param {Menubar}        options.parentMenu              - The parent menu.
   * @param {boolean}        [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?Menubar}       [options.childMenu = null]      - The child menu.
   * @param {?MenubarToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}        [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: u = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), u && this.initialize();
  }
  /**
   * Initialize the menu item.
   *
   * Initialize will call the BaseMenuItem's initialize method
   * as well as set the menu item's `role` to "none",
   * the menu link's `role` to "menuitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   */
  initialize() {
    super.initialize(), this.dom.item.setAttribute("role", "none"), this.dom.link.setAttribute("role", "menuitem"), this.dom.link.tabIndex = -1;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's focus method
   * as well as set the menu link's `tabIndex` to 0 if the parent menu
   * is the root menu.
   *
   * @public
   */
  focus() {
    super.focus(), this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = 0);
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's blur method
   * as well as set the menu link's `tabIndex` to -1 if the parent menu
   * is the root menu.
   *
   * @public
   */
  blur() {
    super.blur(), this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = -1);
  }
}
class Z extends L {
  /**
   * Constructs a new `MenubarToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {Menubar}     options.controlledMenu      - The menu controlled by this toggle.
   * @param {?Menubar}    [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}     [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Then sets the toggle's `aria-haspopup` attribute to "true".
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes(), this.dom.toggle.setAttribute("aria-haspopup", "true");
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @public
   */
  open() {
    this.closeSiblings(), super.open();
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @public
   */
  preview() {
    this.closeSiblings(), super.preview();
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @public
   */
  close() {
    this.isOpen && (this.closeChildren(), this.elements.parentMenu && this.elements.parentMenu.focusCurrentChild()), super.close();
  }
}
class z extends I {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof Menubar}
   */
  _MenuType = z;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof MenubarItem}
   */
  _MenuItemType = W;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof MenubarToggle}
   */
  _MenuToggleType = Z;
  /**
   * Constructs a new `Menubar`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                - A flag to mark the root menu.
   * @param {?Menubar}           [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                       - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "li:has(ul)",
    submenuToggleSelector: i = "a",
    submenuSelector: l = "ul",
    controllerElement: u = null,
    containerElement: c = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    transitionDuration: p = 250,
    isTopLevel: m = !0,
    parentMenu: _ = null,
    hoverType: g = "off",
    hoverDelay: M = 250,
    enterDelay: b = -1,
    leaveDelay: C = -1,
    prefix: T = "am-",
    key: E = null,
    initialize: v = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: t,
      menuLinkSelector: s,
      submenuItemSelector: n,
      submenuToggleSelector: i,
      submenuSelector: l,
      controllerElement: u,
      containerElement: c,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      transitionDuration: p,
      isTopLevel: m,
      parentMenu: _,
      hoverType: g,
      hoverDelay: M,
      enterDelay: b,
      leaveDelay: C,
      prefix: T,
      key: E
    }), v && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call the BaseMenu's initialize method
   * as well as set up focus,
   * click,
   * hover,
   * keydown, and
   * keyup events for the menu.
   *
   * This will also set the menu's `role` to "menubar" in the DOM.
   *
   * If the menu is a root menu the first menu item's `tabIndex` will be set to
   * 0 in the DOM.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this.isTopLevel ? this.dom.menu.setAttribute("role", "menubar") : this.dom.menu.setAttribute("role", "menu"), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup(), this.isTopLevel && (this.elements.menuItems[0].dom.link.tabIndex = 0, this.elements.controller && this.elements.controller.dom.toggle.removeAttribute("aria-haspopup"));
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `click` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("click", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close(), this.elements.rootMenu.hasOpened = !1));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
   *     "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
   *     and "A" through "Z".
   *   - Completely closes the menu and moves focus out if the "Tab" key is pressed.
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      if (t === "Tab" && (this.elements.rootMenu.focusState !== "none" ? (this.elements.rootMenu.blur(), this.elements.rootMenu.closeChildren()) : this.elements.rootMenu.focus()), t === "Character")
        o(e);
      else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const s = [
            "Space",
            "Enter",
            "ArrowRight",
            "ArrowLeft",
            "Home",
            "End"
          ], n = ["ArrowDown", "ArrowUp"], i = ["Escape"];
          (s.includes(t) || this.currentMenuItem.isSubmenuItem && n.includes(t) || this.elements.controller && i.includes(t)) && o(e);
        }
      } else
        [
          "Space",
          "Enter",
          "Escape",
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End"
        ].includes(t) && o(e);
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * Navigation Menubar Example):
   *
   * <strong>Menubar</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Right Arrow_ | <ul><li>Moves focus to the next item in the menubar.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Left Arrow_ | <ul><li>Moves focus to the previous item in the menubar.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | _Down Arrow_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Up Arrow_ | Opens submenu and moves focus to last item in the submenu. |
   * | _Home_ | Moves focus to first item in the menubar. |
   * | _End_ | Moves focus to last item in the menubar. |
   * | _Character_ | <ul><li>Moves focus to next item in the menubar having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * <strong>Submenu</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | <ul><li>Activates menu item, causing the link to be activated.</li><li>NOTE: the links go to dummy pages; use the browser go-back function to return to this menubar example page.</li></ul> |
   * | _Escape_ | <ul><li>Closes submenu.</li><li>Moves focus to parent menubar item.</li></ul> |
   * | _Right Arrow_ | <ul><li>If focus is on an item with a submenu, opens the submenu and places focus on the first item.</li><li>If focus is on an item that does not have a submenu:<ul><li>Closes submenu.</li><li>Moves focus to next item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Left Arrow_ | <ul><li>Closes submenu and moves focus to parent menu item.</li><li>If parent menu item is in the menubar, also:<ul><li>moves focus to previous item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Down Arrow_ | <ul><li>Moves focus to the next item in the submenu.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Up Arrow_ | <ul><li>Moves focus to previous item in the submenu.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | Home | Moves focus to the first item in the submenu. |
   * | End | Moves focus to the last item in the submenu. |
   * | _Character_ | <ul><li>Moves focus to the next item having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e), { altKey: s, crtlKey: n, metaKey: i } = e;
      if (t === "Character" && !(s || n || i))
        o(e), this.elements.rootMenu.currentEvent = "character", this.focusNextChildWithCharacter(e.key);
      else if (this.isTopLevel) {
        if (this.focusState === "self")
          if (t === "Space" || t === "Enter")
            o(e), this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            })) : this.currentMenuItem.dom.link.click();
          else if (t === "ArrowRight") {
            o(e);
            const u = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusNextChild(), u && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else if (t === "ArrowLeft") {
            o(e);
            const u = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusPreviousChild(), u && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else t === "ArrowDown" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusFirstChild();
          })) : t === "ArrowUp" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusLastChild();
          })) : t === "Home" ? (o(e), this.focusFirstChild()) : t === "End" ? (o(e), this.focusLastChild()) : t === "Escape" && (this.elements.submenuToggles.some(
            (c) => c.isOpen
          ) ? (o(e), this.closeChildren()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (o(e), this.elements.controller.close(), this.focusController()));
      } else
        t === "Space" || t === "Enter" ? (o(e), this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : this.currentMenuItem.dom.link.click()) : t === "Escape" ? (o(e), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusCurrentChild()) : t === "ArrowRight" ? this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : (o(e), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusNextChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && this.elements.rootMenu.currentMenuItem.elements.toggle.preview()) : t === "ArrowLeft" ? this.elements.parentMenu.currentMenuItem.isSubmenuItem && (o(e), this.elements.parentMenu.currentMenuItem.elements.toggle.close(), this.elements.parentMenu.focusCurrentChild(), this.elements.parentMenu === this.elements.rootMenu && (this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusPreviousChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && (this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.elements.rootMenu.currentMenuItem.elements.toggle.preview()))) : t === "ArrowDown" ? (o(e), this.focusNextChild()) : t === "ArrowUp" ? (o(e), this.focusPreviousChild()) : t === "Home" ? (o(e), this.focusFirstChild()) : t === "End" && (o(e), this.focusLastChild());
    });
  }
  /**
   * Focus the menu's next child.
   *
   * If the currently focussed child in the menu is the last child then this will
   * focus the first child in the menu.
   *
   * @public
   */
  focusNextChild() {
    this.currentChild === this.elements.menuItems.length - 1 ? this.focusFirstChild() : this.focusChild(this.currentChild + 1);
  }
  /**
   * Focus the menu's previous child.
   *
   * If the currently focussed child in the menu is the first child then this will
   * focus the last child in the menu.
   *
   * @public
   */
  focusPreviousChild() {
    this.currentChild === 0 ? this.focusLastChild() : this.focusChild(this.currentChild - 1);
  }
  /**
   * Focus the menu's next child starting with a specific letter.
   *
   * @public
   *
   * @param {string} char - The character to look for.
   */
  focusNextChildWithCharacter(e) {
    const t = e.toLowerCase();
    let s = this.currentChild + 1, n = !1;
    for (; !n && s < this.elements.menuItems.length; ) {
      let i = "";
      this.elements.menuItems[s].dom.item.innerText ? i = this.elements.menuItems[s].dom.item.innerText : i = this.elements.menuItems[s].dom.item.textContent, i = i.replace(/[\s]/g, "").toLowerCase().charAt(0), i === t && (n = !0, this.focusChild(s)), s++;
    }
  }
}
class Q extends O {
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {Object<TopLinkDisclosureMenu, TopLinkDisclosureMenuToggle>}
   *
   * @protected
   *
   * @property {TopLinkDisclosureMenu}                   parentMenu - The menu containing this menu item.
   * @property {?TopLinkDisclosureMenu}                  childMenu  - The menu contained within this menu item.
   * @property {?TopLinkDisclosureMenuToggle}            toggle     - The menu toggle within this menu item that controls the `childMenu`.
   * @property {?TopLinkDisclosureMenuItem}              sibling    - The sibling menu item that is a submenu item.
   */
  _elements = {
    parentMenu: null,
    childMenu: null,
    toggle: null,
    sibling: null
  };
  /**
   * Constructs a new `TopLinkDisclosureMenuItem`.
   *
   * @param {object}                       options                         - The options for generating the menu item.
   * @param {HTMLElement}                  options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}                  options.menuLinkElement         - The menu item's link in the DOM.
   * @param {TopLinkDisclosureMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}                      [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?TopLinkDisclosureMenu}       [options.childMenu = null]      - The child menu.
   * @param {?TopLinkDisclosureMenuToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}                      [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   * @param {?TopLinkDisclosureMenuItem}   [options.submenuSibling = null] - The sibling menu item that controls a submenu.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: u = !0,
    submenuSibling: c = null
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), this._elements.parentMenu = s, this._elements.childMenu = i, this._elements.toggle = l, this._elements.sibling = c, u && this.initialize();
  }
}
class B extends L {
  /**
   * Constructs a new `TopLinkDisclosureMenuToggle`.
   *
   * @param {object}                 options                     - The options for generating the menu toggle.
   * @param {HTMLElement}            options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}            options.parentElement       - The element containing the controlled menu.
   * @param {TopLinkDisclosureMenu}  options.controlledMenu      - The menu controlled by this toggle.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}                [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Ensures the toggle element has a `role` of "button" if it is not
   * already a button.
   *
   * Then using the toggle and menu's IDs, the toggle's `aria-controls`
   * is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes(), $("button", { toggle: this.dom.toggle }) || this.dom.toggle.setAttribute("role", "button"), this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    );
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   */
  open() {
    this.closeSiblings(), super.open();
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   */
  preview() {
    this.closeSiblings(), super.preview();
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   */
  close() {
    this.isOpen && this.closeChildren(), super.close();
  }
}
class H extends I {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenu}
   */
  _MenuType = H;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuItem}
   */
  _MenuItemType = Q;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TopLinkDisclosureMenuToggle}
   */
  _MenuToggleType = B;
  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = -1;
  /**
   * The query selectors used by the menu to populate the dom.
   *
   * @protected
   *
   * @type {Object<string>}
   *
   * @property {string} menuItems         - The query selector for menu items.
   * @property {string} menuLinks         - The query selector for menu links.
   * @property {string} submenuItems      - The query selector for menu items containing submenus.
   * @property {string} submenuToggles    - The query selector for menu links that function as submenu toggles.
   * @property {string} submenus          - The query selector for for submenus.
   * @property {string} submenuSubtoggles - The query selector for menu links that function as submenu toggles below the top level.
   */
  _selectors = {
    menuItems: "",
    menuLinks: "",
    submenuItems: "",
    submenuToggles: "",
    submenus: "",
    submenuSubtoggles: ""
  };
  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _optionalSupport = !1;
  /**
   * Constructs a new `TopLinkDisclosureMenu`.
   *
   * @param {object}                 options                                    - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                        - The menu element in the DOM.
   * @param {string}                 [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}                 [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}                 [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}                 [options.submenuToggleSelector = button]   - The query selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {string}                 [options.submenuSubtoggleSelector = a]     - The query selector string for submenu toggle buttons/links below the top level.
   * @param {?HTMLElement}           [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}           [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])}     [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])}     [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])}     [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}                 [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}                [options.isTopLevel = true]                - A flag to mark the root menu.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}                 [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}                 [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {boolean}                [options.optionalKeySupport = false]       - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {?string}                [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {?string}                [options.key = null]                       - The key used to generate IDs throughout the menu.
   * @param {boolean}                [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "li:has(ul)",
    submenuToggleSelector: i = "button",
    submenuSelector: l = "ul",
    submenuSubtoggleSelector: u = "a",
    controllerElement: c = null,
    containerElement: a = null,
    openClass: d = "show",
    closeClass: f = "hide",
    transitionClass: p = "transitioning",
    transitionDuration: m = 250,
    isTopLevel: _ = !0,
    parentMenu: g = null,
    hoverType: M = "off",
    hoverDelay: b = 250,
    enterDelay: C = -1,
    leaveDelay: T = -1,
    optionalKeySupport: E = !1,
    prefix: v = "am-",
    key: S = null,
    initialize: K = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: t,
      menuLinkSelector: s,
      submenuItemSelector: n,
      submenuSelector: l,
      submenuToggleSelector: i,
      controllerElement: c,
      containerElement: a,
      openClass: d,
      closeClass: f,
      transitionClass: p,
      transitionDuration: m,
      isTopLevel: _,
      parentMenu: g,
      hoverType: M,
      hoverDelay: b,
      enterDelay: C,
      leaveDelay: T,
      prefix: v,
      key: S
    }), this._optionalSupport = E, this._selectors.menuItems = t, this._selectors.submenuItems = n, this._selectors.submenuToggles = i, this._selectors.submenus = l, this._selectors.submenuSubtoggles = u, this._selectors.menuLinks = [
      .../* @__PURE__ */ new Set([s, i])
    ].join(","), K && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call the BaseMenu's initialize method
   * as well as set up focus,
   * click,
   * hover,
   * keydown, and
   * keyup events for the menu.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's optionalKeySupport.
   *
   * @type {boolean}
   *
   * @see _optionalSupport
   */
  get optionalKeySupport() {
    return this.isTopLevel ? this._optionalSupport : this.elements.rootMenu.optionalKeySupport;
  }
  set optionalKeySupport(e) {
    h("boolean", { optionalKeySupport: e }), this._optionalSupport = e;
  }
  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let t, s;
      const n = e.querySelector(this.selectors.menuLinks);
      if (this.dom.submenuItems.includes(e)) {
        const i = e.querySelector(this.selectors.submenuToggles), l = e.querySelector(this.selectors.submenus), u = new this._MenuType({
          menuElement: l,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuSubtoggles,
          submenuSelector: this.selectors.submenus,
          submenuSubtoggleSelector: this.selectors.submenuSubtoggles,
          openClass: this.openClass,
          closeClass: this.closeClass,
          transitionClass: this.transitionClass,
          isTopLevel: !1,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay
        }), c = new this._MenuToggleType({
          menuToggleElement: i,
          parentElement: e,
          controlledMenu: u,
          parentMenu: this
        });
        this._elements.submenuToggles.push(c), i !== n ? (s = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: i,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: u,
          toggle: c
        }), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: n,
          parentMenu: this,
          submenuSibling: s
        })) : t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: n,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: u,
          toggle: c
        });
      } else
        t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: n,
          parentMenu: this
        });
      this._elements.menuItems.push(t), typeof s < "u" && this._elements.menuItems.push(s);
    });
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let e = super._validate();
    const t = x({
      submenuSubtoggleSelector: this._selectors.submenuSubtoggles
    });
    t.status || (this._errors.push(t.error.message), e = !1);
    const s = h("boolean", {
      optionalKeySupport: this._optionalSupport
    });
    return s.status || (this._errors.push(s.error.message), e = !1), e;
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method, and
   * - adds a `click` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("click", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close(), this.elements.rootMenu.hasOpened = !1));
    });
  }
  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's hover type.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *    current child value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   preview method for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   close method for the submenu item's toggle
   *   will be called after a delay set by the menu's hover delay.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   focus state is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a non-submenu item, and a submenu
   *   is already open, the closeChildren method for the menu will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `pointerleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `pointerleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        if (!(s.pointerType === "pen" || s.pointerType === "touch")) {
          if (this.hoverType === "on") {
            this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t);
            let n = e.isSubmenuItem ? e.elements.toggle : null;
            if (e.elements.sibling !== null && (n = e.elements.sibling.elements.toggle), n === null) return;
            this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
              n.preview();
            }, this.enterDelay)) : n.preview();
          } else if (this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), !this.isTopLevel || this.hasOpened)) {
            this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild();
            let n = e.isSubmenuItem ? e.elements.toggle : null;
            e.elements.sibling !== null && (n = e.elements.sibling.elements.toggle), n !== null ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
              n.preview();
            }, this.enterDelay)) : n.preview() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
              this.closeChildren();
            }, this.enterDelay)) : this.closeChildren();
          }
        }
      }), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), e.dom.item.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
      }));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ optional keyboard support
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      if (this.focusState === "self") {
        const s = ["Space", "Enter"], n = ["Escape"], i = ["Escape"], l = [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End"
        ];
        (s.includes(t) || this.optionalKeySupport && l.includes(t) || this.elements.controller && n.includes(t) || this.elements.parentMenu && i.includes(t)) && o(e);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * WAI ARIA Practices Example Disclosure for Navigation Menus):
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
   * The optional keybindings are controlled by the menu's optionalKeySupport value.
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      this.focusState === "self" && (t === "Space" || t === "Enter" ? (o(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click()) : t === "Escape" ? this.elements.submenuToggles.some(
        (n) => n.isOpen
      ) ? (o(e), this.closeChildren()) : this.elements.parentMenu ? (o(e), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (t === "ArrowDown" || t === "ArrowRight" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : t === "ArrowUp" || t === "ArrowLeft" ? (o(e), this.focusPreviousChild()) : t === "Home" ? (o(e), this.focusFirstChild()) : t === "End" && (o(e), this.focusLastChild())));
    });
  }
}
class G extends O {
  /**
   * Constructs a new `TreeviewItem`.
   *
   * @param {object}          options                         - The options for generating the menu item.
   * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {Treeview}        options.parentMenu              - The parent menu.
   * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?Treeview}       [options.childMenu = null]      - The child menu.
   * @param {?TreeviewToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}         [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: u = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), u && this.initialize();
  }
  /**
   * Initialize the menu item.
   *
   * Initialize will call the BaseMenuItem's initialize method
   * as well as set the menu item's `role` to "none",
   * the menu link's `role` to "treeitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   */
  initialize() {
    super.initialize(), this.dom.item.setAttribute("role", "none"), this.dom.link.setAttribute("role", "treeitem"), this.dom.link.tabIndex = -1;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's focus method
   * as well as set the menu link's `tabIndex` to 0.
   */
  focus() {
    super.focus(), this.dom.link.tabIndex = 0;
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's blur method
   * as well as set the menu link's `tabIndex` to -1.
   */
  blur() {
    super.blur(), this.dom.link.tabIndex = -1;
  }
}
class J extends L {
  /**
   * Constructs a new `TreeviewToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {Treeview}    options.controlledMenu      - The menu controlled by this toggle.
   * @param {?Treeview}   [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}     [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
  }
  /**
   * Initializes the menu toggle.
   *
   * The first steps are to ensure that the toggle and controlled menu have IDs
   * using the setIds method, and to set the ARIA attributes on the toggle
   * and controlled menu using the setAriaAttributes method.
   *
   * Then the open or collapse method is called based on the state of the
   * toggle's aria-expanded attribute.
   */
  initialize() {
    this._setIds(), this._setAriaAttributes(), this.dom.toggle.getAttribute("aria-expanded") === "true" ? this.open() : this._collapse(!1);
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * set to "false" if it's not already set explicitly to "true".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID, and the toggle's `aria-owns` is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    this.dom.toggle.getAttribute("aria-expanded") !== "true" && this.dom.toggle.setAttribute("aria-expanded", "false"), this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    ), this.dom.toggle.setAttribute(
      "aria-owns",
      this.elements.controlledMenu.dom.menu.id
    );
  }
}
class q extends I {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof Treeview}
   */
  _MenuType = q;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof TreeviewItem}
   */
  _MenuItemType = G;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TreeviewToggle}
   */
  _MenuToggleType = J;
  /**
   * Constructs a new `Treeview`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                - A flag to mark the root menu.
   * @param {?Treeview}          [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                       - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "li:has(ul)",
    submenuToggleSelector: i = "a",
    submenuSelector: l = "ul",
    controllerElement: u = null,
    containerElement: c = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    transitionDuration: p = 250,
    isTopLevel: m = !0,
    parentMenu: _ = null,
    hoverType: g = "off",
    hoverDelay: M = 250,
    enterDelay: b = -1,
    leaveDelay: C = -1,
    prefix: T = "am-",
    key: E = null,
    initialize: v = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: t,
      menuLinkSelector: s,
      submenuItemSelector: n,
      submenuToggleSelector: i,
      submenuSelector: l,
      controllerElement: u,
      containerElement: c,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      transitionDuration: p,
      isTopLevel: m,
      parentMenu: _,
      hoverType: g,
      hoverDelay: M,
      enterDelay: b,
      leaveDelay: C,
      prefix: T,
      key: E
    }), v && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call the BaseMenu's initialize method
   * as well as set up focus,
   * click,
   * hover,
   * keydown, and
   * keyup events for the menu.
   *
   * If the menu is a root menu it's `role` will be set to "tree" and the first
   * menu item's `tabIndex` will be set to 0 in the DOM.
   *
   * If the menu is _not_ a root menu it's `role` will be set to "group".
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this.isTopLevel ? (this.dom.menu.setAttribute("role", "tree"), this.elements.menuItems[0].dom.link.tabIndex = 0) : this.dom.menu.setAttribute("role", "group"), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup(), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.removeAttribute("aria-owns");
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's hover type.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *    current child value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   preview method for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on the menu itself the
   *   closeChildren method will be called after a delay
   *   set by the menu's hover delay.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   focus state is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a non-submenu item, and a submenu
   *   is already open, the closeChildren method for the menu will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 && this._clearTimeout())));
      }), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 && this._clearTimeout() : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), e.dom.item.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
      })), this.isTopLevel && this.dom.menu.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || this.hoverType === "on" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.closeChildren(), this.blur();
        }, this.leaveDelay)) : (this.closeChildren(), this.blur()));
      });
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
   *     "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
   *     "*" (asterisk), and "A" through "Z".
   *   - Moves focus out if the "Tab" key is pressed.
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e);
      if (t === "Tab" && (this.elements.rootMenu.focusState !== "none" ? this.elements.rootMenu.blur() : this.elements.rootMenu.focus()), this.focusState === "self") {
        const s = [
          "Space",
          "Enter",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "Asterisk",
          "Home",
          "End"
        ], n = ["ArrowRight"], i = ["Escape"];
        (s.includes(t) || this.currentMenuItem.isSubmenuItem && n.includes(t) || this.elements.controller && i.includes(t)) && o(e);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * Navigation Treeview Example Using Computed Properties):
   *
   * | Key | Function |
   * | --- | --- |
   * | _Enter_ or _Space_ | Performs the default action (e.g. onclick event) for the focused node. |
   * | _Down arrow_ | <ul><li>Moves focus to the next node that is focusable without opening or closing a node.</li><li>If focus is on the last node, does nothing.</li></ul> |
   * | _Up arrow_ | <ul><li>Moves focus to the previous node that is focusable without opening or closing a node.</li><li>If focus is on the first node, does nothing.</li></ul> |
   * | _Right arrow_ | <ul><li>When focus is on a closed node, opens the node; focus does not move.</li><li>When focus is on a open node, moves focus to the first child node.</li><li>When focus is on an end node, does nothing.</li></ul> |
   * | _Left arrow_ | <ul><li>When focus is on an open node, closes the node.</li><li>When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.</li><li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li></ul> |
   * | _Home_ | Moves focus to first node without opening or closing a node. |
   * | _End_ | Moves focus to the last node that can be focused without expanding any nodes that are closed. |
   * | _a-z_, _A-Z_ | <ul><li>Focus moves to the next node with a name that starts with the typed character.</li><li>Search wraps to first node if a matching name is not found among the nodes that follow the focused node.</li><li>Search ignores nodes that are descendants of closed nodes.</li></ul> |
   * | _* (asterisk)_ | <ul><li>Expands all closed sibling nodes that are at the same level as the focused node.</li><li>Focus does not move.</li></ul> |
   * | _Escape_ | If the root menu is collapsible, collapses the menu and focuses the menu's controlling element. |
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = y(e), { altKey: s, crtlKey: n, metaKey: i } = e;
      if (t === "Character" && !(s || n || i))
        o(e), this.elements.rootMenu.currentEvent = "character", this.focusNextNodeWithCharacter(e.key);
      else if (this.focusState === "self")
        if (t === "Enter" || t === "Space")
          o(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click();
        else if (t === "Escape")
          this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController());
        else if (t === "ArrowDown")
          o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : !this.isTopLevel && this.currentChild === this.elements.menuItems.length - 1 ? this.focusParentsNextChild() : this.focusNextChild();
        else if (t === "ArrowUp") {
          o(e);
          const u = this.elements.menuItems[this.currentChild - 1];
          u && u.isSubmenuItem && u.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentChild = this.currentChild - 1, this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.focusChildsLastNode()) : !this.isTopLevel && this.currentChild === 0 ? (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild()) : this.focusPreviousChild();
        } else t === "ArrowRight" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.currentMenuItem.elements.toggle.preview()) : t === "ArrowLeft" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.blurCurrentChild(), this.currentMenuItem.elements.toggle.close()) : this.isTopLevel || (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild())) : t === "Home" ? (o(e), this.blurCurrentChild(), this.elements.rootMenu.focusFirstChild()) : t === "End" ? (o(e), this.blurCurrentChild(), this.elements.rootMenu.focusLastNode()) : t === "Asterisk" && (o(e), this.openChildren());
    });
  }
  /**
   * Focus the menu's last node of the entire expanded menu.
   *
   * This includes all _open_ child menu items.
   *
   * @public
   */
  focusLastNode() {
    const e = this.elements.menuItems.length - 1, t = this.elements.menuItems[e];
    t.isSubmenuItem && t.elements.toggle.isOpen ? (this.currentChild = e, t.elements.childMenu.currentEvent = this.currentEvent, t.elements.childMenu.focusLastNode()) : this.focusLastChild();
  }
  /**
   * Open all submenu children.
   *
   * @public
   */
  openChildren() {
    this.elements.submenuToggles.forEach((e) => e.preview());
  }
  /**
   * Focus the menu's next node starting with a specific letter.
   *
   * This includes all _open_ child menu items.
   *
   * Wraps to the first node if no match is found after the current node.
   *
   * @public
   *
   * @param {string} char - The character to look for.
   */
  focusNextNodeWithCharacter(e) {
    function t(a) {
      let d = [];
      return a.elements.menuItems.forEach((f) => {
        d.push(f), f.isSubmenuItem && f.elements.toggle.isOpen && (d = [
          ...d,
          ...t(
            f.elements.toggle.elements.controlledMenu
          )
        ]);
      }), d;
    }
    const s = e.toLowerCase(), n = t(this.elements.rootMenu), i = n.indexOf(this.currentMenuItem) + 1, l = [
      ...n.slice(i),
      ...n.slice(0, i)
    ];
    let u = 0, c = !1;
    for (; !c && u < l.length; ) {
      let a = "";
      if (l[u].dom.item.innerText ? a = l[u].dom.item.innerText : a = l[u].dom.item.textContent, a = a.replace(/[\s]/g, "").toLowerCase().charAt(0), a === s) {
        c = !0;
        const d = l[u].elements.parentMenu, f = d.elements.menuItems.indexOf(l[u]);
        this.elements.rootMenu.blurChildren(), d.focusChild(f);
      }
      u++;
    }
  }
  /**
   * Focus the parent menu's next child.
   *
   * This will cascade up through to the root menu.
   *
   * @public
   */
  focusParentsNextChild() {
    this.elements.parentMenu && (this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.currentChild === this.elements.parentMenu.elements.menuItems.length - 1 ? (this.elements.parentMenu.blurCurrentChild(), this.elements.parentMenu.focusParentsNextChild()) : (this.blurChildren(), this.elements.parentMenu.focusNextChild()));
  }
  /**
   * Focus the last child of the current child's submenu.
   *
   * This will cascade down through to the last open menu.
   *
   * @public
   */
  focusChildsLastNode() {
    this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusLastChild(), this.currentMenuItem.elements.childMenu.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.childMenu.currentMenuItem.elements.toggle.isOpen && (this.currentMenuItem.elements.childMenu.blurCurrentChild(), this.currentMenuItem.elements.childMenu.focusChildsLastNode());
  }
}
const X = {
  DisclosureMenu: F,
  Menubar: z,
  TopLinkDisclosureMenu: H,
  Treeview: q
};
export {
  X as default
};
