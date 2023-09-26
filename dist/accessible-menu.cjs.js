"use strict";
var N = Object.defineProperty;
var j = (r, t, e) =>
  t in r
    ? N(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (r[t] = e);
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
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
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
      if (s !== r) throw new TypeError(`${e} must be a ${r}. "${s}" given.`);
    }
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
  }
}
function D(r) {
  try {
    if (typeof r != "object") {
      const t = typeof r;
      throw new TypeError(
        `Values given to isCSSSelector() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in r)
      try {
        if (r[t] === null) throw new Error();
        document.querySelector(r[t]);
      } catch {
        throw new TypeError(
          `${t} must be a valid CSS selector. "${r[t]}" given.`
        );
      }
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
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
        (s[t] = r[t]), D(s);
      }
    }
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
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
          `${e} must be one of the following values: ${t.join(", ")}. "${
            r[e]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
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
          `${e} must be one of the following values: ${t.join(", ")}. "${
            r[e]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
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
          `${e} must be one of the following values: ${t.join(", ")}. "${
            r[e]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
  }
}
function R(r, t) {
  if (p("string", { tagName: r }).status && k(HTMLElement, t).status) {
    const e = r.toLowerCase();
    let s = !0;
    for (const n in t) t[n].tagName.toLowerCase() !== e && (s = !1);
    return s;
  } else return !1;
}
class L {
  constructor({
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
  }) {
    u(this, "_dom", { toggle: null, parent: null });
    u(this, "_elements", { controlledMenu: null, parentMenu: null });
    u(this, "_open", !1);
    u(
      this,
      "_expandEvent",
      new CustomEvent("accessibleMenuExpand", {
        bubbles: !0,
        detail: { toggle: this },
      })
    );
    u(
      this,
      "_collapseEvent",
      new CustomEvent("accessibleMenuCollapse", {
        bubbles: !0,
        detail: { toggle: this },
      })
    );
    (this._dom.toggle = t),
      (this._dom.parent = e),
      (this._elements.controlledMenu = s),
      (this._elements.parentMenu = n);
  }
  initialize() {
    var t;
    if (
      (this.dom.toggle.setAttribute("aria-haspopup", "true"),
      this.dom.toggle.setAttribute("aria-expanded", "false"),
      R("button", { toggle: this.dom.toggle }) ||
        this.dom.toggle.setAttribute("role", "button"),
      this.dom.toggle.id === "" ||
        this.elements.controlledMenu.dom.menu.id === "")
    ) {
      const e = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10);
      let s =
          ((t = this.dom.toggle.innerText) == null
            ? void 0
            : t.replace(/[^a-zA-Z0-9\s]/g, "")) || "",
        n = e;
      !s.replace(/\s/g, "").length &&
        this.dom.toggle.getAttribute("aria-label") &&
        (s = this.dom.toggle
          .getAttribute("aria-label")
          .replace(/[^a-zA-Z0-9\s]/g, "")),
        s.replace(/\s/g, "").length > 0 &&
          ((s = s.toLowerCase().replace(/\s+/g, "-")),
          s.startsWith("-") && (s = s.substring(1)),
          s.endsWith("-") && (s = s.slice(0, -1)),
          (n = `${s}-${n}`)),
        (this.dom.toggle.id = this.dom.toggle.id || `${n}-menu-button`),
        (this.elements.controlledMenu.dom.menu.id =
          this.elements.controlledMenu.dom.menu.id || `${n}-menu`);
    }
    this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    ),
      this.dom.toggle.setAttribute(
        "aria-controls",
        this.elements.controlledMenu.dom.menu.id
      ),
      this._collapse(!1);
  }
  get dom() {
    return this._dom;
  }
  get elements() {
    return this._elements;
  }
  get isOpen() {
    return this._open;
  }
  set isOpen(t) {
    p("boolean", { value: t }), (this._open = t);
  }
  _expand(t = !0) {
    const {
      closeClass: e,
      openClass: s,
      transitionClass: n,
    } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"),
      n !== ""
        ? (w(n, this.elements.controlledMenu.dom.menu),
          requestAnimationFrame(() => {
            e !== "" && v(e, this.elements.controlledMenu.dom.menu),
              requestAnimationFrame(() => {
                s !== "" && w(s, this.elements.controlledMenu.dom.menu),
                  requestAnimationFrame(() => {
                    v(n, this.elements.controlledMenu.dom.menu);
                  });
              });
          }))
        : (s !== "" && w(s, this.elements.controlledMenu.dom.menu),
          e !== "" && v(e, this.elements.controlledMenu.dom.menu)),
      t && this.dom.toggle.dispatchEvent(this._expandEvent);
  }
  _collapse(t = !0) {
    const {
      closeClass: e,
      openClass: s,
      transitionClass: n,
    } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"),
      n !== ""
        ? (w(n, this.elements.controlledMenu.dom.menu),
          requestAnimationFrame(() => {
            s !== "" && v(s, this.elements.controlledMenu.dom.menu),
              requestAnimationFrame(() => {
                e !== "" && w(e, this.elements.controlledMenu.dom.menu),
                  requestAnimationFrame(() => {
                    v(n, this.elements.controlledMenu.dom.menu);
                  });
              });
          }))
        : (e !== "" && w(e, this.elements.controlledMenu.dom.menu),
          s !== "" && v(s, this.elements.controlledMenu.dom.menu)),
      t && this.dom.toggle.dispatchEvent(this._collapseEvent);
  }
  open() {
    (this.elements.controlledMenu.focusState = "self"),
      this._expand(),
      (this.isOpen = !0);
  }
  preview() {
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"),
      this._expand(),
      (this.isOpen = !0);
  }
  close() {
    this.isOpen &&
      (this.elements.controlledMenu.blur(),
      this.elements.parentMenu &&
        (this.elements.parentMenu.focusState = "self"),
      this._collapse(),
      (this.isOpen = !1));
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  closeSiblings() {
    this.elements.parentMenu &&
      this.elements.parentMenu.elements.submenuToggles.forEach((t) => {
        t !== this && t.close();
      });
  }
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach((t) =>
      t.close()
    );
  }
}
class A {
  constructor({
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
  }) {
    u(this, "_dom", { item: null, link: null });
    u(this, "_elements", { parentMenu: null, childMenu: null, toggle: null });
    u(this, "_submenu", !1);
    (this._dom.item = t),
      (this._dom.link = e),
      (this._elements.parentMenu = s),
      (this._elements.childMenu = i),
      (this._elements.toggle = l),
      (this._submenu = n);
  }
  initialize() {}
  get dom() {
    return this._dom;
  }
  get elements() {
    return this._elements;
  }
  get isSubmenuItem() {
    return this._submenu;
  }
  focus() {
    this.elements.parentMenu.shouldFocus && this.dom.link.focus();
  }
  blur() {
    this.elements.parentMenu.shouldFocus && this.dom.link.blur();
  }
}
function g(r) {
  try {
    const t = r.key || r.keyCode,
      e = {
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
        Asterisk: t === "*" || t === 56,
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
    leaveDelay: _ = -1,
  }) {
    u(this, "_MenuType", T);
    u(this, "_MenuItemType", A);
    u(this, "_MenuToggleType", L);
    u(this, "_dom", {
      menu: null,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: null,
      container: null,
    });
    u(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: "",
    });
    u(this, "_elements", {
      menuItems: [],
      submenuToggles: [],
      controller: null,
      parentMenu: null,
      rootMenu: null,
    });
    u(this, "_openClass", "show");
    u(this, "_closeClass", "hide");
    u(this, "_transitionClass", "transitioning");
    u(this, "_root", !0);
    u(this, "_currentChild", 0);
    u(this, "_focusState", "none");
    u(this, "_currentEvent", "none");
    u(this, "_hoverType", "off");
    u(this, "_hoverDelay", 250);
    u(this, "_enterDelay", -1);
    u(this, "_leaveDelay", -1);
    u(this, "_hoverTimeout", null);
    u(this, "_errors", []);
    (this._dom.menu = t),
      (this._dom.controller = h),
      (this._dom.container = c),
      (this._selectors.menuItems = e),
      (this._selectors.menuLinks = s),
      (this._selectors.submenuItems = n),
      (this._selectors.submenuToggles = i),
      (this._selectors.submenus = l),
      (this._elements.menuItems = []),
      (this._elements.submenuToggles = []),
      (this._elements.controller = null),
      (this._elements.parentMenu = y),
      (this._elements.rootMenu = f ? this : null),
      (this._openClass = m || ""),
      (this._closeClass = a || ""),
      (this._transitionClass = d || ""),
      (this._root = f),
      (this._hoverType = M),
      (this._hoverDelay = C),
      (this._enterDelay = b),
      (this._leaveDelay = _);
  }
  initialize() {
    if (!this._validate())
      throw new Error(`AccesibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(`
 - `)}`);
    if (
      (this.elements.rootMenu === null && this._findRootMenu(this),
      this._setDOMElements(),
      this.isTopLevel && this.dom.controller && this.dom.container)
    ) {
      const t = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        parentElement: this.dom.container,
        controlledMenu: this,
      });
      this._elements.controller = t;
    }
    this._createChildElements();
  }
  get dom() {
    return this._dom;
  }
  get selectors() {
    return this._selectors;
  }
  get elements() {
    return this._elements;
  }
  get isTopLevel() {
    return this._root;
  }
  get openClass() {
    return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
  }
  get closeClass() {
    return this.isTopLevel
      ? this._closeClass
      : this.elements.rootMenu.closeClass;
  }
  get transitionClass() {
    return this.isTopLevel
      ? this._transitionClass
      : this.elements.rootMenu.transitionClass;
  }
  get currentChild() {
    return this._currentChild;
  }
  get focusState() {
    return this._focusState;
  }
  get currentEvent() {
    return this._currentEvent;
  }
  get currentMenuItem() {
    return this.elements.menuItems[this.currentChild];
  }
  get hoverType() {
    return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
  }
  get hoverDelay() {
    return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
  }
  get enterDelay() {
    return this._enterDelay === -1
      ? this.hoverDelay
      : this._root
      ? this._enterDelay
      : this.elements.rootMenu.enterDelay;
  }
  get leaveDelay() {
    return this._leaveDelay === -1
      ? this.hoverDelay
      : this._root
      ? this._leaveDelay
      : this.elements.rootMenu.leaveDelay;
  }
  get shouldFocus() {
    let t = !1;
    return (
      (this.currentEvent === "keyboard" || this.currentEvent === "character") &&
        (t = !0),
      this.currentEvent === "mouse" && this.hoverType === "dynamic" && (t = !0),
      t
    );
  }
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
    S({ transitionClass: t }),
      this._transitionClass !== t && (this._transitionClass = t);
  }
  set currentChild(t) {
    p("number", { value: t });
    function e(s) {
      if (
        ["mouse", "character"].includes(s.currentEvent) &&
        s.elements.parentMenu
      ) {
        let i = 0,
          l = !1;
        for (; !l && i < s.elements.parentMenu.elements.menuItems.length; ) {
          const h = s.elements.parentMenu.elements.menuItems[i];
          h.isSubmenuItem &&
            h.elements.toggle.elements.controlledMenu === s &&
            ((l = !0),
            (s.elements.parentMenu.currentEvent = s.currentEvent),
            (s.elements.parentMenu.currentChild = i)),
            i++;
        }
      }
    }
    t < -1
      ? ((this._currentChild = -1), e(this))
      : t >= this.elements.menuItems.length
      ? ((this._currentChild = this.elements.menuItems.length - 1), e(this))
      : this.focusChild !== t && ((this._currentChild = t), e(this));
  }
  set focusState(t) {
    q({ value: t }),
      this._focusState !== t && (this._focusState = t),
      this.elements.submenuToggles.length > 0 &&
        (t === "self" || t === "none") &&
        this.elements.submenuToggles.forEach((e) => {
          e.elements.controlledMenu.focusState = "none";
        }),
      this.elements.parentMenu &&
        (t === "self" || t === "child") &&
        (this.elements.parentMenu.focusState = "child");
  }
  set currentEvent(t) {
    V({ value: t }),
      this._currentEvent !== t &&
        ((this._currentEvent = t),
        this.elements.submenuToggles.length > 0 &&
          this.elements.submenuToggles.forEach((e) => {
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
  _validate() {
    let t = !0,
      e;
    this._dom.container !== null || this._dom.controller !== null
      ? (e = k(HTMLElement, {
          menuElement: this._dom.menu,
          controllerElement: this._dom.controller,
          containerElement: this._dom.container,
        }))
      : (e = k(HTMLElement, { menuElement: this._dom.menu })),
      e.status || (this._errors.push(e.error.message), (t = !1));
    let s;
    if (
      (this._selectors.submenuItems !== ""
        ? (s = D({
            menuItemSelector: this._selectors.menuItems,
            menuLinkSelector: this._selectors.menuLinks,
            submenuItemSelector: this._selectors.submenuItems,
            submenuToggleSelector: this._selectors.submenuToggles,
            submenuSelector: this._selectors.submenus,
          }))
        : (s = D({
            menuItemSelector: this._selectors.menuItems,
            menuLinkSelector: this._selectors.menuLinks,
          })),
      s.status || (this._errors.push(s.error.message), (t = !1)),
      this._openClass !== "")
    ) {
      const m = S({ openClass: this._openClass });
      m.status || (this._errors.push(m.error.message), (t = !1));
    }
    if (this._closeClass !== "") {
      const m = S({ closeClass: this._closeClass });
      m.status || (this._errors.push(m.error.message), (t = !1));
    }
    if (this._transitionClass !== "") {
      const m = S({ transitionClass: this._transitionClass });
      m.status || (this._errors.push(m.error.message), (t = !1));
    }
    const n = p("boolean", { isTopLevel: this._root });
    if (
      (n.status || (this._errors.push(n.error.message), (t = !1)),
      this._elements.parentMenu !== null)
    ) {
      const m = k(T, { parentMenu: this._elements.parentMenu });
      m.status || (this._errors.push(m.error.message), (t = !1));
    }
    const i = z({ hoverType: this._hoverType });
    i.status || (this._errors.push(i.error.message), (t = !1));
    const l = p("number", { hoverDelay: this._hoverDelay });
    l.status || (this._errors.push(l.error.message), (t = !1));
    const h = p("number", { enterDelay: this._enterDelay });
    h.status || (this._errors.push(h.error.message), (t = !1));
    const c = p("number", { leaveDelay: this._leaveDelay });
    return c.status || (this._errors.push(c.error.message), (t = !1)), t;
  }
  _setDOMElementType(t, e = this.dom.menu, s = !0) {
    if (typeof this.selectors[t] == "string") {
      if (!Array.isArray(this.dom[t]))
        throw new Error(
          `AccessibleMenu: The "${t}" element cannot be set through _setDOMElementType.`
        );
      e !== this.dom.menu && k(HTMLElement, { base: e });
      const i = Array.from(e.querySelectorAll(this.selectors[t])).filter(
        (l) => l.parentElement === e
      );
      s ? (this._dom[t] = i) : (this._dom[t] = [...this._dom[t], ...i]);
    } else
      throw new Error(
        `AccessibleMenu: "${t}" is not a valid element type within the menu.`
      );
  }
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
  _setDOMElements() {
    this._setDOMElementType("menuItems"),
      this.selectors.submenuItems !== "" &&
        (this._setDOMElementType("submenuItems"),
        this._resetDOMElementType("submenuToggles"),
        this._resetDOMElementType("submenus"),
        this.dom.submenuItems.forEach((t) => {
          this._setDOMElementType("submenuToggles", t, !1),
            this._setDOMElementType("submenus", t, !1);
        }));
  }
  _findRootMenu(t) {
    if (t.isTopLevel) this._elements.rootMenu = t;
    else if (t.elements.parentMenu !== null)
      this._findRootMenu(t.elements.parentMenu);
    else throw new Error("Cannot find root menu.");
  }
  _createChildElements() {
    this.dom.menuItems.forEach((t) => {
      let e;
      if (this.dom.submenuItems.includes(t)) {
        const s = t.querySelector(this.selectors.submenuToggles),
          n = t.querySelector(this.selectors.submenus),
          i = new this._MenuType({
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
            leaveDelay: this.leaveDelay,
          }),
          l = new this._MenuToggleType({
            menuToggleElement: s,
            parentElement: t,
            controlledMenu: i,
            parentMenu: this,
          });
        this._elements.submenuToggles.push(l),
          (e = new this._MenuItemType({
            menuItemElement: t,
            menuLinkElement: s,
            parentMenu: this,
            isSubmenuItem: !0,
            childMenu: i,
            toggle: l,
          }));
      } else {
        const s = t.querySelector(this.selectors.menuLinks);
        e = new this._MenuItemType({
          menuItemElement: t,
          menuLinkElement: s,
          parentMenu: this,
        });
      }
      this._elements.menuItems.push(e);
    });
  }
  _handleFocus() {
    this.elements.menuItems.forEach((t, e) => {
      t.dom.link.addEventListener("focus", () => {
        (this.focusState = "self"), (this.currentChild = e);
      });
    });
  }
  _handleClick() {
    function t(e, s, n) {
      o(n),
        s.toggle(),
        s.isOpen &&
          ((e.focusState = "self"),
          (s.elements.controlledMenu.focusState = "none"));
    }
    this.elements.menuItems.forEach((e, s) => {
      e.dom.link.addEventListener(
        "pointerdown",
        () => {
          (this.currentEvent = "mouse"),
            this.elements.rootMenu.blurChildren(),
            this.focusChild(s);
        },
        { passive: !0 }
      ),
        e.isSubmenuItem &&
          e.elements.toggle.dom.toggle.addEventListener("pointerup", (n) => {
            (this.currentEvent = "mouse"), t(this, e.elements.toggle, n);
          });
    }),
      this.isTopLevel &&
        this.elements.controller &&
        this.elements.controller.dom.toggle.addEventListener(
          "pointerup",
          (e) => {
            (this.currentEvent = "mouse"), t(this, this.elements.controller, e);
          }
        );
  }
  _handleHover() {
    this.elements.menuItems.forEach((t, e) => {
      t.dom.link.addEventListener("pointerenter", (s) => {
        if (!(s.pointerType === "pen" || s.pointerType === "touch")) {
          if (this.hoverType === "on")
            (this.currentEvent = "mouse"),
              this.elements.rootMenu.blurChildren(),
              this.focusChild(e),
              t.isSubmenuItem &&
                (this.enterDelay > 0
                  ? (this._hoverTimeout = setTimeout(() => {
                      t.elements.toggle.preview();
                    }, this.enterDelay))
                  : t.elements.toggle.preview());
          else if (this.hoverType === "dynamic") {
            const n = this.elements.submenuToggles.some((i) => i.isOpen);
            (this.currentChild = e),
              (!this.isTopLevel || this.focusState !== "none") &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild()),
              t.isSubmenuItem &&
                (!this.isTopLevel || n) &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild(),
                this.enterDelay > 0
                  ? (this._hoverTimeout = setTimeout(() => {
                      t.elements.toggle.preview();
                    }, this.enterDelay))
                  : t.elements.toggle.preview());
          }
        }
      }),
        t.isSubmenuItem &&
          t.dom.item.addEventListener("pointerleave", (s) => {
            s.pointerType === "pen" ||
              s.pointerType === "touch" ||
              (this.hoverType === "on"
                ? this.leaveDelay > 0
                  ? (clearTimeout(this._hoverTimeout),
                    setTimeout(() => {
                      (this.currentEvent = "mouse"), t.elements.toggle.close();
                    }, this.leaveDelay))
                  : ((this.currentEvent = "mouse"), t.elements.toggle.close())
                : this.hoverType === "dynamic" &&
                  (this.isTopLevel ||
                    (this.leaveDelay > 0
                      ? (clearTimeout(this._hoverTimeout),
                        setTimeout(() => {
                          (this.currentEvent = "mouse"),
                            t.elements.toggle.close(),
                            this.focusCurrentChild();
                        }, this.leaveDelay))
                      : ((this.currentEvent = "mouse"),
                        t.elements.toggle.close(),
                        this.focusCurrentChild()))));
          });
    });
  }
  _handleKeydown() {
    this.isTopLevel &&
      this.elements.controller &&
      this.elements.controller.dom.toggle.addEventListener("keydown", (t) => {
        this.currentEvent = "keyboard";
        const e = g(t);
        (e === "Space" || e === "Enter") && o(t);
      });
  }
  _handleKeyup() {
    this.isTopLevel &&
      this.elements.controller &&
      this.elements.controller.dom.toggle.addEventListener("keyup", (t) => {
        this.currentEvent = "keyboard";
        const e = g(t);
        (e === "Space" || e === "Enter") &&
          (o(t),
          this.elements.controller.toggle(),
          this.elements.controller.isOpen && this.focusFirstChild());
      });
  }
  focus() {
    (this.focusState = "self"), this.shouldFocus && this.dom.menu.focus();
  }
  blur() {
    (this.focusState = "none"), this.shouldFocus && this.dom.menu.blur();
  }
  focusCurrentChild() {
    (this.focusState = "self"),
      this.currentChild !== -1 && this.currentMenuItem.focus();
  }
  focusChild(t) {
    this.blurCurrentChild(), (this.currentChild = t), this.focusCurrentChild();
  }
  focusFirstChild() {
    this.focusChild(0);
  }
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }
  focusNextChild() {
    this.currentChild < this.elements.menuItems.length - 1
      ? this.focusChild(this.currentChild + 1)
      : this.focusCurrentChild();
  }
  focusPreviousChild() {
    this.currentChild > 0
      ? this.focusChild(this.currentChild - 1)
      : this.focusCurrentChild();
  }
  blurCurrentChild() {
    (this.focusState = "none"),
      this.currentChild !== -1 && this.currentMenuItem.blur();
  }
  focusController() {
    this.dom.controller &&
      (this.shouldFocus && this.dom.controller.focus(),
      (this.focusState = "none"));
  }
  focusContainer() {
    this.dom.container &&
      (this.shouldFocus && this.dom.container.focus(),
      (this.focusState = "none"));
  }
  closeChildren() {
    this.elements.submenuToggles.forEach((t) => t.close());
  }
  blurChildren() {
    this.elements.menuItems.forEach((t) => {
      t.blur(), t.isSubmenuItem && t.elements.childMenu.blurChildren();
    });
  }
}
class P extends A {
  constructor({
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0,
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l,
    }),
      h && this.initialize();
  }
}
class U extends L {
  constructor({
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0,
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n,
    }),
      i && this.initialize();
  }
  open() {
    this.closeSiblings(), super.open();
  }
  preview() {
    this.closeSiblings(), super.preview();
  }
  close() {
    this.isOpen && this.closeChildren(), super.close();
  }
}
class x extends T {
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
    optionalKeySupport: I = !1,
    initialize: O = !0,
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
      leaveDelay: E,
    });
    u(this, "_MenuType", x);
    u(this, "_MenuItemType", P);
    u(this, "_MenuToggleType", U);
    u(this, "_currentChild", -1);
    u(this, "_optionalSupport", !1);
    (this._optionalSupport = I), O && this.initialize();
  }
  initialize() {
    try {
      super.initialize(),
        this._handleFocus(),
        this._handleClick(),
        this._handleHover(),
        this._handleKeydown(),
        this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
  }
  get optionalKeySupport() {
    return this.isTopLevel
      ? this._optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }
  set optionalKeySupport(e) {
    p("boolean", { optionalKeySupport: e }), (this._optionalSupport = e);
  }
  _validate() {
    let e = super._validate();
    const s = p("boolean", { optionalKeySupport: this._optionalSupport });
    return s.status || (this._errors.push(s.error.message), (e = !1)), e;
  }
  _handleClick() {
    super._handleClick(),
      document.addEventListener("pointerup", (e) => {
        this.focusState !== "none" &&
          ((this.currentEvent = "mouse"),
          !this.dom.menu.contains(e.target) &&
            !this.dom.menu !== e.target &&
            (this.closeChildren(),
            this.blur(),
            this.elements.controller && this.elements.controller.close()));
      });
  }
  _handleKeydown() {
    super._handleKeydown(),
      this.dom.menu.addEventListener("keydown", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        if (this.focusState === "self") {
          const n = ["Space", "Enter"],
            i = ["Escape"],
            l = ["Escape"];
          this.optionalKeySupport
            ? [
                "ArrowUp",
                "ArrowRight",
                "ArrowDown",
                "ArrowLeft",
                "Home",
                "End",
              ].includes(s) && o(e)
            : ((this.currentMenuItem.isSubmenuItem && n.includes(s)) ||
                (this.elements.controller && i.includes(s)) ||
                (this.elements.parentMenu && l.includes(s))) &&
              o(e);
        }
      });
  }
  _handleKeyup() {
    super._handleKeyup(),
      this.dom.menu.addEventListener("keyup", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        this.focusState === "self" &&
          (s === "Space" || s === "Enter"
            ? this.currentMenuItem.isSubmenuItem
              ? (o(e),
                this.currentMenuItem.elements.toggle.isOpen
                  ? this.currentMenuItem.elements.toggle.close()
                  : this.currentMenuItem.elements.toggle.preview())
              : this.currentMenuItem.dom.link.click()
            : s === "Escape"
            ? this.elements.submenuToggles.some((i) => i.isOpen)
              ? (o(e), this.closeChildren())
              : this.elements.parentMenu
              ? (o(e),
                (this.elements.parentMenu.currentEvent = this.currentEvent),
                this.elements.parentMenu.closeChildren(),
                this.elements.parentMenu.focusCurrentChild())
              : this.isTopLevel &&
                this.elements.controller &&
                this.elements.controller.isOpen &&
                (this.elements.controller.close(), this.focusController())
            : this.optionalKeySupport &&
              (s === "ArrowDown" || s === "ArrowRight"
                ? (o(e),
                  this.currentMenuItem.isSubmenuItem &&
                  this.currentMenuItem.elements.toggle.isOpen
                    ? ((this.currentMenuItem.elements.childMenu.currentEvent =
                        "keyboard"),
                      this.currentMenuItem.elements.childMenu.focusFirstChild())
                    : this.focusNextChild())
                : s === "ArrowUp" || s === "ArrowLeft"
                ? (o(e), this.focusPreviousChild())
                : s === "Home"
                ? (o(e), this.focusFirstChild())
                : s === "End" && (o(e), this.focusLastChild())));
      });
  }
}
class W extends A {
  constructor({
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0,
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l,
    }),
      h && this.initialize();
  }
  initialize() {
    super.initialize(),
      this.dom.item.setAttribute("role", "none"),
      this.dom.link.setAttribute("role", "menuitem"),
      (this.dom.link.tabIndex = -1);
  }
  focus() {
    super.focus(),
      this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = 0);
  }
  blur() {
    super.blur(),
      this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = -1);
  }
}
class Z extends L {
  constructor({
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0,
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n,
    }),
      i && this.initialize();
  }
  open() {
    this.closeSiblings(), super.open();
  }
  preview() {
    this.closeSiblings(), super.preview();
  }
  close() {
    this.isOpen &&
      (this.closeChildren(),
      this.elements.parentMenu && this.elements.parentMenu.focusCurrentChild()),
      super.close();
  }
}
class K extends T {
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
    initialize: I = !0,
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
      leaveDelay: E,
    });
    u(this, "_MenuType", K);
    u(this, "_MenuItemType", W);
    u(this, "_MenuToggleType", Z);
    I && this.initialize();
  }
  initialize() {
    try {
      super.initialize(),
        this.isTopLevel
          ? this.dom.menu.setAttribute("role", "menubar")
          : this.dom.menu.setAttribute("role", "menu"),
        this._handleFocus(),
        this._handleClick(),
        this._handleHover(),
        this._handleKeydown(),
        this._handleKeyup(),
        this.isTopLevel && (this.elements.menuItems[0].dom.link.tabIndex = 0);
    } catch (e) {
      console.error(e);
    }
  }
  _handleClick() {
    super._handleClick(),
      document.addEventListener("pointerup", (e) => {
        this.focusState !== "none" &&
          ((this.currentEvent = "mouse"),
          !this.dom.menu.contains(e.target) &&
            !this.dom.menu !== e.target &&
            (this.closeChildren(),
            this.blur(),
            this.elements.controller && this.elements.controller.close()));
      });
  }
  _handleKeydown() {
    super._handleKeydown(),
      this.dom.menu.addEventListener("keydown", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        if (
          (s === "Tab" &&
            (this.elements.rootMenu.focusState !== "none"
              ? (this.elements.rootMenu.blur(),
                this.elements.rootMenu.closeChildren())
              : this.elements.rootMenu.focus()),
          s === "Character")
        )
          o(e);
        else if (this.isTopLevel) {
          if (this.focusState === "self") {
            const n = ["ArrowRight", "ArrowLeft", "Home", "End"],
              i = ["Space", "Enter", "ArrowDown", "ArrowUp"],
              l = ["Escape"];
            (n.includes(s) ||
              (this.currentMenuItem.isSubmenuItem && i.includes(s)) ||
              (this.elements.controller && l.includes(s))) &&
              o(e);
          }
        } else {
          const n = [
              "Escape",
              "ArrowRight",
              "ArrowLeft",
              "ArrowDown",
              "ArrowUp",
              "Home",
              "End",
            ],
            i = ["Space", "Enter"];
          (n.includes(s) ||
            (this.currentMenuItem.isSubmenuItem && i.includes(s))) &&
            o(e);
        }
      });
  }
  _handleKeyup() {
    super._handleKeyup(),
      this.dom.menu.addEventListener("keyup", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e),
          { altKey: n, crtlKey: i, metaKey: l } = e;
        if (s === "Character" && !(n || i || l))
          o(e),
            (this.elements.rootMenu.currentEvent = "character"),
            this.focusNextChildWithCharacter(e.key);
        else if (this.isTopLevel) {
          if (this.focusState === "self")
            if (s === "Space" || s === "Enter")
              this.currentMenuItem.isSubmenuItem
                ? (o(e),
                  (this.currentMenuItem.elements.childMenu.currentEvent =
                    "keyboard"),
                  this.currentMenuItem.elements.toggle.open(),
                  requestAnimationFrame(() => {
                    this.currentMenuItem.elements.childMenu.focusFirstChild();
                  }))
                : this.currentMenuItem.dom.link.click();
            else if (s === "ArrowRight") {
              o(e);
              const c =
                this.currentMenuItem.isSubmenuItem &&
                this.currentMenuItem.elements.toggle.isOpen;
              this.focusNextChild(),
                c &&
                  (this.currentMenuItem.isSubmenuItem
                    ? ((this.currentMenuItem.elements.childMenu.currentEvent =
                        "keyboard"),
                      this.currentMenuItem.elements.toggle.preview())
                    : this.closeChildren());
            } else if (s === "ArrowLeft") {
              o(e);
              const c =
                this.currentMenuItem.isSubmenuItem &&
                this.currentMenuItem.elements.toggle.isOpen;
              this.focusPreviousChild(),
                c &&
                  (this.currentMenuItem.isSubmenuItem
                    ? ((this.currentMenuItem.elements.childMenu.currentEvent =
                        "keyboard"),
                      this.currentMenuItem.elements.toggle.preview())
                    : this.closeChildren());
            } else
              s === "ArrowDown"
                ? this.currentMenuItem.isSubmenuItem &&
                  (o(e),
                  (this.currentMenuItem.elements.childMenu.currentEvent =
                    "keyboard"),
                  this.currentMenuItem.elements.toggle.open(),
                  requestAnimationFrame(() => {
                    this.currentMenuItem.elements.childMenu.focusFirstChild();
                  }))
                : s === "ArrowUp"
                ? this.currentMenuItem.isSubmenuItem &&
                  (o(e),
                  (this.currentMenuItem.elements.childMenu.currentEvent =
                    "keyboard"),
                  this.currentMenuItem.elements.toggle.open(),
                  requestAnimationFrame(() => {
                    this.currentMenuItem.elements.childMenu.focusLastChild();
                  }))
                : s === "Home"
                ? (o(e), this.focusFirstChild())
                : s === "End"
                ? (o(e), this.focusLastChild())
                : s === "Escape" &&
                  (this.elements.submenuToggles.some((m) => m.isOpen)
                    ? (o(e), this.closeChildren())
                    : this.isTopLevel &&
                      this.elements.controller &&
                      this.elements.controller.isOpen &&
                      (o(e),
                      this.elements.controller.close(),
                      this.focusController()));
        } else
          s === "Space" || s === "Enter"
            ? this.currentMenuItem.isSubmenuItem
              ? (o(e),
                (this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard"),
                this.currentMenuItem.elements.toggle.open(),
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                }))
              : this.currentMenuItem.dom.link.click()
            : s === "Escape"
            ? (o(e),
              this.elements.rootMenu.closeChildren(),
              this.elements.rootMenu.focusCurrentChild())
            : s === "ArrowRight"
            ? this.currentMenuItem.isSubmenuItem
              ? (o(e),
                (this.currentMenuItem.elements.childMenu.currentEvent =
                  "keyboard"),
                this.currentMenuItem.elements.toggle.open(),
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                }))
              : (o(e),
                this.elements.rootMenu.closeChildren(),
                this.elements.rootMenu.focusNextChild(),
                this.elements.rootMenu.currentMenuItem.isSubmenuItem &&
                  this.elements.rootMenu.currentMenuItem.elements.toggle.preview())
            : s === "ArrowLeft"
            ? this.elements.parentMenu.currentMenuItem.isSubmenuItem &&
              (o(e),
              this.elements.parentMenu.currentMenuItem.elements.toggle.close(),
              this.elements.parentMenu.focusCurrentChild(),
              this.elements.parentMenu === this.elements.rootMenu &&
                (this.elements.rootMenu.closeChildren(),
                this.elements.rootMenu.focusPreviousChild(),
                this.elements.rootMenu.currentMenuItem.isSubmenuItem &&
                  ((this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent =
                    "keyboard"),
                  this.elements.rootMenu.currentMenuItem.elements.toggle.preview())))
            : s === "ArrowDown"
            ? (o(e), this.focusNextChild())
            : s === "ArrowUp"
            ? (o(e), this.focusPreviousChild())
            : s === "Home"
            ? (o(e), this.focusFirstChild())
            : s === "End" && (o(e), this.focusLastChild());
      });
  }
  focusNextChild() {
    this.currentChild === this.elements.menuItems.length - 1
      ? this.focusFirstChild()
      : this.focusChild(this.currentChild + 1);
  }
  focusPreviousChild() {
    this.currentChild === 0
      ? this.focusLastChild()
      : this.focusChild(this.currentChild - 1);
  }
  focusNextChildWithCharacter(e) {
    const s = e.toLowerCase();
    let n = this.currentChild + 1,
      i = !1;
    for (; !i && n < this.elements.menuItems.length; ) {
      let l = "";
      this.elements.menuItems[n].dom.item.innerText
        ? (l = this.elements.menuItems[n].dom.item.innerText)
        : (l = this.elements.menuItems[n].dom.item.textContent),
        (l = l.replace(/[\s]/g, "").toLowerCase().charAt(0)),
        l === s && ((i = !0), this.focusChild(n)),
        n++;
    }
  }
}
class B extends A {
  constructor({
    menuItemElement: e,
    menuLinkElement: s,
    parentMenu: n,
    isSubmenuItem: i = !1,
    childMenu: l = null,
    toggle: h = null,
    initialize: c = !0,
    submenuSibling: m = null,
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: s,
      parentMenu: n,
      isSubmenuItem: i,
      childMenu: l,
      toggle: h,
    });
    u(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null,
      sibling: null,
    });
    (this._elements.parentMenu = n),
      (this._elements.childMenu = l),
      (this._elements.toggle = h),
      (this._elements.sibling = m),
      c && this.initialize();
  }
}
class G extends L {
  constructor({
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0,
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n,
    }),
      i && this.initialize();
  }
  open() {
    this.closeSiblings(), super.open();
  }
  preview() {
    this.closeSiblings(), super.preview();
  }
  close() {
    this.isOpen && this.closeChildren(), super.close();
  }
}
class F extends T {
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
    initialize: H = !0,
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
      leaveDelay: I,
    });
    u(this, "_MenuType", F);
    u(this, "_MenuItemType", B);
    u(this, "_MenuToggleType", G);
    u(this, "_currentChild", -1);
    u(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: "",
      submenuSubtoggles: "",
    });
    u(this, "_optionalSupport", !1);
    (this._optionalSupport = O),
      (this._selectors.menuItems = s),
      (this._selectors.submenuItems = i),
      (this._selectors.submenuToggles = l),
      (this._selectors.submenus = h),
      (this._selectors.submenuSubtoggles = c),
      (this._selectors.menuLinks = [...new Set([n, l])].join(",")),
      H && this.initialize();
  }
  initialize() {
    try {
      super.initialize(),
        this._handleFocus(),
        this._handleClick(),
        this._handleHover(),
        this._handleKeydown(),
        this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
  }
  get optionalKeySupport() {
    return this.isTopLevel
      ? this._optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }
  set optionalKeySupport(e) {
    p("boolean", { optionalKeySupport: e }), (this._optionalSupport = e);
  }
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let s, n;
      const i = e.querySelector(this.selectors.menuLinks);
      if (this.dom.submenuItems.includes(e)) {
        const l = e.querySelector(this.selectors.submenuToggles),
          h = e.querySelector(this.selectors.submenus),
          c = new this._MenuType({
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
            leaveDelay: this.leaveDelay,
          }),
          m = new this._MenuToggleType({
            menuToggleElement: l,
            parentElement: e,
            controlledMenu: c,
            parentMenu: this,
          });
        this._elements.submenuToggles.push(m),
          l !== i
            ? ((n = new this._MenuItemType({
                menuItemElement: e,
                menuLinkElement: l,
                parentMenu: this,
                isSubmenuItem: !0,
                childMenu: c,
                toggle: m,
              })),
              (s = new this._MenuItemType({
                menuItemElement: e,
                menuLinkElement: i,
                parentMenu: this,
                submenuSibling: n,
              })))
            : (s = new this._MenuItemType({
                menuItemElement: e,
                menuLinkElement: i,
                parentMenu: this,
                isSubmenuItem: !0,
                childMenu: c,
                toggle: m,
              }));
      } else
        s = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: i,
          parentMenu: this,
        });
      this._elements.menuItems.push(s),
        typeof n < "u" && this._elements.menuItems.push(n);
    });
  }
  _validate() {
    let e = super._validate();
    const s = D({
      submenuSubtoggleSelector: this._selectors.submenuSubtoggles,
    });
    s.status || (this._errors.push(s.error.message), (e = !1));
    const n = p("boolean", { optionalKeySupport: this._optionalSupport });
    return n.status || (this._errors.push(n.error.message), (e = !1)), e;
  }
  _handleClick() {
    super._handleClick(),
      document.addEventListener("pointerup", (e) => {
        this.focusState !== "none" &&
          ((this.currentEvent = "mouse"),
          !this.dom.menu.contains(e.target) &&
            !this.dom.menu !== e.target &&
            (this.closeChildren(),
            this.blur(),
            this.elements.controller && this.elements.controller.close()));
      });
  }
  _handleHover() {
    this.elements.menuItems.forEach((e, s) => {
      e.dom.link.addEventListener("pointerenter", (n) => {
        if (!(n.pointerType === "pen" || n.pointerType === "touch")) {
          if (this.hoverType === "on") {
            (this.currentEvent = "mouse"),
              this.elements.rootMenu.blurChildren(),
              this.focusChild(s);
            let i = e.isSubmenuItem ? e.elements.toggle : null;
            if (
              (e.elements.sibling !== null &&
                (i = e.elements.sibling.elements.toggle),
              i === null)
            )
              return;
            this.enterDelay > 0
              ? (clearTimeout(this._hoverTimeout),
                (this._hoverTimeout = setTimeout(() => {
                  i.preview();
                }, this.enterDelay)))
              : i.preview();
          } else if (this.hoverType === "dynamic") {
            const i = this.elements.submenuToggles.some((l) => l.isOpen);
            if (
              ((this.currentChild = s),
              (!this.isTopLevel || this.focusState !== "none") &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild()),
              !this.isTopLevel || i)
            ) {
              (this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild();
              let l = e.isSubmenuItem ? e.elements.toggle : null;
              if (
                (e.elements.sibling !== null &&
                  (l = e.elements.sibling.elements.toggle),
                l === null)
              )
                return;
              this.enterDelay > 0
                ? (clearTimeout(this._hoverTimeout),
                  (this._hoverTimeout = setTimeout(() => {
                    l.preview();
                  }, this.enterDelay)))
                : l.preview();
            }
          }
        }
      }),
        e.isSubmenuItem &&
          e.dom.item.addEventListener("pointerleave", (n) => {
            n.pointerType === "pen" ||
              n.pointerType === "touch" ||
              (this.hoverType === "on"
                ? this.leaveDelay > 0
                  ? (clearTimeout(this._hoverTimeout),
                    setTimeout(() => {
                      (this.currentEvent = "mouse"), e.elements.toggle.close();
                    }, this.leaveDelay))
                  : ((this.currentEvent = "mouse"), e.elements.toggle.close())
                : this.hoverType === "dynamic" &&
                  (this.isTopLevel ||
                    (this.leaveDelay > 0
                      ? (clearTimeout(this._hoverTimeout),
                        setTimeout(() => {
                          (this.currentEvent = "mouse"),
                            e.elements.toggle.close(),
                            this.focusCurrentChild();
                        }, this.leaveDelay))
                      : ((this.currentEvent = "mouse"),
                        e.elements.toggle.close(),
                        this.focusCurrentChild()))));
          });
    });
  }
  _handleKeydown() {
    super._handleKeydown(),
      this.dom.menu.addEventListener("keydown", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        if (this.focusState === "self") {
          const n = ["Space", "Enter"],
            i = ["Escape"],
            l = ["Escape"];
          this.optionalKeySupport
            ? [
                "ArrowUp",
                "ArrowRight",
                "ArrowDown",
                "ArrowLeft",
                "Home",
                "End",
              ].includes(s) && o(e)
            : ((this.currentMenuItem.isSubmenuItem && n.includes(s)) ||
                (this.elements.controller && i.includes(s)) ||
                (this.elements.parentMenu && l.includes(s))) &&
              o(e);
        }
      });
  }
  _handleKeyup() {
    super._handleKeyup(),
      this.dom.menu.addEventListener("keyup", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        this.focusState === "self" &&
          (s === "Space" || s === "Enter"
            ? this.currentMenuItem.isSubmenuItem
              ? (o(e),
                this.currentMenuItem.elements.toggle.isOpen
                  ? this.currentMenuItem.elements.toggle.close()
                  : this.currentMenuItem.elements.toggle.preview())
              : this.currentMenuItem.dom.link.click()
            : s === "Escape"
            ? this.elements.submenuToggles.some((i) => i.isOpen)
              ? (o(e), this.closeChildren())
              : this.elements.parentMenu
              ? (o(e),
                (this.elements.parentMenu.currentEvent = this.currentEvent),
                this.elements.parentMenu.closeChildren(),
                this.elements.parentMenu.focusCurrentChild())
              : this.isTopLevel &&
                this.elements.controller &&
                this.elements.controller.isOpen &&
                (this.elements.controller.close(), this.focusController())
            : this.optionalKeySupport &&
              (s === "ArrowDown" || s === "ArrowRight"
                ? (o(e),
                  this.currentMenuItem.isSubmenuItem &&
                  this.currentMenuItem.elements.toggle.isOpen
                    ? ((this.currentMenuItem.elements.childMenu.currentEvent =
                        "keyboard"),
                      this.currentMenuItem.elements.childMenu.focusFirstChild())
                    : this.focusNextChild())
                : s === "ArrowUp" || s === "ArrowLeft"
                ? (o(e), this.focusPreviousChild())
                : s === "Home"
                ? (o(e), this.focusFirstChild())
                : s === "End" && (o(e), this.focusLastChild())));
      });
  }
}
class J extends A {
  constructor({
    menuItemElement: t,
    menuLinkElement: e,
    parentMenu: s,
    isSubmenuItem: n = !1,
    childMenu: i = null,
    toggle: l = null,
    initialize: h = !0,
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: e,
      parentMenu: s,
      isSubmenuItem: n,
      childMenu: i,
      toggle: l,
    }),
      h && this.initialize();
  }
  initialize() {
    super.initialize(),
      this.dom.item.setAttribute("role", "none"),
      this.dom.link.setAttribute("role", "treeitem"),
      (this.dom.link.tabIndex = -1);
  }
  focus() {
    super.focus(), (this.dom.link.tabIndex = 0);
  }
  blur() {
    super.blur(), (this.dom.link.tabIndex = -1);
  }
}
class Q extends L {
  constructor({
    menuToggleElement: t,
    parentElement: e,
    controlledMenu: s,
    parentMenu: n = null,
    initialize: i = !0,
  }) {
    super({
      menuToggleElement: t,
      parentElement: e,
      controlledMenu: s,
      parentMenu: n,
    }),
      i && this.initialize();
  }
}
class $ extends T {
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
    initialize: I = !0,
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
      leaveDelay: E,
    });
    u(this, "_MenuType", $);
    u(this, "_MenuItemType", J);
    u(this, "_MenuToggleType", Q);
    I && this.initialize();
  }
  initialize() {
    try {
      super.initialize(),
        this.isTopLevel
          ? (this.dom.menu.setAttribute("role", "tree"),
            (this.elements.menuItems[0].dom.link.tabIndex = 0))
          : this.dom.menu.setAttribute("role", "group"),
        this._handleFocus(),
        this._handleClick(),
        this._handleHover(),
        this._handleKeydown(),
        this._handleKeyup();
    } catch (e) {
      console.error(e);
    }
  }
  _handleKeydown() {
    super._handleKeydown(),
      this.dom.menu.addEventListener("keydown", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e);
        if (
          (s === "Tab" &&
            (this.elements.rootMenu.focusState !== "none"
              ? this.elements.rootMenu.blur()
              : this.elements.rootMenu.focus()),
          this.focusState === "self")
        ) {
          const n = [
              "Space",
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "Asterisk",
              "Home",
              "End",
            ],
            i = ["Enter", "ArrowRight"],
            l = ["Escape"];
          (n.includes(s) ||
            (this.currentMenuItem.isSubmenuItem && i.includes(s)) ||
            (this.elements.controller && l.includes(s))) &&
            o(e);
        }
      });
  }
  _handleKeyup() {
    super._handleKeyup(),
      this.dom.menu.addEventListener("keyup", (e) => {
        this.currentEvent = "keyboard";
        const s = g(e),
          { altKey: n, crtlKey: i, metaKey: l } = e;
        if (s === "Character" && !(n || i || l))
          o(e),
            (this.elements.rootMenu.currentEvent = "character"),
            this.focusNextNodeWithCharacter(e.key);
        else if (this.focusState === "self")
          if (s === "Enter" || s === "Space")
            o(e),
              this.currentMenuItem.isSubmenuItem
                ? this.currentMenuItem.elements.toggle.isOpen
                  ? this.currentMenuItem.elements.toggle.close()
                  : this.currentMenuItem.elements.toggle.preview()
                : this.currentMenuItem.dom.link.click();
          else if (s === "Escape")
            this.isTopLevel &&
              this.elements.controller &&
              this.elements.controller.isOpen &&
              (this.elements.controller.close(), this.focusController());
          else if (s === "ArrowDown")
            o(e),
              this.currentMenuItem.isSubmenuItem &&
              this.currentMenuItem.elements.toggle.isOpen
                ? (this.blurCurrentChild(),
                  (this.currentMenuItem.elements.childMenu.currentEvent =
                    this.currentEvent),
                  this.currentMenuItem.elements.childMenu.focusFirstChild())
                : !this.isTopLevel &&
                  this.currentChild === this.elements.menuItems.length - 1
                ? this.focusParentsNextChild()
                : this.focusNextChild();
          else if (s === "ArrowUp") {
            o(e);
            const c = this.elements.menuItems[this.currentChild - 1];
            c && c.isSubmenuItem && c.elements.toggle.isOpen
              ? (this.blurCurrentChild(),
                (this.currentChild = this.currentChild - 1),
                (this.currentMenuItem.elements.childMenu.currentEvent =
                  this.currentEvent),
                this.focusChildsLastNode())
              : !this.isTopLevel && this.currentChild === 0
              ? (this.blurCurrentChild(),
                (this.elements.parentMenu.currentEvent = this.currentEvent),
                this.elements.parentMenu.focusCurrentChild())
              : this.focusPreviousChild();
          } else
            s === "ArrowRight"
              ? this.currentMenuItem.isSubmenuItem &&
                (o(e),
                this.currentMenuItem.elements.toggle.isOpen
                  ? (this.blurCurrentChild(),
                    (this.currentMenuItem.elements.childMenu.currentEvent =
                      this.currentEvent),
                    this.currentMenuItem.elements.childMenu.focusFirstChild())
                  : this.currentMenuItem.elements.toggle.preview())
              : s === "ArrowLeft"
              ? (o(e),
                this.currentMenuItem.isSubmenuItem &&
                this.currentMenuItem.elements.toggle.isOpen
                  ? (this.currentMenuItem.elements.childMenu.blurCurrentChild(),
                    this.currentMenuItem.elements.toggle.close())
                  : this.isTopLevel ||
                    (this.blurCurrentChild(),
                    (this.elements.parentMenu.currentEvent = this.currentEvent),
                    this.elements.parentMenu.focusCurrentChild()))
              : s === "Home"
              ? (o(e),
                this.blurCurrentChild(),
                this.elements.rootMenu.focusFirstChild())
              : s === "End"
              ? (o(e),
                this.blurCurrentChild(),
                this.elements.rootMenu.focusLastNode())
              : s === "Asterisk" && (o(e), this.openChildren());
      });
  }
  focusLastNode() {
    const e = this.elements.menuItems.length - 1,
      s = this.elements.menuItems[e];
    s.isSubmenuItem && s.elements.toggle.isOpen
      ? ((this.currentChild = e),
        (s.elements.childMenu.currentEvent = this.currentEvent),
        s.elements.childMenu.focusLastNode())
      : this.focusLastChild();
  }
  openChildren() {
    this.elements.submenuToggles.forEach((e) => e.preview());
  }
  focusNextNodeWithCharacter(e) {
    function s(a) {
      let d = [];
      return (
        a.elements.menuItems.forEach((f) => {
          d.push(f),
            f.isSubmenuItem &&
              f.elements.toggle.isOpen &&
              (d = [...d, ...s(f.elements.toggle.elements.controlledMenu)]);
        }),
        d
      );
    }
    const n = e.toLowerCase(),
      i = s(this.elements.rootMenu),
      l = i.indexOf(this.currentMenuItem) + 1,
      h = [...i.slice(l), ...i.slice(0, l)];
    let c = 0,
      m = !1;
    for (; !m && c < h.length; ) {
      let a = "";
      if (
        (h[c].dom.item.innerText
          ? (a = h[c].dom.item.innerText)
          : (a = h[c].dom.item.textContent),
        (a = a.replace(/[\s]/g, "").toLowerCase().charAt(0)),
        a === n)
      ) {
        m = !0;
        const d = h[c].elements.parentMenu,
          f = d.elements.menuItems.indexOf(h[c]);
        this.elements.rootMenu.blurChildren(), d.focusChild(f);
      }
      c++;
    }
  }
  focusParentsNextChild() {
    this.elements.parentMenu &&
      ((this.elements.parentMenu.currentEvent = this.currentEvent),
      this.elements.parentMenu.currentChild ===
      this.elements.parentMenu.elements.menuItems.length - 1
        ? (this.elements.parentMenu.blurCurrentChild(),
          this.elements.parentMenu.focusParentsNextChild())
        : (this.blurChildren(), this.elements.parentMenu.focusNextChild()));
  }
  focusChildsLastNode() {
    (this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent),
      this.currentMenuItem.elements.childMenu.focusLastChild(),
      this.currentMenuItem.elements.childMenu.currentMenuItem.isSubmenuItem &&
        this.currentMenuItem.elements.childMenu.currentMenuItem.elements.toggle
          .isOpen &&
        (this.currentMenuItem.elements.childMenu.blurCurrentChild(),
        this.currentMenuItem.elements.childMenu.focusChildsLastNode());
  }
}
const X = {
  DisclosureMenu: x,
  Menubar: K,
  TopLinkDisclosureMenu: F,
  Treeview: $,
};
module.exports = X;
