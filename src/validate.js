/**
 * Check to see if the provided elements have a specific contructor.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * This is essentially just a wrapper function around checking instanceof with
 * more descriptive error message to help debugging.
 *
 * Will return true is the check is successful.
 *
 * @param  {object}  contructor - The constructor to check for.
 * @param  {object}  elements   - The element(s) to check.
 * @return {boolean}            - The result of the check.
 */
export function isValidInstance(contructor, elements) {
  try {
    if (typeof elements !== "object") {
      const elementsType = typeof elements;

      throw new TypeError(
        `AccessibleMenu: Elements given to isValidInstance() must be inside of an object. ${elementsType} given.`
      );
    }

    for (const key in elements) {
      if (!(elements[key] instanceof contructor)) {
        const elementType = typeof elements[key];
        throw new TypeError(
          `AccessibleMenu: ${key} must be an instance of ${contructor.name}. ${elementType} given.`
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
 * Check to see if the provided values are of a specific type.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * This is essentially just a wrapper function around checking typeof with
 * more descriptive error message to help debugging.
 *
 * Will return true is the check is successful.
 *
 * @param  {string}  type   - The type to check for.
 * @param  {object}  values - The value(s) to check.
 * @return {boolean}        - The result of the check.
 */
export function isValidType(type, values) {
  try {
    if (typeof values !== "object") {
      const valuesType = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isValidType() must be inside of an object. ${valuesType} given.`
      );
    }

    for (const key in values) {
      const valueType = typeof values[key];

      if (valueType !== type) {
        throw new TypeError(
          `AccessibleMenu: ${key} must be a ${type}. ${valueType} given.`
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
 * @param  {Object<string>} values - The value(s) to check.
 * @return {boolean}                - The result of the check.
 */
export function isCSSSelector(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isCSSSelector() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      try {
        if (values[key] === null) {
          throw new Error();
        }

        document.querySelector(values[key]);
      } catch (error) {
        throw new TypeError(
          `AccessibleMenu: ${key} must be a valid CSS selector. "${values[key]}" given.`
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
 * Checks to see if the provided value is either a string or an array of strings.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param  {Object<string, string[]>} values - The value(s) to check.
 * @return {boolean}                         - The result of the check.
 */
export function isValidClassList(values) {
  try {
    if (typeof values !== "object" || Array.isArray(values)) {
      const type = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isValidClassList() must be inside of an object. ${type} given.`
      );
    }

    for (const key in values) {
      const type = typeof values[key];

      if (type !== "string") {
        if (Array.isArray(values[key])) {
          values[key].forEach((value) => {
            if (typeof value !== "string") {
              throw new TypeError(
                `AccessibleMenu: ${key} must be a string or an array of strings. An array containing non-strings given.`
              );
            }
          });
        } else {
          throw new TypeError(
            `AccessibleMenu: ${key} must be a string or an array of strings. ${type} given.`
          );
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

/**
 * Check to see if the provided values are valid focus states for a menu.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param  {Object<string>} values - The value(s) to check.
 * @return {boolean}                - The result of the check.
 */
export function isValidState(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isValidState() must be inside of an object. ${type} given.`
      );
    }

    const validStates = ["none", "self", "child"];

    for (const key in values) {
      if (!validStates.includes(values[key])) {
        throw new TypeError(
          `AccessibleMenu: ${key} must be one of the following values: ${validStates.join(
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
 * @param  {Object<string>} values - The value(s) to check.
 * @return {boolean}                - The result of the check.
 */
export function isValidEvent(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isValidEvent() must be inside of an object. ${type} given.`
      );
    }

    const validEvents = ["none", "mouse", "keyboard", "character"];

    for (const key in values) {
      if (!validEvents.includes(values[key])) {
        throw new TypeError(
          `AccessibleMenu: ${key} must be one of the following values: ${validEvents.join(
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
 * Check to see if the provided values are valid hover types for a menu.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return true is the check is successful.
 *
 * @param  {Object<string>} values - The value(s) to check.
 * @return {boolean}                - The result of the check.
 */
export function isValidHoverType(values) {
  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `AccessibleMenu: Values given to isValidHoverType() must be inside of an object. ${type} given.`
      );
    }

    const validTypes = ["off", "on", "dynamic"];

    for (const key in values) {
      if (!validTypes.includes(values[key])) {
        throw new TypeError(
          `AccessibleMenu: ${key} must be one of the following values: ${validTypes.join(
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
 * Checks to see if the provided elements are using a specific tag.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * @param  {string}               tagName  - The name of the tag.
 * @param  {Object<HTMLElement>} elements - The element(s) to check.
 * @return {boolean}                       - The result of the check.
 */
export function isTag(tagName, elements) {
  if (
    isValidType("string", { tagName }) &&
    isValidInstance(HTMLElement, elements)
  ) {
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
 * Checks to see if an event is supported by a node.
 *
 * @param  {string}      event   - The event type.
 * @param  {HTMLElement} element - The element to check.
 * @return {boolean}             - The result.
 *
 * @deprecated Will be removed in v4 unless there is a new found need for it.
 */
export function isEventSupported(event, element) {
  if (
    isValidType("string", { event }) &&
    isValidInstance(HTMLElement, { element })
  ) {
    const eventProp = `on${event}`;

    return typeof element[eventProp] !== "undefined";
  } else {
    return false;
  }
}
