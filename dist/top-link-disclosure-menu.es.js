// src/domHelpers.js
function e(e, t) {
	e !== "" && e.length !== 0 && (typeof e == "string" ? t.classList.add(e) : t.classList.add(...e));
}
function t(e, t) {
	e !== "" && e.length !== 0 && (typeof e == "string" ? t.classList.remove(e) : t.classList.remove(...e));
}
// src/validate.js
function n(e, t) {
	try {
		if (typeof t != "object") throw TypeError(`Elements given to isValidInstance() must be inside of an object. "${typeof t}" given.`);
		for (let n in t) if (!(t[n] instanceof e)) {
			let r = typeof t[n];
			throw TypeError(`${n} must be an instance of ${e.name}. "${r}" given.`);
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
function r(e, t) {
	try {
		if (typeof t != "object") throw TypeError(`Values given to isValidType() must be inside of an object. "${typeof t}" given.`);
		for (let n in t) {
			let r = typeof t[n];
			if (r !== e) throw TypeError(`${n} must be a ${e}. "${r}" given.`);
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
function i(e) {
	try {
		if (typeof e != "object") throw TypeError(`Values given to isQuerySelector() must be inside of an object. "${typeof e}" given.`);
		for (let t in e) try {
			if (e[t] === null) throw Error();
			document.querySelector(e[t]);
		} catch {
			throw TypeError(`${t} must be a valid query selector. "${e[t]}" given.`);
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
function a(e) {
	try {
		if (typeof e != "object" || Array.isArray(e)) throw TypeError(`Values given to isValidClassList() must be inside of an object. "${typeof e}" given.`);
		for (let t in e) {
			let n = typeof e[t];
			if (n !== "string") {
				if (Array.isArray(e[t])) e[t].forEach((e) => {
					if (typeof e != "string") throw TypeError(`${t} must be a string or an array of strings. An array containing non-strings given.`);
				});
				else throw TypeError(`${t} must be a string or an array of strings. "${n}" given.`);
			} else {
				let n = {};
				n[t] = e[t], i(n);
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
function o(e) {
	try {
		if (typeof e != "object") throw TypeError(`Values given to isValidState() must be inside of an object. "${typeof e}" given.`);
		let t = [
			"none",
			"self",
			"child"
		];
		for (let n in e) if (!t.includes(e[n])) throw TypeError(`${n} must be one of the following values: ${t.join(", ")}. "${e[n]}" given.`);
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
function s(e) {
	try {
		if (typeof e != "object") throw TypeError(`Values given to isValidEvent() must be inside of an object. "${typeof e}" given.`);
		let t = [
			"none",
			"mouse",
			"keyboard",
			"character"
		];
		for (let n in e) if (!t.includes(e[n])) throw TypeError(`${n} must be one of the following values: ${t.join(", ")}. "${e[n]}" given.`);
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
function c(e) {
	try {
		if (typeof e != "object") throw TypeError(`Values given to isValidHoverType() must be inside of an object. "${typeof e}" given.`);
		let t = [
			"off",
			"on",
			"dynamic"
		];
		for (let n in e) if (!t.includes(e[n])) throw TypeError(`${n} must be one of the following values: ${t.join(", ")}. "${e[n]}" given.`);
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
function l(e, t) {
	if (r("string", { tagName: e }).status && n(HTMLElement, t).status) {
		let n = e.toLowerCase(), r = !0;
		for (let e in t) t[e].tagName.toLowerCase() !== n && (r = !1);
		return r;
	}
	return !1;
}
// src/_baseMenuToggle.js
var u = class {
	_dom = {
		toggle: null,
		parent: null
	};
	_elements = {
		controlledMenu: null,
		parentMenu: null
	};
	_open = !1;
	_expandEvent = new CustomEvent("accessibleMenuExpand", {
		bubbles: !0,
		detail: { toggle: this }
	});
	_collapseEvent = new CustomEvent("accessibleMenuCollapse", {
		bubbles: !0,
		detail: { toggle: this }
	});
	constructor({ menuToggleElement: e, parentElement: t, controlledMenu: n, parentMenu: r = null }) {
		this._dom.toggle = e, this._dom.parent = t, this._elements.controlledMenu = n, this._elements.parentMenu = r;
	}
	initialize() {
		this._setIds(), this._setAriaAttributes(), this._collapse(!1);
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
		r("boolean", { isOpen: e }), this._open = e;
	}
	_setIds() {
		if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
			let e = this.dom.toggle.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "", t = this.elements.controlledMenu.key;
			!e.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label") && (e = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), e.replace(/\s/g, "").length > 0 && (e = e.toLowerCase().replace(/\s+/g, "-"), e.startsWith("-") && (e = e.substring(1)), e.endsWith("-") && (e = e.slice(0, -1)), t = `${e}-${t}`), this.dom.toggle.id = this.dom.toggle.id || `menu-button-${t}`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `menu-${t}`;
		}
	}
	_setAriaAttributes() {
		this.dom.toggle.setAttribute("aria-expanded", "false"), this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby", this.dom.toggle.id);
	}
	_expand(n = !0) {
		let { closeClass: r, openClass: i, transitionClass: a, openDuration: o } = this.elements.controlledMenu;
		this.dom.toggle.setAttribute("aria-expanded", "true"), this.elements.controlledMenu.elements.rootMenu.hasOpened = !0, a === "" ? (e(i, this.elements.controlledMenu.dom.menu), t(r, this.elements.controlledMenu.dom.menu)) : (e(a, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
			t(r, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
				e(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
					setTimeout(() => {
						t(a, this.elements.controlledMenu.dom.menu);
					}, o);
				});
			});
		})), n && this.dom.toggle.dispatchEvent(this._expandEvent);
	}
	_collapse(n = !0) {
		let { closeClass: r, openClass: i, transitionClass: a, closeDuration: o } = this.elements.controlledMenu;
		this.dom.toggle.setAttribute("aria-expanded", "false"), a === "" ? (e(r, this.elements.controlledMenu.dom.menu), t(i, this.elements.controlledMenu.dom.menu)) : (e(a, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
			t(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
				e(r, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
					setTimeout(() => {
						t(a, this.elements.controlledMenu.dom.menu);
					}, o);
				});
			});
		})), n && this.dom.toggle.dispatchEvent(this._collapseEvent);
	}
	open() {
		this.elements.controlledMenu.focusState = "self", this.isOpen ||= (this._expand(), !0);
	}
	preview() {
		this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this.isOpen ||= (this._expand(), !0);
	}
	close() {
		this.isOpen &&= (this.elements.controlledMenu.blur(), this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._collapse(), !1);
	}
	toggle() {
		this.isOpen ? this.close() : this.open();
	}
	closeSiblings() {
		this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((e) => {
			e !== this && e.close();
		});
	}
	closeChildren() {
		this.elements.controlledMenu.elements.submenuToggles.forEach((e) => e.close());
	}
}, d = class {
	_dom = {
		item: null,
		link: null
	};
	_elements = {
		parentMenu: null,
		childMenu: null,
		toggle: null
	};
	_submenu = !1;
	constructor({ menuItemElement: e, menuLinkElement: t, parentMenu: n, isSubmenuItem: r = !1, childMenu: i = null, toggle: a = null }) {
		this._dom.item = e, this._dom.link = t, this._elements.parentMenu = n, this._elements.childMenu = i, this._elements.toggle = a, this._submenu = r;
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
		this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
			this.dom.link.focus();
		});
	}
	blur() {
		this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
			this.dom.link.blur();
		});
	}
};
// src/eventHandlers.js
function f(e) {
	try {
		let t = e.key || e.keyCode, n = {
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
		return Object.keys(n).find((e) => n[e] === !0) || "";
	} catch {
		return "";
	}
}
function p(e) {
	e.preventDefault(), e.stopPropagation();
}
// src/_baseMenu.js
var m = class e {
	_MenuType = e;
	_MenuItemType = d;
	_MenuToggleType = u;
	_dom = {
		menu: null,
		menuItems: [],
		submenuItems: [],
		submenuToggles: [],
		submenus: [],
		controller: null,
		container: null
	};
	_selectors = {
		menuItems: "",
		menuLinks: "",
		submenuItems: "",
		submenuToggles: "",
		submenus: ""
	};
	_elements = {
		menuItems: [],
		submenuToggles: [],
		controller: null,
		parentMenu: null,
		rootMenu: null
	};
	_openClass = "show";
	_closeClass = "hide";
	_transitionClass = "transitioning";
	_transitionDuration = 250;
	_openDuration = -1;
	_closeDuration = -1;
	_root = !0;
	_currentChild = 0;
	_focusState = "none";
	_currentEvent = "none";
	_hoverType = "off";
	_hoverDelay = 250;
	_enterDelay = -1;
	_leaveDelay = -1;
	_prefix = "am-";
	_hoverTimeout = null;
	_hasOpened = !1;
	_key = "";
	_errors = [];
	constructor({ menuElement: e, menuItemSelector: t = "li", menuLinkSelector: n = "a", submenuItemSelector: r = "li:has(ul)", submenuToggleSelector: i = "a", submenuSelector: a = "ul", controllerElement: o = null, containerElement: s = null, openClass: c = "show", closeClass: l = "hide", transitionClass: u = "transitioning", transitionDuration: d = 250, openDuration: f = -1, closeDuration: p = -1, isTopLevel: m = !0, parentMenu: h = null, hoverType: g = "off", hoverDelay: _ = 250, enterDelay: v = -1, leaveDelay: y = -1, prefix: b = "am-", key: x = null }) {
		this._dom.menu = e, this._dom.controller = o, this._dom.container = s, this._selectors.menuItems = t, this._selectors.menuLinks = n, this._selectors.submenuItems = r, this._selectors.submenuToggles = i, this._selectors.submenus = a, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = h, this._elements.rootMenu = m ? this : null, this._openClass = c || "", this._closeClass = l || "", this._transitionClass = u || "", this._transitionDuration = d, this._openDuration = f, this._closeDuration = p, this._prefix = b || "", this._key = x || "", this._root = m, this._hoverType = g, this._hoverDelay = _, this._enterDelay = v, this._leaveDelay = y;
	}
	initialize() {
		if (!this._validate()) throw Error(`AccessibleMenu: cannot initialize menu. The following errors have been found:\n - ${this.errors.join("\n - ")}`);
		if (this.elements.rootMenu === null && this._findRootMenu(this), this._generateKey(), this._setDOMElements(), this.isTopLevel) {
			if (this._setIds(), this.dom.controller && this.dom.container) {
				let e = new this._MenuToggleType({
					menuToggleElement: this.dom.controller,
					parentElement: this.dom.container,
					controlledMenu: this
				});
				l("button", { toggle: e.dom.toggle }) || e.dom.toggle.setAttribute("role", "button"), e.dom.toggle.setAttribute("aria-controls", this.dom.menu.id), this._elements.controller = e;
			}
			window.AccessibleMenu = window.AccessibleMenu || { menus: {} }, typeof window.AccessibleMenu.menus != "object" && (window.AccessibleMenu.menus = {}), window.AccessibleMenu.menus[this.dom.menu.id] = this;
		}
		this._createChildElements(), this._setTransitionDurations();
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
	get key() {
		if (this.isTopLevel) return this._key;
		let e = this.elements.parentMenu.dom.submenus.indexOf(this.dom.menu) || 0;
		return `${this.elements.parentMenu.key}-${e}`;
	}
	get errors() {
		return this._errors;
	}
	get openClass() {
		return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
	}
	set openClass(e) {
		a({ openClass: e }), this._openClass !== e && (this._openClass = e);
	}
	get closeClass() {
		return this.isTopLevel ? this._closeClass : this.elements.rootMenu.closeClass;
	}
	set closeClass(e) {
		a({ closeClass: e }), this._closeClass !== e && (this._closeClass = e);
	}
	get transitionClass() {
		return this.isTopLevel ? this._transitionClass : this.elements.rootMenu.transitionClass;
	}
	set transitionClass(e) {
		a({ transitionClass: e }), this._transitionClass !== e && (this._transitionClass = e);
	}
	get transitionDuration() {
		return this.isTopLevel ? this._transitionDuration : this.elements.rootMenu.transitionDuration;
	}
	set transitionDuration(e) {
		r("number", { transitionDuration: e }), this._transitionDuration !== e && (this._transitionDuration = e, this._setTransitionDurations());
	}
	get openDuration() {
		return this._openDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._openDuration : this.elements.rootMenu.openDuration;
	}
	set openDuration(e) {
		r("number", { openDuration: e }), this._openDuration !== e && (this._openDuration = e, this._setTransitionDurations());
	}
	get closeDuration() {
		return this._closeDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._closeDuration : this.elements.rootMenu.closeDuration;
	}
	set closeDuration(e) {
		r("number", { closeDuration: e }), this._closeDuration !== e && (this._closeDuration = e, this._setTransitionDurations());
	}
	get currentChild() {
		return this._currentChild;
	}
	set currentChild(e) {
		r("number", { currentChild: e });
		function t(e) {
			if (["mouse", "character"].includes(e.currentEvent) && e.elements.parentMenu) {
				let t = 0, n = !1;
				for (; !n && t < e.elements.parentMenu.elements.menuItems.length;) {
					let r = e.elements.parentMenu.elements.menuItems[t];
					r.isSubmenuItem && r.elements.toggle.elements.controlledMenu === e && (n = !0, e.elements.parentMenu.currentEvent = e.currentEvent, e.elements.parentMenu.currentChild = t), t++;
				}
			}
		}
		e < -1 ? (this._currentChild = -1, t(this)) : e >= this.elements.menuItems.length ? (this._currentChild = this.elements.menuItems.length - 1, t(this)) : this.focusChild !== e && (this._currentChild = e, t(this));
	}
	get focusState() {
		return this._focusState;
	}
	set focusState(e) {
		o({ focusState: e }), this._focusState !== e && (this._focusState = e), this.elements.submenuToggles.length > 0 && (e === "self" || e === "none") && this.elements.submenuToggles.forEach((e) => {
			e.elements.controlledMenu.focusState = "none";
		}), this.elements.parentMenu && (e === "self" || e === "child") && (this.elements.parentMenu.focusState = "child");
	}
	get currentEvent() {
		return this._currentEvent;
	}
	set currentEvent(e) {
		s({ currentEvent: e }), this._currentEvent !== e && (this._currentEvent = e, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((t) => {
			t.elements.controlledMenu.currentEvent = e;
		}));
	}
	get currentMenuItem() {
		return this.elements.menuItems[this.currentChild];
	}
	get hoverType() {
		return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
	}
	set hoverType(e) {
		c({ hoverType: e }), this._hoverType !== e && (this._hoverType = e);
	}
	get hoverDelay() {
		return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
	}
	set hoverDelay(e) {
		r("number", { hoverDelay: e }), this._hoverDelay !== e && (this._hoverDelay = e);
	}
	get enterDelay() {
		return this._enterDelay === -1 ? this.hoverDelay : this._root ? this._enterDelay : this.elements.rootMenu.enterDelay;
	}
	set enterDelay(e) {
		r("number", { enterDelay: e }), this._enterDelay !== e && (this._enterDelay = e);
	}
	get leaveDelay() {
		return this._leaveDelay === -1 ? this.hoverDelay : this._root ? this._leaveDelay : this.elements.rootMenu.leaveDelay;
	}
	set leaveDelay(e) {
		r("number", { leaveDelay: e }), this._leaveDelay !== e && (this._leaveDelay = e);
	}
	get prefix() {
		return this._root ? this._prefix : this.elements.rootMenu.prefix;
	}
	set prefix(e) {
		r("string", { prefix: e }), this._prefix !== e && (this._prefix = e);
	}
	get shouldFocus() {
		let e = !1;
		return (this.currentEvent === "keyboard" || this.currentEvent === "character") && (e = !0), this.currentEvent === "mouse" && this.hoverType === "dynamic" && (e = !0), e;
	}
	get hasOpened() {
		return this._root ? this._hasOpened : this.elements.rootMenu.hasOpened;
	}
	set hasOpened(e) {
		r("boolean", { hasOpened: e }), this._hasOpened !== e && (this._hasOpened = e);
	}
	_validate() {
		let t = !0, o;
		o = this._dom.container !== null || this._dom.controller !== null ? n(HTMLElement, {
			menuElement: this._dom.menu,
			controllerElement: this._dom.controller,
			containerElement: this._dom.container
		}) : n(HTMLElement, { menuElement: this._dom.menu }), o.status || (this._errors.push(o.error.message), t = !1);
		let s;
		if (s = this._selectors.submenuItems === "" ? i({
			menuItemSelector: this._selectors.menuItems,
			menuLinkSelector: this._selectors.menuLinks
		}) : i({
			menuItemSelector: this._selectors.menuItems,
			menuLinkSelector: this._selectors.menuLinks,
			submenuItemSelector: this._selectors.submenuItems,
			submenuToggleSelector: this._selectors.submenuToggles,
			submenuSelector: this._selectors.submenus
		}), s.status || (this._errors.push(s.error.message), t = !1), this._openClass !== "") {
			let e = a({ openClass: this._openClass });
			e.status || (this._errors.push(e.error.message), t = !1);
		}
		if (this._closeClass !== "") {
			let e = a({ closeClass: this._closeClass });
			e.status || (this._errors.push(e.error.message), t = !1);
		}
		if (this._transitionClass !== "") {
			let e = a({ transitionClass: this._transitionClass });
			e.status || (this._errors.push(e.error.message), t = !1);
		}
		let l = r("number", { transitionDuration: this._transitionDuration });
		l.status || (this._errors.push(l.error.message), t = !1);
		let u = r("number", { openDuration: this._openDuration });
		u.status || (this._errors.push(u.error.message), t = !1);
		let d = r("number", { closeDuration: this._closeDuration });
		d.status || (this._errors.push(d.error.message), t = !1);
		let f = r("boolean", { isTopLevel: this._root });
		if (f.status || (this._errors.push(f.error.message), t = !1), this._elements.parentMenu !== null) {
			let r = n(e, { parentMenu: this._elements.parentMenu });
			r.status || (this._errors.push(r.error.message), t = !1);
		}
		let p = c({ hoverType: this._hoverType });
		p.status || (this._errors.push(p.error.message), t = !1);
		let m = r("number", { hoverDelay: this._hoverDelay });
		m.status || (this._errors.push(m.error.message), t = !1);
		let h = r("number", { enterDelay: this._enterDelay });
		h.status || (this._errors.push(h.error.message), t = !1);
		let g = r("number", { leaveDelay: this._leaveDelay });
		if (g.status || (this._errors.push(g.error.message), t = !1), this._key !== "") {
			let e = r("string", { key: this._key });
			e.status || (this._errors.push(e.error.message), t = !1);
		}
		let _ = r("string", { prefix: this._prefix });
		return _.status || (this._errors.push(_.error.message), t = !1), t;
	}
	_setDOMElementType(e, t = this.dom.menu, r = !0) {
		if (typeof this.selectors[e] == "string") {
			if (!Array.isArray(this.dom[e])) throw Error(`AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`);
			t !== this.dom.menu && n(HTMLElement, { base: t });
			let i = Array.from(t.querySelectorAll(this.selectors[e])).filter((e) => e.parentElement === t);
			r ? this._dom[e] = i : this._dom[e] = [...this._dom[e], ...i];
		} else throw Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`);
	}
	_resetDOMElementType(e) {
		if (this.dom[e] !== void 0) {
			if (!Array.isArray(this.dom[e])) throw Error(`AccessibleMenu: The "${e}" element cannot be reset through _resetDOMElementType.`);
			this._dom[e] = [];
		} else throw Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`);
	}
	_setDOMElements() {
		this._setDOMElementType("menuItems"), this.selectors.submenuItems !== "" && (this._setDOMElementType("submenuItems"), this._resetDOMElementType("submenuToggles"), this._resetDOMElementType("submenus"), this.dom.submenuItems.forEach((e) => {
			this._setDOMElementType("submenuToggles", e, !1), this._setDOMElementType("submenus", e, !1);
		}));
	}
	_generateKey(e = !1) {
		(this.key === "" || e) && (this._key = Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 10));
	}
	_setIds() {
		this.dom.menu.id = this.dom.menu.id || `menu-${this.key}`, this.dom.container && (this.dom.container.id = this.dom.container.id || `menu-container-${this.key}`), this.dom.controller && (this.dom.controller.id = this.dom.controller.id || `menu-controller-${this.key}`);
	}
	_findRootMenu(e) {
		if (e.isTopLevel) this._elements.rootMenu = e;
		else if (e.elements.parentMenu !== null) this._findRootMenu(e.elements.parentMenu);
		else throw Error("Cannot find root menu.");
	}
	_createChildElements() {
		this.dom.menuItems.forEach((e) => {
			let t;
			if (this.dom.submenuItems.includes(e)) {
				let n = e.querySelector(this.selectors.submenuToggles), r = e.querySelector(this.selectors.submenus), i = new this._MenuType({
					menuElement: r,
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
				}), a = new this._MenuToggleType({
					menuToggleElement: n,
					parentElement: e,
					controlledMenu: i,
					parentMenu: this
				});
				this._elements.submenuToggles.push(a), t = new this._MenuItemType({
					menuItemElement: e,
					menuLinkElement: n,
					parentMenu: this,
					isSubmenuItem: !0,
					childMenu: i,
					toggle: a
				});
			} else {
				let n = e.querySelector(this.selectors.menuLinks);
				t = new this._MenuItemType({
					menuItemElement: e,
					menuLinkElement: n,
					parentMenu: this
				});
			}
			this._elements.menuItems.push(t);
		});
	}
	_clearTimeout() {
		clearTimeout(this._hoverTimeout);
	}
	_setTimeout(e, t) {
		r("function", { callback: e }), r("number", { delay: t }), this._hoverTimeout = setTimeout(e, t);
	}
	_handleFocus() {
		this.elements.menuItems.forEach((e, t) => {
			e.dom.link.addEventListener("focus", () => {
				this.focusState = "self", this.currentChild = t;
			});
		}), this.dom.menu.addEventListener("focusout", (e) => {
			this.currentEvent !== "keyboard" || e.relatedTarget === null || this.dom.menu.contains(e.relatedTarget) || (this.focusState = "none", this.closeChildren());
		});
	}
	_handleClick() {
		function e(e, t, n) {
			p(n), n.button === 0 && (t.toggle(), t.isOpen && (e.focusState = "self", t.elements.controlledMenu.focusState = "none"));
		}
		this.elements.menuItems.forEach((t, n) => {
			t.dom.link.addEventListener("click", () => {
				this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this._clearTimeout(), this.focusChild(n);
			}, { passive: !0 }), t.isSubmenuItem && t.elements.toggle.dom.toggle.addEventListener("click", (n) => {
				this.currentEvent = "mouse", e(this, t.elements.toggle, n);
			});
		}), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("click", (t) => {
			this.currentEvent = "mouse", e(this, this.elements.controller, t);
		}), document.addEventListener("click", (e) => {
			this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.elements.rootMenu.hasOpened = this.elements.submenuToggles.some((e) => e.isOpen)));
		});
	}
	_handleHover() {
		this.elements.menuItems.forEach((e, t) => {
			e.dom.link.addEventListener("pointerenter", (n) => {
				n.pointerType !== "pen" && n.pointerType !== "touch" && (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					e.elements.toggle.preview();
				}, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, this.isTopLevel && this.focusState === "none" || (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					e.elements.toggle.preview();
				}, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					this.closeChildren();
				}, this.enterDelay)) : this.closeChildren())));
			}), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (t) => {
				t.pointerType !== "pen" && t.pointerType !== "touch" && (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					this.currentEvent = "mouse", e.elements.toggle.close();
				}, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					this.currentEvent = "mouse";
				}, this.leaveDelay)) : this.currentEvent = "mouse"));
			}), e.dom.item.addEventListener("pointerenter", (t) => {
				t.pointerType !== "pen" && t.pointerType !== "touch" && e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
			}));
		});
	}
	_handleKeydown() {
		this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("keydown", (e) => {
			this.currentEvent = "keyboard";
			let t = f(e);
			(t === "Space" || t === "Enter") && p(e);
		});
	}
	_handleKeyup() {
		this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("keyup", (e) => {
			this.currentEvent = "keyboard";
			let t = f(e);
			(t === "Space" || t === "Enter") && (p(e), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
		});
	}
	_setTransitionDurations() {
		this.dom.menu.style.setProperty(`--${this.prefix}transition-duration`, `${this.transitionDuration}ms`), this.dom.menu.style.setProperty(`--${this.prefix}open-transition-duration`, `${this.openDuration}ms`), this.dom.menu.style.setProperty(`--${this.prefix}close-transition-duration`, `${this.closeDuration}ms`);
	}
	focus() {
		this.focusState = "self", this.shouldFocus && this.dom.menu.focus();
	}
	blur() {
		this.focusState = "none", this.shouldFocus && this.dom.menu.blur();
	}
	focusCurrentChild() {
		this.focusState = "self", this.currentChild !== -1 && this.currentMenuItem.focus();
	}
	focusChild(e) {
		this.blurCurrentChild(), this.currentChild = e, this.focusCurrentChild();
	}
	focusFirstChild() {
		this.focusChild(0);
	}
	focusLastChild() {
		this.focusChild(this.elements.menuItems.length - 1);
	}
	focusNextChild() {
		this.currentChild < this.elements.menuItems.length - 1 ? this.focusChild(this.currentChild + 1) : this.focusCurrentChild();
	}
	focusPreviousChild() {
		this.currentChild > 0 ? this.focusChild(this.currentChild - 1) : this.focusCurrentChild();
	}
	blurCurrentChild() {
		this.focusState = "none", this.currentChild !== -1 && this.currentMenuItem.blur();
	}
	focusController() {
		this.dom.controller && (this.shouldFocus && this.dom.controller.focus(), this.focusState = "none");
	}
	focusContainer() {
		this.dom.container && (this.shouldFocus && this.dom.container.focus(), this.focusState = "none");
	}
	closeChildren() {
		this.elements.submenuToggles.forEach((e) => e.close());
	}
	blurChildren() {
		this.elements.menuItems.forEach((e) => {
			e.blur(), e.isSubmenuItem && e.elements.childMenu.blurChildren();
		});
	}
}, h = class extends d {
	_elements = {
		parentMenu: null,
		childMenu: null,
		toggle: null,
		sibling: null
	};
	constructor({ menuItemElement: e, menuLinkElement: t, parentMenu: n, isSubmenuItem: r = !1, childMenu: i = null, toggle: a = null, initialize: o = !0, submenuSibling: s = null }) {
		super({
			menuItemElement: e,
			menuLinkElement: t,
			parentMenu: n,
			isSubmenuItem: r,
			childMenu: i,
			toggle: a
		}), this._elements.parentMenu = n, this._elements.childMenu = i, this._elements.toggle = a, this._elements.sibling = s, o && this.initialize();
	}
}, g = class extends u {
	constructor({ menuToggleElement: e, parentElement: t, controlledMenu: n, parentMenu: r = null, initialize: i = !0 }) {
		super({
			menuToggleElement: e,
			parentElement: t,
			controlledMenu: n,
			parentMenu: r
		}), i && this.initialize();
	}
	_setAriaAttributes() {
		super._setAriaAttributes(), l("button", { toggle: this.dom.toggle }) || this.dom.toggle.setAttribute("role", "button"), this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id);
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
}, _ = class e extends m {
	_MenuType = e;
	_MenuItemType = h;
	_MenuToggleType = g;
	_currentChild = -1;
	_selectors = {
		menuItems: "",
		menuLinks: "",
		submenuItems: "",
		submenuToggles: "",
		submenus: "",
		submenuSubtoggles: ""
	};
	_optionalSupport = !1;
	constructor({ menuElement: e, menuItemSelector: t = "li", menuLinkSelector: n = "a", submenuItemSelector: r = "li:has(ul)", submenuToggleSelector: i = "button", submenuSelector: a = "ul", submenuSubtoggleSelector: o = "a", controllerElement: s = null, containerElement: c = null, openClass: l = "show", closeClass: u = "hide", transitionClass: d = "transitioning", transitionDuration: f = 250, isTopLevel: p = !0, parentMenu: m = null, hoverType: h = "off", hoverDelay: g = 250, enterDelay: _ = -1, leaveDelay: v = -1, optionalKeySupport: y = !1, prefix: b = "am-", key: x = null, initialize: S = !0 }) {
		super({
			menuElement: e,
			menuItemSelector: t,
			menuLinkSelector: n,
			submenuItemSelector: r,
			submenuSelector: a,
			submenuToggleSelector: i,
			controllerElement: s,
			containerElement: c,
			openClass: l,
			closeClass: u,
			transitionClass: d,
			transitionDuration: f,
			isTopLevel: p,
			parentMenu: m,
			hoverType: h,
			hoverDelay: g,
			enterDelay: _,
			leaveDelay: v,
			prefix: b,
			key: x
		}), this._optionalSupport = y, this._selectors.menuItems = t, this._selectors.submenuItems = r, this._selectors.submenuToggles = i, this._selectors.submenus = a, this._selectors.submenuSubtoggles = o, this._selectors.menuLinks = [.../* @__PURE__ */ new Set([n, i])].join(","), S && this.initialize();
	}
	initialize() {
		try {
			super.initialize(), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup();
		} catch (e) {
			console.error(e);
		}
	}
	get optionalKeySupport() {
		return this.isTopLevel ? this._optionalSupport : this.elements.rootMenu.optionalKeySupport;
	}
	set optionalKeySupport(e) {
		r("boolean", { optionalKeySupport: e }), this._optionalSupport = e;
	}
	_createChildElements() {
		this.dom.menuItems.forEach((e) => {
			let t, n, r = e.querySelector(this.selectors.menuLinks);
			if (this.dom.submenuItems.includes(e)) {
				let i = e.querySelector(this.selectors.submenuToggles), a = e.querySelector(this.selectors.submenus), o = new this._MenuType({
					menuElement: a,
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
				}), s = new this._MenuToggleType({
					menuToggleElement: i,
					parentElement: e,
					controlledMenu: o,
					parentMenu: this
				});
				this._elements.submenuToggles.push(s), i === r ? t = new this._MenuItemType({
					menuItemElement: e,
					menuLinkElement: r,
					parentMenu: this,
					isSubmenuItem: !0,
					childMenu: o,
					toggle: s
				}) : (n = new this._MenuItemType({
					menuItemElement: e,
					menuLinkElement: i,
					parentMenu: this,
					isSubmenuItem: !0,
					childMenu: o,
					toggle: s
				}), t = new this._MenuItemType({
					menuItemElement: e,
					menuLinkElement: r,
					parentMenu: this,
					submenuSibling: n
				}));
			} else t = new this._MenuItemType({
				menuItemElement: e,
				menuLinkElement: r,
				parentMenu: this
			});
			this._elements.menuItems.push(t), n !== void 0 && this._elements.menuItems.push(n);
		});
	}
	_validate() {
		let e = super._validate(), t = i({ submenuSubtoggleSelector: this._selectors.submenuSubtoggles });
		t.status || (this._errors.push(t.error.message), e = !1);
		let n = r("boolean", { optionalKeySupport: this._optionalSupport });
		return n.status || (this._errors.push(n.error.message), e = !1), e;
	}
	_handleClick() {
		super._handleClick(), document.addEventListener("click", (e) => {
			this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close(), this.elements.rootMenu.hasOpened = !1));
		});
	}
	_handleHover() {
		this.elements.menuItems.forEach((e, t) => {
			e.dom.link.addEventListener("pointerenter", (n) => {
				if (n.pointerType !== "pen" && n.pointerType !== "touch") {
					if (this.hoverType === "on") {
						this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t);
						let n = e.isSubmenuItem ? e.elements.toggle : null;
						if (e.elements.sibling !== null && (n = e.elements.sibling.elements.toggle), n === null) return;
						this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
							n.preview();
						}, this.enterDelay)) : n.preview();
					} else if (this.hoverType === "dynamic" && (this.currentChild = t, this.isTopLevel && this.focusState === "none" || (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), !this.isTopLevel || this.hasOpened)) {
						this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild();
						let t = e.isSubmenuItem ? e.elements.toggle : null;
						e.elements.sibling !== null && (t = e.elements.sibling.elements.toggle), t === null ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
							this.closeChildren();
						}, this.enterDelay)) : this.closeChildren() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
							t.preview();
						}, this.enterDelay)) : t.preview();
					}
				}
			}), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (t) => {
				t.pointerType !== "pen" && t.pointerType !== "touch" && (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					this.currentEvent = "mouse", e.elements.toggle.close();
				}, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
					this.currentEvent = "mouse";
				}, this.leaveDelay)) : this.currentEvent = "mouse"));
			}), e.dom.item.addEventListener("pointerenter", (t) => {
				t.pointerType !== "pen" && t.pointerType !== "touch" && e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
			}));
		});
	}
	_handleKeydown() {
		super._handleKeydown(), this.dom.menu.addEventListener("keydown", (e) => {
			this.currentEvent = "keyboard";
			let t = f(e);
			this.focusState === "self" && (["Space", "Enter"].includes(t) || this.optionalKeySupport && [
				"ArrowUp",
				"ArrowRight",
				"ArrowDown",
				"ArrowLeft",
				"Home",
				"End"
			].includes(t) || this.elements.controller && ["Escape"].includes(t) || this.elements.parentMenu && ["Escape"].includes(t)) && p(e);
		});
	}
	_handleKeyup() {
		super._handleKeyup(), this.dom.menu.addEventListener("keyup", (e) => {
			this.currentEvent = "keyboard";
			let t = f(e);
			this.focusState === "self" && (t === "Space" || t === "Enter" ? (p(e), this.currentMenuItem.isSubmenuItem ? this.currentMenuItem.elements.toggle.isOpen ? this.currentMenuItem.elements.toggle.close() : this.currentMenuItem.elements.toggle.preview() : this.currentMenuItem.dom.link.click()) : t === "Escape" ? this.elements.submenuToggles.some((e) => e.isOpen) ? (p(e), this.closeChildren()) : this.elements.parentMenu ? (p(e), this.elements.parentMenu.currentEvent = this.currentEvent, this.elements.parentMenu.closeChildren(), this.elements.parentMenu.focusCurrentChild()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (this.elements.controller.close(), this.focusController()) : this.optionalKeySupport && (t === "ArrowDown" || t === "ArrowRight" ? (p(e), this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.childMenu.focusFirstChild()) : this.focusNextChild()) : t === "ArrowUp" || t === "ArrowLeft" ? (p(e), this.focusPreviousChild()) : t === "Home" ? (p(e), this.focusFirstChild()) : t === "End" && (p(e), this.focusLastChild())));
		});
	}
};
export { _ as default };
