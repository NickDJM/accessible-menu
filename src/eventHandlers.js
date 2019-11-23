// Custom validation for params.
const validate = {
  event: value => {
    if (!(value instanceof Event)) {
      throw new TypeError("event must be an event.");
    }
  },
  keyboardEvent: value => {
    if (!(value instanceof KeyboardEvent)) {
      throw new TypeError("event must be a keyboard event.");
    }
  }
};

/**
 * Retrieves the pressed key from an event.
 *
 * @param   {KeyboardEvent} event - The keyboard event.
 *
 * @returns {string} - The name of the key.
 */
export function keyPress(event) {
  // Run validation.
  validate.keyboardEvent(event);

  // Use event.key or event.keyCode to support older browsers.
  const key = event.key || event.keyCode;

  // Return an empty string if the key can't be found for some reaosn.
  if (typeof key === "undefined" || !key) return "";

  const keys = {
    Enter: key === "Enter" || key === 13,
    Space: key === " " || key === 32,
    Escape: key === "Escape" || key === "Esc" || key === 27,
    ArrowUp: key === "ArrowUp" || key === 38,
    ArrowRight: key === "ArrowRight" || key === 39,
    ArrowDown: key === "ArrowDown" || key === 40,
    ArrowLeft: key === "ArrowLeft" || key === 37,
    Home: key === "Home" || key === 36,
    End: key === "End" || key === 35,
    Character: key.match(/^[a-zA-Z]{1}$/),
    Tab: key === "Tab" || key === 9
  };

  return Object.keys(keys).find(key => keys[key] === true);
}

/**
 * Stops an event from taking action.
 *
 * @param {Event} event - The event.
 */
export function preventEvent(event) {
  // Run validation.
  validate.event(event);

  event.preventDefault();
  event.stopPropagation();
  // IE support.
  event.cancelBubble = true;
}
