import { isEvent, isKeyboardEvent } from "./validate";

/**
 * Retrieves the pressed key from an event.
 *
 * @param   {KeyboardEvent} event - The keyboard event.
 *
 * @returns {string} - The name of the key.
 */
export function keyPress(event) {
  // Run validation.
  isKeyboardEvent(event);

  try {
    // Use event.key or event.keyCode to support older browsers.
    const key = event.key || event.keyCode;
    const keys = {
      Enter: key === "Enter" || key === 13,
      Space: key === " " || key === "Spacebar" || key === 32,
      Escape: key === "Escape" || key === "Esc" || key === 27,
      ArrowUp: key === "ArrowUp" || key === "Up" || key === 38,
      ArrowRight: key === "ArrowRight" || key === "Right" || key === 39,
      ArrowDown: key === "ArrowDown" || key === "Down" || key === 40,
      ArrowLeft: key === "ArrowLeft" || key === "Left" || key === 37,
      Home: key === "Home" || key === 36,
      End: key === "End" || key === 35,
      Character: !!key.match(/^[a-zA-Z]{1}$/),
      Tab: key === "Tab" || key === 9,
    };

    return Object.keys(keys).find((key) => keys[key] === true);
  } catch (error) {
    // Return an empty string if something goes wrong.
    return "";
  }
}

/**
 * Stops an event from taking action.
 *
 * @param {Event} event - The event.
 */
export function preventEvent(event) {
  // Run validation.
  isEvent(event);

  event.preventDefault();
  event.stopPropagation();
}
