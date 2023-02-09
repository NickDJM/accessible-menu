var Menubar = (function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  function isValidInstance(contructor, elements) {
    try {
      if (typeof elements !== "object") {
        const elementsType = typeof elements;
        throw new TypeError(`AccessibleMenu: Elements given to isValidInstance() must be inside of an object. ${elementsType} given.`);
      }
      for (const key in elements) {
        if (!(elements[key] instanceof contructor)) {
          const elementType = typeof elements[key];
          throw new TypeError(`AccessibleMenu: ${key} must be an instance of ${contructor.name}. ${elementType} given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isValidType(type, values) {
    try {
      if (typeof values !== "object") {
        const valuesType = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isValidType() must be inside of an object. ${valuesType} given.`);
      }
      for (const key in values) {
        const valueType = typeof values[key];
        if (valueType !== type) {
          throw new TypeError(`AccessibleMenu: ${key} must be a ${type}. ${valueType} given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isCSSSelector(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isCSSSelector() must be inside of an object. ${type} given.`);
      }
      for (const key in values) {
        try {
          if (values[key] === null) {
            throw new Error();
          }
          document.querySelector(values[key]);
        } catch (error) {
          throw new TypeError(`AccessibleMenu: ${key} must be a valid CSS selector. "${values[key]}" given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isValidClassList(values) {
    try {
      if (typeof values !== "object" || Array.isArray(values)) {
        const type = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isValidClassList() must be inside of an object. ${type} given.`);
      }
      for (const key in values) {
        const type = typeof values[key];
        if (type !== "string") {
          if (Array.isArray(values[key])) {
            values[key].forEach(value => {
              if (typeof value !== "string") {
                throw new TypeError(`AccessibleMenu: ${key} must be a string or an array of strings. An array containing non-strings given.`);
              }
            });
          } else {
            throw new TypeError(`AccessibleMenu: ${key} must be a string or an array of strings. ${type} given.`);
          }
        } else {
          const obj = {};
          obj[key] = values[key];
          isCSSSelector(obj);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isValidState(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isValidState() must be inside of an object. ${type} given.`);
      }
      const validStates = ["none", "self", "child"];
      for (const key in values) {
        if (!validStates.includes(values[key])) {
          throw new TypeError(`AccessibleMenu: ${key} must be one of the following values: ${validStates.join(", ")}. "${values[key]}" given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isValidEvent(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isValidEvent() must be inside of an object. ${type} given.`);
      }
      const validEvents = ["none", "mouse", "keyboard", "character"];
      for (const key in values) {
        if (!validEvents.includes(values[key])) {
          throw new TypeError(`AccessibleMenu: ${key} must be one of the following values: ${validEvents.join(", ")}. "${values[key]}" given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isValidHoverType(values) {
    try {
      if (typeof values !== "object") {
        const type = typeof values;
        throw new TypeError(`AccessibleMenu: Values given to isValidHoverType() must be inside of an object. ${type} given.`);
      }
      const validTypes = ["off", "on", "dynamic"];
      for (const key in values) {
        if (!validTypes.includes(values[key])) {
          throw new TypeError(`AccessibleMenu: ${key} must be one of the following values: ${validTypes.join(", ")}. "${values[key]}" given.`);
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  function isTag(tagName, elements) {
    if (isValidType("string", {
      tagName
    }) && isValidInstance(HTMLElement, elements)) {
      const tag = tagName.toLowerCase();
      let check = true;
      for (const key in elements) {
        if (elements[key].tagName.toLowerCase() !== tag) check = false;
      }
      return check;
    } else {
      return false;
    }
  }

  class BaseMenuToggle {
    constructor(_ref) {
      let {
        menuToggleElement,
        parentElement,
        controlledMenu,
        parentMenu = null
      } = _ref;
      _defineProperty(this, "_dom", {
        toggle: null,
        parent: null
      });
      _defineProperty(this, "_elements", {
        controlledMenu: null,
        parentMenu: null
      });
      _defineProperty(this, "_open", false);
      _defineProperty(this, "_expandEvent", new CustomEvent("accessibleMenuExpand", {
        bubbles: true,
        detail: {
          toggle: this
        }
      }));
      _defineProperty(this, "_collapseEvent", new CustomEvent("accessibleMenuCollapse", {
        bubbles: true,
        detail: {
          toggle: this
        }
      }));
      this._dom.toggle = menuToggleElement;
      this._dom.parent = parentElement;
      this._elements.controlledMenu = controlledMenu;
      this._elements.parentMenu = parentMenu;
    }
    initialize() {
      this.dom.toggle.setAttribute("aria-haspopup", "true");
      this.dom.toggle.setAttribute("aria-expanded", "false");
      if (!isTag("button", {
        toggle: this.dom.toggle
      })) {
        this.dom.toggle.setAttribute("role", "button");
      }
      if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
        const randomString = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 10);
        let id = this.dom.toggle.innerText.replace(/[^a-zA-Z0-9\s]/g, "");
        let finalID = randomString;
        if (!id.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label")) {
          id = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "");
        }
        if (id.replace(/\s/g, "").length > 0) {
          id = id.toLowerCase().replace(/\s+/g, "-");
          if (id.startsWith("-")) {
            id = id.substring(1);
          }
          if (id.endsWith("-")) {
            id = id.slice(0, -1);
          }
          finalID = `${id}-${finalID}`;
        }
        this.dom.toggle.id = this.dom.toggle.id || `${finalID}-menu-button`;
        this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `${finalID}-menu`;
      }
      this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby", this.dom.toggle.id);
      this.dom.toggle.setAttribute("aria-controls", this.elements.controlledMenu.dom.menu.id);
      this._collapse(false);
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
    set isOpen(value) {
      isValidType("boolean", {
        value
      });
      this._open = value;
    }
    _expand() {
      let emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      const {
        closeClass,
        openClass
      } = this.elements.controlledMenu;
      this.dom.toggle.setAttribute("aria-expanded", "true");
      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(openClass);
        } else {
          this.elements.controlledMenu.dom.menu.classList.add(...openClass);
        }
      }
      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(closeClass);
        } else {
          this.elements.controlledMenu.dom.menu.classList.remove(...closeClass);
        }
      }
      if (emit) {
        this.dom.toggle.dispatchEvent(this._expandEvent);
      }
    }
    _collapse() {
      let emit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      const {
        closeClass,
        openClass
      } = this.elements.controlledMenu;
      this.dom.toggle.setAttribute("aria-expanded", "false");
      if (closeClass !== "") {
        if (typeof closeClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.add(closeClass);
        } else {
          this.elements.controlledMenu.dom.menu.classList.add(...closeClass);
        }
      }
      if (openClass !== "") {
        if (typeof openClass === "string") {
          this.elements.controlledMenu.dom.menu.classList.remove(openClass);
        } else {
          this.elements.controlledMenu.dom.menu.classList.remove(...openClass);
        }
      }
      if (emit) {
        this.dom.toggle.dispatchEvent(this._collapseEvent);
      }
    }
    open() {
      this.elements.controlledMenu.focusState = "self";
      this._expand();
      this.isOpen = true;
    }
    preview() {
      if (this.elements.parentMenu) {
        this.elements.parentMenu.focusState = "self";
      }
      this._expand();
      this.isOpen = true;
    }
    close() {
      if (this.isOpen) {
        this.elements.controlledMenu.currentChild = 0;
        this.elements.controlledMenu.blur();
        if (this.elements.parentMenu) {
          this.elements.parentMenu.focusState = "self";
        }
        this._collapse();
        this.isOpen = false;
      }
    }
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
    closeSiblings() {
      if (this.elements.parentMenu) {
        this.elements.parentMenu.elements.submenuToggles.forEach(toggle => {
          if (toggle !== this) toggle.close();
        });
      }
    }
    closeChildren() {
      this.elements.controlledMenu.elements.submenuToggles.forEach(toggle => toggle.close());
    }
  }

  class BaseMenuItem {
    constructor(_ref) {
      let {
        menuItemElement,
        menuLinkElement,
        parentMenu,
        isSubmenuItem = false,
        childMenu = null,
        toggle = null
      } = _ref;
      _defineProperty(this, "_dom", {
        item: null,
        link: null
      });
      _defineProperty(this, "_elements", {
        parentMenu: null,
        childMenu: null,
        toggle: null
      });
      _defineProperty(this, "_submenu", false);
      this._dom.item = menuItemElement;
      this._dom.link = menuLinkElement;
      this._elements.parentMenu = parentMenu;
      this._elements.childMenu = childMenu;
      this._elements.toggle = toggle;
      this._submenu = isSubmenuItem;
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
      if (this.elements.parentMenu.shouldFocus) {
        this.dom.link.focus();
      }
    }
    blur() {
      if (this.elements.parentMenu.shouldFocus) {
        this.dom.link.blur();
      }
    }
  }

  function keyPress(event) {
    try {
      const key = event.key || event.keyCode;
      const keys = {
        Enter: key === "Enter" || key === 13,
        Space: key === " " || key === "Spacebar" || key === 32,
        Escape: key === "Escape" || key === "Esc" || key === 27,
        ArrowUp: key === "ArrowUp" || key === "Up" || key === 38,
        ArrowRight: key === "ArrowRight" || key === "Right" || key === 39,
        ArrowDown: key === "ArrowDown" || key === "Down" || key === 40,
        ArrowLeft: key === "ArrowLeft" || key === "Left" || key === 37,
        Home: key === "Home" || key === 36,
        End: key === "End" || key === 35,
        Character: isNaN(key) && !!key.match(/^[a-zA-Z]{1}$/),
        Tab: key === "Tab" || key === 9,
        Asterisk: key === "*" || key === 56
      };
      return Object.keys(keys).find(key => keys[key] === true) || "";
    } catch (error) {
      return "";
    }
  }
  function preventEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  class BaseMenu {
    constructor(_ref) {
      let {
        menuElement,
        menuItemSelector = "li",
        menuLinkSelector = "a",
        submenuItemSelector = "",
        submenuToggleSelector = "a",
        submenuSelector = "ul",
        controllerElement = null,
        containerElement = null,
        openClass = "show",
        closeClass = "hide",
        isTopLevel = true,
        parentMenu = null,
        hoverType = "off",
        hoverDelay = 250
      } = _ref;
      _defineProperty(this, "_MenuType", BaseMenu);
      _defineProperty(this, "_MenuItemType", BaseMenuItem);
      _defineProperty(this, "_MenuToggleType", BaseMenuToggle);
      _defineProperty(this, "_dom", {
        menu: null,
        menuItems: [],
        submenuItems: [],
        submenuToggles: [],
        submenus: [],
        controller: null,
        container: null
      });
      _defineProperty(this, "_selectors", {
        menuItems: "",
        menuLinks: "",
        submenuItems: "",
        submenuToggles: "",
        submenus: ""
      });
      _defineProperty(this, "_elements", {
        menuItems: [],
        submenuToggles: [],
        controller: null,
        parentMenu: null,
        rootMenu: null
      });
      _defineProperty(this, "_openClass", "show");
      _defineProperty(this, "_closeClass", "hide");
      _defineProperty(this, "_root", true);
      _defineProperty(this, "_currentChild", 0);
      _defineProperty(this, "_focusState", "none");
      _defineProperty(this, "_currentEvent", "none");
      _defineProperty(this, "_hoverType", "off");
      _defineProperty(this, "_hoverDelay", 250);
      this._dom.menu = menuElement;
      this._dom.controller = controllerElement;
      this._dom.container = containerElement;
      this._selectors.menuItems = menuItemSelector;
      this._selectors.menuLinks = menuLinkSelector;
      this._selectors.submenuItems = submenuItemSelector;
      this._selectors.submenuToggles = submenuToggleSelector;
      this._selectors.submenus = submenuSelector;
      this._elements.menuItems = [];
      this._elements.submenuToggles = [];
      this._elements.controller = null;
      this._elements.parentMenu = parentMenu;
      this._elements.rootMenu = isTopLevel ? this : null;
      this._openClass = openClass || "";
      this._closeClass = closeClass || "";
      this._root = isTopLevel;
      this._hoverType = hoverType;
      this._hoverDelay = hoverDelay;
    }
    initialize() {
      if (!this._validate()) {
        throw new Error("AccesibleMenu: cannot initialize menu. See other error messages for more information.");
      }
      if (this.elements.rootMenu === null) this._findRootMenu(this);
      this._setDOMElements();
      if (this.isTopLevel) {
        if (this.dom.controller && this.dom.container) {
          const toggle = new this._MenuToggleType({
            menuToggleElement: this.dom.controller,
            parentElement: this.dom.container,
            controlledMenu: this
          });
          this._elements.controller = toggle;
        }
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
      return this.isTopLevel ? this._closeClass : this.elements.rootMenu.closeClass;
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
    get shouldFocus() {
      let check = false;
      if (this.currentEvent === "keyboard" || this.currentEvent === "character") {
        check = true;
      }
      if (this.currentEvent === "mouse" && this.hoverType === "dynamic") {
        check = true;
      }
      return check;
    }
    set openClass(value) {
      isValidClassList({
        openClass: value
      });
      if (this._openClass !== value) {
        this._openClass = value;
      }
    }
    set closeClass(value) {
      isValidClassList({
        closeClass: value
      });
      if (this._closeClass !== value) {
        this._closeClass = value;
      }
    }
    set currentChild(value) {
      isValidType("number", {
        value
      });
      function setParentChild(menu) {
        const updateEvents = ["mouse", "character"];
        if (updateEvents.includes(menu.currentEvent) && menu.elements.parentMenu) {
          let index = 0;
          let found = false;
          while (!found && index < menu.elements.parentMenu.elements.menuItems.length) {
            const menuItem = menu.elements.parentMenu.elements.menuItems[index];
            if (menuItem.isSubmenuItem && menuItem.elements.toggle.elements.controlledMenu === menu) {
              found = true;
              menu.elements.parentMenu.currentEvent = menu.currentEvent;
              menu.elements.parentMenu.currentChild = index;
            }
            index++;
          }
        }
      }
      if (value < -1) {
        this._currentChild = -1;
        setParentChild(this);
      } else if (value >= this.elements.menuItems.length) {
        this._currentChild = this.elements.menuItems.length - 1;
        setParentChild(this);
      } else if (this.focusChild !== value) {
        this._currentChild = value;
        setParentChild(this);
      }
    }
    set focusState(value) {
      isValidState({
        value
      });
      if (this._focusState !== value) {
        this._focusState = value;
      }
      if (this.elements.submenuToggles.length > 0 && (value === "self" || value === "none")) {
        this.elements.submenuToggles.forEach(toggle => {
          toggle.elements.controlledMenu.focusState = "none";
        });
      }
      if (this.elements.parentMenu && (value === "self" || value === "child")) {
        this.elements.parentMenu.focusState = "child";
      }
    }
    set currentEvent(value) {
      isValidEvent({
        value
      });
      if (this._currentEvent !== value) {
        this._currentEvent = value;
        if (this.elements.submenuToggles.length > 0) {
          this.elements.submenuToggles.forEach(submenuToggle => {
            submenuToggle.elements.controlledMenu.currentEvent = value;
          });
        }
      }
    }
    set hoverType(value) {
      isValidHoverType({
        value
      });
      if (this._hoverType !== value) {
        this._hoverType = value;
      }
    }
    set hoverDelay(value) {
      isValidType("number", {
        value
      });
      if (this._hoverDelay !== value) {
        this._hoverDelay = value;
      }
    }
    _validate() {
      let check = true;
      if (this._dom.container !== null || this._dom.controller !== null) {
        if (!isValidInstance(HTMLElement, {
          menuElement: this._dom.menu,
          controllerElement: this._dom.controller,
          containerElement: this._dom.container
        })) {
          check = false;
        }
      } else if (!isValidInstance(HTMLElement, {
        menuElement: this._dom.menu
      })) {
        check = false;
      }
      if (this._selectors.submenuItems !== "") {
        if (!isCSSSelector({
          menuItemSelector: this._selectors.menuItems,
          menuLinkSelector: this._selectors.menuLinks,
          submenuItemSelector: this._selectors.submenuItems,
          submenuToggleSelector: this._selectors.submenuToggles,
          submenuSelector: this._selectors.submenus
        })) {
          check = false;
        }
      } else if (!isCSSSelector({
        menuItemSelector: this._selectors.menuItems,
        menuLinkSelector: this._selectors.menuLinks
      })) {
        check = false;
      }
      if (this._openClass !== "" && !isValidClassList({
        openClass: this._openClass
      })) {
        check = false;
      }
      if (this._closeClass !== "" && !isValidClassList({
        closeClass: this._closeClass
      })) {
        check = false;
      }
      if (!isValidType("boolean", {
        isTopLevel: this._root
      })) {
        check = false;
      }
      if (this._elements.parentMenu !== null && !isValidInstance(BaseMenu, {
        parentMenu: this._elements.parentMenu
      })) {
        check = false;
      }
      if (!isValidHoverType({
        hoverType: this._hoverType
      })) {
        check = false;
      }
      if (!isValidType("number", {
        hoverDelay: this._hoverDelay
      })) {
        check = false;
      }
      return check;
    }
    _setDOMElementType(elementType) {
      let base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dom.menu;
      let overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (typeof this.selectors[elementType] === "string") {
        if (!Array.isArray(this.dom[elementType])) {
          throw new Error(`AccessibleMenu: The "${elementType}" element cannot be set through _setDOMElementType.`);
        }
        if (base !== this.dom.menu) isValidInstance(HTMLElement, {
          base
        });
        const domElements = Array.from(base.querySelectorAll(this.selectors[elementType]));
        const filteredElements = domElements.filter(item => item.parentElement === base);
        if (overwrite) {
          this._dom[elementType] = filteredElements;
        } else {
          this._dom[elementType] = [...this._dom[elementType], ...filteredElements];
        }
      } else {
        throw new Error(`AccessibleMenu: "${elementType}" is not a valid element type within the menu.`);
      }
    }
    _resetDOMElementType(elementType) {
      if (typeof this.dom[elementType] !== "undefined") {
        if (!Array.isArray(this.dom[elementType])) {
          throw new Error(`AccessibleMenu: The "${elementType}" element cannot be reset through _resetDOMElementType.`);
        }
        this._dom[elementType] = [];
      } else {
        throw new Error(`AccessibleMenu: "${elementType}" is not a valid element type within the menu.`);
      }
    }
    _setDOMElements() {
      this._setDOMElementType("menuItems");
      if (this.selectors.submenuItems !== "") {
        this._setDOMElementType("submenuItems");
        this._resetDOMElementType("submenuToggles");
        this._resetDOMElementType("submenus");
        this.dom.submenuItems.forEach(item => {
          this._setDOMElementType("submenuToggles", item, false);
          this._setDOMElementType("submenus", item, false);
        });
      }
    }
    _findRootMenu(menu) {
      if (menu.isTopLevel) {
        this._elements.rootMenu = menu;
      } else if (menu.elements.parentMenu !== null) {
        this._findRootMenu(menu.elements.parentMenu);
      } else {
        throw new Error("Cannot find root menu.");
      }
    }
    _createChildElements() {
      this.dom.menuItems.forEach(element => {
        let menuItem;
        if (this.dom.submenuItems.includes(element)) {
          const toggler = element.querySelector(this.selectors.submenuToggles);
          const submenu = element.querySelector(this.selectors.submenus);
          const menu = new this._MenuType({
            menuElement: submenu,
            menuItemSelector: this.selectors.menuItems,
            menuLinkSelector: this.selectors.menuLinks,
            submenuItemSelector: this.selectors.submenuItems,
            submenuToggleSelector: this.selectors.submenuToggles,
            submenuSelector: this.selectors.submenus,
            openClass: this.openClass,
            closeClass: this.closeClass,
            isTopLevel: false,
            parentMenu: this,
            hoverType: this.hoverType,
            hoverDelay: this.hoverDelay
          });
          const toggle = new this._MenuToggleType({
            menuToggleElement: toggler,
            parentElement: element,
            controlledMenu: menu,
            parentMenu: this
          });
          this._elements.submenuToggles.push(toggle);
          menuItem = new this._MenuItemType({
            menuItemElement: element,
            menuLinkElement: toggler,
            parentMenu: this,
            isSubmenuItem: true,
            childMenu: menu,
            toggle
          });
        } else {
          const link = element.querySelector(this.selectors.menuLinks);
          menuItem = new this._MenuItemType({
            menuItemElement: element,
            menuLinkElement: link,
            parentMenu: this
          });
        }
        this._elements.menuItems.push(menuItem);
      });
    }
    _handleFocus() {
      this.elements.menuItems.forEach((menuItem, index) => {
        menuItem.dom.link.addEventListener("focus", () => {
          this.focusState = "self";
          this.currentChild = index;
        });
      });
    }
    _handleClick() {
      function toggleToggle(menu, toggle, event) {
        preventEvent(event);
        toggle.toggle();
        if (toggle.isOpen) {
          menu.focusState = "self";
          toggle.elements.controlledMenu.focusState = "none";
        }
      }
      this.elements.menuItems.forEach((item, index) => {
        item.dom.link.addEventListener("pointerdown", () => {
          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this.focusChild(index);
        }, {
          passive: true
        });
        if (item.isSubmenuItem) {
          item.elements.toggle.dom.toggle.addEventListener("pointerup", event => {
            this.currentEvent = "mouse";
            toggleToggle(this, item.elements.toggle, event);
          });
        }
      });
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.addEventListener("pointerup", event => {
          this.currentEvent = "mouse";
          toggleToggle(this, this.elements.controller, event);
        });
      }
    }
    _handleHover() {
      this.elements.menuItems.forEach((menuItem, index) => {
        menuItem.dom.link.addEventListener("pointerenter", event => {
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }
          if (this.hoverType === "on") {
            this.currentEvent = "mouse";
            this.currentChild = index;
            if (menuItem.isSubmenuItem) {
              menuItem.elements.toggle.preview();
            }
          } else if (this.hoverType === "dynamic") {
            const isOpen = this.elements.submenuToggles.some(toggle => toggle.isOpen);
            this.currentChild = index;
            if (!this.isTopLevel || this.focusState !== "none") {
              this.currentEvent = "mouse";
              this.focusCurrentChild();
            }
            if (menuItem.isSubmenuItem && (!this.isTopLevel || isOpen)) {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.preview();
            }
          }
        });
        if (menuItem.isSubmenuItem) {
          menuItem.dom.item.addEventListener("pointerleave", event => {
            if (event.pointerType === "pen" || event.pointerType === "touch") {
              return;
            }
            if (this.hoverType === "on") {
              if (this.hoverDelay > 0) {
                setTimeout(() => {
                  this.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                }, this.hoverDelay);
              } else {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
              }
            } else if (this.hoverType === "dynamic") {
              if (!this.isTopLevel) {
                if (this.hoverDelay > 0) {
                  setTimeout(() => {
                    this.currentEvent = "mouse";
                    menuItem.elements.toggle.close();
                    this.focusCurrentChild();
                  }, this.hoverDelay);
                } else {
                  this.currentEvent = "mouse";
                  menuItem.elements.toggle.close();
                  this.focusCurrentChild();
                }
              }
            }
          });
        }
      });
    }
    _handleKeydown() {
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.addEventListener("keydown", event => {
          this.currentEvent = "keyboard";
          const key = keyPress(event);
          if (key === "Space" || key === "Enter") {
            preventEvent(event);
          }
        });
      }
    }
    _handleKeyup() {
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.addEventListener("keyup", event => {
          this.currentEvent = "keyboard";
          const key = keyPress(event);
          if (key === "Space" || key === "Enter") {
            preventEvent(event);
            this.elements.controller.open();
            this.focusFirstChild();
          }
        });
      }
    }
    focus() {
      this.focusState = "self";
      if (this.shouldFocus) {
        this.dom.menu.focus();
      }
    }
    blur() {
      this.focusState = "none";
      if (this.shouldFocus) {
        this.dom.menu.blur();
      }
    }
    focusCurrentChild() {
      this.focusState = "self";
      if (this.currentChild !== -1) {
        this.currentMenuItem.focus();
      }
    }
    focusChild(index) {
      this.blurCurrentChild();
      this.currentChild = index;
      this.focusCurrentChild();
    }
    focusFirstChild() {
      this.focusChild(0);
    }
    focusLastChild() {
      this.focusChild(this.elements.menuItems.length - 1);
    }
    focusNextChild() {
      if (this.currentChild < this.elements.menuItems.length - 1) {
        this.focusChild(this.currentChild + 1);
      } else {
        this.focusCurrentChild();
      }
    }
    focusPreviousChild() {
      if (this.currentChild > 0) {
        this.focusChild(this.currentChild - 1);
      } else {
        this.focusCurrentChild();
      }
    }
    blurCurrentChild() {
      this.focusState = "none";
      if (this.currentChild !== -1) {
        this.currentMenuItem.blur();
      }
    }
    focusController() {
      if (this.dom.controller) {
        if (this.shouldFocus) {
          this.dom.controller.focus();
        }
        this.focusState = "none";
      }
    }
    focusContainer() {
      if (this.dom.container) {
        if (this.shouldFocus) {
          this.dom.container.focus();
        }
        this.focusState = "none";
      }
    }
    closeChildren() {
      this.elements.submenuToggles.forEach(toggle => toggle.close());
    }
    blurChildren() {
      this.elements.menuItems.forEach(menuItem => {
        menuItem.blur();
        if (menuItem.isSubmenuItem) {
          menuItem.elements.childMenu.blurChildren();
        }
      });
    }
  }

  class MenubarItem extends BaseMenuItem {
    constructor(_ref) {
      let {
        menuItemElement,
        menuLinkElement,
        parentMenu,
        isSubmenuItem = false,
        childMenu = null,
        toggle = null,
        initialize = true
      } = _ref;
      super({
        menuItemElement,
        menuLinkElement,
        parentMenu,
        isSubmenuItem,
        childMenu,
        toggle
      });
      if (initialize) {
        this.initialize();
      }
    }
    initialize() {
      super.initialize();
      this.dom.item.setAttribute("role", "none");
      this.dom.link.setAttribute("role", "menuitem");
      this.dom.link.tabIndex = -1;
    }
    focus() {
      super.focus();
      if (this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = 0;
      }
    }
    blur() {
      super.blur();
      if (this.elements.parentMenu.isTopLevel) {
        this.dom.link.tabIndex = -1;
      }
    }
  }

  class MenubarToggle extends BaseMenuToggle {
    constructor(_ref) {
      let {
        menuToggleElement,
        parentElement,
        controlledMenu,
        parentMenu = null,
        initialize = true
      } = _ref;
      super({
        menuToggleElement,
        parentElement,
        controlledMenu,
        parentMenu
      });
      if (initialize) {
        this.initialize();
      }
    }
    open() {
      this.closeSiblings();
      super.open();
    }
    preview() {
      this.closeSiblings();
      super.preview();
    }
    close() {
      if (this.isOpen) {
        this.closeChildren();
      }
      super.close();
    }
  }

  class Menubar extends BaseMenu {
    constructor(_ref) {
      let {
        menuElement,
        menuItemSelector = "li",
        menuLinkSelector = "a",
        submenuItemSelector = "",
        submenuToggleSelector = "a",
        submenuSelector = "ul",
        controllerElement = null,
        containerElement = null,
        openClass = "show",
        closeClass = "hide",
        isTopLevel = true,
        parentMenu = null,
        hoverType = "off",
        hoverDelay = 250,
        initialize = true
      } = _ref;
      super({
        menuElement,
        menuItemSelector,
        menuLinkSelector,
        submenuItemSelector,
        submenuToggleSelector,
        submenuSelector,
        controllerElement,
        containerElement,
        openClass,
        closeClass,
        isTopLevel,
        parentMenu,
        hoverType,
        hoverDelay
      });
      _defineProperty(this, "_MenuType", Menubar);
      _defineProperty(this, "_MenuItemType", MenubarItem);
      _defineProperty(this, "_MenuToggleType", MenubarToggle);
      if (initialize) {
        this.initialize();
      }
    }
    initialize() {
      try {
        super.initialize();
        this.dom.menu.setAttribute("role", "menubar");
        this._handleFocus();
        this._handleClick();
        this._handleHover();
        this._handleKeydown();
        this._handleKeyup();
        if (this.isTopLevel) {
          this.elements.menuItems[0].dom.link.tabIndex = 0;
        }
      } catch (error) {
        console.error(error);
      }
    }
    _handleClick() {
      super._handleClick();
      document.addEventListener("pointerup", event => {
        if (this.focusState !== "none") {
          this.currentEvent = "mouse";
          if (!this.dom.menu.contains(event.target) && !this.dom.menu !== event.target) {
            this.closeChildren();
            this.blur();
            if (this.elements.controller) {
              this.elements.controller.close();
            }
          }
        }
      });
    }
    _handleKeydown() {
      super._handleKeydown();
      this.dom.menu.addEventListener("keydown", event => {
        this.currentEvent = "keyboard";
        const key = keyPress(event);
        if (key === "Tab") {
          if (this.elements.rootMenu.focusState !== "none") {
            this.elements.rootMenu.blur();
            this.elements.rootMenu.closeChildren();
          } else {
            this.elements.rootMenu.focus();
          }
        }
        if (key === "Character") {
          preventEvent(event);
        } else if (this.isTopLevel) {
          if (this.focusState === "self") {
            const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
            const submenuKeys = ["Space", "Enter", "ArrowDown", "ArrowUp"];
            const controllerKeys = ["Escape"];
            if (keys.includes(key)) {
              preventEvent(event);
            } else if (this.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
              preventEvent(event);
            } else if (this.elements.controller && controllerKeys.includes(key)) {
              preventEvent(event);
            }
          }
        } else {
          const keys = ["Escape", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
          const submenuKeys = ["Space", "Enter"];
          if (keys.includes(key)) {
            preventEvent(event);
          } else if (this.currentMenuItem.isSubmenuItem && submenuKeys.includes(key)) {
            preventEvent(event);
          }
        }
      });
    }
    _handleKeyup() {
      super._handleKeyup();
      this.dom.menu.addEventListener("keyup", event => {
        this.currentEvent = "keyboard";
        const key = keyPress(event);
        const {
          altKey,
          crtlKey,
          metaKey
        } = event;
        const modifier = altKey || crtlKey || metaKey;
        if (key === "Character" && !modifier) {
          preventEvent(event);
          this.elements.rootMenu.currentEvent = "character";
          this.focusNextChildWithCharacter(event.key);
        } else if (this.isTopLevel) {
          if (this.focusState === "self") {
            if (key === "Space" || key === "Enter") {
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                this.currentMenuItem.elements.toggle.open();
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              } else {
                this.currentMenuItem.dom.link.click();
              }
            } else if (key === "ArrowRight") {
              preventEvent(event);
              const previousChildOpen = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
              this.focusNextChild();
              if (previousChildOpen) {
                if (this.currentMenuItem.isSubmenuItem) {
                  this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  this.currentMenuItem.elements.toggle.preview();
                } else {
                  this.closeChildren();
                }
              }
            } else if (key === "ArrowLeft") {
              preventEvent(event);
              const previousChildOpen = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
              this.focusPreviousChild();
              if (previousChildOpen) {
                if (this.currentMenuItem.isSubmenuItem) {
                  this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  this.currentMenuItem.elements.toggle.preview();
                } else {
                  this.closeChildren();
                }
              }
            } else if (key === "ArrowDown") {
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                this.currentMenuItem.elements.toggle.open();
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusFirstChild();
                });
              }
            } else if (key === "ArrowUp") {
              if (this.currentMenuItem.isSubmenuItem) {
                preventEvent(event);
                this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                this.currentMenuItem.elements.toggle.open();
                requestAnimationFrame(() => {
                  this.currentMenuItem.elements.childMenu.focusLastChild();
                });
              }
            } else if (key === "Home") {
              preventEvent(event);
              this.focusFirstChild();
            } else if (key === "End") {
              preventEvent(event);
              this.focusLastChild();
            } else if (key === "Escape") {
              const hasOpenChild = this.elements.submenuToggles.some(toggle => toggle.isOpen);
              if (hasOpenChild) {
                preventEvent(event);
                this.closeChildren();
              } else if (this.isTopLevel && this.elements.controller && this.elements.controller.isOpen) {
                preventEvent(event);
                this.elements.controller.close();
                this.focusController();
              }
            }
          }
        } else {
          if (key === "Space" || key === "Enter") {
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.open();
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            } else {
              this.currentMenuItem.dom.link.click();
            }
          } else if (key === "Escape") {
            preventEvent(event);
            this.elements.rootMenu.closeChildren();
            this.elements.rootMenu.focusCurrentChild();
          } else if (key === "ArrowRight") {
            if (this.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
              this.currentMenuItem.elements.toggle.open();
              requestAnimationFrame(() => {
                this.currentMenuItem.elements.childMenu.focusFirstChild();
              });
            } else {
              preventEvent(event);
              this.elements.rootMenu.closeChildren();
              this.elements.rootMenu.focusNextChild();
              if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
              }
            }
          } else if (key === "ArrowLeft") {
            if (this.elements.parentMenu.currentMenuItem.isSubmenuItem) {
              preventEvent(event);
              this.elements.parentMenu.currentMenuItem.elements.toggle.close();
              this.elements.parentMenu.focusCurrentChild();
              if (this.elements.parentMenu === this.elements.rootMenu) {
                this.elements.rootMenu.closeChildren();
                this.elements.rootMenu.focusPreviousChild();
                if (this.elements.rootMenu.currentMenuItem.isSubmenuItem) {
                  this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard";
                  this.elements.rootMenu.currentMenuItem.elements.toggle.preview();
                }
              }
            }
          } else if (key === "ArrowDown") {
            preventEvent(event);
            this.focusNextChild();
          } else if (key === "ArrowUp") {
            preventEvent(event);
            this.focusPreviousChild();
          } else if (key === "Home") {
            preventEvent(event);
            this.focusFirstChild();
          } else if (key === "End") {
            preventEvent(event);
            this.focusLastChild();
          }
        }
      });
    }
    focusNextChild() {
      if (this.currentChild === this.elements.menuItems.length - 1) {
        this.focusFirstChild();
      } else {
        this.focusChild(this.currentChild + 1);
      }
    }
    focusPreviousChild() {
      if (this.currentChild === 0) {
        this.focusLastChild();
      } else {
        this.focusChild(this.currentChild - 1);
      }
    }
    focusNextChildWithCharacter(char) {
      const match = char.toLowerCase();
      let index = this.currentChild + 1;
      let found = false;
      while (!found && index < this.elements.menuItems.length) {
        let text = "";
        if (this.elements.menuItems[index].dom.item.innerText) {
          text = this.elements.menuItems[index].dom.item.innerText;
        } else {
          text = this.elements.menuItems[index].dom.item.textContent;
        }
        text = text.replace(/[\s]/g, "").toLowerCase().charAt(0);
        if (text === match) {
          found = true;
          this.focusChild(index);
        }
        index++;
      }
    }
  }

  return Menubar;

})();
//# sourceMappingURL=menubar.js.map
