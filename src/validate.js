import Menu from "./menu";
import MenuToggle from "./menuToggle";

/**
 * Checks to see if the provided element is an HTMLElement.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|HTMLElement} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isHTMLElement(element) {
  let name = "element";

  try {
    if (!(element instanceof HTMLElement)) {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof HTMLElement)) {
            throw Error;
          }
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be an HTML Element.`);
  }
}

/**
 * Checks to see if the provided value is a valid CSS selector.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|string} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isCSSSelector(value) {
  isString(value);

  let name = "value";

  try {
    if (typeof value === "object") {
      for (const key in value) {
        name = key;

        if (typeof value[key] !== "string") throw Error;

        document.querySelector(value[key]);
      }
    } else {
      document.querySelector(value);
    }

    return true;
  } catch (error) {
    throw new TypeError(`${name} must be a valid CSS selector.`);
  }
}

/**
 * Checks to see if the provided value is a boolean.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|boolean} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isBoolean(value) {
  let name = "value";

  try {
    if (typeof value !== "boolean") {
      if (typeof value === "object") {
        for (const key in value) {
          name = key;

          if (typeof value[key] !== "boolean") throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a boolean.`);
  }
}

/**
 * Checks to see if the provided value is a number.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|number} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isNumber(value) {
  let name = "value";

  try {
    if (typeof value !== "number") {
      if (typeof value === "object") {
        for (const key in value) {
          name = key;

          if (typeof value[key] !== "number") throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a number.`);
  }
}

/**
 * Checks to see if the provided value is a string.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|string} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isString(value) {
  let name = "value";

  try {
    if (typeof value !== "string") {
      if (typeof value === "object") {
        for (const key in value) {
          name = key;

          if (typeof value[key] !== "string") throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a string.`);
  }
}

/**
 * Checks to see if the provided event is an Event.
 *
 * If you provide the event to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|Event} event - The event to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isEvent(event) {
  let name = "event";

  try {
    if (!(event instanceof Event)) {
      if (typeof event === "object") {
        for (const key in event) {
          name = key;

          if (!(event[key] instanceof Event)) throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be an Event.`);
  }
}

/**
 * Checks to see if the provided event is a KeyboardEvent.
 *
 * If you provide the event to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|KeyboardEvent} event - The event to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isKeyboardEvent(event) {
  let name = "event";

  try {
    if (!(event instanceof KeyboardEvent)) {
      if (typeof event === "object") {
        for (const key in event) {
          name = key;

          if (!(event[key] instanceof KeyboardEvent)) throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a KeyboardEvent.`);
  }
}

/**
 * Checks to see if the provided element is a menu.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|Menu} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenu(element) {
  let name = "element";

  try {
    if (!(element instanceof Menu)) {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof Menu)) {
            throw Error;
          }
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be an instance of Menu`);
  }
}

/**
 * Check to see if the provided element is a MenuToggle.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|MenuToggle} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenuToggle(element) {
  let name = "element";

  try {
    if (!(element instanceof MenuToggle)) {
      if (typeof element === "object" && !(element instanceof MenuToggle)) {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof MenuToggle)) throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a MenuToggle.`);
  }
}

/**
 * Check to see if the provided value is a valid focus state for a menu.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|string} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidState(value) {
  isString(value);

  const validStates = ["none", "self", "child"];
  let name = "value";

  try {
    if (typeof value === "object") {
      for (const key in value) {
        name = key;

        if (!validStates.includes(value[key])) {
          throw Error;
        }
      }
    } else if (!validStates.includes(value)) {
      throw Error;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(
      `${name} must be one of the following values: ${validStates.join(", ")}`
    );
  }
}
