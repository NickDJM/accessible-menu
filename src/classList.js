/**
 * This file's only purpose is to allow ease of use when manipulating DOM classes.
 *
 * Initial functions taken from https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
 *
 * --------------------------------------------------------------------------------
 * !!! This file should be removed once IE11 is no longer supported by the project.
 * --------------------------------------------------------------------------------
 */

/**
 * Checks if an element in the DOM has a class.
 *
 * @param   {HTMLElement} element   - The DOM element.
 * @param   {string}      className - The class to search for.
 *
 * @returns {boolean} - The result of the check.
 */
export function hasClass(element, className) {
  return element.classList
    ? element.classList.contains(className)
    : new RegExp("\\b" + className + "\\b").test(element.className);
}

/**
 * Adds a class or an array of classes to en element in the DOM.
 *
 * This allows browsers that do not support classList functions (IE11) to still function.
 *
 * @param {HTMLElement}     element   - The DOM element.
 * @param {string|string[]} className - The class(es) to add.
 */
export function addClass(element, className) {
  if (typeof className === "string") {
    if (element.classList) {
      element.classList.add(className);
    } else if (!hasClass(element, className)) {
      element.className += " " + className;
    }
  } else {
    if (element.classList) {
      element.classList.add(...className);
    } else {
      className.forEach(value => {
        if (!hasClass(element, value)) {
          element.className += " " + value;
        }
      });
    }
  }
}

/**
 * Removes a class or an array of classes to en element in the DOM.
 *
 * This allows browsers that do not support classList functions (IE11) to still function.
 *
 * @param {HTMLElement}     element   - The DOM element.
 * @param {string|string[]} className - The class(es) to remove.
 */
export function removeClass(element, className) {
  if (typeof className === "string") {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.classList.replace(new RegExp("\\b" + className + "\\b", "g"), "");
    }
  } else {
    if (element.classList) {
      element.classList.remove(...className);
    } else {
      className.forEach(value => {
        element.classList.replace(new RegExp("\\b" + value + "\\b", "g"), "");
      });
    }
  }
}
