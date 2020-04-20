import Menu from "./menu";
import MenuItem from "./menuItem";
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
 * Checks to see if the provided element is a valid CSS selector.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|string} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isCSSSelector(element) {
  let name = "element";

  try {
    if (typeof element !== "string") {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (typeof element[key] !== "string") throw Error;

          document.querySelector(element[key]);
        }
      } else {
        throw Error;
      }
    } else {
      document.querySelector(element);
    }

    return true;
  } catch (error) {
    throw new TypeError(`${name} must be a valid CSS selector.`);
  }
}

/**
 * Checks to see if the provided element is a boolean.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|boolean} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isBoolean(element) {
  let name = "element";

  try {
    if (typeof element !== "boolean") {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (typeof element[key] !== "boolean") throw Error;
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
 * Checks to see if the provided element is an Event.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|Event} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isEvent(element) {
  let name = "event";

  try {
    if (!(element instanceof Event)) {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof Event)) throw Error;
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
 * Checks to see if the provided element is a KeyboardEvent.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|KeyboardEvent} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isKeyboardEvent(element) {
  let name = "event";

  try {
    if (!(element instanceof KeyboardEvent)) {
      if (typeof element === "object") {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof KeyboardEvent)) throw Error;
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
 * Checks to see if the menu has everything it needs for submenus.
 *
 * Will return true is the check is successful.
 *
 * @param   {string} submenuItemSelector   - The CSS selector for submenu items.
 * @param   {string} submenuToggleSelector - The CSS selector for submenu togglers.
 * @param   {string} submenuSelector       - The CSS selector for submenus.
 *
 * @returns {boolean} - The result of the check.
 */
export function hasSubmenus(
  submenuItemSelector,
  submenuToggleSelector,
  submenuSelector
) {
  // if none of the submenu selectors are provided, the menu has no submenus.
  if (
    submenuItemSelector === null &&
    submenuToggleSelector === null &&
    submenuSelector === null
  )
    return true;

  return isCSSSelector({
    submenuItemSelector,
    submenuToggleSelector,
    submenuSelector
  });
}

/**
 * Checks to see if the menu has everything is needs to be a dropdown.
 *
 * Will return true is the check is successful.
 *
 * @param   {HTMLElement} controllerElement - The toggle for the dropdown.
 * @param   {HTMLElement} containerElement  - The container for the dropdown.
 *
 * @returns {boolean} - The result of the check.
 */
export function isDropdown(controllerElement, containerElement) {
  // If neither of the selectors are provided, the menu isn't a dropdown.
  if (controllerElement === null && containerElement === null) return true;

  return isHTMLElement({ controllerElement, containerElement });
}

/**
 * Check to see if the provided element is a Menu.
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

          if (!(element[key] instanceof Menu)) throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a Menu.`);
  }
}

/**
 * Check to see if the provided element is a MenuItem.
 *
 * If you provide the element to check inside of an object
 * the name of the variable will be output in the error message.
 *
 * Will return true is the check is successful.
 *
 * @param   {object|MenuItem} element - The element to check.
 *
 * @returns {boolean} - The result of the check.
 */
export function isMenuItem(element) {
  let name = "element";

  try {
    if (!(element instanceof MenuItem)) {
      if (typeof element === "object" && !(element instanceof MenuItem)) {
        for (const key in element) {
          name = key;

          if (!(element[key] instanceof MenuItem)) throw Error;
        }
      } else {
        throw Error;
      }
    } else {
      return true;
    }
  } catch (error) {
    throw new TypeError(`${name} must be a MenuItem.`);
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
