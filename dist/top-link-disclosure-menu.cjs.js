"use strict";
var K = Object.defineProperty;
var V = (n, e, t) =>
  e in n
    ? K(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (n[e] = t);
var r = (n, e, t) => (V(n, typeof e != "symbol" ? e + "" : e, t), t);
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
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
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
      if (s !== n) throw new TypeError(`${t} must be a ${n}. "${s}" given.`);
    }
    return { status: !0, error: null };
  } catch (t) {
    return { status: !1, error: t };
  }
}
function _(n) {
  try {
    if (typeof n != "object") {
      const e = typeof n;
      throw new TypeError(
        `Values given to isCSSSelector() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in n)
      try {
        if (n[e] === null) throw new Error();
        document.querySelector(n[e]);
      } catch {
        throw new TypeError(
          `${e} must be a valid CSS selector. "${n[e]}" given.`
        );
      }
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
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
        (s[e] = n[e]), _(s);
      }
    }
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
  }
}
function x(n) {
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
          `${t} must be one of the following values: ${e.join(", ")}. "${
            n[t]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
  }
}
function q(n) {
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
          `${t} must be one of the following values: ${e.join(", ")}. "${
            n[t]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
  }
}
function L(n) {
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
          `${t} must be one of the following values: ${e.join(", ")}. "${
            n[t]
          }" given.`
        );
    return { status: !0, error: null };
  } catch (e) {
    return { status: !1, error: e };
  }
}
function z(n, e) {
  if (a("string", { tagName: n }).status && g(HTMLElement, e).status) {
    const t = n.toLowerCase();
    let s = !0;
    for (const i in e) e[i].tagName.toLowerCase() !== t && (s = !1);
    return s;
  } else return !1;
}
class I {
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
  }) {
    r(this, "_dom", { toggle: null, parent: null });
    r(this, "_elements", { controlledMenu: null, parentMenu: null });
    r(this, "_open", !1);
    r(
      this,
      "_expandEvent",
      new CustomEvent("accessibleMenuExpand", {
        bubbles: !0,
        detail: { toggle: this },
      })
    );
    r(
      this,
      "_collapseEvent",
      new CustomEvent("accessibleMenuCollapse", {
        bubbles: !0,
        detail: { toggle: this },
      })
    );
    (this._dom.toggle = e),
      (this._dom.parent = t),
      (this._elements.controlledMenu = s),
      (this._elements.parentMenu = i);
  }
  initialize() {
    var e;
    if (
      (this.dom.toggle.setAttribute("aria-haspopup", "true"),
      this.dom.toggle.setAttribute("aria-expanded", "false"),
      z("button", { toggle: this.dom.toggle }) ||
        this.dom.toggle.setAttribute("role", "button"),
      this.dom.toggle.id === "" ||
        this.elements.controlledMenu.dom.menu.id === "")
    ) {
      const t = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10);
      let s =
          ((e = this.dom.toggle.innerText) == null
            ? void 0
            : e.replace(/[^a-zA-Z0-9\s]/g, "")) || "",
        i = t;
      !s.replace(/\s/g, "").length &&
        this.dom.toggle.getAttribute("aria-label") &&
        (s = this.dom.toggle
          .getAttribute("aria-label")
          .replace(/[^a-zA-Z0-9\s]/g, "")),
        s.replace(/\s/g, "").length > 0 &&
          ((s = s.toLowerCase().replace(/\s+/g, "-")),
          s.startsWith("-") && (s = s.substring(1)),
          s.endsWith("-") && (s = s.slice(0, -1)),
          (i = `${s}-${i}`)),
        (this.dom.toggle.id = this.dom.toggle.id || `${i}-menu-button`),
        (this.elements.controlledMenu.dom.menu.id =
          this.elements.controlledMenu.dom.menu.id || `${i}-menu`);
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
  set isOpen(e) {
    a("boolean", { value: e }), (this._open = e);
  }
  _expand(e = !0) {
    const {
      closeClass: t,
      openClass: s,
      transitionClass: i,
    } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"),
      i !== ""
        ? (f(i, this.elements.controlledMenu.dom.menu),
          requestAnimationFrame(() => {
            t !== "" && d(t, this.elements.controlledMenu.dom.menu),
              requestAnimationFrame(() => {
                s !== "" && f(s, this.elements.controlledMenu.dom.menu),
                  requestAnimationFrame(() => {
                    d(i, this.elements.controlledMenu.dom.menu);
                  });
              });
          }))
        : (s !== "" && f(s, this.elements.controlledMenu.dom.menu),
          t !== "" && d(t, this.elements.controlledMenu.dom.menu)),
      e && this.dom.toggle.dispatchEvent(this._expandEvent);
  }
  _collapse(e = !0) {
    const {
      closeClass: t,
      openClass: s,
      transitionClass: i,
    } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"),
      i !== ""
        ? (f(i, this.elements.controlledMenu.dom.menu),
          requestAnimationFrame(() => {
            s !== "" && d(s, this.elements.controlledMenu.dom.menu),
              requestAnimationFrame(() => {
                t !== "" && f(t, this.elements.controlledMenu.dom.menu),
                  requestAnimationFrame(() => {
                    d(i, this.elements.controlledMenu.dom.menu);
                  });
              });
          }))
        : (t !== "" && f(t, this.elements.controlledMenu.dom.menu),
          s !== "" && d(s, this.elements.controlledMenu.dom.menu)),
      e && this.dom.toggle.dispatchEvent(this._collapseEvent);
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
      this.elements.parentMenu.elements.submenuToggles.forEach((e) => {
        e !== this && e.close();
      });
  }
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach((e) =>
      e.close()
    );
  }
}
class A {
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: i = !1,
    childMenu: o = null,
    toggle: l = null,
  }) {
    r(this, "_dom", { item: null, link: null });
    r(this, "_elements", { parentMenu: null, childMenu: null, toggle: null });
    r(this, "_submenu", !1);
    (this._dom.item = e),
      (this._dom.link = t),
      (this._elements.parentMenu = s),
      (this._elements.childMenu = o),
      (this._elements.toggle = l),
      (this._submenu = i);
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
function b(n) {
  try {
    const e = n.key || n.keyCode,
      t = {
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
        Asterisk: e === "*" || e === 56,
      };
    return Object.keys(t).find((s) => t[s] === !0) || "";
  } catch {
    return "";
  }
}
function m(n) {
  n.preventDefault(), n.stopPropagation();
}
class C {
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: i = "",
    submenuToggleSelector: o = "a",
    submenuSelector: l = "ul",
    controllerElement: h = null,
    containerElement: c = null,
    openClass: u = "show",
    closeClass: E = "hide",
    transitionClass: T = "transitioning",
    isTopLevel: y = !0,
    parentMenu: M = null,
    hoverType: v = "off",
    hoverDelay: w = 250,
    enterDelay: S = -1,
    leaveDelay: k = -1,
  }) {
    r(this, "_MenuType", C);
    r(this, "_MenuItemType", A);
    r(this, "_MenuToggleType", I);
    r(this, "_dom", {
      menu: null,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: null,
      container: null,
    });
    r(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: "",
    });
    r(this, "_elements", {
      menuItems: [],
      submenuToggles: [],
      controller: null,
      parentMenu: null,
      rootMenu: null,
    });
    r(this, "_openClass", "show");
    r(this, "_closeClass", "hide");
    r(this, "_transitionClass", "transitioning");
    r(this, "_root", !0);
    r(this, "_currentChild", 0);
    r(this, "_focusState", "none");
    r(this, "_currentEvent", "none");
    r(this, "_hoverType", "off");
    r(this, "_hoverDelay", 250);
    r(this, "_enterDelay", -1);
    r(this, "_leaveDelay", -1);
    r(this, "_hoverTimeout", null);
    r(this, "_errors", []);
    (this._dom.menu = e),
      (this._dom.controller = h),
      (this._dom.container = c),
      (this._selectors.menuItems = t),
      (this._selectors.menuLinks = s),
      (this._selectors.submenuItems = i),
      (this._selectors.submenuToggles = o),
      (this._selectors.submenus = l),
      (this._elements.menuItems = []),
      (this._elements.submenuToggles = []),
      (this._elements.controller = null),
      (this._elements.parentMenu = M),
      (this._elements.rootMenu = y ? this : null),
      (this._openClass = u || ""),
      (this._closeClass = E || ""),
      (this._transitionClass = T || ""),
      (this._root = y),
      (this._hoverType = v),
      (this._hoverDelay = w),
      (this._enterDelay = S),
      (this._leaveDelay = k);
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
      const e = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        parentElement: this.dom.container,
        controlledMenu: this,
      });
      this._elements.controller = e;
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
    let e = !1;
    return (
      (this.currentEvent === "keyboard" || this.currentEvent === "character") &&
        (e = !0),
      this.currentEvent === "mouse" && this.hoverType === "dynamic" && (e = !0),
      e
    );
  }
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
    p({ transitionClass: e }),
      this._transitionClass !== e && (this._transitionClass = e);
  }
  set currentChild(e) {
    a("number", { value: e });
    function t(s) {
      if (
        ["mouse", "character"].includes(s.currentEvent) &&
        s.elements.parentMenu
      ) {
        let o = 0,
          l = !1;
        for (; !l && o < s.elements.parentMenu.elements.menuItems.length; ) {
          const h = s.elements.parentMenu.elements.menuItems[o];
          h.isSubmenuItem &&
            h.elements.toggle.elements.controlledMenu === s &&
            ((l = !0),
            (s.elements.parentMenu.currentEvent = s.currentEvent),
            (s.elements.parentMenu.currentChild = o)),
            o++;
        }
      }
    }
    e < -1
      ? ((this._currentChild = -1), t(this))
      : e >= this.elements.menuItems.length
      ? ((this._currentChild = this.elements.menuItems.length - 1), t(this))
      : this.focusChild !== e && ((this._currentChild = e), t(this));
  }
  set focusState(e) {
    x({ value: e }),
      this._focusState !== e && (this._focusState = e),
      this.elements.submenuToggles.length > 0 &&
        (e === "self" || e === "none") &&
        this.elements.submenuToggles.forEach((t) => {
          t.elements.controlledMenu.focusState = "none";
        }),
      this.elements.parentMenu &&
        (e === "self" || e === "child") &&
        (this.elements.parentMenu.focusState = "child");
  }
  set currentEvent(e) {
    q({ value: e }),
      this._currentEvent !== e &&
        ((this._currentEvent = e),
        this.elements.submenuToggles.length > 0 &&
          this.elements.submenuToggles.forEach((t) => {
            t.elements.controlledMenu.currentEvent = e;
          }));
  }
  set hoverType(e) {
    L({ value: e }), this._hoverType !== e && (this._hoverType = e);
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
  _validate() {
    let e = !0,
      t;
    this._dom.container !== null || this._dom.controller !== null
      ? (t = g(HTMLElement, {
          menuElement: this._dom.menu,
          controllerElement: this._dom.controller,
          containerElement: this._dom.container,
        }))
      : (t = g(HTMLElement, { menuElement: this._dom.menu })),
      t.status || (this._errors.push(t.error.message), (e = !1));
    let s;
    if (
      (this._selectors.submenuItems !== ""
        ? (s = _({
            menuItemSelector: this._selectors.menuItems,
            menuLinkSelector: this._selectors.menuLinks,
            submenuItemSelector: this._selectors.submenuItems,
            submenuToggleSelector: this._selectors.submenuToggles,
            submenuSelector: this._selectors.submenus,
          }))
        : (s = _({
            menuItemSelector: this._selectors.menuItems,
            menuLinkSelector: this._selectors.menuLinks,
          })),
      s.status || (this._errors.push(s.error.message), (e = !1)),
      this._openClass !== "")
    ) {
      const u = p({ openClass: this._openClass });
      u.status || (this._errors.push(u.error.message), (e = !1));
    }
    if (this._closeClass !== "") {
      const u = p({ closeClass: this._closeClass });
      u.status || (this._errors.push(u.error.message), (e = !1));
    }
    if (this._transitionClass !== "") {
      const u = p({ transitionClass: this._transitionClass });
      u.status || (this._errors.push(u.error.message), (e = !1));
    }
    const i = a("boolean", { isTopLevel: this._root });
    if (
      (i.status || (this._errors.push(i.error.message), (e = !1)),
      this._elements.parentMenu !== null)
    ) {
      const u = g(C, { parentMenu: this._elements.parentMenu });
      u.status || (this._errors.push(u.error.message), (e = !1));
    }
    const o = L({ hoverType: this._hoverType });
    o.status || (this._errors.push(o.error.message), (e = !1));
    const l = a("number", { hoverDelay: this._hoverDelay });
    l.status || (this._errors.push(l.error.message), (e = !1));
    const h = a("number", { enterDelay: this._enterDelay });
    h.status || (this._errors.push(h.error.message), (e = !1));
    const c = a("number", { leaveDelay: this._leaveDelay });
    return c.status || (this._errors.push(c.error.message), (e = !1)), e;
  }
  _setDOMElementType(e, t = this.dom.menu, s = !0) {
    if (typeof this.selectors[e] == "string") {
      if (!Array.isArray(this.dom[e]))
        throw new Error(
          `AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`
        );
      t !== this.dom.menu && g(HTMLElement, { base: t });
      const o = Array.from(t.querySelectorAll(this.selectors[e])).filter(
        (l) => l.parentElement === t
      );
      s ? (this._dom[e] = o) : (this._dom[e] = [...this._dom[e], ...o]);
    } else
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type within the menu.`
      );
  }
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
  _setDOMElements() {
    this._setDOMElementType("menuItems"),
      this.selectors.submenuItems !== "" &&
        (this._setDOMElementType("submenuItems"),
        this._resetDOMElementType("submenuToggles"),
        this._resetDOMElementType("submenus"),
        this.dom.submenuItems.forEach((e) => {
          this._setDOMElementType("submenuToggles", e, !1),
            this._setDOMElementType("submenus", e, !1);
        }));
  }
  _findRootMenu(e) {
    if (e.isTopLevel) this._elements.rootMenu = e;
    else if (e.elements.parentMenu !== null)
      this._findRootMenu(e.elements.parentMenu);
    else throw new Error("Cannot find root menu.");
  }
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let t;
      if (this.dom.submenuItems.includes(e)) {
        const s = e.querySelector(this.selectors.submenuToggles),
          i = e.querySelector(this.selectors.submenus),
          o = new this._MenuType({
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
            leaveDelay: this.leaveDelay,
          }),
          l = new this._MenuToggleType({
            menuToggleElement: s,
            parentElement: e,
            controlledMenu: o,
            parentMenu: this,
          });
        this._elements.submenuToggles.push(l),
          (t = new this._MenuItemType({
            menuItemElement: e,
            menuLinkElement: s,
            parentMenu: this,
            isSubmenuItem: !0,
            childMenu: o,
            toggle: l,
          }));
      } else {
        const s = e.querySelector(this.selectors.menuLinks);
        t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
        });
      }
      this._elements.menuItems.push(t);
    });
  }
  _handleFocus() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("focus", () => {
        (this.focusState = "self"), (this.currentChild = t);
      });
    });
  }
  _handleClick() {
    function e(t, s, i) {
      m(i),
        s.toggle(),
        s.isOpen &&
          ((t.focusState = "self"),
          (s.elements.controlledMenu.focusState = "none"));
    }
    this.elements.menuItems.forEach((t, s) => {
      t.dom.link.addEventListener(
        "pointerdown",
        () => {
          (this.currentEvent = "mouse"),
            this.elements.rootMenu.blurChildren(),
            this.focusChild(s);
        },
        { passive: !0 }
      ),
        t.isSubmenuItem &&
          t.elements.toggle.dom.toggle.addEventListener("pointerup", (i) => {
            (this.currentEvent = "mouse"), e(this, t.elements.toggle, i);
          });
    }),
      this.isTopLevel &&
        this.elements.controller &&
        this.elements.controller.dom.toggle.addEventListener(
          "pointerup",
          (t) => {
            (this.currentEvent = "mouse"), e(this, this.elements.controller, t);
          }
        );
  }
  _handleHover() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        if (!(s.pointerType === "pen" || s.pointerType === "touch")) {
          if (this.hoverType === "on")
            (this.currentEvent = "mouse"),
              this.elements.rootMenu.blurChildren(),
              this.focusChild(t),
              e.isSubmenuItem &&
                (this.enterDelay > 0
                  ? (this._hoverTimeout = setTimeout(() => {
                      e.elements.toggle.preview();
                    }, this.enterDelay))
                  : e.elements.toggle.preview());
          else if (this.hoverType === "dynamic") {
            const i = this.elements.submenuToggles.some((o) => o.isOpen);
            (this.currentChild = t),
              (!this.isTopLevel || this.focusState !== "none") &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild()),
              e.isSubmenuItem &&
                (!this.isTopLevel || i) &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild(),
                this.enterDelay > 0
                  ? (this._hoverTimeout = setTimeout(() => {
                      e.elements.toggle.preview();
                    }, this.enterDelay))
                  : e.elements.toggle.preview());
          }
        }
      }),
        e.isSubmenuItem &&
          e.dom.item.addEventListener("pointerleave", (s) => {
            s.pointerType === "pen" ||
              s.pointerType === "touch" ||
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
    this.isTopLevel &&
      this.elements.controller &&
      this.elements.controller.dom.toggle.addEventListener("keydown", (e) => {
        this.currentEvent = "keyboard";
        const t = b(e);
        (t === "Space" || t === "Enter") && m(e);
      });
  }
  _handleKeyup() {
    this.isTopLevel &&
      this.elements.controller &&
      this.elements.controller.dom.toggle.addEventListener("keyup", (e) => {
        this.currentEvent = "keyboard";
        const t = b(e);
        (t === "Space" || t === "Enter") &&
          (m(e),
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
  focusChild(e) {
    this.blurCurrentChild(), (this.currentChild = e), this.focusCurrentChild();
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
    this.elements.submenuToggles.forEach((e) => e.close());
  }
  blurChildren() {
    this.elements.menuItems.forEach((e) => {
      e.blur(), e.isSubmenuItem && e.elements.childMenu.blurChildren();
    });
  }
}
class H extends A {
  constructor({
    menuItemElement: t,
    menuLinkElement: s,
    parentMenu: i,
    isSubmenuItem: o = !1,
    childMenu: l = null,
    toggle: h = null,
    initialize: c = !0,
    submenuSibling: u = null,
  }) {
    super({
      menuItemElement: t,
      menuLinkElement: s,
      parentMenu: i,
      isSubmenuItem: o,
      childMenu: l,
      toggle: h,
    });
    r(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null,
      sibling: null,
    });
    (this._elements.parentMenu = i),
      (this._elements.childMenu = l),
      (this._elements.toggle = h),
      (this._elements.sibling = u),
      c && this.initialize();
  }
}
class R extends I {
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
    initialize: o = !0,
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: i,
    }),
      o && this.initialize();
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
class D extends C {
  constructor({
    menuElement: t,
    menuItemSelector: s = "li",
    menuLinkSelector: i = "a",
    submenuItemSelector: o = "",
    submenuToggleSelector: l = "button",
    submenuSelector: h = "ul",
    submenuSubtoggleSelector: c = "a",
    controllerElement: u = null,
    containerElement: E = null,
    openClass: T = "show",
    closeClass: y = "hide",
    transitionClass: M = "transitioning",
    isTopLevel: v = !0,
    parentMenu: w = null,
    hoverType: S = "off",
    hoverDelay: k = 250,
    enterDelay: $ = -1,
    leaveDelay: O = -1,
    optionalKeySupport: j = !1,
    initialize: F = !0,
  }) {
    super({
      menuElement: t,
      menuItemSelector: s,
      menuLinkSelector: i,
      submenuItemSelector: o,
      submenuSelector: h,
      submenuToggleSelector: l,
      controllerElement: u,
      containerElement: E,
      openClass: T,
      closeClass: y,
      transitionClass: M,
      isTopLevel: v,
      parentMenu: w,
      hoverType: S,
      hoverDelay: k,
      enterDelay: $,
      leaveDelay: O,
    });
    r(this, "_MenuType", D);
    r(this, "_MenuItemType", H);
    r(this, "_MenuToggleType", R);
    r(this, "_currentChild", -1);
    r(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: "",
      submenuSubtoggles: "",
    });
    r(this, "_optionalSupport", !1);
    (this._optionalSupport = j),
      (this._selectors.menuItems = s),
      (this._selectors.submenuItems = o),
      (this._selectors.submenuToggles = l),
      (this._selectors.submenus = h),
      (this._selectors.submenuSubtoggles = c),
      (this._selectors.menuLinks = [...new Set([i, l])].join(",")),
      F && this.initialize();
  }
  initialize() {
    try {
      super.initialize(),
        this._handleFocus(),
        this._handleClick(),
        this._handleHover(),
        this._handleKeydown(),
        this._handleKeyup();
    } catch (t) {
      console.error(t);
    }
  }
  get optionalKeySupport() {
    return this.isTopLevel
      ? this._optionalSupport
      : this.elements.rootMenu.optionalKeySupport;
  }
  set optionalKeySupport(t) {
    a("boolean", { optionalKeySupport: t }), (this._optionalSupport = t);
  }
  _createChildElements() {
    this.dom.menuItems.forEach((t) => {
      let s, i;
      const o = t.querySelector(this.selectors.menuLinks);
      if (this.dom.submenuItems.includes(t)) {
        const l = t.querySelector(this.selectors.submenuToggles),
          h = t.querySelector(this.selectors.submenus),
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
          u = new this._MenuToggleType({
            menuToggleElement: l,
            parentElement: t,
            controlledMenu: c,
            parentMenu: this,
          });
        this._elements.submenuToggles.push(u),
          l !== o
            ? ((i = new this._MenuItemType({
                menuItemElement: t,
                menuLinkElement: l,
                parentMenu: this,
                isSubmenuItem: !0,
                childMenu: c,
                toggle: u,
              })),
              (s = new this._MenuItemType({
                menuItemElement: t,
                menuLinkElement: o,
                parentMenu: this,
                submenuSibling: i,
              })))
            : (s = new this._MenuItemType({
                menuItemElement: t,
                menuLinkElement: o,
                parentMenu: this,
                isSubmenuItem: !0,
                childMenu: c,
                toggle: u,
              }));
      } else
        s = new this._MenuItemType({
          menuItemElement: t,
          menuLinkElement: o,
          parentMenu: this,
        });
      this._elements.menuItems.push(s),
        typeof i < "u" && this._elements.menuItems.push(i);
    });
  }
  _validate() {
    let t = super._validate();
    const s = _({
      submenuSubtoggleSelector: this._selectors.submenuSubtoggles,
    });
    s.status || (this._errors.push(s.error.message), (t = !1));
    const i = a("boolean", { optionalKeySupport: this._optionalSupport });
    return i.status || (this._errors.push(i.error.message), (t = !1)), t;
  }
  _handleClick() {
    super._handleClick(),
      document.addEventListener("pointerup", (t) => {
        this.focusState !== "none" &&
          ((this.currentEvent = "mouse"),
          !this.dom.menu.contains(t.target) &&
            !this.dom.menu !== t.target &&
            (this.closeChildren(),
            this.blur(),
            this.elements.controller && this.elements.controller.close()));
      });
  }
  _handleHover() {
    this.elements.menuItems.forEach((t, s) => {
      t.dom.link.addEventListener("pointerenter", (i) => {
        if (!(i.pointerType === "pen" || i.pointerType === "touch")) {
          if (this.hoverType === "on") {
            (this.currentEvent = "mouse"),
              this.elements.rootMenu.blurChildren(),
              this.focusChild(s);
            let o = t.isSubmenuItem ? t.elements.toggle : null;
            if (
              (t.elements.sibling !== null &&
                (o = t.elements.sibling.elements.toggle),
              o === null)
            )
              return;
            this.enterDelay > 0
              ? (clearTimeout(this._hoverTimeout),
                (this._hoverTimeout = setTimeout(() => {
                  o.preview();
                }, this.enterDelay)))
              : o.preview();
          } else if (this.hoverType === "dynamic") {
            const o = this.elements.submenuToggles.some((l) => l.isOpen);
            if (
              ((this.currentChild = s),
              (!this.isTopLevel || this.focusState !== "none") &&
                ((this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild()),
              !this.isTopLevel || o)
            ) {
              (this.currentEvent = "mouse"),
                this.elements.rootMenu.blurChildren(),
                this.focusCurrentChild();
              let l = t.isSubmenuItem ? t.elements.toggle : null;
              if (
                (t.elements.sibling !== null &&
                  (l = t.elements.sibling.elements.toggle),
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
        t.isSubmenuItem &&
          t.dom.item.addEventListener("pointerleave", (i) => {
            i.pointerType === "pen" ||
              i.pointerType === "touch" ||
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
    super._handleKeydown(),
      this.dom.menu.addEventListener("keydown", (t) => {
        this.currentEvent = "keyboard";
        const s = b(t);
        if (this.focusState === "self") {
          const i = ["Space", "Enter"],
            o = ["Escape"],
            l = ["Escape"];
          this.optionalKeySupport
            ? [
                "ArrowUp",
                "ArrowRight",
                "ArrowDown",
                "ArrowLeft",
                "Home",
                "End",
              ].includes(s) && m(t)
            : ((this.currentMenuItem.isSubmenuItem && i.includes(s)) ||
                (this.elements.controller && o.includes(s)) ||
                (this.elements.parentMenu && l.includes(s))) &&
              m(t);
        }
      });
  }
  _handleKeyup() {
    super._handleKeyup(),
      this.dom.menu.addEventListener("keyup", (t) => {
        this.currentEvent = "keyboard";
        const s = b(t);
        this.focusState === "self" &&
          (s === "Space" || s === "Enter"
            ? this.currentMenuItem.isSubmenuItem
              ? (m(t),
                this.currentMenuItem.elements.toggle.isOpen
                  ? this.currentMenuItem.elements.toggle.close()
                  : this.currentMenuItem.elements.toggle.preview())
              : this.currentMenuItem.dom.link.click()
            : s === "Escape"
            ? this.elements.submenuToggles.some((o) => o.isOpen)
              ? (m(t), this.closeChildren())
              : this.elements.parentMenu
              ? (m(t),
                (this.elements.parentMenu.currentEvent = this.currentEvent),
                this.elements.parentMenu.closeChildren(),
                this.elements.parentMenu.focusCurrentChild())
              : this.isTopLevel &&
                this.elements.controller &&
                this.elements.controller.isOpen &&
                (this.elements.controller.close(), this.focusController())
            : this.optionalKeySupport &&
              (s === "ArrowDown" || s === "ArrowRight"
                ? (m(t),
                  this.currentMenuItem.isSubmenuItem &&
                  this.currentMenuItem.elements.toggle.isOpen
                    ? ((this.currentMenuItem.elements.childMenu.currentEvent =
                        "keyboard"),
                      this.currentMenuItem.elements.childMenu.focusFirstChild())
                    : this.focusNextChild())
                : s === "ArrowUp" || s === "ArrowLeft"
                ? (m(t), this.focusPreviousChild())
                : s === "Home"
                ? (m(t), this.focusFirstChild())
                : s === "End" && (m(t), this.focusLastChild())));
      });
  }
}
module.exports = D;
