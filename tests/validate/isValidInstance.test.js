/**
 * Test the isValidInstance function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isValidInstance } from "../../src/validate";

// Constructor/element match.
test("Testing a DOM element as an HTMLElement returns true", () => {
  // Create DOM.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance(HTMLElement, { div })).toBe(true);
});

// Constructor/element mismatch.
test("Testing a DOM element as a Function returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Create DOM.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance(Function, { div })).toBe(false);
});

// Invalid contructor.
test("Testing a DOM element as an invalid constructor returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Create DOM.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance("HTMLElement", { div })).toBe(false);
});

// Invalid element.
test("Testing a DOM element, _not_ contained in an object, as an HTMLElement returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Create DOM.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance(HTMLElement, div)).toBe(false);
});

// Invalid constructor/element
test("Testing a DOM element, _not_ contained in an object, as an invalid constructor returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Create DOM.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance("HTMLElement", div)).toBe(false);
});
