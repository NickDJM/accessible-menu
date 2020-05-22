import BaseMenu from "./_baseMenu";
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
 * @param   {object|BaseMenu} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenu(element) {
  let name = "element";

  try {
    if (!(element instanceof BaseMenu)) {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof BaseMenu)) {
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
    throw new TypeError(
      `${name} must be an instance of either BaseMenu, Menubar, or DisclosureMenu`
    );
  }
}

/**
 * Checks to see if the provided element is using a specific tag.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * @param   {string}             tagName - The name of the tag.
 * @param   {object|HTMLElement} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isTag(tagName, element) {
  isString(tagName);
  isHTMLElement(element);

  const tag = tagName.toLowerCase();

  if (!(element instanceof HTMLElement)) {
    let check = true;

    for (const key in element) {
      if (element[key].tagName.toLowerCase() !== tag) check = false;
    }

    return check;
  } else {
    return element.tagName.toLowerCase() === tag;
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

/**
 * Check to see if the provided value is a valid event type for a menu.
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
export function isValidEvent(value) {
  isString(value);

  const validStates = ["none", "mouse", "keyboard"];
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

/**
 * Checks to see if an event is supported by a node.
 *
 * @param   {string}      event   - The event type.
 * @param   {HTMLElement} element - The element to check.
 *
 * @returns {boolean} - The result.
 */
export function isEventSupported(event, element) {
  isString(event);
  isHTMLElement(element);

  const eventProp = `on${event}`;

  return typeof element[eventProp] !== "undefined";
}

/**
 * Checks to see if the provided value is either a string of an array of strings.
 *
 * If you provide the value to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|string|string[]} value - The value to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidClassList(value) {
  let name = "value";

  try {
    if (typeof value !== "string") {
      if (typeof value === "object") {
        for (const key in value) {
          name = key;

          if (typeof value[key] !== "string") {
            if (Array.isArray(value[key])) {
              isString(value[key]);
            } else {
              throw Error;
            }
          }
        }
      } else if (Array.isArray(value)) {
        isString(value);
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(
      `${name} must be either a string or an array of strings.`
    );
  }
}
