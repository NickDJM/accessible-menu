var N = Object.defineProperty;
var j = (r, t, e) => t in r ? N(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var u = (r, t, e) => (j(r, typeof t != "symbol" ? t + "" : t, e), e);
function w(r, t) {
  typeof r == "string" ? t.classList.add(r) : t.classList.add(...r);
}
function v(r, t) {
  typeof r == "string" ? t.classList.remove(r) : t.classList.remove(...r);
}
function k(r, t) {
  try {
    if (typeof t != "object") {
      const e = typeof t;
      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in t)
      if (!(t[e] instanceof r)) {
        const s = typeof t[e];
        throw new TypeError(
          `${e} must be an instance of ${r.name}. "${s}" given.`
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
function p(r, t) {
  try {
    if (typeof t != "object") {
      const e = typeof t;
      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in t) {
      const s = typeof t[e];
      if (s !== r)
        throw new TypeError(`${e} must be a ${r}. "${s}" given.`);
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
    if (typeof r != "object") {
      const t = typeof r;
      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in r)
      try {
        if (r[t] === null)
          throw new Error();
        document.querySelector(r[t]);
      } catch {
        throw new TypeError(
          `${t} must be a valid query selector. "${r[t]}" given.`
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
function S(r) {
  try {
    if (typeof r != "object" || Array.isArray(r)) {
      const t = typeof r;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in r) {
      const e = typeof r[t];
      if (e !== "string")
        if (Array.isArray(r[t]))
          r[t].forEach((s) => {
            if (typeof s != "string")
              throw new TypeError(
                `${t} must be a string or an array of strings. An array containing non-strings given.`
              );
          });
        else
          throw new TypeError(
            `${t} must be a string or an array of strings. "${e}" given.`
          );
      else {
        const s = {};
        s[t] = r[t], D(s);
      }
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
function q(r) {
  try {
    if (typeof r != "object") {
      const e = typeof r;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${e}" given.`
      );
    }
    const t = ["none", "self", "child"];
    for (const e in r)
      if (!t.includes(r[e]))
        throw new TypeError(
          `${e} must be one of the following values: ${t.join(
            ", "
          )}. "${r[e]}" given.`
        );
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
function V(r) {
  try {
    if (typeof r != "object") {
      const e = typeof r;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${e}" given.`
      );
    }
    const t = ["none", "mouse", "keyboard", "character"];
    for (const e in r)
      if (!t.includes(r[e]))
        throw new TypeError(
          `${e} must be one of the following values: ${t.join(
            ", "
          )}. "${r[e]}" given.`
        );
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
function z(r) {
  try {
    if (typeof r != "object") {
      const e = typeof r;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${e}" given.`
      );
    }
    const t = ["off", "on", "dynamic"];
    for (const e in r)
      if (!t.includes(r[e]))
        throw new TypeError(
          `${e} must be one of the following values: ${t.join(
            ", "
          )}. "${r[e]}" given.`
        );
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
function R(r, t) {
  if (p("string", { tagName: r }).status && k(HTMLElement, t).status) {
    const e = r.toLowerCase();
    let s = !0;
    for (const n in t)
      t[n].tagName.toLowerCase() !== e && (s = !1);
    return s;
  } else
    return !1;
}
class L {
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
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null
  }) {
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
    u(this, "_dom", {
      toggle: null,
      parent: null
    });
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
    u(this, "_elements", {
      controlledMenu: null,
      parentMenu: null
    });
    /**
     * The open state of the menu toggle.
     *
     * @protected
     *
     * @type {boolean}
     */
    u(this, "_open", !1);
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
    u(this, "_expandEvent", new CustomEvent("accessibleMenuExpand", {
      bubbles: !0,
      detail: { toggle: this }
    }));
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
    u(this, "_collapseEvent", new CustomEvent("accessibleMenuCollapse", {
      bubbles: !0,
      detail: { toggle: this }
    }));
    this._dom.toggle = t, this._dom.parent = e, this._elements.controlledMenu = s, this._elements.parentMenu = n;
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
  set isOpen(t) {
    p("boolean", { value: t }), this._open = t;
  }
  /**
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Generate a random 10 character string,
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
   * - Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`
   *
   * @protected
   */
  _setIds() {
    var t;
    if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
      const e = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
      let s = ((t = this.dom.toggle.innerText) == null ? void 0 : t.replace(/[^a-zA-Z0-9\s]/g, "")) || "", n = e;
      !s.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label") && (s = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), s.replace(/\s/g, "").length > 0 && (s = s.toLowerCase().replace(/\s+/g, "-"), s.startsWith("-") && (s = s.substring(1)), s.endsWith("-") && (s = s.slice(0, -1)), n = `${s}-${n}`), this.dom.toggle.id = this.dom.toggle.id || `menu-button-${n}`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `menu-${n}`;
    }
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-haspopup`
   * set to "true", `aria-expanded` is initially set to "false" and,
   * if the toggle element is not a `<button>`, set the `role` to "button".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID, and the toggle's `aria-controls` is set to the menu's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    this.dom.toggle.setAttribute("aria-haspopup", "true"), this.dom.toggle.setAttribute("aria-expanded", "false"), R("button", { toggle: this.dom.toggle }) || this.dom.toggle.setAttribute("role", "button"), this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    ), this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
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
  _expand(t = !0) {
    const { closeClass: e, openClass: s, transitionClass: n } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"), n !== "" ? (w(n, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      e !== "" && v(e, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        s !== "" && w(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          v(n, this.elements.controlledMenu.dom.menu);
        });
      });
    })) : (s !== "" && w(s, this.elements.controlledMenu.dom.menu), e !== "" && v(e, this.elements.controlledMenu.dom.menu)), t && this.dom.toggle.dispatchEvent(this._expandEvent);
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
  _collapse(t = !0) {
    const { closeClass: e, openClass: s, transitionClass: n } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"), n !== "" ? (w(n, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      s !== "" && v(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        e !== "" && w(e, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          v(n, this.elements.controlledMenu.dom.menu);
        });
      });
    })) : (e !== "" && w(e, this.elements.controlledMenu.dom.menu), s !== "" && v(s, this.elements.controlledMenu.dom.menu)), t && this.dom.toggle.dispatchEvent(this._collapseEvent);
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
    this.elements.controlledMenu.focusState = "self", this._expand(), this.isOpen = !0;
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
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._expand(), this.isOpen = !0;
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
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((t) => {
      t !== this && t.close();
    });
  }
  /**
   * Closes all child menus.
   *
   * @public
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (t) => t.close()
    );
  }
}
class A {
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
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null
  }) {
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
    u(this, "_dom", {
      item: null,
      link: null
    });
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
    u(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null
    });
    /**
     * A flag marking a submenu item.
     *
     * @protected
     *
     * @type {boolean}
     */
    u(this, "_submenu", !1);
    this._dom.item = t, this._dom.link = e, this._elements.parentMenu = s, this._elements.childMenu = i, this._elements.toggle = l, this._submenu = n;
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
    this.elements.parentMenu.shouldFocus && this.dom.link.focus();
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  blur() {
    this.elements.parentMenu.shouldFocus && this.dom.link.blur();
  }
}
function g(r) {
  try {
    const t = r.key || r.keyCode, e = {
      Enter: t === "Enter" || t === 13,
      Space: t === " " || t === "Spacebar" || t === 32,
      Escape: t === "Escape" || t === "Esc" || t === 27,
      ArrowUp: t === "ArrowUp" || t === "Up" || t === 38,
      ArrowRight: t === "ArrowRight" || t === "Right" || t === 39,
      ArrowDown: t === "ArrowDown" || t === "Down" || t === 40,
      ArrowLeft: t === "ArrowLeft" || t === "Left" || t === 37,
      Home: t === "Home" || t === 36,
      End: t === "End" || t === 35,
      Character: isNaN(t) && !!t.match(/^[a-zA-Z]{1}$/),
      Tab: t === "Tab" || t === 9,
      Asterisk: t === "*" || t === 56
    };
    return Object.keys(e).find((s) => e[s] === !0) || "";
  } catch {
    return "";
  }
}
function o(r) {
  r.preventDefault(), r.stopPropagation();
}
class T {
  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}            [options.isTopLevel = false]              - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.enterDelay = -1]                 - The delay for opening menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.leaveDelay = -1]                 - The delay for closing menus if the menu is hoverable (in miliseconds).
   */
  constructor({
    menuElement: t,
    menuItemSelector: e = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: n = "",
    submenuToggleSelector: i = "a",
    submenuSelector: l = "ul",
    controllerElement: h = null,
    containerElement: c = null,
    openClass: m = "show",
    closeClass: a = "hide",
    transitionClass: d = "transitioning",
    isTopLevel: f = !0,
    parentMenu: y = null,
    hoverType: M = "off",
    hoverDelay: C = 250,
    enterDelay: b = -1,
    leaveDelay: _ = -1
  }) {
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof BaseMenu}
     */
    u(this, "_MenuType", T);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof BaseMenuItem}
     */
    u(this, "_MenuItemType", A);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof BaseMenuToggle}
     */
    u(this, "_MenuToggleType", L);
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
    u(this, "_dom", {
      menu: null,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: null,
      container: null
    });
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
    u(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: ""
    });
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
    u(this, "_elements", {
      menuItems: [],
      submenuToggles: [],
      controller: null,
      parentMenu: null,
      rootMenu: null
    });
    /**
     * The class(es) to apply when the menu is open.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    u(this, "_openClass", "show");
    /**
     * The class(es) to apply when the menu is closed.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    u(this, "_closeClass", "hide");
    /**
     * The class(es) to apply when the menu is transitioning between states.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    u(this, "_transitionClass", "transitioning");
    /**
     * A flag marking the root menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    u(this, "_root", !0);
    /**
     * The index of the currently selected menu item in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_currentChild", 0);
    /**
     * The current state of the menu's focus.
     *
     * @protected
     *
     * @type {string}
     */
    u(this, "_focusState", "none");
    /**
     * This last event triggered on the menu.
     *
     * @protected
     *
     * @type {string}
     */
    u(this, "_currentEvent", "none");
    /**
     * The type of hoverability for the menu.
     *
     * @protected
     *
     * @type {string}
     */
    u(this, "_hoverType", "off");
    /**
     * The delay time (in miliseconds) used for pointerenter/pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_hoverDelay", 250);
    /**
     * The delay time (in miliseconds) used for pointerenter events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_enterDelay", -1);
    /**
     * The delay time (in miliseconds) used for pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_leaveDelay", -1);
    /**
     * A variable to hold the hover timeout function.
     *
     * @protected
     *
     * @type {?Function}
     */
    u(this, "_hoverTimeout", null);
    /**
     * An array of error messages generated by the menu.
     *
     * @protected
     *
     * @type {string[]}
     */
    u(this, "_errors", []);
    this._dom.menu = t, this._dom.controller = h, this._dom.container = c, this._selectors.menuItems = e, this._selectors.menuLinks = s, this._selectors.submenuItems = n, this._selectors.submenuToggles = i, this._selectors.submenus = l, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = y, this._elements.rootMenu = f ? this : null, this._openClass = m || "", this._closeClass = a || "", this._transitionClass = d || "", this._root = f, this._hoverType = M, this._hoverDelay = C, this._enterDelay = b, this._leaveDelay = _;
  }
  /**
   * Initializes the menu.
   *
   * The following steps will be taken to initialize the menu:
   * - Validate that the menu can initialize.
   * - Find the root menu of the menu tree if it isn't already set.
   * - Populate all DOM elements within the dom.
   * - If the current menu is the root menu _and_ has a controller, initialize
   *   the controller.
   * - Populate the menu elements within the elements.
   *
   * @public
   *
   * @throws {Error} Will throw an Error if validate returns `false`.
   */
  initialize() {
    if (!this._validate())
      throw new Error(
        `AccesibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(
          `
 - `
        )}`
      );
    if (this.elements.rootMenu === null && this._findRootMenu(this), this._setDOMElements(), this.isTopLevel && this.dom.controller && this.dom.container) {
      const t = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        parentElement: this.dom.container,
        controlledMenu: this
      });
      this._elements.controller = t;
    }
    this._createChildElements();
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
   * between mouse and keyboard naviation.
   *
   * @type {number}
   *
   * @see _currentChild
   */
  get currentChild() {
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
   *
   * @see _focusState
   */
  get focusState() {
    return this._focusState;
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
  /**
   * The delay time (in miliseconds) used for pointerenter/pointerleave events to take place.
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
  /**
   * The delay time (in miliseconds) used for pointerenter events to take place.
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
  /**
   * The delay time (in miliseconds) used for pointerleave events to take place.
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
    let t = !1;
    return (this.currentEvent === "keyboard" || this.currentEvent === "character") && (t = !0), this.currentEvent === "mouse" && this.hoverType === "dynamic" && (t = !0), t;
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
  set openClass(t) {
    S({ openClass: t }), this._openClass !== t && (this._openClass = t);
  }
  set closeClass(t) {
    S({ closeClass: t }), this._closeClass !== t && (this._closeClass = t);
  }
  set transitionClass(t) {
    S({ transitionClass: t }), this._transitionClass !== t && (this._transitionClass = t);
  }
  set currentChild(t) {
    p("number", { value: t });
    function e(s) {
      if (["mouse", "character"].includes(s.currentEvent) && s.elements.parentMenu) {
        let i = 0, l = !1;
        for (; !l && i < s.elements.parentMenu.elements.menuItems.length; ) {
          const h = s.elements.parentMenu.elements.menuItems[i];
          h.isSubmenuItem && h.elements.toggle.elements.controlledMenu === s && (l = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = i), i++;
        }
      }
    }
    t < -1 ? (this._currentChild = -1, e(this)) : t >= this.elements.menuItems.length ? (this._currentChild = this.elements.menuItems.length - 1, e(this)) : this.focusChild !== t && (this._currentChild = t, e(this));
  }
  set focusState(t) {
    q({ value: t }), this._focusState !== t && (this._focusState = t), this.elements.submenuToggles.length > 0 && (t === "self" || t === "none") && this.elements.submenuToggles.forEach((e) => {
      e.elements.controlledMenu.focusState = "none";
    }), this.elements.parentMenu && (t === "self" || t === "child") && (this.elements.parentMenu.focusState = "child");
  }
  set currentEvent(t) {
    V({ value: t }), this._currentEvent !== t && (this._currentEvent = t, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((e) => {
      e.elements.controlledMenu.currentEvent = t;
    }));
  }
  set hoverType(t) {
    z({ value: t }), this._hoverType !== t && (this._hoverType = t);
  }
  set hoverDelay(t) {
    p("number", { value: t }), this._hoverDelay !== t && (this._hoverDelay = t);
  }
  set enterDelay(t) {
    p("number", { value: t }), this._enterDelay !== t && (this._enterDelay = t);
  }
  set leaveDelay(t) {
    p("number", { value: t }), this._leaveDelay !== t && (this._leaveDelay = t);
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let t = !0, e;
    this._dom.container !== null || this._dom.controller !== null ? e = k(HTMLElement, {
      menuElement: this._dom.menu,
      controllerElement: this._dom.controller,
      containerElement: this._dom.container
    }) : e = k(HTMLElement, {
      menuElement: this._dom.menu
    }), e.status || (this._errors.push(e.error.message), t = !1);
    let s;
    if (this._selectors.submenuItems !== "" ? s = D({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks,
      submenuItemSelector: this._selectors.submenuItems,
      submenuToggleSelector: this._selectors.submenuToggles,
      submenuSelector: this._selectors.submenus
    }) : s = D({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks
    }), s.status || (this._errors.push(s.error.message), t = !1), this._openClass !== "") {
      const m = S({ openClass: this._openClass });
      m.status || (this._errors.push(m.error.message), t = !1);
    }
    if (this._closeClass !== "") {
      const m = S({
        closeClass: this._closeClass
      });
      m.status || (this._errors.push(m.error.message), t = !1);
    }
    if (this._transitionClass !== "") {
      const m = S({
        transitionClass: this._transitionClass
      });
      m.status || (this._errors.push(m.error.message), t = !1);
    }
    const n = p("boolean", { isTopLevel: this._root });
    if (n.status || (this._errors.push(n.error.message), t = !1), this._elements.parentMenu !== null) {
      const m = k(T, {
        parentMenu: this._elements.parentMenu
      });
      m.status || (this._errors.push(m.error.message), t = !1);
    }
    const i = z({ hoverType: this._hoverType });
    i.status || (this._errors.push(i.error.message), t = !1);
    const l = p("number", {
      hoverDelay: this._hoverDelay
    });
    l.status || (this._errors.push(l.error.message), t = !1);
    const h = p("number", {
      enterDelay: this._enterDelay
    });
    h.status || (this._errors.push(h.error.message), t = !1);
    const c = p("number", {
      leaveDelay: this._leaveDelay
    });
    return c.status || (this._errors.push(c.error.message), t = !1), t;
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
  _setDOMElementType(t, e = this.dom.menu, s = !0) {
    if (typeof this.selectors[t] == "string") {
      if (!Array.isArray(this.dom[t]))
        throw new Error(
          `AccessibleMenu: The "${t}" element cannot be set through _setDOMElementType.`
        );
      e !== this.dom.menu && k(HTMLElement, { base: e });
      const i = Array.from(
        e.querySelectorAll(this.selectors[t])
      ).filter(
        (l) => l.parentElement === e
      );
      s ? this._dom[t] = i : this._dom[t] = [
        ...this._dom[t],
        ...i
      ];
    } else
      throw new Error(
        `AccessibleMenu: "${t}" is not a valid element type within the menu.`
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
  _resetDOMElementType(t) {
    if (typeof this.dom[t] < "u") {
      if (!Array.isArray(this.dom[t]))
        throw new Error(
          `AccessibleMenu: The "${t}" element cannot be reset through _resetDOMElementType.`
        );
      this._dom[t] = [];
    } else
      throw new Error(
        `AccessibleMenu: "${t}" is not a valid element type within the menu.`
      );
  }
  /**
   * Sets all DOM elements within the menu.
   *
   * Utiliizes _setDOMElementType and
   * _resetDOMElementType.
   *
   * @protected
   */
  _setDOMElements() {
    this._setDOMElementType("menuItems"), this.selectors.submenuItems !== "" && (this._setDOMElementType("submenuItems"), this._resetDOMElementType("submenuToggles"), this._resetDOMElementType("submenus"), this.dom.submenuItems.forEach((t) => {
      this._setDOMElementType("submenuToggles", t, !1), this._setDOMElementType("submenus", t, !1);
    }));
  }
  /**
   * Finds the root menu element.
   *
   * @protected
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  _findRootMenu(t) {
    if (t.isTopLevel)
      this._elements.rootMenu = t;
    else if (t.elements.parentMenu !== null)
      this._findRootMenu(t.elements.parentMenu);
    else
      throw new Error("Cannot find root menu.");
  }
  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((t) => {
      let e;
      if (this.dom.submenuItems.includes(t)) {
        const s = t.querySelector(this.selectors.submenuToggles), n = t.querySelector(this.selectors.submenus), i = new this._MenuType({
          menuElement: n,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuToggles,
          submenuSelector: this.selectors.submenus,
          openClass: this.openClass,
          closeClass: this.closeClass,
          transitionClass: this.transitionClass,
          isTopLevel: !1,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay
        }), l = new this._MenuToggleType({
          menuToggleElement: s,
          parentElement: t,
          controlledMenu: i,
          parentMenu: this
        });
        this._elements.submenuToggles.push(l), e = new this._MenuItemType({
          menuItemElement: t,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: i,
          toggle: l
        });
      } else {
        const s = t.querySelector(this.selectors.menuLinks);
        e = new this._MenuItemType({
          menuItemElement: t,
          menuLinkElement: s,
          parentMenu: this
        });
      }
      this._elements.menuItems.push(e);
    });
  }
  /**
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's focus state
   *   to "self".
   *
   * @protected
   */
  _handleFocus() {
    this.elements.menuItems.forEach((t, e) => {
      t.dom.link.addEventListener("focus", () => {
        this.focusState = "self", this.currentChild = e;
      });
    });
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds a `pointerdown` listener to every menu item that will blur
   *   all menu items in the entire menu structure (starting at the root menu) and
   *   then properly focus the clicked item.
   * - Adds a `pointerup` listener to every submenu item that will properly
   *   toggle the submenu open/closed.
   * - Adds a `pointerup` listener to the menu's controller
   *   (if the menu is the root menu) so when it is clicked it will properly
   *   toggle open/closed.
   *
   * @protected
   */
  _handleClick() {
    function t(e, s, n) {
      o(n), s.toggle(), s.isOpen && (e.focusState = "self", s.elements.controlledMenu.focusState = "none");
    }
    this.elements.menuItems.forEach((e, s) => {
      e.dom.link.addEventListener(
        "pointerdown",
        () => {
          this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(s);
        },
        { passive: !0 }
      ), e.isSubmenuItem && e.elements.toggle.dom.toggle.addEventListener(
        "pointerup",
        (n) => {
          this.currentEvent = "mouse", t(this, e.elements.toggle, n);
        }
      );
    }), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "pointerup",
      (e) => {
        this.currentEvent = "mouse", t(this, this.elements.controller, e);
      }
    );
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
    this.elements.menuItems.forEach((t, e) => {
      t.dom.link.addEventListener("pointerenter", (s) => {
        if (!(s.pointerType === "pen" || s.pointerType === "touch")) {
          if (this.hoverType === "on")
            this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(e), t.isSubmenuItem && (this.enterDelay > 0 ? this._hoverTimeout = setTimeout(() => {
              t.elements.toggle.preview();
            }, this.enterDelay) : t.elements.toggle.preview());
          else if (this.hoverType === "dynamic") {
            const n = this.elements.submenuToggles.some(
              (i) => i.isOpen
            );
            this.currentChild = e, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), t.isSubmenuItem && (!this.isTopLevel || n) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), this.enterDelay > 0 ? this._hoverTimeout = setTimeout(() => {
              t.elements.toggle.preview();
            }, this.enterDelay) : t.elements.toggle.preview());
          }
        }
      }), t.isSubmenuItem && t.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (clearTimeout(this._hoverTimeout), setTimeout(() => {
          this.currentEvent = "mouse", t.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", t.elements.toggle.close()) : this.hoverType === "dynamic" && (this.isTopLevel || (this.leaveDelay > 0 ? (clearTimeout(this._hoverTimeout), setTimeout(() => {
          this.currentEvent = "mouse", t.elements.toggle.close(), this.focusCurrentChild();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", t.elements.toggle.close(), this.focusCurrentChild()))));
      });
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assit the _handleKeyup method.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
   *
   * @protected
   */
  _handleKeydown() {
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "keydown",
      (t) => {
        this.currentEvent = "keyboard";
        const e = g(t);
        (e === "Space" || e === "Enter") && o(t);
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
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("keyup", (t) => {
      this.currentEvent = "keyboard";
      const e = g(t);
      (e === "Space" || e === "Enter") && (o(t), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
    });
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
   * vallue is `true`.
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
  focusChild(t) {
    this.blurCurrentChild(), this.currentChild = t, this.focusCurrentChild();
  }
  /**
   * Focues the menu's first child.
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
    this.elements.submenuToggles.forEach((t) => t.close());
  }
  /**
   * Blurs all children and submenu's children.
   *
   * @public
   */
  blurChildren() {
    this.elements.menuItems.forEach((t) => {
      t.blur(), t.isSubmenuItem && t.elements.childMenu.blurChildren();
    });
  }
}
class P extends A {
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
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), h && this.initialize();
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
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
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
class x extends T {
  /**
   * Constructs a new `DisclosureMenu`.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = button]  - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}            [options.isTopLevel = true]               - A flag to mark the root menu.
   * @param {?DisclosureMenu}    [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
   * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
   * @param {boolean}            [options.optionalKeySupport = false]      - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: s = "li",
    menuLinkSelector: n = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: l = "button",
    submenuSelector: h = "ul",
    controllerElement: c = null,
    containerElement: m = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    isTopLevel: y = !0,
    parentMenu: M = null,
    hoverType: C = "off",
    hoverDelay: b = 250,
    enterDelay: _ = -1,
    leaveDelay: E = -1,
    optionalKeySupport: I = !1,
    initialize: O = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: s,
      menuLinkSelector: n,
      submenuItemSelector: i,
      submenuToggleSelector: l,
      submenuSelector: h,
      controllerElement: c,
      containerElement: m,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      isTopLevel: y,
      parentMenu: M,
      hoverType: C,
      hoverDelay: b,
      enterDelay: _,
      leaveDelay: E
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof DisclosureMenu}
     */
    u(this, "_MenuType", x);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof DisclosureMenuItem}
     */
    u(this, "_MenuItemType", P);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof DisclosureMenuToggle}
     */
    u(this, "_MenuToggleType", U);
    /**
     * The index of the currently selected menu item in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_currentChild", -1);
    /**
     * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    u(this, "_optionalSupport", !1);
    this._optionalSupport = I, O && this.initialize();
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
    p("boolean", { optionalKeySupport: e }), this._optionalSupport = e;
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
    const s = p("boolean", {
      optionalKeySupport: this._optionalSupport
    });
    return s.status || (this._errors.push(s.error.message), e = !1), e;
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("pointerup", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close()));
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
      const s = g(e);
      if (this.focusState === "self") {
        const n = ["Space", "Enter"], i = ["Escape"], l = ["Escape"];
        this.optionalKeySupport ? [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End"
        ].includes(s) && o(e) : (this.currentMenuItem.isSubmenuItem && n.includes(s) || this.elements.controller && i.includes(s) || this.elements.parentMenu && l.includes(s)) && o(e);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * WAI ARIA Pracitices Example Disclosure for Navigation Menus):
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
      const s = g(e);
      this.focusState === "self" && (s === "Space" || s === "Enter" ? this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview()) : this.currentMenuItem.dom.link.click() : s === "Escape" ? this.elements.submenuToggles.some(
        (i) => i.isOpen
      ) ? (o(e), this.closeChildren()) : this.elements.parentMenu ? (o(e), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (s === "ArrowDown" || s === "ArrowRight" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : s === "ArrowUp" || s === "ArrowLeft" ? (o(e), this.focusPreviousChild()) : s === "Home" ? (o(e), this.focusFirstChild()) : s === "End" && (o(e), this.focusLastChild())));
    });
  }
}
class W extends A {
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
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), h && this.initialize();
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
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
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
class K extends T {
  /**
   * Constructs a new `Menubar`.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}            [options.isTopLevel = true]               - A flag to mark the root menu.
   * @param {?Menubar}           [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
   * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
   * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: s = "li",
    menuLinkSelector: n = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: l = "a",
    submenuSelector: h = "ul",
    controllerElement: c = null,
    containerElement: m = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    isTopLevel: y = !0,
    parentMenu: M = null,
    hoverType: C = "off",
    hoverDelay: b = 250,
    enterDelay: _ = -1,
    leaveDelay: E = -1,
    initialize: I = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: s,
      menuLinkSelector: n,
      submenuItemSelector: i,
      submenuToggleSelector: l,
      submenuSelector: h,
      controllerElement: c,
      containerElement: m,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      isTopLevel: y,
      parentMenu: M,
      hoverType: C,
      hoverDelay: b,
      enterDelay: _,
      leaveDelay: E
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof Menubar}
     */
    u(this, "_MenuType", K);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof MenubarItem}
     */
    u(this, "_MenuItemType", W);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof MenubarToggle}
     */
    u(this, "_MenuToggleType", Z);
    I && this.initialize();
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
      super.initialize(), this.isTopLevel ? this.dom.menu.setAttribute("role", "menubar") : this.dom.menu.setAttribute("role", "menu"), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup(), this.isTopLevel && (this.elements.menuItems[0].dom.link.tabIndex = 0);
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("pointerup", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close()));
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
      const s = g(e);
      if (s === "Tab" && (this.elements.rootMenu.focusState !== "none" ? (this.elements.rootMenu.blur(), this.elements.rootMenu.closeChildren()) : this.elements.rootMenu.focus()), s === "Character")
        o(e);
      else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const n = ["ArrowRight", "ArrowLeft", "Home", "End"], i = ["Space", "Enter", "ArrowDown", "ArrowUp"], l = ["Escape"];
          (n.includes(s) || this.currentMenuItem.isSubmenuItem && i.includes(s) || this.elements.controller && l.includes(s)) && o(e);
        }
      } else {
        const n = [
          "Escape",
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End"
        ], i = ["Space", "Enter"];
        (n.includes(s) || this.currentMenuItem.isSubmenuItem && i.includes(s)) && o(e);
      }
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
      const s = g(e), { altKey: n, crtlKey: i, metaKey: l } = e;
      if (s === "Character" && !(n || i || l))
        o(e), this.elements.rootMenu.currentEvent = "character", this.focusNextChildWithCharacter(e.key);
      else if (this.isTopLevel) {
        if (this.focusState === "self")
          if (s === "Space" || s === "Enter")
            this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            })) : this.currentMenuItem.dom.link.click();
          else if (s === "ArrowRight") {
            o(e);
            const c = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusNextChild(), c && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else if (s === "ArrowLeft") {
            o(e);
            const c = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusPreviousChild(), c && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else
            s === "ArrowDown" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            })) : s === "ArrowUp" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusLastChild();
            })) : s === "Home" ? (o(e), this.focusFirstChild()) : s === "End" ? (o(e), this.focusLastChild()) : s === "Escape" && (this.elements.submenuToggles.some(
              (m) => m.isOpen
            ) ? (o(e), this.closeChildren()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (o(e), this.elements.controller.close(), this.focusController()));
      } else
        s === "Space" || s === "Enter" ? this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : this.currentMenuItem.dom.link.click() : s === "Escape" ? (o(e), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusCurrentChild()) : s === "ArrowRight" ? this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : (o(e), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusNextChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && this.elements.rootMenu.currentMenuItem.elements.toggle.preview()) : s === "ArrowLeft" ? this.elements.parentMenu.currentMenuItem.isSubmenuItem && (o(e), this.elements.parentMenu.currentMenuItem.elements.toggle.close(), this.elements.parentMenu.focusCurrentChild(), this.elements.parentMenu === this.elements.rootMenu && (this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusPreviousChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && (this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.elements.rootMenu.currentMenuItem.elements.toggle.preview()))) : s === "ArrowDown" ? (o(e), this.focusNextChild()) : s === "ArrowUp" ? (o(e), this.focusPreviousChild()) : s === "Home" ? (o(e), this.focusFirstChild()) : s === "End" && (o(e), this.focusLastChild());
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
    const s = e.toLowerCase();
    let n = this.currentChild + 1, i = !1;
    for (; !i && n < this.elements.menuItems.length; ) {
      let l = "";
      this.elements.menuItems[n].dom.item.innerText ? l = this.elements.menuItems[n].dom.item.innerText : l = this.elements.menuItems[n].dom.item.textContent, l = l.replace(/[\s]/g, "").toLowerCase().charAt(0), l === s && (i = !0, this.focusChild(n)), n++;
    }
  }
}
class Q extends A {
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
    menuLinkElement: s,
    parentMenu: n,
    isSubmenuItem: i = !1,
    childMenu: l = null,
    toggle: h = null,
    initialize: c = !0,
    submenuSibling: m = null
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: s,
      parentMenu: n,
      isSubmenuItem: i,
      childMenu: l,
      toggle: h
    });
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
    u(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null,
      sibling: null
    });
    this._elements.parentMenu = n, this._elements.childMenu = l, this._elements.toggle = h, this._elements.sibling = m, c && this.initialize();
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
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
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
class F extends T {
  /**
   * Constructs a new `TopLinkDisclosureMenu`.
   *
   * @param {object}                 options                                   - The options for generating the menu.
   * @param {HTMLElement}            options.menuElement                       - The menu element in the DOM.
   * @param {string}                 [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}                 [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}                 [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}                 [options.submenuToggleSelector = button]  - The query selector string for submenu toggle buttons/links.
   * @param {string}                 [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {string}                 [options.submenuSubtoggleSelector = a]    - The query selector string for submenu toggle buttons/links below the top level.
   * @param {?HTMLElement}           [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}           [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])}     [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])}     [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])}     [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}                [options.isTopLevel = true]               - A flag to mark the root menu.
   * @param {?TopLinkDisclosureMenu} [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}                 [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}                 [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}                 [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
   * @param {number}                 [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
   * @param {boolean}                [options.optionalKeySupport = false]      - A flag to add optional keyboard support (Arrow keys, Home, and End) to the menu.
   * @param {boolean}                [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: s = "li",
    menuLinkSelector: n = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: l = "button",
    submenuSelector: h = "ul",
    submenuSubtoggleSelector: c = "a",
    controllerElement: m = null,
    containerElement: a = null,
    openClass: d = "show",
    closeClass: f = "hide",
    transitionClass: y = "transitioning",
    isTopLevel: M = !0,
    parentMenu: C = null,
    hoverType: b = "off",
    hoverDelay: _ = 250,
    enterDelay: E = -1,
    leaveDelay: I = -1,
    optionalKeySupport: O = !1,
    initialize: H = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: s,
      menuLinkSelector: n,
      submenuItemSelector: i,
      submenuSelector: h,
      submenuToggleSelector: l,
      controllerElement: m,
      containerElement: a,
      openClass: d,
      closeClass: f,
      transitionClass: y,
      isTopLevel: M,
      parentMenu: C,
      hoverType: b,
      hoverDelay: _,
      enterDelay: E,
      leaveDelay: I
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof TopLinkDisclosureMenu}
     */
    u(this, "_MenuType", F);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof TopLinkDisclosureMenuItem}
     */
    u(this, "_MenuItemType", Q);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof TopLinkDisclosureMenuToggle}
     */
    u(this, "_MenuToggleType", B);
    /**
     * The index of the currently selected menu item in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    u(this, "_currentChild", -1);
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
    u(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: "",
      submenuSubtoggles: ""
    });
    /**
     * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    u(this, "_optionalSupport", !1);
    this._optionalSupport = O, this._selectors.menuItems = s, this._selectors.submenuItems = i, this._selectors.submenuToggles = l, this._selectors.submenus = h, this._selectors.submenuSubtoggles = c, this._selectors.menuLinks = [
      .../* @__PURE__ */ new Set([n, l])
    ].join(","), H && this.initialize();
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
    p("boolean", { optionalKeySupport: e }), this._optionalSupport = e;
  }
  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let s, n;
      const i = e.querySelector(this.selectors.menuLinks);
      if (this.dom.submenuItems.includes(e)) {
        const l = e.querySelector(this.selectors.submenuToggles), h = e.querySelector(this.selectors.submenus), c = new this._MenuType({
          menuElement: h,
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
        }), m = new this._MenuToggleType({
          menuToggleElement: l,
          parentElement: e,
          controlledMenu: c,
          parentMenu: this
        });
        this._elements.submenuToggles.push(m), l !== i ? (n = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: l,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: c,
          toggle: m
        }), s = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: i,
          parentMenu: this,
          submenuSibling: n
        })) : s = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: i,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: c,
          toggle: m
        });
      } else
        s = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: i,
          parentMenu: this
        });
      this._elements.menuItems.push(s), typeof n < "u" && this._elements.menuItems.push(n);
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
    const s = D({
      submenuSubtoggleSelector: this._selectors.submenuSubtoggles
    });
    s.status || (this._errors.push(s.error.message), e = !1);
    const n = p("boolean", {
      optionalKeySupport: this._optionalSupport
    });
    return n.status || (this._errors.push(n.error.message), e = !1), e;
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method, and
   * - adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("pointerup", (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close()));
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
    this.elements.menuItems.forEach((e, s) => {
      e.dom.link.addEventListener("pointerenter", (n) => {
        if (!(n.pointerType === "pen" || n.pointerType === "touch")) {
          if (this.hoverType === "on") {
            this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(s);
            let i = e.isSubmenuItem ? e.elements.toggle : null;
            if (e.elements.sibling !== null && (i = e.elements.sibling.elements.toggle), i === null)
              return;
            this.enterDelay > 0 ? (clearTimeout(this._hoverTimeout), this._hoverTimeout = setTimeout(() => {
              i.preview();
            }, this.enterDelay)) : i.preview();
          } else if (this.hoverType === "dynamic") {
            const i = this.elements.submenuToggles.some(
              (l) => l.isOpen
            );
            if (this.currentChild = s, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), !this.isTopLevel || i) {
              this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild();
              let l = e.isSubmenuItem ? e.elements.toggle : null;
              if (e.elements.sibling !== null && (l = e.elements.sibling.elements.toggle), l === null)
                return;
              this.enterDelay > 0 ? (clearTimeout(this._hoverTimeout), this._hoverTimeout = setTimeout(() => {
                l.preview();
              }, this.enterDelay)) : l.preview();
            }
          }
        }
      }), e.isSubmenuItem && e.dom.item.addEventListener("pointerleave", (n) => {
        n.pointerType === "pen" || n.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (clearTimeout(this._hoverTimeout), setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.isTopLevel || (this.leaveDelay > 0 ? (clearTimeout(this._hoverTimeout), setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close(), this.focusCurrentChild();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close(), this.focusCurrentChild()))));
      });
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
      const s = g(e);
      if (this.focusState === "self") {
        const n = ["Space", "Enter"], i = ["Escape"], l = ["Escape"];
        this.optionalKeySupport ? [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End"
        ].includes(s) && o(e) : (this.currentMenuItem.isSubmenuItem && n.includes(s) || this.elements.controller && i.includes(s) || this.elements.parentMenu && l.includes(s)) && o(e);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * WAI ARIA Pracitices Example Disclosure for Navigation Menus):
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
      const s = g(e);
      this.focusState === "self" && (s === "Space" || s === "Enter" ? this.currentMenuItem.isSubmenuItem ? (o(e), this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview()) : this.currentMenuItem.dom.link.click() : s === "Escape" ? this.elements.submenuToggles.some(
        (i) => i.isOpen
      ) ? (o(e), this.closeChildren()) : this.elements.parentMenu ? (o(e), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (s === "ArrowDown" || s === "ArrowRight" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : s === "ArrowUp" || s === "ArrowLeft" ? (o(e), this.focusPreviousChild()) : s === "Home" ? (o(e), this.focusFirstChild()) : s === "End" && (o(e), this.focusLastChild())));
    });
  }
}
class G extends A {
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
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l
    }), h && this.initialize();
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
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n
    }), i && this.initialize();
  }
}
class $ extends T {
  /**
   * Constructs a new `Treeview`.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]        - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]         - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]               - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning] - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {boolean}            [options.isTopLevel = true]               - A flag to mark the root menu.
   * @param {?Treeview}          [options.parentMenu = null]               - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                 - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                - The delay for opening and closing menus if the menu is hoverable (in miliseconds).
   * @param {number}             [options.enterDelay = -1]                 - The delay for opening a menu if the menu is focusable (in miliseconds).
   * @param {number}             [options.leaveDelay = -1]                 - The delay for closing a menu if the menu is focusable (in miliseconds).
   * @param {boolean}            [options.initialize = true]               - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemSelector: s = "li",
    menuLinkSelector: n = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: l = "a",
    submenuSelector: h = "ul",
    controllerElement: c = null,
    containerElement: m = null,
    openClass: a = "show",
    closeClass: d = "hide",
    transitionClass: f = "transitioning",
    isTopLevel: y = !0,
    parentMenu: M = null,
    hoverType: C = "off",
    hoverDelay: b = 250,
    enterDelay: _ = -1,
    leaveDelay: E = -1,
    initialize: I = !0
  }) {
    super({
      menuElement: e,
      menuItemSelector: s,
      menuLinkSelector: n,
      submenuItemSelector: i,
      submenuToggleSelector: l,
      submenuSelector: h,
      controllerElement: c,
      containerElement: m,
      openClass: a,
      closeClass: d,
      transitionClass: f,
      isTopLevel: y,
      parentMenu: M,
      hoverType: C,
      hoverDelay: b,
      enterDelay: _,
      leaveDelay: E
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof Treeview}
     */
    u(this, "_MenuType", $);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof TreeviewItem}
     */
    u(this, "_MenuItemType", G);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof TreeviewToggle}
     */
    u(this, "_MenuToggleType", J);
    I && this.initialize();
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
      super.initialize(), this.isTopLevel ? (this.dom.menu.setAttribute("role", "tree"), this.elements.menuItems[0].dom.link.tabIndex = 0) : this.dom.menu.setAttribute("role", "group"), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
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
      const s = g(e);
      if (s === "Tab" && (this.elements.rootMenu.focusState !== "none" ? this.elements.rootMenu.blur() : this.elements.rootMenu.focus()), this.focusState === "self") {
        const n = [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "Asterisk",
          "Home",
          "End"
        ], i = ["Enter", "ArrowRight"], l = ["Escape"];
        (n.includes(s) || this.currentMenuItem.isSubmenuItem && i.includes(s) || this.elements.controller && l.includes(s)) && o(e);
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
      const s = g(e), { altKey: n, crtlKey: i, metaKey: l } = e;
      if (s === "Character" && !(n || i || l))
        o(e), this.elements.rootMenu.currentEvent = "character", this.focusNextNodeWithCharacter(e.key);
      else if (this.focusState === "self")
        if (s === "Enter" || s === "Space")
          o(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click();
        else if (s === "Escape")
          this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController());
        else if (s === "ArrowDown")
          o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : !this.isTopLevel && this.currentChild === this.elements.menuItems.length - 1 ? this.focusParentsNextChild() : this.focusNextChild();
        else if (s === "ArrowUp") {
          o(e);
          const c = this.elements.menuItems[this.currentChild - 1];
          c && c.isSubmenuItem && c.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentChild = this.currentChild - 1, this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.focusChildsLastNode()) : !this.isTopLevel && this.currentChild === 0 ? (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild()) : this.focusPreviousChild();
        } else
          s === "ArrowRight" ? this.currentMenuItem.isSubmenuItem && (o(e), this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.currentMenuItem.elements.toggle.preview()) : s === "ArrowLeft" ? (o(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.blurCurrentChild(), this.currentMenuItem.elements.toggle.close()) : this.isTopLevel || (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild())) : s === "Home" ? (o(e), this.blurCurrentChild(), this.elements.rootMenu.focusFirstChild()) : s === "End" ? (o(e), this.blurCurrentChild(), this.elements.rootMenu.focusLastNode()) : s === "Asterisk" && (o(e), this.openChildren());
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
    const e = this.elements.menuItems.length - 1, s = this.elements.menuItems[e];
    s.isSubmenuItem && s.elements.toggle.isOpen ? (this.currentChild = e, s.elements.childMenu.currentEvent = this.currentEvent, s.elements.childMenu.focusLastNode()) : this.focusLastChild();
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
    function s(a) {
      let d = [];
      return a.elements.menuItems.forEach((f) => {
        d.push(f), f.isSubmenuItem && f.elements.toggle.isOpen && (d = [
          ...d,
          ...s(
            f.elements.toggle.elements.controlledMenu
          )
        ]);
      }), d;
    }
    const n = e.toLowerCase(), i = s(this.elements.rootMenu), l = i.indexOf(this.currentMenuItem) + 1, h = [
      ...i.slice(l),
      ...i.slice(0, l)
    ];
    let c = 0, m = !1;
    for (; !m && c < h.length; ) {
      let a = "";
      if (h[c].dom.item.innerText ? a = h[c].dom.item.innerText : a = h[c].dom.item.textContent, a = a.replace(/[\s]/g, "").toLowerCase().charAt(0), a === n) {
        m = !0;
        const d = h[c].elements.parentMenu, f = d.elements.menuItems.indexOf(h[c]);
        this.elements.rootMenu.blurChildren(), d.focusChild(f);
      }
      c++;
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
const Y = {
  DisclosureMenu: x,
  Menubar: K,
  TopLinkDisclosureMenu: F,
  Treeview: $
};
export {
  Y as default
};
