/**
 * Test the isEventSupported() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isEventSupported } from "../../src/validate";

// Supported event.
test("Checking if a <button> supports 'mouseup' returns true", () => {
  // Declare element.
  document.body.innerHTML = "<button></button>";
  const element = document.querySelector("button");

  expect(isEventSupported("mouseup", element)).toBe(true);
});

// Unsupported event.
test("Checking if a <button> supports 'unsupportedEvent' returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<button></button>";
  const element = document.querySelector("button");

  expect(isEventSupported("unsupportedEvent", element)).toBe(false);
});

// Invalid event.
test("Checking if a <button> supports a number as an event returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<button></button>";
  const element = document.querySelector("button");

  expect(isEventSupported(123, element)).toBe(false);
});

// Invalid element.
test("Checking if a non-HTMLElement supports 'mouseup' returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isEventSupported("mouseup", "button")).toBe(false);
});

// Invalid event/element.
test("Checking if a non-HTMLElement supports a number as an event returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isEventSupported(123, "button")).toBe(false);
});
