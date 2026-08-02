/**
 * Check to see if the provided elements have a specific contructor.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * This is essentially just a wrapper function around checking instanceof with
 * more descriptive error message to help debugging.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {object}                   contructor                    - The constructor to check for.
 * @param  {object}                   elements                      - The element(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidInstance(
  contructor,
  elements,
  { shouldThrow = true } = {}
) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof elements !== "object") {
      const elementsType = typeof elements;

      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${elementsType}" given.`
      );
    }

    for (const key in elements) {
      try {
        if (!(elements[key] instanceof contructor)) {
          const elementType = typeof elements[key];
          throw new TypeError(
            `${key} must be an instance of ${contructor.name}. "${elementType}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
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
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {string}                   type                          - The type to check for.
 * @param  {object}                   values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidType(type, values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object") {
      const valuesType = typeof values;

      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${valuesType}" given.`
      );
    }

    for (const key in values) {
      try {
        const valueType = typeof values[key];

        if (valueType !== type) {
          throw new TypeError(
            `${key} must be a ${type}. "${valueType}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Checks to see if the provided values are valid query selectors.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {Object<string>}           values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isQuerySelector(values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${type}" given.`
      );
    }

    for (const key in values) {
      try {
        try {
          if (values[key] === null) {
            throw new Error();
          }

          document.querySelector(values[key]);
        } catch {
          throw new TypeError(
            `${key} must be a valid query selector. "${values[key]}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Checks to see if the provided value is either a string or an array of strings.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {Object<string, string[]>} values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidClassList(values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object" || Array.isArray(values)) {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${type}" given.`
      );
    }

    for (const key in values) {
      try {
        const type = typeof values[key];

        if (type !== "string") {
          if (Array.isArray(values[key])) {
            values[key].forEach((value) => {
              if (typeof value !== "string") {
                throw new TypeError(
                  `${key} must be a string or an array of strings. An array containing non-strings given.`
                );
              }
            });
          } else {
            throw new TypeError(
              `${key} must be a string or an array of strings. "${type}" given.`
            );
          }
        } else {
          const obj = {};
          obj[key] = values[key];

          isQuerySelector(obj);
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Check to see if the provided values are valid focus states for a menu.
 *
 * Available states are: `"none"`, `"self"`, and `"child"`.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {Object<string>}           values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidState(values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${type}" given.`
      );
    }

    const validStates = ["none", "self", "child"];

    for (const key in values) {
      try {
        if (!validStates.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validStates.join(
              ", "
            )}. "${values[key]}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Check to see if the provided values are valid event types for a menu.
 *
 * Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {Object<string>}           values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidEvent(values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${type}" given.`
      );
    }

    const validEvents = ["none", "mouse", "keyboard", "character"];

    for (const key in values) {
      try {
        if (!validEvents.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validEvents.join(
              ", "
            )}. "${values[key]}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Check to see if the provided values are valid hover types for a menu.
 *
 * Available types are: `"off"`, `"on"`, and `"dynamic"`.
 *
 * The values must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {Object<string>}           values                        - The value(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isValidHoverType(values, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (typeof values !== "object") {
      const type = typeof values;

      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${type}" given.`
      );
    }

    const validTypes = ["off", "on", "dynamic"];

    for (const key in values) {
      try {
        if (!validTypes.includes(values[key])) {
          throw new TypeError(
            `${key} must be one of the following values: ${validTypes.join(
              ", "
            )}. "${values[key]}" given.`
          );
        }
      } catch (error) {
        result.status = false;
        result.errors.push(error);
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}

/**
 * Checks to see if the provided elements are using a specific tag.
 *
 * The elements must be provided inside of an object
 * so the variable name can be retrieved in case of errors.
 *
 * Will return `{ status: true }` if the check is successful.
 *
 * @param  {string}                   tagName                       - The name of the tag.
 * @param  {Object<HTMLElement>}      elements                      - The element(s) to check.
 * @param  {object}                   [options = {}]                - Additional options.
 * @param  {boolean}                  [options.shouldThrow = true ] - Whether to throw on error or return it.
 * @return {Object<boolean, Error[]>}                               - The result of the check.
 */
export function isTag(tagName, elements, { shouldThrow = true } = {}) {
  const result = {
    status: true,
    errors: [],
  };

  try {
    if (
      isValidType("string", { tagName }, { shouldThrow: true }).status &&
      isValidInstance(HTMLElement, elements, { shouldThrow: true }).status
    ) {
      const tag = tagName.toLowerCase();

      for (const key in elements) {
        try {
          if (elements[key].tagName.toLowerCase() !== tag) {
            throw new TypeError(
              `${key} must be a <${tag}> element. <${elements[
                key
              ].tagName.toLowerCase()}> given.`
            );
          }
        } catch (error) {
          result.status = false;
          result.errors.push(error);
        }
      }
    }
  } catch (error) {
    result.status = false;
    result.errors.push(error);
  }

  if (shouldThrow && !result.status) {
    throw result.errors[0];
  }

  return result;
}
