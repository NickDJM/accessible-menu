function c(r, e, { shouldThrow: t = !0 } = {}) {
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
        if (!(e[i] instanceof r)) {
          const n = typeof e[i];
          throw new TypeError(
            `${i} must be an instance of ${r.name}. "${n}" given.`
          );
        }
      } catch (n) {
        s.status = !1, s.errors.push(n);
      }
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
function l(r, e, { shouldThrow: t = !0 } = {}) {
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
        const n = typeof e[i];
        if (n !== r)
          throw new TypeError(
            `${i} must be a ${r}. "${n}" given.`
          );
      } catch (n) {
        s.status = !1, s.errors.push(n);
      }
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
function G(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof r != "object") {
      const s = typeof r;
      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${s}" given.`
      );
    }
    for (const s in r)
      try {
        try {
          if (r[s] === null)
            throw new Error();
          document.querySelector(r[s]);
        } catch {
          throw new TypeError(
            `${s} must be a valid query selector. "${r[s]}" given.`
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
function p(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof r != "object" || Array.isArray(r)) {
      const s = typeof r;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${s}" given.`
      );
    }
    for (const s in r)
      try {
        const i = r[s];
        if (i === "")
          continue;
        if (typeof i == "string") {
          if (/\s/.test(i))
            throw new TypeError(
              `${s} must be a valid class token without whitespace. "${i}" given.`
            );
          continue;
        }
        if (Array.isArray(i)) {
          i.forEach((n) => {
            if (typeof n != "string")
              throw new TypeError(
                `${s} must be a string or an array of strings. An array containing non-strings given.`
              );
            if (n !== "" && /\s/.test(n))
              throw new TypeError(
                `${s} must be a valid class token without whitespace. "${n}" given.`
              );
          });
          continue;
        }
        throw new TypeError(
          `${s} must be a string or an array of strings. "${typeof i}" given.`
        );
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
function X(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof r != "object") {
      const i = typeof r;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["none", "self", "child"];
    for (const i in r)
      try {
        if (!s.includes(r[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${r[i]}" given.`
          );
      } catch (n) {
        t.status = !1, t.errors.push(n);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function Y(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof r != "object") {
      const i = typeof r;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["none", "mouse", "keyboard", "character"];
    for (const i in r)
      try {
        if (!s.includes(r[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${r[i]}" given.`
          );
      } catch (n) {
        t.status = !1, t.errors.push(n);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function N(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (typeof r != "object") {
      const i = typeof r;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${i}" given.`
      );
    }
    const s = ["off", "on", "dynamic"];
    for (const i in r)
      try {
        if (!s.includes(r[i]))
          throw new TypeError(
            `${i} must be one of the following values: ${s.join(
              ", "
            )}. "${r[i]}" given.`
          );
      } catch (n) {
        t.status = !1, t.errors.push(n);
      }
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function ee(r, e, { shouldThrow: t = !0 } = {}) {
  const s = {
    status: !0,
    errors: []
  };
  try {
    if (l("string", { tagName: r }, { shouldThrow: !0 }).status && c(HTMLElement, e, { shouldThrow: !0 }).status) {
      const i = r.toLowerCase();
      for (const n in e)
        try {
          if (e[n].tagName.toLowerCase() !== i)
            throw new TypeError(
              `${n} must be a <${i}> element. <${e[n].tagName.toLowerCase()}> given.`
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
function te(r, e, { shouldThrow: t = !0 } = {}) {
  const s = {
    status: !0,
    errors: []
  };
  try {
    if (!Object.prototype.hasOwnProperty.call(e.events, r))
      throw new TypeError(
        `Event type "${r}" is not valid for ${e.constructor.name}. Valid event types are: "${Object.keys(e.events).join('", ')}".`
      );
  } catch (i) {
    s.status = !1, s.errors.push(i);
  }
  if (t && !s.status)
    throw s.errors[0];
  return s;
}
function se(r, { shouldThrow: e = !0 } = {}) {
  const t = {
    status: !0,
    errors: []
  };
  try {
    if (!Object.prototype.hasOwnProperty.call(
      r._dom,
      r._rootDOMElement
    ))
      throw new Error(
        `The root DOM element "${r._rootDOMElement}" does not exist in the ${r.constructor.name}'s _dom property. It must be one of the following: "${Object.keys(
          r._dom
        ).join('", "')}".`
      );
  } catch (s) {
    t.status = !1, t.errors.push(s);
  }
  if (e && !t.status)
    throw t.errors[0];
  return t;
}
function ie(r) {
  return l("string", { value: r }), `${r.charAt(0).toLowerCase()}${r.slice(1)}`;
}
function R(r) {
  return l("string", { value: r }), `${r.charAt(0).toUpperCase()}${r.slice(1)}`;
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
   * A flag to replace existing storage in the same scope.
   *
   * @protected
   *
   * @type {boolean}
   */
  _crush = !1;
  /**
   * Constructs a new `StorageManager`.
   *
   * @param {object}  [options = {}]              - The options for the storage.
   * @param {string}  options.scope               - The scope of the storage.
   * @param {?string} [options.type = null]       - The type of storage.
   * @param {boolean} [options.crush = false]     - A flag to replace existing storage in the same scope.
   * @param {boolean} [options.initialize = true] - Whether to initialize the storage.
   */
  constructor({ scope: e, type: t = null, crush: s = !1, initialize: i = !0 } = {}) {
    this._scope = e, this._type = t || "_default", this._crush = s, i && this.initialize();
  }
  /**
   * Initialize the storage.
   */
  initialize() {
    try {
      !this._crush && typeof window[this.scope] < "u" && (c(
        $,
        { storage: window[this.scope] },
        { shouldThrow: !1 }
      ).status || typeof window[this.scope].storage < "u" && typeof window[this.scope].scope < "u" && typeof window[this.scope].type < "u") && (this._storage = window[this.scope].storage);
    } catch {
    } finally {
      window[this.scope] = this;
    }
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
   * @return {object}                             - The storage object.
   */
  get({ type: e = this.type, key: t = null } = {}) {
    const s = l("string", { type: e }, { shouldThrow: !1 });
    if (!s.status)
      throw s.errors[0];
    if (!this.storage[e])
      throw new Error(
        `StorageManager (${this.scope}): Type "${e}" is not initialized.`
      );
    if (t !== null) {
      const i = l("string", { key: t }, { shouldThrow: !1 });
      if (!i.status)
        throw i.errors[0];
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
    const i = l("string", { type: e }, { shouldThrow: !1 }), n = l("object", { data: s }, { shouldThrow: !1 });
    if (!i.status)
      throw i.errors[0];
    if (!n.status)
      throw n.errors[0];
    if (t !== null) {
      const o = l("string", { key: t }, { shouldThrow: !1 });
      if (!o.status)
        throw o.errors[0];
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
    const s = l("string", { type: e }, { shouldThrow: !1 });
    if (!s.status)
      throw s.errors[0];
    if (t !== null) {
      const i = l("string", { key: t }, { shouldThrow: !1 });
      if (!i.status)
        throw i.errors[0];
      delete this.storage[e][t];
    } else
      delete this.storage[e];
  }
  dispose() {
    typeof window < "u" && window[this.scope] === this && delete window[this.scope], delete this._storage;
  }
}
function y(r, e) {
  if (!(r === "" || r.length === 0))
    if (typeof r == "string")
      e.classList.add(r);
    else {
      const t = r.filter((s) => s !== "");
      t.length > 0 && e.classList.add(...t);
    }
}
function E(r, e) {
  if (!(r === "" || r.length === 0))
    if (typeof r == "string")
      e.classList.remove(r);
    else {
      const t = r.filter((s) => s !== "");
      t.length > 0 && e.classList.remove(...t);
    }
}
class V {
  /**
   * The DOM elements within the component.
   *
   * @protected
   *
   * @type {Object<string, HTMLElement|HTMLElement[]>}
   */
  _dom = {};
  /**
   * The key used to get the root element from _dom.
   *
   * @protected
   *
   * @type {string}
   */
  _rootDOMElement = "";
  /**
   * The DOM elements within the component that cannot be reset or generated by the component itself.
   *
   * @protected
   *
   * @type {string[]}
   */
  _protectedDOMElements = [];
  /**
   * The query selectors used by the component.
   *
   * @protected
   *
   * @type {Object<string, string>}
   */
  _selectors = {};
  /**
   * The instantiated elements within the component.
   *
   * @protected
   *
   * @type {object}
   */
  _elements = {};
  /**
   * The CSS classes to apply when the component is in various states.
   *
   * @protected
   *
   * @type {Object<string, string|string[]>}
   *
   * @property {string|string[]} initialize - The class(es) to apply when the component is in the initialization state.
   */
  _classes = {
    initialize: ""
  };
  /**
   * The duration times (in milliseconds) for component transitions.
   *
   * @protected
   *
   * @type {Object<string, number>}
   */
  _durations = {};
  /**
   * The delay times (in milliseconds) for component events.
   *
   * @protected
   *
   * @type {Object<string, number>}
   */
  _delays = {};
  /**
   * The current state of the component's focus.
   *
   * @protected
   *
   * @type {string}
   */
  _focusState = "none";
  /**
   * The last type of event triggered within the component.
   *
   * @protected
   *
   * @type {string}
   */
  _currentEvent = "none";
  /**
   * Intervals throughout the component.
   *
   * @protected
   *
   * @type {Object<string, Function>}
   */
  _intervals = {};
  /**
   * Timeouts throughout the component.
   *
   * @protected
   *
   * @type {Object<string, Function>}
   */
  _timeouts = {};
  /**
   * Event listeners throughout the component.
   *
   * @protected
   *
   * @type {object[]}
   */
  _listeners = [];
  /**
   * Custom events that can be triggered throughout the component.
   *
   * @protected
   *
   * @type {Object<string, CustomEvent>}
   */
  _events = {};
  /**
   * The prefix used for CSS custom properties and attributes.
   *
   * @protected
   *
   * @type {string}
   */
  _prefix = "ae-";
  /**
   * The key used to generate IDs throughout the component.
   *
   * @protected
   *
   * @type {string}
   */
  _key = "";
  /**
   * The component name.
   *
   * @protected
   *
   * @type {string}
   */
  _name = "Component";
  /**
   * The scope of the component.
   *
   * @protected
   *
   * @type {string}
   */
  _scope = "AccessibleEcosystem";
  /**
   * The prefix used for event names instead of the scope and component name.
   *
   * An empty string uses the scope and component name.
   *
   * @protected
   *
   * @type {string}
   */
  _eventPrefix = "";
  /**
   * The key used for storage.
   *
   * @protected
   *
   * @type {string}
   */
  _storageKey = "components";
  /**
   * A flag to check if the component should be stored in the StorageManager.
   *
   * @protected
   *
   * @type {boolean}
   */
  _shouldStore = !0;
  /**
   * The main ID of the component.
   *
   * @protected
   *
   * @type {string}
   */
  _id = "";
  /**
   * The validity state of the component.
   *
   * @protected
   *
   * @type {boolean}
   */
  _valid = !0;
  /**
   * The initialized state of the component.
   *
   * @protected
   *
   * @type {boolean}
   */
  _initialized = !1;
  /**
   * The errors found throughout the component.
   *
   * @protected
   *
   * @type {Error[]}
   */
  _errors = [];
  /**
   * Constructs a new component.
   *
   * @param {object}             [options = {}]                           - The options for generating the component.
   * @param {?string}            [options.prefix = ae-]                   - The prefix used for CSS custom properties and attributes.
   * @param {?string}            [options.key = null]                     - The key used to generate IDs throughout the component.
   * @param {?(string|string[])} [options.initializeClass = initializing] - The class(es) to apply when the component is in the initialization state.
   * @param {boolean}            [options.bootstrap = true]               - A flag to determine if the component should bootstrap itself.
   */
  constructor({
    prefix: e = "ae-",
    key: t = null,
    initializeClass: s = "initializing",
    bootstrap: i = !0
  } = {}) {
    this._classes.initialize = s || "", this._prefix = e || "", this._key = t || "", i && this._bootstrap();
  }
  /**
   * Bootstraps the component by registering the base events.
   *
   * @protected
   */
  _bootstrap() {
    try {
      this._registerEvent("initialize"), this._registerEvent("preinitialize"), this._registerEvent("postinitialize"), this._registerEvent("validate"), this._registerEvent("prevalidate"), this._registerEvent("postvalidate");
    } catch (e) {
      this._valid = !1, console.error(e);
    }
  }
  /**
   * Initialize the component.
   */
  initialize() {
    try {
      if (!this._validate())
        throw new Error(
          `${this.scope} ${this.name}: Cannot initialize component. The following errors have been found:
 - ${this.errors.map((e) => e.message).join(`
 - `)}`
        );
      y(this.initializeClass, this.rootDOMElement), this._dispatchEvent("preinitialize", this.rootDOMElement), this._generateKey(), this._setDOMElements(), this._setIds(), this._setAriaAttributes(), this._setCustomProps(), this._createChildElements(), this._handleFocus(), this._handleHover(), this._handleClick(), this._handleKeydown(), this._handleKeyup(), this._dispatchEvent("initialize", this.rootDOMElement), this._store(), E(this.initializeClass, this.rootDOMElement), this._initialized = !0, this._dispatchEvent("postinitialize", this.rootDOMElement);
    } catch (e) {
      this._valid = !1, console.error(e);
    }
  }
  init() {
    this.initialize();
  }
  /**
   * The DOM elements within the component.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The root DOM element of the component.
   *
   * @readonly
   *
   * @type {HTMLElement}
   *
   * @see _rootDOMElement
   */
  get rootDOMElement() {
    const e = this._dom[this._rootDOMElement];
    return e instanceof HTMLElement ? e : document.documentElement;
  }
  /**
   * The query selectors used by the component.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _selectors
   */
  get selectors() {
    return this._selectors;
  }
  /**
   * The instantiated elements within the component.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * The CSS classes to apply when the component is in various states.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _classes
   */
  get classes() {
    return this._classes;
  }
  /**
   * The duration times (in milliseconds) for component transitions.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _durations
   */
  get durations() {
    return this._durations;
  }
  /**
   * The delay times (in milliseconds) for component events.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _delays
   */
  get delays() {
    return this._delays;
  }
  /**
   * Intervals throughout the component.
   *
   * @readonly
   *
   * @type {object}
   *
   * @see _intervals
   */
  get intervals() {
    return this._intervals;
  }
  /**
   * Timeouts throughout the component.
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
   * Event listeners throughout the component.
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
   * Custom events that can be triggered throughout the component.
   *
   * @readonly
   *
   * @type {Object<string, CustomEvent>}
   *
   * @see _events
   */
  get events() {
    return this._events;
  }
  /**
   * The class(es) to apply when the component is in the initialization state.
   *
   * @type {string|string[]}
   *
   * @see _classes.initialize
   */
  get initializeClass() {
    return this._classes.initialize;
  }
  set initializeClass(e) {
    p({ initializeClass: e }), this._classes.initialize !== e && (this._classes.initialize = e);
  }
  /**
   * The current state of the component's focus.
   *
   * @type {string}
   *
   * @see _focusState
   */
  get focusState() {
    return this._focusState;
  }
  set focusState(e) {
    X({ focusState: e }), this._focusState !== e && (this._focusState = e);
  }
  /**
   * The last type of event triggered within the component.
   *
   * @type {string}
   *
   * @see _currentEvent
   */
  get currentEvent() {
    return this._currentEvent;
  }
  set currentEvent(e) {
    Y({ currentEvent: e }), this._currentEvent !== e && (this._currentEvent = e);
  }
  /**
   * A flag to check if the component's focus methods should move focus in the DOM.
   *
   * This will be `true` when the component's current event is "keyboard".
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    let e = !1;
    return this.currentEvent === "keyboard" && (e = !0), e;
  }
  /**
   * The prefix used for CSS custom properties and attributes.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _prefix
   */
  get prefix() {
    return this._prefix;
  }
  /**
   * The key used to generate IDs throughout the component.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _key
   */
  get key() {
    return this._key;
  }
  /**
   * The component name.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _name
   */
  get name() {
    return this._name;
  }
  /**
   * The scope of the component.
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
   * The prefix used for event names.
   *
   * Combines the scope and component name when _eventPrefix is an empty string.
   * Subclasses can override _eventPrefix before bootstrapping.
   *
   * @readonly
   *
   * @type {string}
   *
   * @see _eventPrefix
   */
  get eventPrefix() {
    return this._eventPrefix !== "" ? this._eventPrefix : `${ie(this.scope)}${R(this.name)}`;
  }
  /**
   * The main ID of the component.
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
   * The validity state of the component.
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
   * The initialized state of the component.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _initialized
   */
  get isInitialized() {
    return this._initialized;
  }
  /**
   * An array to hold validation errors.
   *
   * @readonly
   *
   * @type {Error[]}
   *
   * @see _errors
   */
  get errors() {
    return this._errors;
  }
  /**
   * Validates the component's DOM elements, selectors, classes, durations, delays, and options.
   *
   * Error names match the constructor options where possible.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation checks.
   */
  _validate() {
    this._errors = [], this._valid = !0, this._dispatchEvent("prevalidate", this.rootDOMElement);
    const e = se(this, {
      shouldThrow: !1
    });
    if (e.status || (this._errors = [...this._errors, ...e.errors], this._valid = !1), Object.keys(this._dom).length > 0) {
      const o = {};
      for (const h of Object.keys(this._dom))
        Array.isArray(this._dom[h]) ? this._dom[h].forEach((d, m) => {
          o[`${h}Element[${m}]`] = d;
        }) : this._dom[h] !== null && (o[`${h}Element`] = this._dom[h]);
      const a = c(HTMLElement, o, {
        shouldThrow: !1
      });
      a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1);
    }
    if (Object.keys(this._selectors).length > 0) {
      const o = {};
      for (const h of Object.keys(this._selectors))
        o[`${h}Selector`] = this._selectors[h];
      const a = G(o, {
        shouldThrow: !1
      });
      a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1);
    }
    if (Object.keys(this._classes).length > 0) {
      const o = {};
      for (const h of Object.keys(this._classes))
        this._classes[h] !== "" && (o[`${h}Class`] = this._classes[h]);
      const a = p(o, { shouldThrow: !1 });
      a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1);
    }
    if (Object.keys(this._durations).length > 0) {
      const o = {};
      for (const h of Object.keys(this._durations))
        o[`${h}Duration`] = this._durations[h];
      const a = l("number", o, {
        shouldThrow: !1
      });
      a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1);
    }
    if (Object.keys(this.delays).length > 0) {
      const o = {};
      for (const h of Object.keys(this.delays))
        o[`${h}Delay`] = this.delays[h];
      const a = l("number", o, { shouldThrow: !1 });
      a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1);
    }
    const t = {
      _name: this._name,
      _scope: this._scope,
      _eventPrefix: this._eventPrefix,
      _storageKey: this._storageKey,
      key: this._key,
      prefix: this._prefix
    };
    this._protectedDOMElements.forEach((o) => {
      t[`_protectedDOMElementType[${o}]`] = o;
    });
    const s = l("string", t, { shouldThrow: !1 });
    s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1);
    const i = {
      _shouldStore: this._shouldStore
    }, n = l("boolean", i, {
      shouldThrow: !1
    });
    return n.status || (this._errors = [...this._errors, ...n.errors], this._valid = !1), this._dispatchEvent("validate", this.rootDOMElement), this._dispatchEvent("postvalidate", this.rootDOMElement), this._valid;
  }
  /**
   * Generates a key for the component.
   *
   * @param {boolean} [regenerate = false] - A flag to determine if the key should be regenerated.
   */
  _generateKey(e = !1) {
    (this._key === "" || e) && (this._key = Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 10));
  }
  /**
   * Sets IDs throughout the component.
   *
   * @abstract
   */
  _setIds() {
  }
  /**
   * Sets ARIA attributes throughout the component.
   *
   * @abstract
   */
  _setAriaAttributes() {
  }
  /**
   * Sets custom props throughout the component.
   *
   * @abstract
   */
  _setCustomProps() {
  }
  /**
   * Sets DOM elements throughout the component.
   *
   * Elements listed in _protectedDOMElements cannot be set using this method.
   *
   * @protected
   *
   * @param {string}                      elementType                - The type of element to populate.
   * @param {Object<HTMLElement,boolean>} [options = {}]             - The options for setting the DOM element type.
   * @param {HTMLElement}                 [options.context]          - The element used as the base context for the querySelector.
   * @param {boolean}                     [options.overwrite = true] - A flag to set if the existing elements will be overwritten.
   * @param {boolean}                     [options.strict = false]   - A flag to set if the elements must be direct children of the base.
   */
  _setDOMElementType(e, { context: t, overwrite: s = !0, strict: i = !1 } = {}) {
    if (typeof this.selectors[e] != "string")
      throw new Error(
        `${this.scope} ${this.name}: "${e}" is not a valid element type.`
      );
    if (this._rootDOMElement === e || this._protectedDOMElements.includes(e))
      throw new Error(
        `${this.scope} ${this.name}: "${e}" element cannot be set through _setDOMElementType because it is a protected element.`
      );
    c(HTMLElement, { context: t });
    const o = Array.from(
      t.querySelectorAll(this.selectors[e])
    ).filter(
      (a) => i ? a.parentElement === t : !0
    );
    Array.isArray(this._dom[e]) ? s ? this._dom[e] = o : this._dom[e] = [
      ...this._dom[e],
      ...o
    ] : this._dom[e] = o[0] || null;
  }
  /**
   * Resets DOM elements throughout the component.
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
        `${this.scope} ${this.name}: "${e}" is not a valid element type.`
      );
    if (this._rootDOMElement === e || this._protectedDOMElements.includes(e))
      throw new Error(
        `${this.scope} ${this.name}: "${e}" element cannot be reset through _resetDOMElementType because it is a protected element.`
      );
    Array.isArray(this._dom[e]) ? this._dom[e] = [] : this._dom[e] = null;
  }
  /**
   * Sets all DOM elements throughout the component.
   *
   * Uses _setDOMElementType and _resetDOMElementType.
   *
   * @abstract
   *
   * @protected
   */
  _setDOMElements() {
  }
  /**
   * Creates and initializes child elements throughout the component.
   *
   * @abstract
   *
   * @protected
   */
  _createChildElements() {
  }
  /**
   * Handles focus events through the component.
   *
   * @abstract
   *
   * @protected
   */
  _handleFocus() {
  }
  /**
   * Handles click events through the component.
   *
   * @abstract
   *
   * @protected
   */
  _handleClick() {
  }
  /**
   * Handles hover events through the component.
   *
   * @abstract
   *
   * @protected
   */
  _handleHover() {
  }
  /**
   * Handles keydown events through the component.
   *
   * @abstract
   *
   * @protected
   */
  _handleKeydown() {
  }
  /**
   * Handles keyup events through the component.
   *
   * @abstract
   *
   * @protected
   */
  _handleKeyup() {
  }
  /**
   * Stores the component into the global storage object.
   *
   * @protected
   */
  _store() {
    this._shouldStore && (c(
      $,
      { storage: window[`${this.scope}Storage`] },
      { shouldThrow: !1 }
    ).status || new $({ scope: `${this.scope}Storage` }), window[`${this.scope}Storage`].set({
      key: this.id !== "" ? this.id : this.key,
      type: this._storageKey,
      data: this
    }));
  }
  /**
   * Removes the component from the global storage object.
   *
   * @protected
   */
  _unstore() {
    this._shouldStore && c(
      $,
      { storage: window[`${this.scope}Storage`] },
      { shouldThrow: !1 }
    ).status && window[`${this.scope}Storage`].clear({
      key: this.id !== "" ? this.id : this.key,
      type: this._storageKey
    });
  }
  /**
   * Sets an interval within the component.
   *
   * @protected
   *
   * @param {Function} [callback]         - The callback function.
   * @param {number}   [delay]            - The time (in milliseconds) of the delay.
   * @param {string}   [scope = _default] - The scope of the interval (used to store the interval in _intervals).
   */
  _setInterval(e, t, s = "_default") {
    this._clearInterval(s), this._intervals[s] = setInterval(e, t);
  }
  /**
   * Clears an interval within the component.
   *
   * @protected
   *
   * @param {string} [scope = _default] - The scope of the interval (used to get the interval from _intervals).
   */
  _clearInterval(e = "_default") {
    clearInterval(this._intervals[e]);
  }
  /**
   * Clears all intervals within the component.
   *
   * @protected
   */
  _clearIntervals() {
    for (const e of Object.keys(this._intervals))
      this._clearInterval(e);
  }
  /**
   * Sets a timeout within the component.
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
   * Clears a timeout within the component.
   *
   * @protected
   *
   * @param {string} [scope = _default] - The scope of the timeout (used to get the timeout from _timeouts).
   */
  _clearTimeout(e = "_default") {
    clearTimeout(this._timeouts[e]);
  }
  /**
   * Clears all timeouts within the component.
   *
   * @protected
   */
  _clearTimeouts() {
    for (const e of Object.keys(this._timeouts))
      this._clearTimeout(e);
  }
  /**
   * Registers a new event type within the component.
   *
   * Uses eventPrefix as the prefix for the event name.
   * Appends the event type with its first character upper case.
   *
   * @protected
   *
   * @param {string}  name                     - The name of the new event type.
   * @param {object}  [options = {}]           - The options for the new event type.
   * @param {boolean} [options.bubbles = true] - A flag to set if the event bubbles.
   * @param {object}  [options.detail = {}]    - Additional details to include in the event.
   */
  _registerEvent(e, { bubbles: t = !0, detail: s = {} } = {}) {
    l("string", { name: e }), l("boolean", { bubbles: t }), l("object", { detail: s });
    const i = `${this.eventPrefix}${R(e)}`;
    this._events[e] = new CustomEvent(i, {
      bubbles: t,
      detail: { component: this, ...s }
    });
  }
  /**
   * Gets the name of an event type stored in the _events object.
   *
   * @param  {string}  type - The type of the event to get from the _events object.
   * @return {?string}      - The event name (or null if none exists).
   */
  getEventName(e) {
    return Object.keys(this._events).includes(e) ? this._events[e].type : null;
  }
  /**
   * Dispatch a custom event on an element in the DOM.
   *
   * @param {string}      eventType                       - The type of the event to dispatch.
   * @param {HTMLElement} [element = this.rootDOMElement] - The element to dispatch the event on.
   */
  _dispatchEvent(e, t = this.rootDOMElement) {
    te(e, this), c(HTMLElement, { element: t }), t.dispatchEvent(this.events[e]);
  }
  /**
   * Add an event listener to an element and register it within the component.
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
   * Remove an event listener from an element and unregister it within the component.
   *
   * @param {string}         type           - The type of event to remove.
   * @param {HTMLElement}    element        - The element to remove the listener from.
   * @param {Function}       listener       - The listener callback.
   * @param {object|boolean} [options = {}] - Options to pass to the listener.
   */
  _removeEventListener(e, t, s, i = {}) {
    t.removeEventListener(e, s, i);
    let n = -1;
    this._listeners.forEach((o, a) => {
      o.type === e && o.element === t && o.listener === s && JSON.stringify(o.options) === JSON.stringify(i) && (n = a);
    }), n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Removes all event listeners registered in the component.
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
   * Focus the component.
   *
   * Sets the component's focus state to "self" and
   * focuses the component if the component's shouldFocus
   * value is `true`.
   */
  focus() {
    this.focusState = "self", this.shouldFocus && this.rootDOMElement.focus();
  }
  /**
   * Unfocus the component.
   *
   * Sets the component's focus state to "none"
   * and blurs the component if the component's shouldFocus
   * value is `true`.
   */
  blur() {
    this.focusState = "none", this.shouldFocus && this.rootDOMElement.blur();
  }
  /**
   * Disposes of the current instantiated component.
   *
   * Removes all intervals, timeouts, and event listeners, and removes the component
   * from the global storage.
   */
  dispose() {
    this._clearIntervals(), this._clearTimeouts(), this._removeEventListeners(), this._unstore(), delete this;
  }
}
class ne extends V {
  _name = "ResponsiveComponent";
  /**
   * The breakpoint used to generate the component's media query.
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
   * The MediaQueryList for the component.
   *
   * @protected
   *
   * @type {MediaQueryList|null}
   */
  _mediaQueryList = null;
  /**
   * Constructs a new component.
   *
   * @param {object}             [options = {}]                           - The options for generating the component.
   * @param {?string}            [options.breakpoint = ""]                - The breakpoint used to generate the component's media query.
   * @param {?string}            [options.mediaQuery = ""]                - An explicit media query to use to trigger media query list events.
   * @param {?string}            [options.prefix = ae-]                   - The prefix used for CSS custom properties and attributes.
   * @param {?string}            [options.key = null]                     - The key used to generate IDs throughout the component.
   * @param {?(string|string[])} [options.initializeClass = initializing] - The class(es) to apply when the component is in the initialization state.
   * @param {boolean}            [options.bootstrap = true]               - A flag to determine if the component should bootstrap itself.
   */
  constructor({
    breakpoint: e = "",
    mediaQuery: t = "",
    prefix: s = "ae-",
    key: i = null,
    initializeClass: n = "initializing",
    bootstrap: o = !0
  } = {}) {
    super({ prefix: s, key: i, initializeClass: n, bootstrap: !1 }), this._breakpoint = e || "", this._mediaQueryString = t || "", o && this._bootstrap();
  }
  /**
   * Bootstraps the component by registering the base events.
   *
   * @protected
   */
  _bootstrap() {
    try {
      super._bootstrap(), this._addEventListener(
        this.getEventName("validate"),
        this.rootDOMElement,
        (e) => {
          if (e.detail.component !== this) return;
          const t = {
            mediaQuery: this._mediaQueryString,
            breakpoint: this._breakpoint
          }, s = l("string", t, {
            shouldThrow: !1
          });
          s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1);
        }
      ), this._addEventListener(
        this.getEventName("initialize"),
        this.rootDOMElement,
        (e) => {
          e.detail.component === this && this._handleMediaMatch();
        }
      );
    } catch (e) {
      this._valid = !1, console.error(e);
    }
  }
  /**
   * The breakpoint used to generate the component's media query.
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
   * A callback for media query list events.
   *
   * @protected
   *
   * @abstract
   *
   * @param {MediaQueryListEvent} event - The event.
   */
  _mediaQueryListEventCallback(e) {
    e.matches;
  }
  /**
   * Handles media match events throughout the component.
   *
   * @protected
   */
  _handleMediaMatch() {
    this.mediaQuery !== "" && (this._mediaQueryList = window.matchMedia(this.mediaQuery), this._addEventListener(
      "change",
      this._mediaQueryList,
      (e) => this._mediaQueryListEventCallback(e)
    ), requestAnimationFrame(() => {
      this._mediaQueryListEventCallback(this._mediaQueryList);
    }));
  }
}
class U {
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
   * The last committed value.
   *
   * @protected
   *
   * @type {*}
   */
  _committed;
  /**
   * Constructs a new `TransactionalValue`.
   *
   * @param {*}                       initialValue                 - The starting (and initially committed) value.
   * @param {object}                  [options = {}]               - The options for generating the value.
   * @param {function(*, *): boolean} [options.equals = Object.is] - The function used to compare the current and committed values.
   */
  constructor(e, { equals: t = Object.is } = {}) {
    this._equals = t || Object.is, this._current = e, this._committed = e;
  }
  /**
   * Gets the current editable value.
   *
   * @return {*} - The current value.
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
   * Sets the committed value to the current value.
   *
   * @return {TransactionalValue} - The current instance.
   */
  commit() {
    return this._committed = this._current, this;
  }
  /**
   * Sets the current value to the committed value.
   *
   * @return {TransactionalValue} - The current instance.
   */
  reset() {
    return this._current = this._committed, this;
  }
  /**
   * Updates the current value using a function.
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
class re extends ne {
  _name = "CollapsibleComponent";
  /**
   * Whether the component is expanded or collapsed.
   *
   * @protected
   *
   * @type {TransactionalValue<boolean>}
   */
  _expanded = new U(!1);
  /**
   * Whether the component is locked or unlocked.
   *
   * @protected
   *
   * @type {TransactionalValue<boolean>}
   */
  _locked = new U(!1);
  /**
   * Whether the component should expand inside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _expandInsideBreakpoint = !1;
  /**
   * Whether the component should expand outside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _expandOutsideBreakpoint = !1;
  /**
   * Whether the component should collapse inside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _collapseInsideBreakpoint = !1;
  /**
   * Whether the component should collapse outside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _collapseOutsideBreakpoint = !1;
  /**
   * Whether the component should lock inside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _lockInsideBreakpoint = !1;
  /**
   * Whether the component should lock outside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _lockOutsideBreakpoint = !1;
  /**
   * Whether the component should unlock inside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _unlockInsideBreakpoint = !1;
  /**
   * Whether the component should unlock outside the breakpoint.
   *
   * @protected
   *
   * @type {boolean}
   */
  _unlockOutsideBreakpoint = !1;
  /**
   * Constructs a collapsible component.
   *
   * @param {object}             [options = {}]                              - The options for generating the component.
   * @param {HTMLElement}        options.controllerElement                   - The element controlling expansion.
   * @param {HTMLElement}        options.controlledElement                   - The element to expand or collapse.
   * @param {?(string|string[])} [options.lockClass = locked]                - The class(es) to apply when the component is in the locked state.
   * @param {?(string|string[])} [options.unlockClass = unlocked]            - The class(es) to apply when the component is in the unlocked state.
   * @param {?(string|string[])} [options.expandClass = show]                - The class(es) to apply when the component is in the expanded state.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class(es) to apply when the component is in the collapsed state.
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class(es) to apply when the component is transitioning between expanded and collapsed states.
   * @param {number}             [options.transitionDelay = 250]             - The transition delay in milliseconds.
   * @param {number}             [options.transitionDuration = 150]          - The transition duration in milliseconds.
   * @param {number}             [options.expandDuration = -1]               - The transition duration for expanding in milliseconds.
   * @param {number}             [options.collapseDuration = -1]             - The transition duration for collapsing in milliseconds.
   * @param {boolean}            [options.expandInsideBreakpoint = fal se]   - Whether to expand inside the breakpoint.
   * @param {boolean}            [options.expandOutsideBreakpoint = false]   - Whether to expand outside the breakpoint.
   * @param {boolean}            [options.collapseInsideBreakpoint = false]  - Whether to collapse inside the breakpoint.
   * @param {boolean}            [options.collapseOutsideBreakpoint = false] - Whether to collapse outside the breakpoint.
   * @param {boolean}            [options.lockInsideBreakpoint = false]      - Whether to lock inside the breakpoint.
   * @param {boolean}            [options.lockOutsideBreakpoint = false]     - Whether to lock outside the breakpoint.
   * @param {boolean}            [options.unlockInsideBreakpoint = false]    - Whether to unlock inside the breakpoint.
   * @param {boolean}            [options.unlockOutsideBreakpoint = false]   - Whether to unlock outside the breakpoint.
   * @param {boolean}            [options.locked = false]                    - The initial locked state.
   * @param {?string}            [options.breakpoint = ""]                   - The breakpoint used to generate the component's media query.
   * @param {?string}            [options.mediaQuery = ""]                   - An explicit media query to use to trigger media query list events.
   * @param {?string}            [options.prefix = ae-]                      - The prefix for CSS properties and attributes.
   * @param {?string}            [options.key = null]                        - The key for generated IDs.
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the component is in the initialization state.
   * @param {boolean}            [options.bootstrap = true]                  - Whether to bootstrap the component.
   */
  constructor({
    controllerElement: e,
    controlledElement: t,
    lockClass: s = "locked",
    unlockClass: i = "unlocked",
    expandClass: n = "show",
    collapseClass: o = "hide",
    transitionClass: a = "transitioning",
    transitionDelay: h = 250,
    transitionDuration: d = 150,
    expandDuration: m = -1,
    collapseDuration: f = -1,
    expandInsideBreakpoint: _ = !1,
    expandOutsideBreakpoint: g = !1,
    collapseInsideBreakpoint: k = !1,
    collapseOutsideBreakpoint: b = !1,
    lockInsideBreakpoint: M = !1,
    lockOutsideBreakpoint: v = !1,
    unlockInsideBreakpoint: w = !1,
    unlockOutsideBreakpoint: I = !1,
    locked: x = !1,
    breakpoint: T = "",
    mediaQuery: D = "",
    prefix: O = "ae-",
    key: L = null,
    initializeClass: S = "initializing",
    bootstrap: z = !0
  } = {}) {
    super({
      breakpoint: T,
      mediaQuery: D,
      prefix: O,
      key: L,
      initializeClass: S,
      bootstrap: !1
    }), this._dom.controller = e, this._dom.controlled = t, this._protectedDOMElements.push("controller", "controlled"), this._classes.locked = s || "", this._classes.unlocked = i || "", this._classes.expand = n || "", this._classes.collapse = o || "", this._classes.transition = a || "", this._delays.transition = h, this._durations.transition = d, this._durations.expand = m, this._durations.collapse = f, this._expandInsideBreakpoint = _, this._expandOutsideBreakpoint = g, this._collapseInsideBreakpoint = k, this._collapseOutsideBreakpoint = b, this._lockInsideBreakpoint = M, this._lockOutsideBreakpoint = v, this._unlockInsideBreakpoint = w, this._unlockOutsideBreakpoint = I, this._locked.value = x, this._locked.commit(), z && this._bootstrap();
  }
  /**
   * Bootstraps the component.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._registerEvent("preexpand"), this._registerEvent("expand"), this._registerEvent("postexpand"), this._registerEvent("precollapse"), this._registerEvent("collapse"), this._registerEvent("postcollapse"), this._registerEvent("prelock"), this._registerEvent("lock"), this._registerEvent("postlock"), this._registerEvent("preunlock"), this._registerEvent("unlock"), this._registerEvent("postunlock"), this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (e) => {
        if (e.detail.component !== this) return;
        const t = {
          locked: this._locked.value,
          _expandInsideBreakpoint: this._expandInsideBreakpoint,
          _expandOutsideBreakpoint: this._expandOutsideBreakpoint,
          _collapseInsideBreakpoint: this._collapseInsideBreakpoint,
          _collapseOutsideBreakpoint: this._collapseOutsideBreakpoint,
          _lockInsideBreakpoint: this._lockInsideBreakpoint,
          _lockOutsideBreakpoint: this._lockOutsideBreakpoint,
          _unlockInsideBreakpoint: this._unlockInsideBreakpoint,
          _unlockOutsideBreakpoint: this._unlockOutsideBreakpoint
        }, s = l("boolean", t, {
          shouldThrow: !1
        });
        s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1);
      }
    ), this._addEventListener(
      this.getEventName("initialize"),
      this.rootDOMElement,
      (e) => {
        e.detail.component === this && (this.dom.controller.getAttribute("aria-expanded") === "true" ? this.expand() : this.collapse(), this.isLocked ? this.lock() : this.unlock());
      }
    );
  }
  /**
   * The class(es) to apply when the component is in the locked state.
   *
   * @type {string|string[]}
   *
   * @see _classes.locked
   */
  get lockedClass() {
    return this._classes.locked;
  }
  set lockedClass(e) {
    p({ lockedClass: e }), this._classes.locked !== e && (this._classes.locked = e);
  }
  /**
   * The class(es) to apply when the component is in the unlocked state.
   *
   * @type {string|string[]}
   *
   * @see _classes.unlocked
   */
  get unlockedClass() {
    return this._classes.unlocked;
  }
  set unlockedClass(e) {
    p({ unlockedClass: e }), this._classes.unlocked !== e && (this._classes.unlocked = e);
  }
  /**
   * The class(es) to apply when the component is in the expanded state.
   *
   * @type {string|string[]}
   *
   * @see _classes.expand
   */
  get expandClass() {
    return this._classes.expand;
  }
  set expandClass(e) {
    p({ expandClass: e }), this._classes.expand !== e && (this._classes.expand = e);
  }
  /**
   * The class(es) to apply when the component is in the collapsed state.
   *
   * @type {string|string[]}
   *
   * @see _classes.collapse
   */
  get collapseClass() {
    return this._classes.collapse;
  }
  set collapseClass(e) {
    p({ collapseClass: e }), this._classes.collapse !== e && (this._classes.collapse = e);
  }
  /**
   * The class(es) to apply when the component is transitioning between expanded and collapsed states.
   *
   * @type {string|string[]}
   *
   * @see _classes.transition
   */
  get transitionClass() {
    return this._classes.transition;
  }
  set transitionClass(e) {
    p({ transitionClass: e }), this._classes.transition !== e && (this._classes.transition = e);
  }
  /**
   * The duration time (in milliseconds) for the transition between expanded and collapsed states.
   *
   * Setting this value will also set the --ae-transition-duration CSS custom property on the component.
   *
   * @type {number}
   *
   * @see _durations.transition
   */
  get transitionDuration() {
    return this._durations.transition;
  }
  set transitionDuration(e) {
    l("number", { transitionDuration: e }), this._durations.transition !== e && (this._durations.transition = e, this._setCustomProps());
  }
  /**
   * The duration time (in milliseconds) for the transition from collapsed to expanded states.
   *
   * If expandDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --ae-expand-transition-duration CSS custom property on the component.
   *
   * @type {number}
   *
   * @see _durations.expand
   */
  get expandDuration() {
    return this._durations.expand === -1 ? this.transitionDuration : this._durations.expand;
  }
  set expandDuration(e) {
    l("number", { expandDuration: e }), this._durations.expand !== e && (this._durations.expand = e, this._setCustomProps());
  }
  /**
   * The duration time (in milliseconds) for the transition from expanded to collapsed states.
   *
   * If collapseDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --ae-collapse-transition-duration CSS custom property on the component.
   *
   * @type {number}
   *
   * @see _durations.collapse
   */
  get collapseDuration() {
    return this._durations.collapse === -1 ? this.transitionDuration : this._durations.collapse;
  }
  set collapseDuration(e) {
    l("number", { collapseDuration: e }), this._durations.collapse !== e && (this._durations.collapse = e, this._setCustomProps());
  }
  /**
   * Whether to expand the component when it gains focus in the DOM.
   *
   * @type {boolean}
   *
   * @see _expandOnFocus
   */
  get expandOnFocus() {
    return this._expandOnFocus;
  }
  set expandOnFocus(e) {
    l("boolean", { expandOnFocus: e }), this._expandOnFocus !== e && (this._expandOnFocus = e);
  }
  /**
   * Whether to collapse the component when it loses focus in the DOM.
   *
   * @type {boolean}
   *
   * @see _collapseOnBlur
   */
  get collapseOnBlur() {
    return this._collapseOnBlur;
  }
  set collapseOnBlur(e) {
    l("boolean", { collapseOnBlur: e }), this._collapseOnBlur !== e && (this._collapseOnBlur = e);
  }
  /**
   * The expanded state of the component.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _expand
   */
  get isExpanded() {
    return this._expanded.value;
  }
  /**
   * The committed expanded state of the component.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _expand
   */
  get shouldBeExpanded() {
    return this._expanded.committed;
  }
  /**
   * A flag to expand the component when inside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _expandInsideBreakpoint
   */
  get expandInsideBreakpoint() {
    return this._expandInsideBreakpoint;
  }
  set expandInsideBreakpoint(e) {
    l("boolean", { expandInsideBreakpoint: e }), this._expandInsideBreakpoint !== e && (this._expandInsideBreakpoint = e);
  }
  /**
   * A flag to expand the component when outside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _expandOutsideBreakpoint
   */
  get expandOutsideBreakpoint() {
    return this._expandOutsideBreakpoint;
  }
  set expandOutsideBreakpoint(e) {
    l("boolean", { expandOutsideBreakpoint: e }), this._expandOutsideBreakpoint !== e && (this._expandOutsideBreakpoint = e);
  }
  /**
   * A flag to collapse the component when inside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _collapseInsideBreakpoint
   */
  get collapseInsideBreakpoint() {
    return this._collapseInsideBreakpoint;
  }
  set collapseInsideBreakpoint(e) {
    l("boolean", { collapseInsideBreakpoint: e }), this._collapseInsideBreakpoint !== e && (this._collapseInsideBreakpoint = e);
  }
  /**
   * A flag to collapse the component when outside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _collapseOutsideBreakpoint
   */
  get collapseOutsideBreakpoint() {
    return this._collapseOutsideBreakpoint;
  }
  set collapseOutsideBreakpoint(e) {
    l("boolean", { collapseOutsideBreakpoint: e }), this._collapseOutsideBreakpoint !== e && (this._collapseOutsideBreakpoint = e);
  }
  /**
   * A flag to lock the component in its current state when inside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _lockInsideBreakpoint
   */
  get lockInsideBreakpoint() {
    return this._lockInsideBreakpoint;
  }
  set lockInsideBreakpoint(e) {
    l("boolean", { lockInsideBreakpoint: e }), this._lockInsideBreakpoint !== e && (this._lockInsideBreakpoint = e);
  }
  /**
   * A flag to lock the component in its current state when outside the breakpoint.
   *
   * @type {boolean}
   *
   * @see _lockOutsideBreakpoint
   */
  get lockOutsideBreakpoint() {
    return this._lockOutsideBreakpoint;
  }
  set lockOutsideBreakpoint(e) {
    l("boolean", { lockOutsideBreakpoint: e }), this._lockOutsideBreakpoint !== e && (this._lockOutsideBreakpoint = e);
  }
  /**
   * A flag to unlock the component when inside the breakpoint.
   *
   * @type {boolean}
   */
  get unlockInsideBreakpoint() {
    return this._unlockInsideBreakpoint;
  }
  set unlockInsideBreakpoint(e) {
    l("boolean", { unlockInsideBreakpoint: e }), this._unlockInsideBreakpoint = e;
  }
  /**
   * A flag to unlock the component when outside the breakpoint.
   *
   * @type {boolean}
   */
  get unlockOutsideBreakpoint() {
    return this._unlockOutsideBreakpoint;
  }
  set unlockOutsideBreakpoint(e) {
    l("boolean", { unlockOutsideBreakpoint: e }), this._unlockOutsideBreakpoint = e;
  }
  /**
   * The locked state of the component.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _locked
   */
  get isLocked() {
    return this._locked.value;
  }
  /**
   * The committed lock state of the component.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _locked
   */
  get shouldBeLocked() {
    return this._locked.committed;
  }
  /**
   * A callback for media query list events.
   *
   * @protected
   *
   * @param {MediaQueryListEvent} event - The event.
   */
  _mediaQueryListEventCallback(e) {
    e.matches ? (this.unlockInsideBreakpoint && this.unlock(), this.isExpanded && this.collapseInsideBreakpoint ? (this.isLocked && this.unlock(), this.collapse({ preserveState: !0 })) : !this.isExpanded && this.expandInsideBreakpoint && (this.isLocked && this.unlock(), this.expand()), this.lockInsideBreakpoint && this.lock()) : (this.unlockOutsideBreakpoint && this.unlock(), this.isExpanded && this.collapseOutsideBreakpoint ? (this.isLocked && this.unlock(), this.collapse({ preserveState: !0 })) : !this.isExpanded && this.expandOutsideBreakpoint && (this.isLocked && this.unlock(), this.expand()), this.lockOutsideBreakpoint && this.lock());
  }
  /**
   * Applies the required attributes and classes for the component's expanded state.
   *
   * Sets the controller's `aria-expanded` to "true", adds the expand class(es) to
   * the controlled element, and removes the collapse class(es) from the controlled element.
   *
   * @protected
   *
   * @fires this._events.preexpand
   *
   * @fires this._events.expand
   *
   * @fires this._events.postexpand
   *
   * @param {Object<boolean>} [options = {}]                            - Options for expanding the component.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the expand events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   */
  _expand({ emit: e = this.isInitialized, transition: t = this.isInitialized } = {}) {
    e && this._dispatchEvent("preexpand"), this.dom.controller.setAttribute("aria-expanded", "true"), t && this.transitionClass !== "" ? (y(this.transitionClass, this.dom.controlled), requestAnimationFrame(() => {
      E(this.collapseClass, this.dom.controlled), requestAnimationFrame(() => {
        y(this.expandClass, this.dom.controlled), requestAnimationFrame(() => {
          setTimeout(() => {
            E(this.transitionClass, this.dom.controlled);
          }, this.expandDuration);
        });
      });
    })) : (y(this.expandClass, this.dom.controlled), E(this.collapseClass, this.dom.controlled)), e && (this._dispatchEvent("expand"), this._dispatchEvent("postexpand"));
  }
  /**
   * Applies the required attributes and classes for the component's collapsed state.
   *
   * Sets the controller's `aria-expanded` to "false", adds the collapse class(es) to
   * the controlled element, and removes the expand class(es) from the controlled element.
   *
   * @protected
   *
   * @fires this._events.precollapse
   *
   * @fires this._events.collapse
   *
   * @fires this._events.postcollapse
   *
   * @param {Object<boolean>} [options = {}]                            - Options for collapsing the component.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the collapse events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   */
  _collapse({
    emit: e = this.isInitialized,
    transition: t = this.isInitialized
  } = {}) {
    e && this._dispatchEvent("precollapse"), this.dom.controller.setAttribute("aria-expanded", "false"), t && this.transitionClass !== "" ? (y(this.transitionClass, this.dom.controlled), requestAnimationFrame(() => {
      E(this.expandClass, this.dom.controlled), requestAnimationFrame(() => {
        y(this.collapseClass, this.dom.controlled), requestAnimationFrame(() => {
          setTimeout(() => {
            E(this.transitionClass, this.dom.controlled);
          }, this.collapseDuration);
        });
      });
    })) : (y(this.collapseClass, this.dom.controlled), E(this.expandClass, this.dom.controlled)), e && (this._dispatchEvent("collapse"), this._dispatchEvent("postcollapse"));
  }
  /**
   * Applies the required attributes and classes for the component's locked state.
   *
   * @protected
   *
   * @param {Object<boolean>} [options = {}]                      - Options for locking the component.
   * @param {boolean}         [options.emit = this.isInitialized] - Emit the lock events.
   */
  _lock({ emit: e = this.isInitialized } = {}) {
    e && this._dispatchEvent("prelock"), y(this.lockedClass, this.dom.controlled), E(this.unlockedClass, this.dom.controlled), this.dom.controller.setAttribute("disabled", "true"), e && (this._dispatchEvent("lock"), this._dispatchEvent("postlock"));
  }
  /**
   * Applies the required attributes and classes for the component's unlocked state.
   *
   * @protected
   *
   * @param {Object<boolean>} [options = {}]                      - Options for unlocking the component.
   * @param {boolean}         [options.emit = this.isInitialized] - Emit the unlock events.
   */
  _unlock({ emit: e = this.isInitialized } = {}) {
    e && this._dispatchEvent("preunlock"), y(this.unlockedClass, this.dom.controlled), E(this.lockedClass, this.dom.controlled), this.dom.controller.removeAttribute("disabled"), e && (this._dispatchEvent("unlock"), this._dispatchEvent("postunlock"));
  }
  /**
   * Expands the component.
   *
   * Sets the component's focus state to "self", calls _expand, and sets isExpanded to `true`.
   *
   * @param {Object<boolean>} [options = {}]                            - Options for expanding the component.
   * @param {boolean}         [options.force = !this.isInitialized]     - Force the expand action.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the expand events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   * @param {boolean}         [options.preserveState = false]           - Preserve the expanded state.
   */
  expand({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    transition: s = this.isInitialized,
    preserveState: i = !1
  } = {}) {
    this.isExpanded && !e || this.isLocked && !e || (this.focusState = "self", this._expand({ emit: t, transition: s }), this._expanded.value = !0, i || this._expanded.commit());
  }
  /**
   * Previews the component.
   *
   * Sets the component's focus state to "none", calls _expand, and sets isExpanded to `true`.
   *
   * @param {Object<boolean>} [options = {}]                            - Options for previewing the component.
   * @param {boolean}         [options.force = !this.isInitialized]     - Force the preview action.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the expand events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   * @param {boolean}         [options.preserveState = false]           - Preserve the expanded state.
   */
  preview({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    transition: s = this.isInitialized,
    preserveState: i = !1
  } = {}) {
    this.isExpanded && !e || this.isLocked && !e || (this.focusState = "none", this._expand({ emit: t, transition: s }), this._expanded.value = !0, i || this._expanded.commit());
  }
  /**
   * Collapses the component.
   *
   * Sets the component's focus state to "none", calls _collapse, and sets isExpanded to `false`.
   *
   * @param {Object<boolean>} [options = {}]                            - Options for closing the component.
   * @param {boolean}         [options.force = !this.isInitialized]     - Force the collapse action.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the collapse events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   * @param {boolean}         [options.preserveState = false]           - Preserve the expanded state.
   */
  collapse({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    transition: s = this.isInitialized,
    preserveState: i = !1
  } = {}) {
    !this.isExpanded && !e || this.isLocked && !e || (this.focusState = "none", this._collapse({ emit: t, transition: s }), this._expanded.value = !1, i || this._expanded.commit());
  }
  /**
   * Toggles expanding and collapsing the component.
   *
   * @param {Object<boolean>} [options = {}]                            - Options for expanding/collapsing the component.
   * @param {boolean}         [options.force = !this.isInitialized]     - Force the expand or collapse action.
   * @param {boolean}         [options.emit = this.isInitialized]       - Emit the expand/collapse events.
   * @param {boolean}         [options.transition = this.isInitialized] - A flag to use transitions when changing the expanded state.
   * @param {boolean}         [options.preserveState = false]           - Preserve the expanded state.
   */
  toggle({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    transition: s = this.isInitialized,
    preserveState: i = !1
  } = {}) {
    this.isExpanded ? this.collapse({ force: e, emit: t, transition: s, preserveState: i }) : this.expand({ force: e, emit: t, transition: s, preserveState: i });
  }
  /**
   * Locks the component.
   *
   * @param {Object<boolean>} [options = {}]                        - Options for locking the component.
   * @param {boolean}         [options.force = !this.isInitialized] - Force the lock action.
   * @param {boolean}         [options.emit = this.isInitialized]   - Emit the lock events.
   * @param {boolean}         [options.preserveState = false]       - Preserve the locked state.
   */
  lock({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    preserveState: s = !1
  } = {}) {
    this.isLocked && !e || (this._locked.value = !0, this._lock({ emit: t }), s || this._locked.commit());
  }
  /**
   * Unlocks the component.
   *
   * @param {Object<boolean>} [options = {}]                        - Options for unlocking the component.
   * @param {boolean}         [options.force = !this.isInitialized] - Force the unlock action.
   * @param {boolean}         [options.emit = this.isInitialized]   - Emit the unlock event.
   * @param {boolean}         [options.preserveState = false]       - Preserve the unlocked state.
   */
  unlock({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    preserveState: s = !1
  } = {}) {
    !this.isLocked && !e || (this._locked.value = !1, this._unlock({ emit: t }), s || this._locked.commit());
  }
  /**
   * Toggles locking and unlocking the component.
   *
   * @param {Object<boolean>} [options = {}]                        - Options for locking/unlocking the component.
   * @param {boolean}         [options.force = !this.isInitialized] - Force the toggle action.
   * @param {boolean}         [options.emit = this.isInitialized]   - Emit the lock/unlock events.
   * @param {boolean}         [options.preserveState = false]       - Preserve the locked state.
   */
  toggleLock({
    force: e = !this.isInitialized,
    emit: t = this.isInitialized,
    preserveState: s = !1
  } = {}) {
    this.isLocked ? this.unlock({ force: e, emit: t, preserveState: s }) : this.lock({ force: e, emit: t, preserveState: s });
  }
}
class H extends re {
  _scope = "AccessibleMenu";
  _name = "MenuToggle";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menuToggles";
  _shouldStore = !1;
  _rootDOMElement = "controller";
  /**
   * Constructs a new `BaseMenuToggle`.
   *
   * @param {object}      options                                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement                   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement                       - The element containing the controlled menu.
   * @param {BaseMenu}    options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?BaseMenu}   [options.parentMenu = null]                 - The menu containing this toggle.
   * @param {string}      [options.breakpoint = ""]                   - The breakpoint used to generate the controller's media query.
   * @param {string}      [options.mediaQuery = ""]                   - The media query used to trigger the controller's media query list events.
   * @param {boolean}     [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}     [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}     [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}     [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}     [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}     [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}     [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}     [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
    breakpoint: n = "",
    mediaQuery: o = "",
    expandInsideBreakpoint: a = !1,
    expandOutsideBreakpoint: h = !1,
    collapseInsideBreakpoint: d = !1,
    collapseOutsideBreakpoint: m = !1,
    lockInsideBreakpoint: f = !1,
    lockOutsideBreakpoint: _ = !1,
    unlockInsideBreakpoint: g = !1,
    unlockOutsideBreakpoint: k = !1
  }) {
    super({
      controllerElement: e,
      controlledElement: s?.dom?.menu,
      expandClass: s?.classes?.expand,
      collapseClass: s?.classes?.collapse,
      transitionClass: s?.classes?.transition,
      transitionDuration: s?.durations?.transition,
      expandDuration: s?.durations?.expand,
      collapseDuration: s?.durations?.collapse,
      prefix: "am-",
      initializeClass: "",
      breakpoint: n,
      mediaQuery: o,
      expandInsideBreakpoint: a,
      expandOutsideBreakpoint: h,
      collapseInsideBreakpoint: d,
      collapseOutsideBreakpoint: m,
      lockInsideBreakpoint: f,
      lockOutsideBreakpoint: _,
      unlockInsideBreakpoint: g,
      unlockOutsideBreakpoint: k,
      bootstrap: !1
    }), this._protectedDOMElements.push("parent"), this._dom.parent = t, this._elements.controlledMenu = s, this._elements.parentMenu = i, this._bootstrap();
  }
  /**
   * Registers the menu toggle's validation event listener.
   *
   * Validation checks the required DOM elements, controlled menu, and parent menu.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (e) => {
        if (e.detail.component !== this) return;
        const t = {};
        for (const o of ["controller", "controlled", "parent"])
          this.dom[o] === null && (t[`${o}Element`] = this.dom[o]);
        const s = c(HTMLElement, t, {
          shouldThrow: !1
        });
        s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1);
        const i = {
          controlledMenu: this.elements.controlledMenu
        };
        this.elements.parentMenu !== null && (i.parentMenu = this.elements.parentMenu);
        const n = c(C, i, {
          shouldThrow: !1
        });
        n.status || (this._errors = [...this._errors, ...n.errors], this._valid = !1);
      }
    );
  }
  /**
   * The class(es) to apply when the controlled menu is expanded.
   *
   * @type {string|string[]}
   */
  get expandClass() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.expandClass : super.expandClass;
  }
  set expandClass(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.expandClass = e, this._classes.expand = e;
  }
  /**
   * The class(es) to apply when the controlled menu is collapsed.
   *
   * @type {string|string[]}
   */
  get collapseClass() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.collapseClass : super.collapseClass;
  }
  set collapseClass(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.collapseClass = e, this._classes.collapse = e;
  }
  /**
   * The class(es) to apply when the controlled menu is transitioning.
   *
   * @type {string|string[]}
   */
  get transitionClass() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.transitionClass : super.transitionClass;
  }
  set transitionClass(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.transitionClass = e, this._classes.transition = e;
  }
  /**
   * The duration of the transition between expanded and collapsed states (in milliseconds).
   *
   * @type {number}
   */
  get transitionDuration() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.transitionDuration : super.transitionDuration;
  }
  set transitionDuration(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.transitionDuration = e, this._durations.transition = e;
  }
  /**
   * The duration of the transition from collapsed to expanded states (in milliseconds).
   *
   * @type {number}
   */
  get expandDuration() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.expandDuration : super.expandDuration;
  }
  set expandDuration(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.expandDuration = e, this._durations.expand = e;
  }
  /**
   * The duration of the transition from expanded to collapsed states (in milliseconds).
   *
   * @type {number}
   */
  get collapseDuration() {
    const e = this.elements.controlledMenu;
    return e.elements.rootMenu ? e.collapseDuration : super.collapseDuration;
  }
  set collapseDuration(e) {
    const t = this.elements.controlledMenu, s = t.elements.rootMenu || t;
    s.collapseDuration = e, this._durations.collapse = e;
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
    if (this.dom.controller.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
      let e = this.dom.controller.innerText?.replace(/[^a-zA-Z0-9\s]/g, "") || "", t = this.elements.controlledMenu.key;
      !e.replace(/\s/g, "").length && this.dom.controller.getAttribute("aria-label") && (e = this.dom.controller.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), e.replace(/\s/g, "").length > 0 && (e = e.toLowerCase().replace(/\s+/g, "-"), e.startsWith("-") && (e = e.substring(1)), e.endsWith("-") && (e = e.slice(0, -1)), t = `${e}-${t}`), this.dom.controller.id = this.dom.controller.id || `menu-button-${t}`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `menu-${t}`;
    }
    this._id = this.dom.controller.id;
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
    this.dom.controller.setAttribute("aria-expanded", "false"), this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.controller.id
    );
  }
  /**
   * Expands the controlled menu.
   *
   * Sets the root menu's hasExpanded value to `true`, then calls
   * CollapsibleComponent's _expand method to set the ARIA attributes,
   * classes, and transitions on the controlled menu.
   *
   * If `emit` is set to `true`, this will also emit the expand event.
   *
   * @protected
   *
   * @param {object}  [options = {}]                            - The options for expanding the menu.
   * @param {boolean} [options.emit = this.isInitialized]       - A toggle to emit the expand event once expanded.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when expanding.
   */
  _expand(e = {}) {
    const t = this.elements.controlledMenu.elements.rootMenu;
    t && (t.hasExpanded = !0), super._expand(e);
  }
  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isExpanded value to `true`.
   *
   * @param {object}  [options = {}]                            - The options for opening the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to open, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when opening.
   */
  expand({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.isLocked && !e || (this.isInitialized && (this.elements.controlledMenu.focusState = "self"), super.expand({ force: e, preserveState: t, emit: s, transition: i }));
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
   *
   * @param {object}  [options = {}]                            - The options for previewing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to preview, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when previewing.
   */
  preview({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.isLocked && !e || (this.isInitialized && this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), super.preview({ force: e, preserveState: t, emit: s, transition: i }));
  }
  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's focus state to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's current child index to 0,
   * calls collapse, and sets
   * the isExpanded value to `false`.
   *
   * @param {object}  [options = {}]                            - The options for closing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to close, including when locked.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when closing.
   */
  collapse({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.isLocked && !e || !this.isExpanded && !e || (this.isInitialized && this.elements.controlledMenu.blur(), this.isInitialized && this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), super.collapse({ force: e, preserveState: t, emit: s, transition: i }));
  }
  /**
   * Closes all sibling menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                            - The options for closing the sibling menus.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when closing.
   */
  collapseSiblings({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((n) => {
      n !== this && n.collapse({ force: e, preserveState: t, emit: s, transition: i });
    });
  }
  /**
   * Closes all child menus.
   *
   * @public
   *
   * @param {object}  [options = {}]                            - The options for closing the child menus.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menus to close.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when closing.
   */
  collapseChildren({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (n) => n.collapse({ force: e, preserveState: t, emit: s, transition: i })
    );
  }
}
class W extends V {
  _scope = "AccessibleMenu";
  _name = "MenuItem";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menuItems";
  _shouldStore = !1;
  _rootDOMElement = "item";
  _protectedDOMElements = ["item", "link"];
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
    childMenu: n = null,
    toggle: o = null
  }) {
    super({ prefix: "am-", initializeClass: "", bootstrap: !1 }), this._dom.item = e, this._dom.link = t, this._elements.parentMenu = s, this._elements.childMenu = n, this._elements.toggle = o, this._submenu = i, this._bootstrap();
  }
  /**
   * Registers the menu item's validation event listener.
   *
   * Validation checks the required DOM elements, submenu flag, parent menu,
   * child menu, and submenu toggle.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (e) => {
        if (e.detail.component !== this) return;
        const t = {};
        for (const h of ["item", "link"])
          this.dom[h] === null && (t[`${h}Element`] = this.dom[h]);
        const s = c(HTMLElement, t, {
          shouldThrow: !1
        });
        s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1);
        const i = {
          isSubmenuItem: this._submenu
        }, n = l("boolean", i, {
          shouldThrow: !1
        });
        n.status || (this._errors = [...this._errors, ...n.errors], this._valid = !1);
        const o = {
          parentMenu: this.elements.parentMenu
        };
        (this.elements.childMenu !== null || this.isSubmenuItem) && (o.childMenu = this.elements.childMenu);
        const a = c(C, o, {
          shouldThrow: !1
        });
        if (a.status || (this._errors = [...this._errors, ...a.errors], this._valid = !1), this.elements.toggle !== null || this.isSubmenuItem) {
          const h = c(
            H,
            { toggle: this.elements.toggle },
            { shouldThrow: !1 }
          );
          h.status || (this._errors = [...this._errors, ...h.errors], this._valid = !1);
        }
      }
    );
  }
  /**
   * A flag to check if the parent menu allows the menu item to be focused in the DOM.
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    return this.elements.parentMenu.shouldFocus;
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
   * Sets the component ID to the menu item's existing ID.
   *
   * @protected
   */
  _setIds() {
    this._id = this.dom.item.id;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  focus() {
    this.focusState = "self", this.shouldFocus && requestAnimationFrame(() => {
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
    this.focusState = "none", this.shouldFocus && requestAnimationFrame(() => {
      this.dom.link.blur();
    });
  }
}
function B(r) {
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
function u(r) {
  r.preventDefault(), r.stopPropagation();
}
class C extends V {
  _scope = "AccessibleMenu";
  _name = "Menu";
  _eventPrefix = "accessibleMenu";
  _storageKey = "menus";
  _rootDOMElement = "menu";
  _protectedDOMElements = ["menu", "controller", "container"];
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof BaseMenu}
   */
  _MenuType = C;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof BaseMenuItem}
   */
  _MenuItemType = W;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof BaseMenuToggle}
   */
  _MenuToggleType = H;
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
   * The type of hoverability for the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _hoverType = "off";
  /**
   * A flag to check if the menu can dynamically hover based on if a menu has been opened already.
   *
   * @protected
   *
   * @type {boolean}
   */
  _hasExpanded = !1;
  /**
   * The options passed to the root controller.
   *
   * @protected
   *
   * @type {object}
   */
  _controllerOptions = {};
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
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])} [options.expandClass = show]                - The class(es) to apply when the menu is open.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class(es) to apply when the menu is closed.
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class(es) to apply when the menu is transitioning between open and closed states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}             [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}             [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = false]                - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for opening menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for closing menus if the menu is hoverable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint used to generate the root controller's media query.
   * @param {string}             [options.mediaQuery = '']                   - The media query used to trigger the root controller's media query list events.
   * @param {boolean}            [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}            [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}            [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}            [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}            [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}            [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}            [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}            [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   */
  constructor({
    menuElement: e,
    menuItemsSelector: t = "li",
    menuLinksSelector: s = "a",
    submenuItemsSelector: i = "li:has(ul)",
    submenuTogglesSelector: n = "a",
    submenusSelector: o = "ul",
    controllerElement: a = null,
    containerElement: h = null,
    initializeClass: d = "initializing",
    expandClass: m = "show",
    collapseClass: f = "hide",
    transitionClass: _ = "transitioning",
    transitionDuration: g = 250,
    expandDuration: k = -1,
    collapseDuration: b = -1,
    isTopLevel: M = !0,
    parentMenu: v = null,
    hoverType: w = "off",
    hoverDelay: I = 250,
    enterDelay: x = -1,
    leaveDelay: T = -1,
    breakpoint: D = "",
    mediaQuery: O = "",
    expandInsideBreakpoint: L = !1,
    expandOutsideBreakpoint: S = !1,
    collapseInsideBreakpoint: z = !1,
    collapseOutsideBreakpoint: A = !1,
    lockInsideBreakpoint: j = !1,
    lockOutsideBreakpoint: F = !1,
    unlockInsideBreakpoint: P = !1,
    unlockOutsideBreakpoint: q = !1,
    prefix: K = "am-",
    key: Q = null
  }) {
    super({
      prefix: K,
      key: Q,
      initializeClass: d,
      bootstrap: !1
    }), this._dom.menu = e, this._dom.menuItems = [], this._dom.menuLinks = [], this._dom.submenuItems = [], this._dom.submenuToggles = [], this._dom.submenus = [], this._dom.controller = a, this._dom.container = h, this._selectors.menuItems = t, this._selectors.menuLinks = s, this._selectors.submenuItems = i, this._selectors.submenuToggles = n, this._selectors.submenus = o, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = v, this._elements.rootMenu = M ? this : null, this._classes.expand = m || "", this._classes.collapse = f || "", this._classes.transition = _ || "", this._durations.transition = g, this._durations.expand = k, this._durations.collapse = b, this._root = M, this._hoverType = w, this._delays.hover = I, this._delays.enter = x, this._delays.leave = T, this._controllerOptions = {
      breakpoint: D,
      mediaQuery: O,
      expandInsideBreakpoint: L,
      expandOutsideBreakpoint: S,
      collapseInsideBreakpoint: z,
      collapseOutsideBreakpoint: A,
      lockInsideBreakpoint: j,
      lockOutsideBreakpoint: F,
      unlockInsideBreakpoint: P,
      unlockOutsideBreakpoint: q
    }, this._shouldStore = M, this._bootstrap();
  }
  /**
   * Registers the menu's validation and initialization event listeners.
   *
   * Before validation, creates the root controller without initializing it.
   * Before initialization, finds the root menu if it isn't already set.
   *
   * Validation checks the required DOM elements, controller and container,
   * root flag, parent menu, controller options, and hover type.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._addEventListener(
      this.getEventName("prevalidate"),
      this.rootDOMElement,
      (e) => {
        e.detail.component === this && this._createController({ initialize: !1 });
      }
    ), this._addEventListener(
      this.getEventName("preinitialize"),
      this.rootDOMElement,
      (e) => {
        e.detail.component === this && this.elements.rootMenu === null && this._findRootMenu(this);
      }
    ), this._addEventListener(
      this.getEventName("validate"),
      this.rootDOMElement,
      (e) => {
        if (e.detail.component !== this) return;
        if (this.dom.menu === null) {
          const n = c(
            HTMLElement,
            { menuElement: this.dom.menu },
            { shouldThrow: !1 }
          );
          n.status || (this._errors = [...this._errors, ...n.errors], this._valid = !1);
        }
        this.dom.controller === null != (this.dom.container === null) && (this._errors.push(
          new TypeError(
            "controllerElement and containerElement must be provided together."
          )
        ), this._valid = !1);
        const t = {
          isTopLevel: this._root
        }, s = l("boolean", t, {
          shouldThrow: !1
        });
        if (s.status || (this._errors = [...this._errors, ...s.errors], this._valid = !1), !this._root && this.elements.parentMenu === null)
          this._errors.push(new TypeError("A submenu requires a parentMenu.")), this._valid = !1;
        else if (this.elements.parentMenu !== null) {
          const n = c(
            C,
            { parentMenu: this.elements.parentMenu },
            { shouldThrow: !1 }
          );
          n.status || (this._errors = [...this._errors, ...n.errors], this._valid = !1);
        }
        this.elements.controller !== null && !this.elements.controller._validate() && (this._errors = [...this._errors, ...this.elements.controller.errors], this._valid = !1);
        const i = N(
          { hoverType: this._hoverType },
          { shouldThrow: !1 }
        );
        i.status || (this._errors = [...this._errors, ...i.errors], this._valid = !1);
      }
    );
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
   * The class(es) to apply when the menu is open.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's open class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.expand
   */
  get expandClass() {
    return this.isTopLevel ? this._classes.expand : this.elements.rootMenu.expandClass;
  }
  set expandClass(e) {
    p({ expandClass: e }), this._classes.expand !== e && (this._classes.expand = e);
  }
  /**
   * The class(es) to apply when the menu is closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @type {string|string[]}
   *
   * @see _classes.collapse
   */
  get collapseClass() {
    return this.isTopLevel ? this._classes.collapse : this.elements.rootMenu.collapseClass;
  }
  set collapseClass(e) {
    p({ collapseClass: e }), this._classes.collapse !== e && (this._classes.collapse = e);
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
    p({ transitionClass: e }), this._classes.transition !== e && (this._classes.transition = e);
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
    l("number", { transitionDuration: e }), this._durations.transition !== e && (this._durations.transition = e, this._setCustomProps());
  }
  /**
   * The duration time (in milliseconds) for the transition from closed to open states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's expandDuration.
   *
   * If expandDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-expand-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _durations.expand
   */
  get expandDuration() {
    return this.isTopLevel ? this._durations.expand === -1 ? this.transitionDuration : this._durations.expand : this.elements.rootMenu.expandDuration;
  }
  set expandDuration(e) {
    l("number", { expandDuration: e }), this._durations.expand !== e && (this._durations.expand = e, this._setCustomProps());
  }
  /**
   * The duration time (in milliseconds) for the transition from open to closed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's collapseDuration.
   *
   * If collapseDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-collapse-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _durations.collapse
   */
  get collapseDuration() {
    return this.isTopLevel ? this._durations.collapse === -1 ? this.transitionDuration : this._durations.collapse : this.elements.rootMenu.collapseDuration;
  }
  set collapseDuration(e) {
    l("number", { collapseDuration: e }), this._durations.collapse !== e && (this._durations.collapse = e, this._setCustomProps());
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
        let n = 0, o = !1;
        for (; !o && n < s.elements.parentMenu.elements.menuItems.length; ) {
          const a = s.elements.parentMenu.elements.menuItems[n];
          a.isSubmenuItem && a.elements.toggle.elements.controlledMenu === s && (o = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = n), n++;
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
    return super.focusState;
  }
  set focusState(e) {
    super.focusState = e, this.elements.submenuToggles.length > 0 && (e === "self" || e === "none") && this.elements.submenuToggles.forEach((t) => {
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
    return super.currentEvent;
  }
  set currentEvent(e) {
    const t = super.currentEvent;
    super.currentEvent = e, t !== e && this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((s) => {
      s.elements.controlledMenu.currentEvent = e;
    });
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
    N({ hoverType: e }), this._hoverType !== e && (this._hoverType = e);
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
    return super.shouldFocus || this.currentEvent === "character" || this.currentEvent === "mouse" && this.hoverType === "dynamic";
  }
  /**
   * A flag to check if the menu can dynamically hover.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hasExpanded.
   *
   * @type {boolean}
   *
   * @see _hasExpanded
   */
  get hasExpanded() {
    return this._root ? this._hasExpanded : this.elements.rootMenu.hasExpanded;
  }
  set hasExpanded(e) {
    l("boolean", { hasExpanded: e }), this._hasExpanded !== e && (this._hasExpanded = e);
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
    super._setDOMElementType(e, { context: t, overwrite: s, strict: i });
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
   * Sets the ARIA attributes on the root controller.
   *
   * @protected
   */
  _setAriaAttributes() {
    if (this.isTopLevel && this.dom.controller && this.dom.container) {
      const e = this.dom.controller;
      ee("button", { controller: e }, { shouldThrow: !1 }).status || e.setAttribute("role", "button"), e.setAttribute("aria-controls", this.dom.menu.id);
    }
  }
  /**
   * Creates and initializes the root controller.
   *
   * @protected
   *
   * @param {object}  [options = {}]              - The options for creating the controller.
   * @param {boolean} [options.initialize = true] - A flag to initialize the controller. Set to false before validation.
   */
  _createController({ initialize: e = !0 } = {}) {
    !this.isTopLevel || !this.dom.controller || !this.dom.container || (this.elements.controller === null && (this._elements.controller = new this._MenuToggleType({
      menuToggleElement: this.dom.controller,
      parentElement: this.dom.container,
      controlledMenu: this,
      ...this._controllerOptions,
      initialize: !1
    })), e && !this.elements.controller.isInitialized && this.elements.controller.initialize());
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
    this._createController(), this.dom.menuItems.forEach((e) => {
      let t;
      if (this.dom.submenuItems.includes(e)) {
        const s = e.querySelector(this.selectors.submenuToggles), i = e.querySelector(this.selectors.submenus), n = new this._MenuType({
          menuElement: i,
          menuItemsSelector: this.selectors.menuItems,
          menuLinksSelector: this.selectors.menuLinks,
          submenuItemsSelector: this.selectors.submenuItems,
          submenuTogglesSelector: this.selectors.submenuToggles,
          submenusSelector: this.selectors.submenus,
          expandClass: this.expandClass,
          collapseClass: this.collapseClass,
          transitionClass: this.transitionClass,
          transitionDuration: this.transitionDuration,
          expandDuration: this.expandDuration,
          collapseDuration: this.collapseDuration,
          isTopLevel: !1,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay
        });
        n.isInitialized || n.initialize();
        const o = new this._MenuToggleType({
          menuToggleElement: s,
          parentElement: e,
          controlledMenu: n,
          parentMenu: this
        });
        o.isInitialized || o.initialize(), this._elements.submenuToggles.push(o), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: n,
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
      t.isInitialized || t.initialize(), this._elements.menuItems.push(t);
    });
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
      this.currentEvent !== "keyboard" || e.relatedTarget === null || this.dom.menu.contains(e.relatedTarget) || (this.focusState = "none", this.collapseChildren());
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
      u(i), i.button === 0 && (s.toggle(), s.isExpanded && (t.focusState = "self", s.elements.controlledMenu.focusState = "none"));
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
        t.elements.toggle.dom.controller,
        (i) => {
          this.currentEvent = "mouse", e(this, t.elements.toggle, i);
        }
      );
    }), this.isTopLevel && this.elements.controller && this._addEventListener(
      "click",
      this.elements.controller.dom.controller,
      (t) => {
        this.currentEvent = "mouse", e(this, this.elements.controller, t);
      }
    ), this._addEventListener("click", document, (t) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(t.target) && !this.dom.menu !== t.target && (this.elements.rootMenu.hasExpanded = this.elements.submenuToggles.some((s) => s.isExpanded)));
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
   *   is already open, the collapseChildren method for the menu will be called.
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
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasExpanded) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay) : e.elements.toggle.preview() : this.enterDelay > 0 ? this._setTimeout(() => {
          this.collapseChildren();
        }, this.enterDelay) : this.collapseChildren())));
      }), e.isSubmenuItem && (this._addEventListener("pointerleave", e.dom.item, (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? this._setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.collapse();
        }, this.leaveDelay) : (this.currentEvent = "mouse", e.elements.toggle.collapse()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay) : this.currentEvent = "mouse"));
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
      this.elements.controller.dom.controller,
      (e) => {
        this.currentEvent = "keyboard";
        const t = B(e);
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
      this.elements.controller.dom.controller,
      (e) => {
        this.currentEvent = "keyboard";
        const t = B(e);
        (t === "Space" || t === "Enter") && (u(e), this.elements.controller.toggle(), this.elements.controller.isExpanded && this.focusFirstChild());
      }
    );
  }
  /**
   * Sets the transition durations of the menu as a CSS custom properties.
   *
   * The custom properties are:
   *   - `--am-transition-duration`,
   *   - `--am-expand-transition-duration`, and
   *   - `--am-collapse-transition-duration`.
   *
   * The prefix of `am-` can be changed by setting the menu's prefix value.
   *
   * @protected
   */
  _setCustomProps() {
    this.dom.menu.style.setProperty(
      `--${this.prefix}transition-duration`,
      `${this.transitionDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}expand-transition-duration`,
      `${this.expandDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}collapse-transition-duration`,
      `${this.collapseDuration}ms`
    ), this.elements.submenuToggles.forEach((e) => {
      e.elements.controlledMenu._setCustomProps();
    });
  }
  /**
   * Disposes of the menu, its controller, menu items, submenus, and submenu toggles.
   *
   * @public
   */
  dispose() {
    this.elements.submenuToggles.forEach((e) => {
      e.elements.controlledMenu.dispose(), e.dispose();
    }), this.elements.menuItems.forEach((e) => e.dispose()), this.elements.controller?.dispose(), super.dispose();
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
  collapseChildren() {
    this.elements.submenuToggles.forEach((e) => e.collapse());
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
class oe extends W {
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
    isSubmenuItem: i = !1,
    childMenu: n = null,
    toggle: o = null,
    initialize: a = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: i,
      childMenu: n,
      toggle: o
    }), a && this.initialize();
  }
  /**
   * Registers the menu item's initialization event listener.
   *
   * Sets the menu item's `role` to "none",
   * the menu link's `role` to "menuitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._addEventListener(
      this.getEventName("initialize"),
      this.rootDOMElement,
      (e) => {
        e.detail.component === this && (this.dom.item.setAttribute("role", "none"), this.dom.link.setAttribute("role", "menuitem"), this.dom.link.tabIndex = -1);
      }
    );
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
class le extends H {
  /**
   * Constructs a new `MenubarToggle`.
   *
   * @param {object}      options                                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement                   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement                       - The element containing the controlled menu.
   * @param {Menubar}     options.controlledMenu                      - The menu controlled by this toggle.
   * @param {?Menubar}    [options.parentMenu = null]                 - The menu containing this toggle.
   * @param {string}      [options.breakpoint = ""]                   - The breakpoint used to generate the controller's media query.
   * @param {string}      [options.mediaQuery = ""]                   - The media query used to trigger the controller's media query list events.
   * @param {boolean}     [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}     [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}     [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}     [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}     [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}     [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}     [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}     [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {boolean}     [options.initialize = true]                 - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
    breakpoint: n = "",
    mediaQuery: o = "",
    expandInsideBreakpoint: a = !1,
    expandOutsideBreakpoint: h = !1,
    collapseInsideBreakpoint: d = !1,
    collapseOutsideBreakpoint: m = !1,
    lockInsideBreakpoint: f = !1,
    lockOutsideBreakpoint: _ = !1,
    unlockInsideBreakpoint: g = !1,
    unlockOutsideBreakpoint: k = !1,
    initialize: b = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: i,
      breakpoint: n,
      mediaQuery: o,
      expandInsideBreakpoint: a,
      expandOutsideBreakpoint: h,
      collapseInsideBreakpoint: d,
      collapseOutsideBreakpoint: m,
      lockInsideBreakpoint: f,
      lockOutsideBreakpoint: _,
      unlockInsideBreakpoint: g,
      unlockOutsideBreakpoint: k
    }), b && this.initialize();
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
    super._setAriaAttributes(), this.dom.controller.setAttribute("aria-haspopup", "true");
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the collapseSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @param {object}  [options = {}]                            - The options for opening the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to open.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when opening.
   */
  expand({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.isLocked && !e || (this.isInitialized && this.collapseSiblings({ force: e, preserveState: t, emit: s, transition: i }), super.expand({ force: e, preserveState: t, emit: s, transition: i }));
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the collapseSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @param {object}  [options = {}]                            - The options for previewing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to preview.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the expand event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when previewing.
   */
  preview({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    this.isLocked && !e || (this.isInitialized && this.collapseSiblings({ force: e, preserveState: t, emit: s, transition: i }), super.preview({ force: e, preserveState: t, emit: s, transition: i }));
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the collapseChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @param {object}  [options = {}]                            - The options for closing the menu.
   * @param {boolean} [options.force = !this.isInitialized]     - A flag to force the menu to close.
   * @param {boolean} [options.preserveState = false]           - A flag to preserve the current state.
   * @param {boolean} [options.emit = this.isInitialized]       - A flag to emit the collapse event.
   * @param {boolean} [options.transition = this.isInitialized] - A flag to use transitions when closing.
   */
  collapse({
    force: e = !this.isInitialized,
    preserveState: t = !1,
    emit: s = this.isInitialized,
    transition: i = this.isInitialized
  } = {}) {
    if (this.isExpanded) {
      if (this.isLocked && !e) return;
      this.isInitialized && this.collapseChildren({ force: e, preserveState: t, emit: s, transition: i }), this.elements.parentMenu && this.elements.parentMenu.focusCurrentChild();
    }
    super.collapse({ force: e, preserveState: t, emit: s, transition: i });
  }
}
class Z extends C {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof Menubar}
   */
  _MenuType = Z;
  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof MenubarItem}
   */
  _MenuItemType = oe;
  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof MenubarToggle}
   */
  _MenuToggleType = le;
  /**
   * Constructs a new `Menubar`.
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
   * @param {?(string|string[])} [options.initializeClass = initializing]    - The class(es) to apply when the menu is initializing.
   * @param {?(string|string[])} [options.expandClass = show]                - The class to apply when a menu is expanded.
   * @param {?(string|string[])} [options.collapseClass = hide]              - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]   - The class to apply when a menu is transitioning between expanded and collapsed states.
   * @param {number}             [options.transitionDuration = 250]          - The duration of the transition between expanded and collapsed states (in milliseconds).
   * @param {number}             [options.expandDuration = -1]               - The duration of the transition from collapsed to expanded states (in milliseconds).
   * @param {number}             [options.collapseDuration = -1]             - The duration of the transition from expanded to collapsed states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                 - A flag to mark the root menu.
   * @param {?Menubar}           [options.parentMenu = null]                 - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                   - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                  - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                   - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                   - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {string}             [options.breakpoint = '']                   - The breakpoint used to generate the root controller's media query.
   * @param {string}             [options.mediaQuery = '']                   - The media query used to trigger the root controller's media query list events.
   * @param {boolean}            [options.expandInsideBreakpoint = false]    - A flag to expand the controlled menu when the media query matches.
   * @param {boolean}            [options.expandOutsideBreakpoint = false]   - A flag to expand the controlled menu when the media query does not match.
   * @param {boolean}            [options.collapseInsideBreakpoint = false]  - A flag to collapse the controlled menu when the media query matches.
   * @param {boolean}            [options.collapseOutsideBreakpoint = false] - A flag to collapse the controlled menu when the media query does not match.
   * @param {boolean}            [options.lockInsideBreakpoint = false]      - A flag to lock the controller when the media query matches.
   * @param {boolean}            [options.lockOutsideBreakpoint = false]     - A flag to lock the controller when the media query does not match.
   * @param {boolean}            [options.unlockInsideBreakpoint = false]    - A flag to unlock the controller when the media query matches.
   * @param {boolean}            [options.unlockOutsideBreakpoint = false]   - A flag to unlock the controller when the media query does not match.
   * @param {?string}            [options.prefix = am-]                      - The prefix to use for CSS custom properties.
   * @param {?string}            [options.key = null]                        - The key used to generate IDs throughout the menu.
   * @param {boolean}            [options.initialize = true]                 - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: e,
    menuItemsSelector: t = "li",
    menuLinksSelector: s = "a",
    submenuItemsSelector: i = "li:has(ul)",
    submenuTogglesSelector: n = "a",
    submenusSelector: o = "ul",
    controllerElement: a = null,
    containerElement: h = null,
    initializeClass: d = "initializing",
    expandClass: m = "show",
    collapseClass: f = "hide",
    transitionClass: _ = "transitioning",
    transitionDuration: g = 250,
    expandDuration: k = -1,
    collapseDuration: b = -1,
    isTopLevel: M = !0,
    parentMenu: v = null,
    hoverType: w = "off",
    hoverDelay: I = 250,
    enterDelay: x = -1,
    leaveDelay: T = -1,
    breakpoint: D = "",
    mediaQuery: O = "",
    expandInsideBreakpoint: L = !1,
    expandOutsideBreakpoint: S = !1,
    collapseInsideBreakpoint: z = !1,
    collapseOutsideBreakpoint: A = !1,
    lockInsideBreakpoint: j = !1,
    lockOutsideBreakpoint: F = !1,
    unlockInsideBreakpoint: P = !1,
    unlockOutsideBreakpoint: q = !1,
    prefix: K = "am-",
    key: Q = null,
    initialize: J = !0
  }) {
    super({
      menuElement: e,
      menuItemsSelector: t,
      menuLinksSelector: s,
      submenuItemsSelector: i,
      submenuTogglesSelector: n,
      submenusSelector: o,
      controllerElement: a,
      containerElement: h,
      initializeClass: d,
      expandClass: m,
      collapseClass: f,
      transitionClass: _,
      transitionDuration: g,
      expandDuration: k,
      collapseDuration: b,
      isTopLevel: M,
      parentMenu: v,
      hoverType: w,
      hoverDelay: I,
      enterDelay: x,
      leaveDelay: T,
      breakpoint: D,
      mediaQuery: O,
      expandInsideBreakpoint: L,
      expandOutsideBreakpoint: S,
      collapseInsideBreakpoint: z,
      collapseOutsideBreakpoint: A,
      lockInsideBreakpoint: j,
      lockOutsideBreakpoint: F,
      unlockInsideBreakpoint: P,
      unlockOutsideBreakpoint: q,
      prefix: K,
      key: Q
    }), J && this.initialize();
  }
  /**
   * Registers the menu's initialization event listener.
   *
   * If the menu is a root menu, its `role` will be set to "menubar" and the first
   * menu item's `tabIndex` will be set to 0 in the DOM.
   *
   * If the menu is not a root menu, its `role` will be set to "menu".
   *
   * If the root menu has a controller, removes its `aria-haspopup` attribute.
   *
   * @protected
   */
  _bootstrap() {
    super._bootstrap(), this._addEventListener(
      this.getEventName("initialize"),
      this.rootDOMElement,
      (e) => {
        e.detail.component === this && (this.isTopLevel ? this.dom.menu.setAttribute("role", "menubar") : this.dom.menu.setAttribute("role", "menu"), this.isTopLevel && (this.elements.menuItems[0].dom.link.tabIndex = 0, this.elements.controller && this.elements.controller.dom.controller.removeAttribute(
          "aria-haspopup"
        )));
      }
    );
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
    super._handleClick(), this._addEventListener("click", document, (e) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(e.target) && !this.dom.menu !== e.target && (this.collapseChildren(), this.blur(), this.elements.controller && this.elements.controller.collapse(), this.elements.rootMenu.hasExpanded = !1));
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
    super._handleKeydown(), this._addEventListener("keydown", this.dom.menu, (e) => {
      this.currentEvent = "keyboard";
      const t = B(e);
      if (t === "Tab" && (this.elements.rootMenu.focusState !== "none" ? (this.elements.rootMenu.blur(), this.elements.rootMenu.collapseChildren()) : this.elements.rootMenu.focus()), t === "Character")
        u(e);
      else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const s = [
            "Space",
            "Enter",
            "ArrowRight",
            "ArrowLeft",
            "Home",
            "End"
          ], i = ["ArrowDown", "ArrowUp"], n = ["Escape"];
          (s.includes(t) || this.currentMenuItem.isSubmenuItem && i.includes(t) || this.elements.controller && n.includes(t)) && u(e);
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
        ].includes(t) && u(e);
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
    super._handleKeyup(), this._addEventListener("keyup", this.dom.menu, (e) => {
      this.currentEvent = "keyboard";
      const t = B(e), { altKey: s, crtlKey: i, metaKey: n } = e;
      if (t === "Character" && !(s || i || n))
        u(e), this.elements.rootMenu.currentEvent = "character", this.focusNextChildWithCharacter(e.key);
      else if (this.isTopLevel) {
        if (this.focusState === "self")
          if (t === "Space" || t === "Enter")
            u(e), this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.expand(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            })) : this.currentMenuItem.dom.link.click();
          else if (t === "ArrowRight") {
            u(e);
            const a = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isExpanded;
            this.focusNextChild(), a && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.collapseChildren());
          } else if (t === "ArrowLeft") {
            u(e);
            const a = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isExpanded;
            this.focusPreviousChild(), a && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.collapseChildren());
          } else t === "ArrowDown" ? this.currentMenuItem.isSubmenuItem && (u(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.expand(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusFirstChild();
          })) : t === "ArrowUp" ? this.currentMenuItem.isSubmenuItem && (u(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.expand(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusLastChild();
          })) : t === "Home" ? (u(e), this.focusFirstChild()) : t === "End" ? (u(e), this.focusLastChild()) : t === "Escape" && (this.elements.submenuToggles.some(
            (h) => h.isExpanded
          ) ? (u(e), this.collapseChildren()) : this.isTopLevel && this.elements.controller && this.elements.controller.isExpanded && (u(e), this.elements.controller.collapse(), this.focusController()));
      } else
        t === "Space" || t === "Enter" ? (u(e), this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.expand(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : this.currentMenuItem.dom.link.click()) : t === "Escape" ? (u(e), this.elements.rootMenu.collapseChildren(), this.elements.rootMenu.focusCurrentChild()) : t === "ArrowRight" ? this.currentMenuItem.isSubmenuItem ? (u(e), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.expand(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : (u(e), this.elements.rootMenu.collapseChildren(), this.elements.rootMenu.focusNextChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && this.elements.rootMenu.currentMenuItem.elements.toggle.preview()) : t === "ArrowLeft" ? this.elements.parentMenu.currentMenuItem.isSubmenuItem && (u(e), this.elements.parentMenu.currentMenuItem.elements.toggle.collapse(), this.elements.parentMenu.focusCurrentChild(), this.elements.parentMenu === this.elements.rootMenu && (this.elements.rootMenu.collapseChildren(), this.elements.rootMenu.focusPreviousChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && (this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.elements.rootMenu.currentMenuItem.elements.toggle.preview()))) : t === "ArrowDown" ? (u(e), this.focusNextChild()) : t === "ArrowUp" ? (u(e), this.focusPreviousChild()) : t === "Home" ? (u(e), this.focusFirstChild()) : t === "End" && (u(e), this.focusLastChild());
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
    let s = this.currentChild + 1, i = !1;
    for (; !i && s < this.elements.menuItems.length; ) {
      let n = "";
      this.elements.menuItems[s].dom.item.innerText ? n = this.elements.menuItems[s].dom.item.innerText : n = this.elements.menuItems[s].dom.item.textContent, n = n.replace(/[\s]/g, "").toLowerCase().charAt(0), n === t && (i = !0, this.focusChild(s)), s++;
    }
  }
}
export {
  Z as default
};
