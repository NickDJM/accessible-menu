/**
 * Add a class or array of classes to an element.
 *
 * @param {string|string[]} className - The class or classes to add.
 * @param {HTMLElement} element - The element to add the class to.
 */
export function addClass(className, element) {
  if (typeof className === "string") {
    element.classList.add(className);
  } else {
    element.classList.add(...className);
  }
}

/**
 * Remove a class or array of classes from an element.
 *
 * @param {string|string[]} className - The class or classes to remove.
 * @param {HTMLElement} element - The element to remove the class from.
 */
export function removeClass(className, element) {
  if (typeof className === "string") {
    element.classList.remove(className);
  } else {
    element.classList.remove(...className);
  }
}
