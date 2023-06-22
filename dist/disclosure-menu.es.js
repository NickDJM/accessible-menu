var F = Object.defineProperty;
var K = (n, e, t) => e in n ? F(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var r = (n, e, t) => (K(n, typeof e != "symbol" ? e + "" : e, t), t);
function f(n, e) {
  typeof n == "string" ? e.classList.add(n) : e.classList.add(...n);
}
function d(n, e) {
  typeof n == "string" ? e.classList.remove(n) : e.classList.remove(...n);
}
function g(n, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e)
      if (!(e[t] instanceof n)) {
        const s = typeof e[t];
        throw new TypeError(
          `${t} must be an instance of ${n.name}. "${s}" given.`
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
function a(n, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e) {
      const s = typeof e[t];
      if (s !== n)
        throw new TypeError(`${t} must be a ${n}. "${s}" given.`);
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
function k(n) {
  try {
    if (typeof n != "object") {
      const e = typeof n;
      throw new TypeError(
        `Values given to isCSSSelector() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in n)
      try {
        if (n[e] === null)
          throw new Error();
        document.querySelector(n[e]);
      } catch {
        throw new TypeError(
          `${e} must be a valid CSS selector. "${n[e]}" given.`
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
function p(n) {
  try {
    if (typeof n != "object" || Array.isArray(n)) {
      const e = typeof n;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in n) {
      const t = typeof n[e];
      if (t !== "string")
        if (Array.isArray(n[e]))
          n[e].forEach((s) => {
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
        s[e] = n[e], k(s);
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
function V(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "self", "child"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
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
function x(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "mouse", "keyboard", "character"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
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
function D(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["off", "on", "dynamic"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
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
function z(n, e) {
  if (a("string", { tagName: n }).status && g(HTMLElement, e).status) {
    const t = n.toLowerCase();
    let s = !0;
    for (const i in e)
      e[i].tagName.toLowerCase() !== t && (s = !1);
    return s;
  } else
    return !1;
}
class I {
  /**
   * Constructs the menu toggle.
   *
   * @param {object}        options                     - The options for generating the menu toggle.
   * @param {HTMLElement}   options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement}   options.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}      options.controlledMenu      - The menu controlled by this toggle.
   * @param {BaseMenu|null} [options.parentMenu = null] - The menu containing this toggle.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null
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
    r(this, "_dom", {
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
    r(this, "_elements", {
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
    r(this, "_open", !1);
    /**
     * Expand event.
     *
     * @protected
     *
     * @event accessibleMenuExpand
     *
     * @type {CustomEvent}
     *
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    r(this, "_expandEvent", new CustomEvent("accessibleMenuExpand", {
      bubbles: !0,
      detail: { toggle: this }
    }));
    /**
     * Collapse event.
     *
     * @protected
     *
     * @event accessibleMenuCollapse
     *
     * @type {CustomEvent}
     *
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    r(this, "_collapseEvent", new CustomEvent("accessibleMenuCollapse", {
      bubbles: !0,
      detail: { toggle: this }
    }));
    this._dom.toggle = e, this._dom.parent = t, this._elements.controlledMenu = s, this._elements.parentMenu = i;
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
  initialize() {
    var e;
    if (this.dom.toggle.setAttribute("aria-haspopup", "true"), this.dom.toggle.setAttribute("aria-expanded", "false"), z("button", { toggle: this.dom.toggle }) || this.dom.toggle.setAttribute("role", "button"), this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
      const t = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
      let s = ((e = this.dom.toggle.innerText) == null ? void 0 : e.replace(/[^a-zA-Z0-9\s]/g, "")) || "", i = t;
      !s.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label") && (s = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), s.replace(/\s/g, "").length > 0 && (s = s.toLowerCase().replace(/\s+/g, "-"), s.startsWith("-") && (s = s.substring(1)), s.endsWith("-") && (s = s.slice(0, -1)), i = `${s}-${i}`), this.dom.toggle.id = this.dom.toggle.id || `${i}-menu-button`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `${i}-menu`;
    }
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    ), this.dom.toggle.setAttribute(
      "aria-controls",
      this.elements.controlledMenu.dom.menu.id
    ), this._collapse(!1);
  }
  /**
   * Get the DOM elements within the toggle.
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
   * Get the declared accessible-menu elements within the menu toggle.
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
   * Get the open state on the menu.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open;
  }
  set isOpen(e) {
    a("boolean", { value: e }), this._open = e;
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
   * @protected
   *
   * @fires accessibleMenuExpand
   *
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  _expand(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: i } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"), i !== "" ? (f(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      t !== "" && d(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        s !== "" && f(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          d(i, this.elements.controlledMenu.dom.menu);
        });
      });
    })) : (s !== "" && f(s, this.elements.controlledMenu.dom.menu), t !== "" && d(t, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._expandEvent);
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
   * @protected
   *
   * @fires accessibleMenuCollapse
   *
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  _collapse(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: i } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"), i !== "" ? (f(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      s !== "" && d(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        t !== "" && f(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          d(i, this.elements.controlledMenu.dom.menu);
        });
      });
    })) : (t !== "" && f(t, this.elements.controlledMenu.dom.menu), s !== "" && d(s, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._collapseEvent);
  }
  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
   * and the parent menu's focus state to "child", calls {@link BaseMenuToggle#expand|expand},
   * and sets the {@link BaseMenuToggle#isOpen|isOpen} value to `true`.
   */
  open() {
    this.elements.controlledMenu.focusState = "self", this._expand(), this.isOpen = !0;
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's {@link BaseMenu#focusState|focus state} to "self"
   * and the parent menu's focus state to "child",
   * and calls {@link BaseMenuToggle#expand|expand}.
   */
  preview() {
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._expand(), this.isOpen = !0;
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
  close() {
    this.isOpen && (this.elements.controlledMenu.blur(), this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._collapse(), this.isOpen = !1);
  }
  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  /**
   * Closes all sibling menus.
   */
  closeSiblings() {
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((e) => {
      e !== this && e.close();
    });
  }
  /**
   * Closes all child menus.
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (e) => e.close()
    );
  }
}
class L {
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
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: i = !1,
    childMenu: o = null,
    toggle: l = null
  }) {
    /**
     * The DOM elements within the menu item.
     *
     * @type {Object<HTMLElement>}
     *
     * @protected
     *
     * @property {HTMLElement} item - The menu item.
     * @property {HTMLElement} link - The menu item's link.
     */
    r(this, "_dom", {
      item: null,
      link: null
    });
    /**
     * The declared accessible-menu elements within the menu item.
     *
     * @type {Object<BaseMenu, BaseMenuToggle>}
     *
     * @protected
     *
     * @property {BaseMenu}        parentMenu - The menu containing this menu item.
     * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
     * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
     */
    r(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null
    });
    /**
     * A flag marking a submenu item.
     *
     * @type {boolean}
     */
    r(this, "_submenu", !1);
    this._dom.item = e, this._dom.link = t, this._elements.parentMenu = s, this._elements.childMenu = o, this._elements.toggle = l, this._submenu = i;
  }
  /**
   * Initialize the menu item.
   */
  initialize() {
  }
  /**
   * The DOM elements within the menu item.
   *
   * @type {Object<HTMLElement>}
   *
   * @readonly
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @readonly
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * A flag marking a submenu item.
   *
   * @type {boolean}
   *
   * @readonly
   *
   * @see _submenu
   */
  get isSubmenuItem() {
    return this._submenu;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
   */
  focus() {
    this.elements.parentMenu.shouldFocus && this.dom.link.focus();
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * {@link BaseMenu#shouldFocus|shouldFocus} value is `true`.
   */
  blur() {
    this.elements.parentMenu.shouldFocus && this.dom.link.blur();
  }
}
function _(n) {
  try {
    const e = n.key || n.keyCode, t = {
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
function h(n) {
  n.preventDefault(), n.stopPropagation();
}
class b {
  /**
   * Constructs the menu.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The CSS selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The CSS selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The CSS selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The CSS selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The CSS selector string for submenus.
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
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: o = "a",
    submenuSelector: l = "ul",
    controllerElement: c = null,
    containerElement: m = null,
    openClass: u = "show",
    closeClass: C = "hide",
    transitionClass: E = "transitioning",
    isTopLevel: y = !0,
    parentMenu: M = null,
    hoverType: T = "off",
    hoverDelay: v = 250,
    enterDelay: w = -1,
    leaveDelay: S = -1
  }) {
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof BaseMenu}
     */
    r(this, "_MenuType", b);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof BaseMenuItem}
     */
    r(this, "_MenuItemType", L);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof BaseMenuToggle}
     */
    r(this, "_MenuToggleType", I);
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
    r(this, "_dom", {
      menu: null,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: null,
      container: null
    });
    /**
     * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
     *
     * @protected
     *
     * @type {Object<string>}
     *
     * @property {string} menuItems      - The CSS selector for menu items.
     * @property {string} menuLinks      - The CSS selector for menu links.
     * @property {string} submenuItems   - The CSS selector for menu items containing submenus.
     * @property {string} submenuToggles - The CSS selector for menu links that function as submenu toggles.
     * @property {string} submenus       - The CSS selector for for submenus.
     */
    r(this, "_selectors", {
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
    r(this, "_elements", {
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
    r(this, "_openClass", "show");
    /**
     * The class(es) to apply when the menu is closed.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    r(this, "_closeClass", "hide");
    /**
     * The class(es) to apply when the menu is transitioning between states.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    r(this, "_transitionClass", "transitioning");
    /**
     * A flag marking the root menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    r(this, "_root", !0);
    /**
     * The index of the currently selected {@link BaseMenuItem|menu item} in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    r(this, "_currentChild", 0);
    /**
     * The current state of the menu's focus.
     *
     * @protected
     *
     * @type {string}
     */
    r(this, "_focusState", "none");
    /**
     * This last event triggered on the menu.
     *
     * @protected
     *
     * @type {string}
     */
    r(this, "_currentEvent", "none");
    /**
     * The type of hoverability for the menu.
     *
     * @protected
     *
     * @type {string}
     */
    r(this, "_hoverType", "off");
    /**
     * The delay time (in miliseconds) used for pointerenter/pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    r(this, "_hoverDelay", 250);
    /**
     * The delay time (in miliseconds) used for pointerenter events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    r(this, "_enterDelay", -1);
    /**
     * The delay time (in miliseconds) used for pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    r(this, "_leaveDelay", -1);
    /**
     * An variable to hold the hover timeout function.
     *
     * @protected
     *
     * @type {?Function}
     */
    r(this, "_hoverTimeout", null);
    /**
     * An array of error messages generated by the menu.
     *
     * @protected
     *
     * @type {string[]}
     */
    r(this, "_errors", []);
    this._dom.menu = e, this._dom.controller = c, this._dom.container = m, this._selectors.menuItems = t, this._selectors.menuLinks = s, this._selectors.submenuItems = i, this._selectors.submenuToggles = o, this._selectors.submenus = l, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = M, this._elements.rootMenu = y ? this : null, this._openClass = u || "", this._closeClass = C || "", this._transitionClass = E || "", this._root = y, this._hoverType = T, this._hoverDelay = v, this._enterDelay = w, this._leaveDelay = S;
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
      const e = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        parentElement: this.dom.container,
        controlledMenu: this
      });
      this._elements.controller = e;
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
   * The CSS selectors used by the menu to populate the {@link BaseMenu#dom|dom}.
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
   * - The menu's {@link BaseMenu#currentEvent|current event} is "keyboard".
   * - The menu's current event is "character".
   * - The menu's current event is "mouse" _and_ the menu's
   *   {@link BaseMenu#_hoverType|hover type} is "dynamic".
   *
   * @type {boolean}
   */
  get shouldFocus() {
    let e = !1;
    return (this.currentEvent === "keyboard" || this.currentEvent === "character") && (e = !0), this.currentEvent === "mouse" && this.hoverType === "dynamic" && (e = !0), e;
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
  set openClass(e) {
    p({ openClass: e }), this._openClass !== e && (this._openClass = e);
  }
  set closeClass(e) {
    p({ closeClass: e }), this._closeClass !== e && (this._closeClass = e);
  }
  set transitionClass(e) {
    p({ transitionClass: e }), this._transitionClass !== e && (this._transitionClass = e);
  }
  set currentChild(e) {
    a("number", { value: e });
    function t(s) {
      if (["mouse", "character"].includes(s.currentEvent) && s.elements.parentMenu) {
        let o = 0, l = !1;
        for (; !l && o < s.elements.parentMenu.elements.menuItems.length; ) {
          const c = s.elements.parentMenu.elements.menuItems[o];
          c.isSubmenuItem && c.elements.toggle.elements.controlledMenu === s && (l = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = o), o++;
        }
      }
    }
    e < -1 ? (this._currentChild = -1, t(this)) : e >= this.elements.menuItems.length ? (this._currentChild = this.elements.menuItems.length - 1, t(this)) : this.focusChild !== e && (this._currentChild = e, t(this));
  }
  set focusState(e) {
    V({ value: e }), this._focusState !== e && (this._focusState = e), this.elements.submenuToggles.length > 0 && (e === "self" || e === "none") && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.focusState = "none";
    }), this.elements.parentMenu && (e === "self" || e === "child") && (this.elements.parentMenu.focusState = "child");
  }
  set currentEvent(e) {
    x({ value: e }), this._currentEvent !== e && (this._currentEvent = e, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.currentEvent = e;
    }));
  }
  set hoverType(e) {
    D({ value: e }), this._hoverType !== e && (this._hoverType = e);
  }
  set hoverDelay(e) {
    a("number", { value: e }), this._hoverDelay !== e && (this._hoverDelay = e);
  }
  set enterDelay(e) {
    a("number", { value: e }), this._enterDelay !== e && (this._enterDelay = e);
  }
  set leaveDelay(e) {
    a("number", { value: e }), this._leaveDelay !== e && (this._leaveDelay = e);
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
    this._dom.container !== null || this._dom.controller !== null ? t = g(HTMLElement, {
      menuElement: this._dom.menu,
      controllerElement: this._dom.controller,
      containerElement: this._dom.container
    }) : t = g(HTMLElement, {
      menuElement: this._dom.menu
    }), t.status || (this._errors.push(t.error.message), e = !1);
    let s;
    if (this._selectors.submenuItems !== "" ? s = k({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks,
      submenuItemSelector: this._selectors.submenuItems,
      submenuToggleSelector: this._selectors.submenuToggles,
      submenuSelector: this._selectors.submenus
    }) : s = k({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks
    }), s.status || (this._errors.push(s.error.message), e = !1), this._openClass !== "") {
      const u = p({ openClass: this._openClass });
      u.status || (this._errors.push(u.error.message), e = !1);
    }
    if (this._closeClass !== "") {
      const u = p({
        closeClass: this._closeClass
      });
      u.status || (this._errors.push(u.error.message), e = !1);
    }
    if (this._transitionClass !== "") {
      const u = p({
        transitionClass: this._transitionClass
      });
      u.status || (this._errors.push(u.error.message), e = !1);
    }
    const i = a("boolean", { isTopLevel: this._root });
    if (i.status || (this._errors.push(i.error.message), e = !1), this._elements.parentMenu !== null) {
      const u = g(b, {
        parentMenu: this._elements.parentMenu
      });
      u.status || (this._errors.push(u.error.message), e = !1);
    }
    const o = D({ hoverType: this._hoverType });
    o.status || (this._errors.push(o.error.message), e = !1);
    const l = a("number", {
      hoverDelay: this._hoverDelay
    });
    l.status || (this._errors.push(l.error.message), e = !1);
    const c = a("number", {
      enterDelay: this._enterDelay
    });
    c.status || (this._errors.push(c.error.message), e = !1);
    const m = a("number", {
      leaveDelay: this._leaveDelay
    });
    return m.status || (this._errors.push(m.error.message), e = !1), e;
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
      t !== this.dom.menu && g(HTMLElement, { base: t });
      const o = Array.from(
        t.querySelectorAll(this.selectors[e])
      ).filter(
        (l) => l.parentElement === t
      );
      s ? this._dom[e] = o : this._dom[e] = [
        ...this._dom[e],
        ...o
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
   * Utiliizes {@link BaseMenu#_setDOMElementType|_setDOMElementType} and
   * {@link BaseMenu#_resetDOMElementType|_resetDOMElementType}.
   *
   * @protected
   */
  _setDOMElements() {
    this._setDOMElementType("menuItems"), this.selectors.submenuItems !== "" && (this._setDOMElementType("submenuItems"), this._resetDOMElementType("submenuToggles"), this._resetDOMElementType("submenus"), this.dom.submenuItems.forEach((e) => {
      this._setDOMElementType("submenuToggles", e, !1), this._setDOMElementType("submenus", e, !1);
    }));
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
        const s = e.querySelector(this.selectors.submenuToggles), i = e.querySelector(this.selectors.submenus), o = new this._MenuType({
          menuElement: i,
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
          parentElement: e,
          controlledMenu: o,
          parentMenu: this
        });
        this._elements.submenuToggles.push(l), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: o,
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
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's {@link BaseMenu#focusState|focus state}
   *   to "self".
   *
   * @protected
   */
  _handleFocus() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("focus", () => {
        this.focusState = "self", this.currentChild = t;
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
    function e(t, s, i) {
      h(i), s.toggle(), s.isOpen && (t.focusState = "self", s.elements.controlledMenu.focusState = "none");
    }
    this.elements.menuItems.forEach((t, s) => {
      t.dom.link.addEventListener(
        "pointerdown",
        () => {
          this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(s);
        },
        { passive: !0 }
      ), t.isSubmenuItem && t.elements.toggle.dom.toggle.addEventListener(
        "pointerup",
        (i) => {
          this.currentEvent = "mouse", e(this, t.elements.toggle, i);
        }
      );
    }), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "pointerup",
      (t) => {
        this.currentEvent = "mouse", e(this, this.elements.controller, t);
      }
    );
  }
  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's {@link BaseMenu#_hoverType|hover type}.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   {@link BaseMenu#currentChild| current child} value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   {@link BaseMenuToggle#preview|preview method} for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   {@link BaseMenuToggle#close|close method} for the submenu item's toggle
   *   will be called after a delay set by the menu's {@link BaseMenu#_hoverDelay|hover delay}.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   {@link BaseMenu#focusState|focus state} is not "none", the menu item
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
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        if (!(s.pointerType === "pen" || s.pointerType === "touch")) {
          if (this.hoverType === "on")
            this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? this._hoverTimeout = setTimeout(() => {
              e.elements.toggle.preview();
            }, this.enterDelay) : e.elements.toggle.preview());
          else if (this.hoverType === "dynamic") {
            const i = this.elements.submenuToggles.some(
              (o) => o.isOpen
            );
            this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), e.isSubmenuItem && (!this.isTopLevel || i) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), this.enterDelay > 0 ? this._hoverTimeout = setTimeout(() => {
              e.elements.toggle.preview();
            }, this.enterDelay) : e.elements.toggle.preview());
          }
        }
      }), e.isSubmenuItem && e.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (clearTimeout(this._hoverTimeout), setTimeout(() => {
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
   * This method exists to assit the {@link BaseMenu#_handleKeyup|_handleKeyup method}.
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
        const t = _(e);
        (t === "Space" || t === "Enter") && h(e);
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
      const t = _(e);
      (t === "Space" || t === "Enter") && (h(e), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
    });
  }
  /**
   * Focus the menu.
   *
   * Sets the menu's {@link BaseMenu#focusState|focus state} to "self" and
   * focusses the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
   * value is `true`.
   */
  focus() {
    this.focusState = "self", this.shouldFocus && this.dom.menu.focus();
  }
  /**
   * Unfocus the menu.
   *
   * Sets the menu's {@link BaseMenu#focusState|focus state} to "none"
   * and blurs the menu if the menu's {@link BaseMenu#shouldFocus|shouldFocus}
   * vallue is `true`.
   */
  blur() {
    this.focusState = "none", this.shouldFocus && this.dom.menu.blur();
  }
  /**
   * Focus the menu's current child.
   */
  focusCurrentChild() {
    this.focusState = "self", this.currentChild !== -1 && this.currentMenuItem.focus();
  }
  /**
   * Focuses the menu's child at a given index.
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(e) {
    this.blurCurrentChild(), this.currentChild = e, this.focusCurrentChild();
  }
  /**
   * Focues the menu's first child.
   */
  focusFirstChild() {
    this.focusChild(0);
  }
  /**
   * Focus the menu's last child.
   */
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }
  /**
   * Focus the menu's next child.
   */
  focusNextChild() {
    this.currentChild < this.elements.menuItems.length - 1 ? this.focusChild(this.currentChild + 1) : this.focusCurrentChild();
  }
  /**
   * Focus the menu's previous child.
   */
  focusPreviousChild() {
    this.currentChild > 0 ? this.focusChild(this.currentChild - 1) : this.focusCurrentChild();
  }
  /**
   * Blurs the menu's current child.
   */
  blurCurrentChild() {
    this.focusState = "none", this.currentChild !== -1 && this.currentMenuItem.blur();
  }
  /**
   * Focus the menu's controller.
   */
  focusController() {
    this.dom.controller && (this.shouldFocus && this.dom.controller.focus(), this.focusState = "none");
  }
  /**
   * Focus the menu's container.
   */
  focusContainer() {
    this.dom.container && (this.shouldFocus && this.dom.container.focus(), this.focusState = "none");
  }
  /**
   * Close all submenu children.
   */
  closeChildren() {
    this.elements.submenuToggles.forEach((e) => e.close());
  }
  /**
   * Blurs all children and submenu's children.
   */
  blurChildren() {
    this.elements.menuItems.forEach((e) => {
      e.blur(), e.isSubmenuItem && e.elements.childMenu.blurChildren();
    });
  }
}
class H extends L {
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
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: i = !1,
    childMenu: o = null,
    toggle: l = null,
    initialize: c = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: i,
      childMenu: o,
      toggle: l
    }), c && this.initialize();
  }
}
class q extends I {
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
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
    initialize: o = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: i
    }), o && this.initialize();
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the {@link DisclosureMenuToggle#closeSiblings| closeSiblings method}
   * and _then_ {@link BaseMenuToggle#open|BaseMenuToggle's open method}.
   */
  open() {
    this.closeSiblings(), super.open();
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the {@link DisclosureMenuToggle#closeSiblings| closeSiblings method}
   * and _then_ {@link BaseMenuToggle#preview|BaseMenuToggle's preview method}.
   */
  preview() {
    this.closeSiblings(), super.preview();
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the {@link DisclosureMenuToggle#closeChildren| closeChildren method}
   * and _then_ {@link BaseMenuToggle#close|BaseMenuToggle's close method}.
   */
  close() {
    this.isOpen && this.closeChildren(), super.close();
  }
}
class A extends b {
  /**
   * Constructs the menu.
   *
   * @param {object}             options                                   - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                       - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]           - The CSS selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]            - The CSS selector string for menu links.
   * @param {string}             [options.submenuItemSelector]             - The CSS selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]       - The CSS selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]            - The CSS selector string for submenus.
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
    menuElement: t,
    menuItemSelector: s = "li",
    menuLinkSelector: i = "a",
    submenuItemSelector: o = "",
    submenuToggleSelector: l = "a",
    submenuSelector: c = "ul",
    controllerElement: m = null,
    containerElement: u = null,
    openClass: C = "show",
    closeClass: E = "hide",
    transitionClass: y = "transitioning",
    isTopLevel: M = !0,
    parentMenu: T = null,
    hoverType: v = "off",
    hoverDelay: w = 250,
    enterDelay: S = -1,
    leaveDelay: $ = -1,
    optionalKeySupport: O = !1,
    initialize: j = !0
  }) {
    super({
      menuElement: t,
      menuItemSelector: s,
      menuLinkSelector: i,
      submenuItemSelector: o,
      submenuToggleSelector: l,
      submenuSelector: c,
      controllerElement: m,
      containerElement: u,
      openClass: C,
      closeClass: E,
      transitionClass: y,
      isTopLevel: M,
      parentMenu: T,
      hoverType: v,
      hoverDelay: w,
      enterDelay: S,
      leaveDelay: $
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof DisclosureMenu}
     */
    r(this, "_MenuType", A);
    // eslint-disable-line no-use-before-define
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof DisclosureMenuItem}
     */
    r(this, "_MenuItemType", H);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof DisclosureMenuToggle}
     */
    r(this, "_MenuToggleType", q);
    /**
     * The index of the currently selected {@link DisclosureMenu|menu item} in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    r(this, "_currentChild", -1);
    /**
     * A flag to add optional keyboard support (Arrow keys, "Home", and "End") to the menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    r(this, "_optionalSupport", !1);
    this._optionalSupport = O, j && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call the {@link BaseMenu#initialize|BaseMenu's initialize method}
   * as well as set up {@link DisclosureMenu#_handleFocus|focus},
   * {@link DisclosureMenu#_handleClick|click},
   * {@link DisclosureMenu#_handleHover|hover},
   * {@link DisclosureMenu#_handleKeydown|keydown}, and
   * {@link DisclosureMenu#_handleKeyup|keyup} events for the menu.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup();
    } catch (t) {
      console.error(t);
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
  set optionalKeySupport(t) {
    a("boolean", { optionalKeySupport: t }), this._optionalSupport = t;
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let t = super._validate();
    const s = a("boolean", {
      optionalKeySupport: this._optionalSupport
    });
    return s.status || (this._errors.push(s.error.message), t = !1), t;
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   {@link BaseMenu#_handleClick|BaseMenu's _handleClick method}, and
   * - adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("pointerup", (t) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(t.target) && !this.dom.menu !== t.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close()));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the {@link DisclosureMenu#_handleKeyup|_handleKeyup method}.
   * - Adds all `keydown` listeners from {@link BaseMenu#_handleKeydown|BaseMenu's _handleKeydown method}
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "Space", "Enter", and "Escape".
   *   - _If_ {@link DisclosureMenu#optionalKeySupport|optional keyboard support}
   *     is enabled, blocks propagation on the following keys:
   *     "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "Home", and "End".
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (t) => {
      this.currentEvent = "keyboard";
      const s = _(t);
      if (this.focusState === "self") {
        const i = ["Space", "Enter"], o = ["Escape"], l = ["Escape"];
        this.optionalKeySupport ? [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft",
          "Home",
          "End"
        ].includes(s) && h(t) : (this.currentMenuItem.isSubmenuItem && i.includes(s) || this.elements.controller && o.includes(s) || this.elements.parentMenu && l.includes(s)) && h(t);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from {@link BaseMenu#_handleKeyup|BaseMenu's _handleKeyup method}.
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
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (t) => {
      this.currentEvent = "keyboard";
      const s = _(t);
      this.focusState === "self" && (s === "Space" || s === "Enter" ? this.currentMenuItem.isSubmenuItem ? (h(t), this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview()) : this.currentMenuItem.dom.link.click() : s === "Escape" ? this.elements.submenuToggles.some(
        (o) => o.isOpen
      ) ? (h(t), this.closeChildren()) : this.elements.parentMenu ? (h(t), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (s === "ArrowDown" || s === "ArrowRight" ? (h(t), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : s === "ArrowUp" || s === "ArrowLeft" ? (h(t), this.focusPreviousChild()) : s === "Home" ? (h(t), this.focusFirstChild()) : s === "End" && (h(t), this.focusLastChild())));
    });
  }
}
export {
  A as default
};
