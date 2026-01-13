function p(n, e) {
  n === "" || n.length === 0 || (typeof n == "string" ? e.classList.add(n) : e.classList.add(...n));
}
function _(n, e) {
  n === "" || n.length === 0 || (typeof n == "string" ? e.classList.remove(n) : e.classList.remove(...n));
}
function f(n, e, { shouldThrow: t = !0 } = {}) {
  const s = {
    status: !0,
    errors: []
  };
  try {
    if (typeof e != "object") {
      const i = typeof e;
      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${i}" given.`
      );
    }
    for (const i in e)
      try {
        if (!(e[i] instanceof n)) {
          const r = typeof e[i];
          throw new TypeError(
            `${i} must be an instance of ${n.name}. "${r}" given.`
          );
        }
      } catch (r) {
        s.status = !1, s.errors.push(r);
      }
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
function l(n, e, { shouldThrow: t = !0 } = {}) {
  const s = {
    status: !0,
    errors: []
  };
  try {
    if (typeof e != "object") {
      const i = typeof e;
      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${i}" given.`
      );
    }
    for (const i in e)
      try {
        const r = typeof e[i];
        if (r !== n)
          throw new TypeError(
            `${i} must be a ${n}. "${r}" given.`
          );
      } catch (r) {
        s.status = !1, s.errors.push(r);
      }
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
function j(n, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof n != "object") {
      const s = typeof n;
      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${s}" given.`
      );
    }
    for (const s in n)
      try {
        try {
          if (n[s] === null)
            throw new Error();
          document.querySelector(n[s]);
        } catch {
          throw new TypeError(
            `${s} must be a valid query selector. "${n[s]}" given.`
          );
        }
      } catch (i) {
        t.status = !1, t.errors.push(i);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function y(n, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof n != "object" || Array.isArray(n)) {
      const s = typeof n;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${s}" given.`
      );
    }
    for (const s in n)
      try {
        const i = typeof n[s];
        if (i !== "string")
          if (Array.isArray(n[s]))
            n[s].forEach((r) => {
              if (typeof r != "string")
                throw new TypeError(
                  `${s} must be a string or an array of strings. An array containing non-strings given.`
                );
            });
          else
            throw new TypeError(
              `${s} must be a string or an array of strings. "${i}" given.`
            );
        else {
          const r = {};
          r[s] = n[s], j(r);
        }
      } catch (i) {
        t.status = !1, t.errors.push(i);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function V(n, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof n != "object") {
      const i = typeof n;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["none", "self", "child"];
    for (const i in n)
      try {
        if (!s.includes(n[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${n[i]}" given.`
          );
      } catch (r) {
        t.status = !1, t.errors.push(r);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function K(n, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof n != "object") {
      const i = typeof n;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["none", "mouse", "keyboard", "character"];
    for (const i in n)
      try {
        if (!s.includes(n[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${n[i]}" given.`
          );
      } catch (r) {
        t.status = !1, t.errors.push(r);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function x(n, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof n != "object") {
      const i = typeof n;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["off", "on", "dynamic"];
    for (const i in n)
      try {
        if (!s.includes(n[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${n[i]}" given.`
          );
      } catch (r) {
        t.status = !1, t.errors.push(r);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function N(n, e, { shouldThrow: t = !0 } = {}) {
  const s = {
    status: !0,
    errors: []
  };
  try {
    if (l("string", { tagName: n }, { shouldThrow: !0 }).status && f(HTMLElement, e, { shouldThrow: !0 }).status) {
      const i = n.toLowerCase();
      for (const r in e)
        try {
          if (e[r].tagName.toLowerCase() !== i)
            throw new TypeError(
              `${r} must be a <${i}> element. <${e[r].tagName.toLowerCase()}> given.`
            );
        } catch (o) {
          s.status = !1, s.errors.push(o);
        }
    }
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
class H {
  /**
   * A comparator function used to check equality between
   * the current and committed values.
   *
   * @protected
   *
   * @type {function(*, *): boolean}
   */
  _equals = Object.is;
  /**
   * The current, editable value.
   *
   * @protected
   *
   * @type {*}
   */
  _current;
  /**
   * The last committed (baseline) value.
   *
   * @protected
   *
   * @type {*}
   */
  _committed;
  /**
   * Creates a new TransactionalValue instance.
   *
   * @param {*}                       initialValue                 - The starting (and initially committed) value.
   * @param {object}                  [options = {}]               - Options for configuring the instance.
   * @param {function(*, *): boolean} [options.equals = Object.is] - Custom equality comparator. Defaults to `Object.is`.
   */
  constructor(e, { equals: t = Object.is } = {}) {
    this._equals = t || Object.is, this._current = e, this._committed = e;
  }
  /**
   * Gets the current editable value.
   *
   * @return {*} The current value.
   *
   * @see _current
   */
  get value() {
    return this._current;
  }
  /**
   * Sets the current editable value.
   *
   * @param {*} val - The new value.
   */
  set value(e) {
    this._current = e;
  }
  /**
   * Gets the last committed value.
   *
   * @readonly
   *
   * @type {*}
   *
   * @see _committed
   */
  get committed() {
    return this._committed;
  }
  /**
   * Checks whether the current value differs from the committed one.
   *
   * Will be `true` if the values are different, `false` otherwise.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get isDirty() {
    return !this._equals(this._current, this._committed);
  }
  /**
   * Commits the current value, setting it as the new baseline.
   *
   * @return {TransactionalValue} - The current instance.
   */
  commit() {
    return this._committed = this._current, this;
  }
  /**
   * Resets the current value to the committed baseline.
   *
   * @return {TransactionalValue} - The current instance.
   */
  reset() {
    return this._current = this._committed, this;
  }
  /**
   * Applies a functional update to the current value.
   *
   * @param  {function(*): *}     fn - A function that receives the previous value and returns the new one.
   * @return {TransactionalValue}    - The current instance.
   *
   * @example
   * const t = new TransactionalValue(1);
   * t.update(n => n + 1); // 2
   */
  update(e) {
    return this._current = e(this._current), this;
  }
}
class Q {
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
   * @type {TransactionalValue<boolean>}
   */
  _open = new H(!1);
  /**
   * Custom events that can be triggered throughout the menu toggle.
   *
   * @protected
   *
   * @type {Object<CustomEvent>}
   */
  _events = {
    /**
     * The event that is triggered when the menu toggle expands.
     *
     * @event accessibleMenuExpand
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    expand: new CustomEvent("accessibleMenuExpand", {
      bubbles: !0,
      detail: { toggle: this }
    }),
    /**
     * The event that is triggered when the menu toggle collapses.
     *
     * @event accessibleMenuCollapse
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    collapse: new CustomEvent("accessibleMenuCollapse", {
      bubbles: !0,
      detail: { toggle: this }
    })
  };
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
    parentMenu: i = null
  }) {
    this._dom.toggle = e, this._dom.parent = t, this._elements.controlledMenu = s, this._elements.parentMenu = i;
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
   * Custom events that can be triggered throughout the menu toggle.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _events
   */
  get events() {
    return this._events;
  }
  /**
   * The open state on the toggle.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open.value;
  }
  /**
   * The open state of the toggle that the user specifically triggered.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get hasOpened() {
    return this._open.committed;
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
   * Dispatch a custom event on an element in the DOM.
   *
   * @param {string}      eventType - The type of the event to dispatch.
   * @param {HTMLElement} element   - The element to dispatch the event on.
   */
  _dispatchEvent(e, t) {
    if (!Object.keys(this.events).includes(e))
      throw new Error(
        `Accessible Menu: "${e}" is not a valid event type.`
      );
    f(HTMLElement, { element: t }), t.dispatchEvent(this.events[e]);
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
   * @param {object}  [options = {}]              - The options for expanding the menu.
   * @param {boolean} [options.emit = true]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [options.transition = true] - A flag to use transitions when expanding.
   */
  _expand({ emit: e = !0, transition: t = !0 } = {}) {
    const { closeClass: s, openClass: i, transitionClass: r, openDuration: o } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"), this.elements.controlledMenu.elements.rootMenu.hasOpened = !0, t && r !== "" ? (p(r, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      _(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        p(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            _(
              r,
              this.elements.controlledMenu.dom.menu
            );
          }, o);
        });
      });
    })) : (p(i, this.elements.controlledMenu.dom.menu), _(s, this.elements.controlledMenu.dom.menu)), e && this._dispatchEvent("expand", this.dom.toggle);
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
   * @param {object}  [options = {}]              - The options for collapsing the menu.
   * @param {boolean} [options.emit = true]       - A toggle to emit the collapse event once collapsed.
   * @param {boolean} [options.transition = true] - A flag to use transitions when collapsing.
   */
  _collapse({ emit: e = !0, transition: t = !0 } = {}) {
    const { closeClass: s, openClass: i, transitionClass: r, closeDuration: o } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"), t && r !== "" ? (p(r, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      _(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        p(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            _(
              r,
              this.elements.controlledMenu.dom.menu
            );
          }, o);
        });
      });
    })) : (p(s, this.elements.controlledMenu.dom.menu), _(i, this.elements.controlledMenu.dom.menu)), e && this._dispatchEvent("collapse", this.dom.toggle);
  }
  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isOpen value to `true`.
   *
   * @param {object}  [options = {}]                  - The options for opening the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to open.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when opening.
   */
  open({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    this.elements.controlledMenu.focusState = "self", !(this.isOpen && !e) && (this._expand({ emit: s, transition: i }), this._open.value = !0, t || this._open.commit());
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
   *
   * @param {object}  [options = {}]                  - The options for previewing the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to preview.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when previewing.
   */
  preview({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), !(this.isOpen && !e) && (this._expand({ emit: s, transition: i }), this._open.value = !0, t || this._open.commit());
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
   * @param {object}  [options = {}]                  - The options for closing the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  close({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    !this.isOpen && !e || (this.elements.controlledMenu.blur(), this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._collapse({ emit: s, transition: i }), this._open.value = !1, t || this._open.commit());
  }
  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for toggling the menu.
   * @param {boolean} [options.force = false]         - A flag to force the menu to open/close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the expand/collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when toggling.
   */
  toggle({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    this.isOpen ? this.close({ force: e, preserveState: t, emit: s, transition: i }) : this.open({ force: e, preserveState: t, emit: s, transition: i });
  }
  /**
   * Closes all sibling menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for closing the sibling menus.
   * @param {boolean} [options.force = false]         - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  closeSiblings({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((r) => {
      r !== this && r.close({ force: e, preserveState: t, emit: s, transition: i });
    });
  }
  /**
   * Closes all child menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                  - The options for closing the child menus.
   * @param {boolean} [options.force = false]         - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false] - A flag to preserve the current state.
   * @param {boolean} [options.emit = true]           - A flag to emit the collapse event.
   * @param {boolean} [options.transition = true]     - A flag to use transitions when closing.
   */
  closeChildren({
    force: e = !1,
    preserveState: t = !1,
    emit: s = !0,
    transition: i = !0
  } = {}) {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (r) => r.close({ force: e, preserveState: t, emit: s, transition: i })
    );
  }
}
class F {
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
    isSubmenuItem: i = !1,
    childMenu: r = null,
    toggle: o = null
  }) {
    this._dom.item = e, this._dom.link = t, this._elements.parentMenu = s, this._elements.childMenu = r, this._elements.toggle = o, this._submenu = i;
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
function b(n) {
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
function u(n) {
  n.preventDefault(), n.stopPropagation();
}
class $ {
  /**
   * The scope of the storage.
   *
   * @protected
   *
   * @type {string}
   */
  _scope;
  /**
   * The type of storage.
   *
   * @protected
   *
   * @type {string}
   */
  _type = "_default";
  /**
   * The storage object.
   *
   * @protected
   *
   * @type {object}
   */
  _storage = {};
  /**
   * Creates a Storage instance.
   *
   * @param {object}  [options = {}]              - The options for the storage.
   * @param {string}  options.scope               - The scope of the storage.
   * @param {?string} [options.type = null]       - The type of storage.
   * @param {boolean} [options.initialize = true] - Whether to initialize the storage.
   */
  constructor({ scope: e, type: t = null, initialize: s = !0 } = {}) {
    this._scope = e, this._type = t || "_default", s && this.initialize();
  }
  /**
   * Initialize the storage.
   */
  initialize() {
    window[this.scope] = this;
  }
  /**
   * The scope of the storage.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _scope
   */
  get scope() {
    return this._scope;
  }
  /**
   * The type of storage.
   *
   * @type {string}
   *
   * @see _type
   */
  get type() {
    return this._type;
  }
  set type(e) {
    l("string", { type: e }) && (this._type = e);
  }
  /**
   * The storage object.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _storage
   */
  get storage() {
    return this._storage;
  }
  /**
   * Get the storage object.
   *
   * @param  {object}  [options = {}]             - The options for getting the storage.
   * @param  {string}  [options.type = this.type] - The type of storage to get.
   * @param  {?string} [options.key = null]       - The key to get the value from.
   * @return {object}  - The storage object.
   */
  get({ type: e = this.type, key: t = null } = {}) {
    const s = l("string", { type: e });
    if (!s.status)
      throw new Error(`StorageManager (${this.scope}): ${s.message}`);
    if (!this.storage[e])
      throw new Error(
        `StorageManager (${this.scope}): Type "${e}" is not initialized.`
      );
    if (t !== null) {
      const i = l("string", { key: t });
      if (!i.status)
        throw new Error(`StorageManager (${this.scope}): ${i.message}`);
      return this.storage[e][t];
    }
    return this.storage[e];
  }
  /**
   * Set the storage object.
   *
   * @param {object}  [options = {}]             - The options for setting the storage.
   * @param {string}  [options.type = this.type] - The type of storage to set.
   * @param {?string} [options.key = null]       - The key to set the value to.
   * @param {object}  [options.data = {}]        - The data to set.
   */
  set({ type: e = this.type, key: t = null, data: s = {} } = {}) {
    const i = l("string", { type: e }), r = l("object", { data: s });
    if (!i.status)
      throw new Error(`StorageManager (${this.scope}): ${i.message}`);
    if (!r.status)
      throw new Error(`StorageManager (${this.scope}): ${r.message}`);
    if (t !== null) {
      const o = l("string", { key: t });
      if (!o.status)
        throw new Error(`StorageManager (${this.scope}): ${o.message}`);
      this._storage[e] || (this._storage[e] = {}), this._storage[e][t] = s;
    } else
      this._storage[e] = s;
  }
  /**
   * Remove a value from the storage object.
   *
   * @param {object}  [options = {}]             - The options for removing from storage.
   * @param {string}  [options.type = this.type] - The type of storage to remove from.
   * @param {?string} [options.key = null]       - The key to remove the value from.
   */
  clear({ type: e = this.type, key: t = null } = {}) {
    const s = l("string", { type: e });
    if (!s.status)
      throw new Error(`StorageManager (${this.scope}): ${s.message}`);
    if (t !== null) {
      const i = l("string", { key: t });
      if (!i.status)
        throw new Error(`StorageManager (${this.scope}): ${i.message}`);
      delete this.storage[e][t];
    } else
      delete this.storage[e];
  }
  dispose() {
    delete this._storage, delete this;
  }
}
class M {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof BaseMenu}
   */
  _MenuType = M;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof BaseMenuItem}
   */
  _MenuItemType = F;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof BaseMenuToggle}
   */
  _MenuToggleType = Q;
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
   * @property {HTMLElement[]} menuLinks      - An array of menu links.
   * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
   * @property {HTMLElement[]} submenus       - An array of submenu elements.
   * @property {HTMLElement}   controller     - The toggle for this menu.
   * @property {HTMLElement}   container      - The container for this menu.
   */
  _dom = {
    menu: null,
    menuItems: [],
    menuLinks: [],
    submenuItems: [],
    submenuToggles: [],
    submenus: [],
    controller: null,
    container: null
  };
  /**
   * The DOM elements within the menu that cannot be reset or generated by the menu itself.
   *
   * @protected
   *
   * @type {string[]}
   */
  _protectedDOMElements = ["menu", "controller", "container"];
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
   * The classes to apply when the menu is in various states.
   *
   * @protected
   *
   * @type {Object<string|string[]>}
   *
   * @property {string|string[]} open       - The class(es) to apply when the menu is open.
   * @property {string|string[]} close      - The class(es) to apply when the menu is closed.
   * @property {string|string[]} transition - The class(es) to apply when the menu is transitioning between states.
   */
  _classes = {
    open: "show",
    close: "hide",
    transition: "transitioning"
  };
  /**
   * The duration times (in milliseconds) for various menu transitions and events.
   *
   * @protected
   *
   * @type {Object<number>}
   *
   * @property {number} transition - The duration time (in milliseconds) for the transition between open and closed states.
   * @property {number} open       - The duration time (in milliseconds) for the transition from closed to open states.
   * @property {number} close      - The duration time (in milliseconds) for the transition from open to closed states.
   */
  _durations = {
    transition: 250,
    open: -1,
    close: -1
  };
  /**
   * The delay times (in milliseconds) for various menu transitions and events.
   *
   * @protected
   *
   * @type {Object<number>}
   *
   * @property {number} hover      - The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   * @property {number} enter      - The delay time (in milliseconds) used for pointerenter events to take place.
   * @property {number} leave      - The delay time (in milliseconds) used for pointerleave events to take place.
   */
  _delays = {
    hover: 250,
    enter: -1,
    leave: -1
  };
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
   * The prefix to use for CSS custom properties.
   *
   * @protected
   *
   * @type {string}
   */
  _prefix = "am-";
  /**
   * A flag to check if the menu can dynamically hover based on if a menu has been opened already.
   *
   * @protected
   *
   * @type {boolean}
   */
  _hasOpened = !1;
  /**
   * A flag to force the menu open when the media query matches.
   */
  _shouldOpen = !1;
  /**
   * Timeouts throughout the component.
   *
   * @protected
   *
   * @type {Object<Function>}
   */
  _timeouts = {};
  /**
   * Event listeners throughout the menu.
   *
   * @protected
   *
   * @type {object[]}
   */
  _listeners = [];
  /**
   * The breakoint that the menu will call media query list events.
   *
   * @protected
   *
   * @type {string}
   */
  _breakpoint = "";
  /**
   * The media query to use to trigger media query list events.
   *
   * @type {string}
   */
  _mediaQueryString = "";
  /**
   * This MediaQueryList for the menu.
   *
   * @protected
   *
   * @type {MediaQueryList|null}
   */
  _mediaQueryList = null;
  /**
   * A callback for media query list events.
   *
   * @protected
   *
   * @type {Function}
   *
   * @param {MediaQueryListEvent} event - The event.
   */
  _mediaQueryListEventCallback = (e) => {
    this.elements.controller !== null && (e.matches && this.elements.controller.isOpen ? this.elements.controller.close({
      preserveState: !0,
      transition: !1
    }) : !e.matches && !this.elements.controller.isOpen && (this.elements.controller.hasOpened || this.shouldOpen) && this.elements.controller.open({ transition: !1 }));
  };
  /**
   * The key used to generate IDs throughout the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _key = "";
  /**
   * The key used for storage.
   *
   * @protected
   *
   * @type {string}
   */
  _storageKey = "menus";
  /**
   * The main ID of the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _id = "";
  /**
   * The validity state of the menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _valid = !0;
  /**
   * An array of error messages generated by the menu.
   *
   * @protected
   *
   * @type {Error[]}
   */
  _errors = [];
  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                     - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                         - The menu element in the DOM.
   * @param {string}             [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuTogglesSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                  - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                 - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.openDuration = -1]                 - The duration of the transition from "closed" to "open" states (in milliseconds).
   * @param {boolean}            [options.closeDuration = -1]                - The duration of the transition from "open" to "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = false]                - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for opening menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for closing menus if the menu is hoverable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint that the menu will automatically open/close itself at.
   * @param {string}             [options.mediaQuery = '']                   - The media query to use to trigger media query list events.
   * @param {boolean}            [options.autoOpen = true]                   - A flag to auto open the menu when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   */
  constructor({
    menuElement: e,
    menuItemsSelector: t = "li",
    menuLinksSelector: s = "a",
    submenuItemsSelector: i = "li:has(ul)",
    submenuTogglesSelector: r = "a",
    submenusSelector: o = "ul",
    controllerElement: h = null,
    containerElement: d = null,
    openClass: a = "show",
    closeClass: c = "hide",
    transitionClass: m = "transitioning",
    transitionDuration: E = 250,
    openDuration: T = -1,
    closeDuration: C = -1,
    isTopLevel: g = !0,
    parentMenu: v = null,
    hoverType: w = "off",
    hoverDelay: k = 250,
    enterDelay: S = -1,
    leaveDelay: D = -1,
    breakpoint: I = "",
    mediaQuery: L = "",
    autoOpen: O = !0,
    prefix: A = "am-",
    key: z = null
  }) {
    this._dom.menu = e, this._dom.controller = h, this._dom.container = d, this._selectors.menuItems = t, this._selectors.menuLinks = s, this._selectors.submenuItems = i, this._selectors.submenuToggles = r, this._selectors.submenus = o, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = v, this._elements.rootMenu = g ? this : null, this._classes.open = a || "", this._classes.close = c || "", this._classes.transition = m || "", this._durations.transition = E, this._durations.open = T, this._durations.close = C, this._prefix = A || "", this._key = z || "", this._root = g, this._hoverType = w, this._delays.hover = k, this._delays.enter = S, this._delays.leave = D, this._breakpoint = I, this._mediaQueryString = L, this._shouldOpen = O;
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
 - ${this.errors.map((e) => e.toString()).join(`
 - `)}`
      );
    if (this.elements.rootMenu === null && this._findRootMenu(this), this._generateKey(), this._setDOMElements(), this.isTopLevel) {
      if (this._setIds(), this.dom.controller && this.dom.container) {
        const e = new this._MenuToggleType({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this
        });
        N(
          "button",
          { toggle: e.dom.toggle },
          { shouldThrow: !1 }
        ).status || e.dom.toggle.setAttribute("role", "button"), e.dom.toggle.setAttribute("aria-controls", this.dom.menu.id), this._elements.controller = e;
      }
      this._store();
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
   * The classes to apply when the menu is in various states.
   *
   * @readonly
   *
   * @type {Object<string|string[]>}
   *
   * @see _classes
   */
  get classes() {
    return this._classes;
  }
  /**
   * The durations (in milliseconds) for various menu transitions and events.
   *
   * @readonly
   *
   * @type {Object<number>}
   *
   * @see _durations
   */
  get durations() {
    return this._durations;
  }
  /**
   * The delays (in milliseconds) for various menu transitions and events.
   *
   * @readonly
   *
   * @type {Object<number>}
   *
   * @see _delays
   */
  get delays() {
    return this._delays;
  }
  /**
   * Timeouts throughout the menu.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _timeouts
   */
  get timeouts() {
    return this._timeouts;
  }
  /**
   * Event listeners throughout the menu.
   *
   * @readonly
   *
   * @type {object[]}
   *
   * @see _listeners
   */
  get listeners() {
    return this._listeners;
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
   * The main ID of the menu.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _id
   */
  get id() {
    return this._id;
  }
  /**
   * The validity state of the menu.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _valid
   */
  get isValid() {
    return this._valid;
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
   * @see _classes.open
   */
  get openClass() {
    return this.isTopLevel ? this._classes.open : this.elements.rootMenu.openClass;
  }
  set openClass(e) {
    y({ openClass: e }), this._classes.open !== e && (this._classes.open = e);
  }
  /**
   * The class(es) to apply when the menu is closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.close
   */
  get closeClass() {
    return this.isTopLevel ? this._classes.close : this.elements.rootMenu.closeClass;
  }
  set closeClass(e) {
    y({ closeClass: e }), this._classes.close !== e && (this._classes.close = e);
  }
  /**
   * The class(es) to apply when the menu is transitioning between open and closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.transition
   */
  get transitionClass() {
    return this.isTopLevel ? this._classes.transition : this.elements.rootMenu.transitionClass;
  }
  set transitionClass(e) {
    y({ transitionClass: e }), this._classes.transition !== e && (this._classes.transition = e);
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
   * @see _durations.transition
   */
  get transitionDuration() {
    return this.isTopLevel ? this._durations.transition : this.elements.rootMenu.transitionDuration;
  }
  set transitionDuration(e) {
    l("number", { transitionDuration: e }), this._durations.transition !== e && (this._durations.transition = e, this._setTransitionDurations());
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
   * @see _durations.open
   */
  get openDuration() {
    return this._durations.open === -1 ? this.transitionDuration : this.isTopLevel ? this._durations.open : this.elements.rootMenu.openDuration;
  }
  set openDuration(e) {
    l("number", { openDuration: e }), this._durations.open !== e && (this._durations.open = e, this._setTransitionDurations());
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
   * @see _durations.close
   */
  get closeDuration() {
    return this._durations.close === -1 ? this.transitionDuration : this.isTopLevel ? this._durations.close : this.elements.rootMenu.closeDuration;
  }
  set closeDuration(e) {
    l("number", { closeDuration: e }), this._durations.close !== e && (this._durations.close = e, this._setTransitionDurations());
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
    l("number", { currentChild: e });
    function t(s) {
      if (["mouse", "character"].includes(s.currentEvent) && s.elements.parentMenu) {
        let r = 0, o = !1;
        for (; !o && r < s.elements.parentMenu.elements.menuItems.length; ) {
          const h = s.elements.parentMenu.elements.menuItems[r];
          h.isSubmenuItem && h.elements.toggle.elements.controlledMenu === s && (o = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = r), r++;
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
    K({ currentEvent: e }), this._currentEvent !== e && (this._currentEvent = e, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.currentEvent = e;
    }));
  }
  /**
   * A flag to force the menu open when the media query matches.
   *
   * @type {boolean}
   *
   * @see _shouldOpen
   */
  get shouldOpen() {
    return this._shouldOpen;
  }
  set shouldOpen(e) {
    l("boolean", { shouldOpen: e }), this._shouldOpen !== e && (this._shouldOpen = e);
  }
  /**
   * The breakpoint that the menu will automatically open/close itself at.
   *
   * @type {string}
   *
   * @see _breakpoint
   */
  get breakpoint() {
    return this._breakpoint;
  }
  set breakpoint(e) {
    l("string", { breakpoint: e }), this._breakpoint !== e && (this._breakpoint = e);
  }
  /**
   * The media query to use to trigger media query list events.
   *
   * If the mediaQueryString is empty, the media query will be generated
   * based on the breakpoint.
   *
   * @type {string}
   *
   * @see _mediaQueryString
   */
  get mediaQuery() {
    return this._mediaQueryString !== "" ? this._mediaQueryString : this._breakpoint === "" ? "" : `(width <= ${this._breakpoint})`;
  }
  set mediaQuery(e) {
    l("string", { mediaQuery: e }), this._mediaQueryString !== e && (this._mediaQueryString = e);
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
    x({ hoverType: e }), this._hoverType !== e && (this._hoverType = e);
  }
  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @type {number}
   *
   * @see _delays.hover
   */
  get hoverDelay() {
    return this._root ? this._delays.hover : this.elements.rootMenu.hoverDelay;
  }
  set hoverDelay(e) {
    l("number", { hoverDelay: e }), this._delays.hover !== e && (this._delays.hover = e);
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
   * @see _delays.enter
   */
  get enterDelay() {
    return this._delays.enter === -1 ? this.hoverDelay : this._root ? this._delays.enter : this.elements.rootMenu.enterDelay;
  }
  set enterDelay(e) {
    l("number", { enterDelay: e }), this._delays.enter !== e && (this._delays.enter = e);
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
   * @see _delays.leave
   */
  get leaveDelay() {
    return this._delays.leave === -1 ? this.hoverDelay : this._root ? this._delays.leave : this.elements.rootMenu.leaveDelay;
  }
  set leaveDelay(e) {
    l("number", { leaveDelay: e }), this._delays.leave !== e && (this._delays.leave = e);
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
    l("string", { prefix: e }), this._prefix !== e && (this._prefix = e);
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
    l("boolean", { hasOpened: e }), this._hasOpened !== e && (this._hasOpened = e);
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    if (Object.keys(this._dom).length > 0) {
      const i = {};
      for (const o of Object.keys(this._dom))
        Array.isArray(this._dom[o]) ? this._dom[o].forEach((h, d) => {
          i[`${o}Element[${d}]`] = h;
        }) : i[`${o}Element`] = this._dom[o];
      i.controllerElement === null && i.containerElement === null && (delete i.controllerElement, delete i.containerElement);
      const r = f(HTMLElement, i, {
        shouldThrow: !1
      });
      r.status || (this._errors = [...this._errors, ...r.errors], this._valid = !1);
    }
    if (Object.keys(this._selectors).length > 0) {
      const i = {};
      for (const o of Object.keys(this._selectors))
        i[`${o}Selector`] = this._selectors[o];
      const r = j(i, {
        shouldThrow: !1
      });
      r.status || (this._errors = [...this._errors, ...r.errors], this._valid = !1);
    }
    if (Object.keys(this._classes).length > 0) {
      const i = {};
      for (const o of Object.keys(this._classes))
        this._classes[o] !== "" && (i[`${o}Class`] = this._classes[o]);
      const r = y(i, { shouldThrow: !1 });
      r.status || (this._errors = [...this._errors, ...r.errors], this._valid = !1);
    }
    if (Object.keys(this._durations).length > 0) {
      const i = {};
      for (const o of Object.keys(this._durations))
        i[`${o}Duration`] = this._durations[o];
      const r = l("number", i, {
        shouldThrow: !1
      });
      r.status || (this._errors = [...this._errors, ...r.errors], this._valid = !1);
    }
    if (Object.keys(this._delays).length > 0) {
      const i = {};
      for (const o of Object.keys(this._delays))
        i[`${o}Delay`] = this._delays[o];
      const r = l("number", i, { shouldThrow: !1 });
      r.status || (this._errors = [...this._errors, ...r.errors], this._valid = !1);
    }
    const e = {
      isTopLevel: this._root,
      autoOpen: this._shouldOpen
    }, t = l("boolean", e, {
      shouldThrow: !1
    });
    if (t.status || (this._errors = [...this._errors, ...t.errors], this._valid = !1), this._elements.parentMenu !== null) {
      const i = f(
        M,
        {
          parentMenu: this._elements.parentMenu
        },
        { shouldThrow: !1 }
      );
      i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
    }
    const s = x(
      { hoverType: this._hoverType },
      { shouldThrow: !1 }
    );
    if (s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1), this._breakpoint !== "") {
      const i = l(
        "string",
        { breakpoint: this._breakpoint },
        { shouldThrow: !1 }
      );
      i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
    }
    if (this._mediaQueryString !== "") {
      const i = l(
        "string",
        { mediaQuery: this._mediaQueryString },
        { shouldThrow: !1 }
      );
      i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
    }
    if (this._key !== "") {
      const i = l(
        "string",
        { key: this._key },
        { shouldThrow: !1 }
      );
      i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
    }
    if (this._prefix !== "") {
      const i = l(
        "string",
        { prefix: this._prefix },
        { shouldThrow: !1 }
      );
      i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
    }
    return this._valid;
  }
  /**
   * Sets DOM elements throughout the menu.
   *
   * Elements listed in _protectedDOMElements cannot be set using this method.
   *
   * @protected
   *
   * @param {string}                      elementType                       - The type of element to populate.
   * @param {Object<HTMLElement,boolean>} [options = {}]                    - The options for setting the DOM element type.
   * @param {HTMLElement}                 [options.context = this.dom.menu] - The element used as the base context for the querySelector.
   * @param {boolean}                     [options.overwrite = true]        - A flag to set if the existing elements will be overwritten.
   * @param {boolean}                     [options.strict = true]           - A flag to set if the elements must be direct children of the base.
   */
  _setDOMElementType(e, { context: t = this.dom.menu, overwrite: s = !0, strict: i = !0 } = {}) {
    if (typeof this.selectors[e] != "string")
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type.`
      );
    if (this._protectedDOMElements.includes(e))
      throw new Error(
        `AccessibleMenu: "${e}" element cannot be set through _setDOMElementType because it is a protected element.`
      );
    f(HTMLElement, { context: t });
    const o = Array.from(
      t.querySelectorAll(this.selectors[e])
    ).filter(
      (h) => i ? h.parentElement === t : !0
    );
    Array.isArray(this._dom[e]) ? s ? this._dom[e] = o : this._dom[e] = [
      ...this._dom[e],
      ...o
    ] : this._dom[e] = o[0] || null;
  }
  /**
   * Resets DOM elements throughout the menu.
   *
   * Elements listed in _protectedDOMElements cannot be reset using this method.
   *
   * @protected
   *
   * @param {string} elementType - The type of element to clear.
   */
  _resetDOMElementType(e) {
    if (typeof this.selectors[e] != "string")
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type.`
      );
    if (this._protectedDOMElements.includes(e))
      throw new Error(
        `AccessibleMenu: "${e}" element cannot be reset through _resetDOMElementType because it is a protected element.`
      );
    Array.isArray(this._dom[e]) ? this._dom[e] = [] : this._dom[e] = null;
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
      this._setDOMElementType("submenuToggles", {
        context: e,
        overwrite: !1
      }), this._setDOMElementType("submenus", {
        context: e,
        overwrite: !1
      });
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
    this.dom.menu.id = this.dom.menu.id || `menu-${this.key}`, this.dom.container && (this.dom.container.id = this.dom.container.id || `menu-container-${this.key}`), this.dom.controller && (this.dom.controller.id = this.dom.controller.id || `menu-controller-${this.key}`), this._id = this.dom.menu.id;
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
        const s = e.querySelector(this.selectors.submenuToggles), i = e.querySelector(this.selectors.submenus), r = new this._MenuType({
          menuElement: i,
          menuItemsSelector: this.selectors.menuItems,
          menuLinksSelector: this.selectors.menuLinks,
          submenuItemsSelector: this.selectors.submenuItems,
          submenuTogglesSelector: this.selectors.submenuToggles,
          submenusSelector: this.selectors.submenus,
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
          leaveDelay: this.leaveDelay,
          shouldOpen: !1
        }), o = new this._MenuToggleType({
          menuToggleElement: s,
          parentElement: e,
          controlledMenu: r,
          parentMenu: this
        });
        this._elements.submenuToggles.push(o), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: r,
          toggle: o
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
   * Handles media match events throughout the menu.
   *
   * - Adds a `change` listener to the menu's media query list so when the media query
   *   state changes, it will properly open/close the menu.
   *
   * @protected
   */
  _handleMediaMatch() {
    this.mediaQuery !== "" && (this._mediaQueryList = window.matchMedia(this.mediaQuery), this._addEventListener(
      "change",
      this._mediaQueryList,
      this._mediaQueryListEventCallback
    ), this._mediaQueryListEventCallback(this._mediaQueryList));
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
      this._addEventListener("focus", e.dom.link, () => {
        this.focusState = "self", this.currentChild = t;
      });
    }), this._addEventListener("focusout", this.dom.menu, (e) => {
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
    function e(t, s, i) {
      u(i), i.button === 0 && (s.toggle(), s.isOpen && (t.focusState = "self", s.elements.controlledMenu.focusState = "none"));
    }
    this.elements.menuItems.forEach((t, s) => {
      this._addEventListener(
        "click",
        t.dom.link,
        () => {
          this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this._clearTimeout(), this.focusChild(s);
        },
        { passive: !0 }
      ), t.isSubmenuItem && this._addEventListener(
        "click",
        t.elements.toggle.dom.toggle,
        (i) => {
          this.currentEvent = "mouse", e(this, t.elements.toggle, i);
        }
      );
    }), this.isTopLevel && this.elements.controller && this._addEventListener(
      "click",
      this.elements.controller.dom.toggle,
      (t) => {
        this.currentEvent = "mouse", e(this, this.elements.controller, t);
      }
    ), this._addEventListener("click", document, (t) => {
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
      this._addEventListener("pointerenter", e.dom.link, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.closeChildren();
        }, this.enterDelay)) : this.closeChildren())));
      }), e.isSubmenuItem && (this._addEventListener("pointerleave", e.dom.item, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), this._addEventListener("pointerenter", e.dom.item, (s) => {
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
    this.isTopLevel && this.elements.controller && this._addEventListener(
      "keydown",
      this.elements.controller.dom.toggle,
      (e) => {
        this.currentEvent = "keyboard";
        const t = b(e);
        (t === "Space" || t === "Enter") && u(e);
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
    this.isTopLevel && this.elements.controller && this._addEventListener(
      "keyup",
      this.elements.controller.dom.toggle,
      (e) => {
        this.currentEvent = "keyboard";
        const t = b(e);
        (t === "Space" || t === "Enter") && (u(e), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
      }
    );
  }
  /**
   * Stores the menu into the global storage object.
   *
   * @protected
   */
  _store() {
    f(
      $,
      { storage: window.AccessibleMenuStorage },
      { shouldThrow: !1 }
    ).status || new $({
      scope: "AccessibleMenuStorage",
      type: this._storageKey
    }), window.AccessibleMenuStorage.set({
      key: this.id !== "" ? this.id : this.key,
      data: this
    });
  }
  /**
   * Removes the menu from the global storage object.
   *
   * @protected
   */
  _unstore() {
    f(
      $,
      { storage: window.AccessibleMenuStorage },
      { shouldThrow: !1 }
    ).status && window.AccessibleMenuStorage.clear({
      key: this.id !== "" ? this.id : this.key
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
   * Sets a timeout within the menu.
   *
   * @protected
   *
   * @param {Function} [callback]         - The callback function.
   * @param {number}   [delay]            - The time (in milliseconds) of the delay.
   * @param {string}   [scope = _default] - The scope of the timeout (used to store the timeout in _timeouts).
   */
  _setTimeout(e, t, s = "_default") {
    this._clearTimeout(s), this._timeouts[s] = setTimeout(e, t);
  }
  /**
   * Clears a timeout within the menu.
   *
   * @protected
   *
   * @param {string} [scope = _default] - The scope of the timeout (used to get the timeout from _timeouts).
   */
  _clearTimeout(e = "_default") {
    clearTimeout(this._timeouts[e]);
  }
  /**
   * Clears all timeouts within the menu.
   *
   * @protected
   */
  _clearTimeouts() {
    for (const e of Object.keys(this._timeouts))
      this._clearTimeout(e);
  }
  /**
   * Add an event listener to an element and register it within the menu.
   *
   * @param {string}         type           - The type of event to listen for.
   * @param {HTMLElement}    element        - The element to add the listener to.
   * @param {Function}       listener       - The listener callback.
   * @param {object|boolean} [options = {}] - Options to pass to the listener.
   */
  _addEventListener(e, t, s, i = {}) {
    t.addEventListener(e, s, i), this._listeners.push({
      type: e,
      element: t,
      listener: s,
      options: i
    });
  }
  /**
   * Remove an event listener from an element and unregister it within the menu.
   *
   * @param {string}         type           - The type of event to remove.
   * @param {HTMLElement}    element        - The element to remove the listener from.
   * @param {Function}       listener       - The listener callback.
   * @param {object|boolean} [options = {}] - Options to pass to the listener.
   */
  _removeEventListener(e, t, s, i = {}) {
    t.removeEventListener(e, s, i);
    let r = -1;
    this._listeners.forEach((o, h) => {
      o.type === e && o.element === t && o.listener === s && JSON.stringify(o.options) === JSON.stringify(i) && (r = h);
    }), r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Removes all event listeners registered in the menu.
   *
   * This can be filtered by type and/or element.
   *
   * @protected
   *
   * @param {object}       [options = {}]           - Options for removing listeners.
   * @param {?string}      [options.type = null]    - The type of event to remove. If null, all types are removed.
   * @param {?HTMLElement} [options.element = null] - The element to remove listeners from. If null, all elements are removed.
   */
  _removeEventListeners({ type: e = null, element: t = null } = {}) {
    [...this._listeners].forEach((i) => {
      e !== null && i.type !== e || t !== null && i.element !== t || this._removeEventListener(
        i.type,
        i.element,
        i.listener,
        i.options
      );
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
  /**
   * Disposes of the menu.
   *
   * Removes all event listeners, clears all timeouts, removes the menu from storage, and deletes the menu instance.
   */
  dispose() {
    this._removeEventListeners(), this._clearTimeouts(), this._unstore(), delete this;
  }
}
class P extends F {
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
    isSubmenuItem: i = !1,
    childMenu: r = null,
    toggle: o = null,
    initialize: h = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: i,
      childMenu: r,
      toggle: o
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
class R extends Q {
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
    parentMenu: i = null,
    initialize: r = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: i
    }), r && this.initialize();
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
class q extends M {
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
  _MenuItemType = P;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TreeviewToggle}
   */
  _MenuToggleType = R;
  /**
   * Constructs a new `Treeview`.
   *
   * @param {object}             options                                     - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                         - The menu element in the DOM.
   * @param {string}             [options.menuItemsSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinksSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemsSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuTogglesSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenusSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]          - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]           - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                  - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                 - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?Treeview}          [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint that the menu will automatically open/close itself at.
   * @param {string}             [options.mediaQuery = '']                   - The media query to use to trigger media query list events.
   * @param {boolean}            [options.autoOpen = true]                   - A flag to auto open the menu when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                 - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemsSelector: t = "li",
    menuLinksSelector: s = "a",
    submenuItemsSelector: i = "li:has(ul)",
    submenuTogglesSelector: r = "a",
    submenusSelector: o = "ul",
    controllerElement: h = null,
    containerElement: d = null,
    openClass: a = "show",
    closeClass: c = "hide",
    transitionClass: m = "transitioning",
    transitionDuration: E = 250,
    isTopLevel: T = !0,
    parentMenu: C = null,
    hoverType: g = "off",
    hoverDelay: v = 250,
    enterDelay: w = -1,
    leaveDelay: k = -1,
    breakpoint: S = "",
    mediaQuery: D = "",
    autoOpen: I = !0,
    prefix: L = "am-",
    key: O = null,
    initialize: A = !0
  }) {
    super({
      menuElement: e,
      menuItemsSelector: t,
      menuLinksSelector: s,
      submenuItemsSelector: i,
      submenuTogglesSelector: r,
      submenusSelector: o,
      controllerElement: h,
      containerElement: d,
      openClass: a,
      closeClass: c,
      transitionClass: m,
      transitionDuration: E,
      isTopLevel: T,
      parentMenu: C,
      hoverType: g,
      hoverDelay: v,
      enterDelay: w,
      leaveDelay: k,
      breakpoint: S,
      mediaQuery: D,
      autoOpen: I,
      prefix: L,
      key: O
    }), A && this.initialize();
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
      super.initialize(), this.isTopLevel ? (this.dom.menu.setAttribute("role", "tree"), this.elements.menuItems[0].dom.link.tabIndex = 0) : this.dom.menu.setAttribute("role", "group"), this._handleMediaMatch(), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup(), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.removeAttribute("aria-owns");
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
      this._addEventListener("pointerenter", e.dom.link, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 && this._clearTimeout())));
      }), e.isSubmenuItem && (this._addEventListener("pointerleave", e.dom.item, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 && this._clearTimeout() : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), this._addEventListener("pointerenter", e.dom.item, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
      })), this.isTopLevel && this._addEventListener("pointerleave", this.dom.menu, (s) => {
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
    super._handleKeydown(), this._addEventListener("keydown", this.dom.menu, (e) => {
      this.currentEvent = "keyboard";
      const t = b(e);
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
        ], i = ["ArrowRight"], r = ["Escape"];
        (s.includes(t) || this.currentMenuItem.isSubmenuItem && i.includes(t) || this.elements.controller && r.includes(t)) && u(e);
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
    super._handleKeyup(), this._addEventListener("keyup", this.dom.menu, (e) => {
      this.currentEvent = "keyboard";
      const t = b(e), { altKey: s, crtlKey: i, metaKey: r } = e;
      if (t === "Character" && !(s || i || r))
        u(e), this.elements.rootMenu.currentEvent = "character", this.focusNextNodeWithCharacter(e.key);
      else if (this.focusState === "self")
        if (t === "Enter" || t === "Space")
          u(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click();
        else if (t === "Escape")
          this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController());
        else if (t === "ArrowDown")
          u(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : !this.isTopLevel && this.currentChild === this.elements.menuItems.length - 1 ? this.focusParentsNextChild() : this.focusNextChild();
        else if (t === "ArrowUp") {
          u(e);
          const h = this.elements.menuItems[this.currentChild - 1];
          h && h.isSubmenuItem && h.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentChild = this.currentChild - 1, this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.focusChildsLastNode()) : !this.isTopLevel && this.currentChild === 0 ? (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild()) : this.focusPreviousChild();
        } else t === "ArrowRight" ? this.currentMenuItem.isSubmenuItem && (u(e), this.currentMenuItem.elements.toggle.isOpen ? (this.blurCurrentChild(), this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent, this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.currentMenuItem.elements.toggle.preview()) : t === "ArrowLeft" ? (u(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.blurCurrentChild(), this.currentMenuItem.elements.toggle.close()) : this.isTopLevel || (this.blurCurrentChild(), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.focusCurrentChild())) : t === "Home" ? (u(e), this.blurCurrentChild(), this.elements.rootMenu.focusFirstChild()) : t === "End" ? (u(e), this.blurCurrentChild(), this.elements.rootMenu.focusLastNode()) : t === "Asterisk" && (u(e), this.openChildren());
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
      let c = [];
      return a.elements.menuItems.forEach((m) => {
        c.push(m), m.isSubmenuItem && m.elements.toggle.isOpen && (c = [
          ...c,
          ...t(
            m.elements.toggle.elements.controlledMenu
          )
        ]);
      }), c;
    }
    const s = e.toLowerCase(), i = t(this.elements.rootMenu), r = i.indexOf(this.currentMenuItem) + 1, o = [
      ...i.slice(r),
      ...i.slice(0, r)
    ];
    let h = 0, d = !1;
    for (; !d && h < o.length; ) {
      let a = "";
      if (o[h].dom.item.innerText ? a = o[h].dom.item.innerText : a = o[h].dom.item.textContent, a = a.replace(/[\s]/g, "").toLowerCase().charAt(0), a === s) {
        d = !0;
        const c = o[h].elements.parentMenu, m = c.elements.menuItems.indexOf(o[h]);
        this.elements.rootMenu.blurChildren(), c.focusChild(m);
      }
      h++;
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
export {
  q as default
};
