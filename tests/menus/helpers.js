/**
 * Helper functions for testing menus.
 */

import BaseMenu from "../../src/_baseMenu.js";

/**
 * Extends jsdom MouseEvent class as PointerEvent class
 *
 * todo: deprecate if/when JSDOM fully supports PointerEvents.
 */
export class PointerEvent extends window.MouseEvent {
  constructor(type, props) {
    super(type, props);
    if (props.button != null) {
      this.button = props.button;
    }
  }
}

/**
 * Initialize a menu for testing.
 *
 * This is required because BaseMenu does not auto-initialize.
 *
 * @param {BaseMenu} menu - The menu to initialize.
 */
export function initializeMenu(menu) {
  // Initialize the menu and its children.
  menu.initialize();

  menu.elements.menuItems.forEach((item) => {
    item.initialize();
  });
  menu.elements.submenuToggles.forEach((toggle) => {
    initializeMenu(toggle.elements.controlledMenu);
    toggle.initialize();
  });

  // Initialize the menu's controller if it is a top-level menu.
  if (menu.isTopLevel && menu.elements.controller) {
    menu.elements.controller.initialize();
  }

  menu._handleFocus();
  menu._handleClick();
  menu._handleHover();
  menu._handleKeydown();
  menu._handleKeyup();
}

/**
 * Waits for a specified delay.
 *
 * @param  {number}  delay - The delay in milliseconds.
 * @return {Promise}       - A promise that resolves after the delay.
 */
export function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Simulates a pointer event on a DOM element.
 *
 * @param  {string}       eventType - The type of event to trigger.
 * @param  {HTMLElement}  element   - The element to trigger the event on.
 * @param  {object}       options   - Custom options for the event.
 * @return {PointerEvent}           - The event that was triggered.
 */
export function simulatePointerEvent(eventType, element, options = {}) {
  try {
    const event = new PointerEvent(eventType, {
      bubbles: true,
      cancelable: true,
      ...options,
    });
    element.dispatchEvent(event);
    return event;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * Simulates a keyboard event on a DOM element.
 *
 * @param  {string}        eventType - The type of event to trigger.
 * @param  {HTMLElement}   element   - The element to trigger the event on.
 * @param  {object}        options   - Custom options for the event.
 * @return {KeyboardEvent}           - The event that was triggered.
 */
export function simulateKeyboardEvent(eventType, element, options = {}) {
  try {
    const event = new KeyboardEvent(eventType, {
      bubbles: true,
      cancelable: true,
      ...options,
    });
    element.dispatchEvent(event);
    return event;
  } catch (error) {
    console.error(error);
    return error;
  }
}
