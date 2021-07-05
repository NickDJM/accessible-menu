/**
 * Various help functions for testing.
 */

/**
 * Triggers an event on a DOM element.
 *
 * @param {string}      eventType - The type of event to trigger.
 * @param {HTMLElement} element   - The element to trigger the event on.
 */
export function triggerEvent(eventType, element) {
  try {
    const event = document.createEvent("HTMLEvents");
    event.initEvent(eventType, false, true);
    element.dispatchEvent(event);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Triggers a mousedown and mouseup event on a DOM element.
 *
 * @param {HTMLElement} element - The element to trigger the events on.
 */
export function click(element) {
  triggerEvent("mousedown", element);
  triggerEvent("mouseup", element);
}

/**
 * Triggers a touchstart and touchend event on a DOM element.
 *
 * @param {HTMLElement} element - The element to trigger the events on.
 */
export function touch(element) {
  triggerEvent("touchstart", element);
  triggerEvent("touchend", element);
}
