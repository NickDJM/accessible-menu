import { baseMenuType, baseMenuToggleType } from "./_baseTypes.js";

/**
 * Checks to see if the provided elements are instances of HTMLElement.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isHTMLElement(elements) {
  try {
    if (typeof elements !== "object") {
      const type = typeof elements;

      throw new TypeError(
        `Elements given to isHTMLElement() must be inside of an object. ${type} given.`
      );
    }

    for (const key in elements) {
      if (!(elements[key] instanceof HTMLElement)) {
        const type = typeof elements[key];
        throw new TypeError(
          `${key} must be an instance of HTMLElement. ${type} given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided values are valid CSS selectors.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isCSSSelector(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isCSSSelector() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      try {
        document.querySelector(values[key]);
      } catch (error) {
        throw new TypeError(
          `${key} must be a valid CSS selector. "${values[key]}" given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided values are booleans.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isBoolean(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isBoolean() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      const type = typeof values[key];

      if (type !== "boolean") {
        throw new TypeError(`${key} must be a boolean. ${type} given.`);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided values are numbers.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isNumber(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isNumber() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      const type = typeof values[key];

      if (type !== "number") {
        throw new TypeError(`${key} must be a number. ${type} given.`);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided values are strings.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isString(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isString() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      const type = typeof values[key];

      if (type !== "string") {
        throw new TypeError(`${key} must be a string. ${type} given.`);
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided elements are instances of Event.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isEvent(elements) {
  try {
    if (typeof elements !== "object") {
      const type = typeof elements;

      throw new TypeError(
        `Elements given to isEvent() must be inside of an object. ${type} given.`
      );
    }

    for (const key in elements) {
      if (!(elements[key] instanceof Event)) {
        const type = typeof elements[key];
        throw new TypeError(
          `${key} must be an instance of Event. ${type} given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided elements are instances of KeyboardEvent.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isKeyboardEvent(elements) {
  try {
    if (typeof elements !== "object") {
      const type = typeof elements;

      throw new TypeError(
        `Elements given to isKeyboardEvent() must be inside of an object. ${type} given.`
      );
    }

    for (const key in elements) {
      if (!(elements[key] instanceof KeyboardEvent)) {
        const type = typeof elements[key];
        throw new TypeError(
          `${key} must be an instance of KeyboardEvent. ${type} given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided elements are a menus.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenu(elements) {
  try {
    if (typeof elements !== "object") {
      const type = typeof elements;

      throw new TypeError(
        `Elements given to isMenu() must be inside of an object. ${type} given.`
      );
    }

    for (const key in elements) {
      if (!elements[key][baseMenuType]) {
        const type = typeof elements[key];

        throw new TypeError(
          `${key} must be an instance of BaseMenu. ${type} given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Checks to see if the provided elements are using a specific tag.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * @param   {string} tagName  - The name of the tag.
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isTag(tagName, elements) {
  if (isString({ tagName }) && isHTMLElement(elements)) {
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

/**
 * Checks to see if the provided elements are a menu toggles.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} elements - The element(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenuToggle(elements) {
  try {
    if (typeof elements !== "object") {
      const type = typeof elements;

      throw new TypeError(
        `Elements given to isMenuToggle() must be inside of an object. ${type} given.`
      );
    }

    for (const key in elements) {
      if (!elements[key][baseMenuToggleType]) {
        const type = typeof elements[key];

        throw new TypeError(
          `${key} must be an instance of BaseMenuToggle. ${type} given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Check to see if the provided values are valid focus states for a menu.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidState(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidState() must be inside of an object. ${type} given.`
      );
    }

    const validStates = ["none", "self", "child"];

    for (const key in values) {
      if (!validStates.includes(values[key])) {
        throw new TypeError(
          `${key} must be one of the following values: ${validStates.join(
            ", "
          )}. "${values[key]}" given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Check to see if the provided values are valid event types for a menu.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidEvent(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. ${type} given.`
      );
    }

    const validEvents = ["none", "mouse", "keyboard"];

    for (const key in values) {
      if (!validEvents.includes(values[key])) {
        throw new TypeError(
          `${key} must be one of the following values: ${validEvents.join(
            ", "
          )}. "${values[key]}" given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
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
  isString({ event });
  isHTMLElement({ element });

  const eventProp = `on${event}`;

  return typeof element[eventProp] !== "undefined";
}

/**
 * Checks to see if the provided value is either a string or an array of strings.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidClassList(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      const type = typeof values[key];

      if (type !== "string") {
        if (Array.isArray(values[key])) {
          values[key].forEach(value => {
            isString({ classValue: value });
          });
        } else {
          throw new TypeError(
            `${key} must be a string or an array of strings. ${type} given.`
          );
        }
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Check to see if the provided values are valid hover types for a menu.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param   {object} values - The value(s) to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isValidHoverType(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. ${type} given.`
      );
    }

    const validEvents = ["off", "on", "dynamic"];

    for (const key in values) {
      if (!validEvents.includes(values[key])) {
        throw new TypeError(
          `${key} must be one of the following values: ${validEvents.join(
            ", "
          )}. "${values[key]}" given.`
        );
      }
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
