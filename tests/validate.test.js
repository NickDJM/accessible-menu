/**
 * Test the validate.js functions to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isValidInstance, isValidType } from "../src/validate.js";

console.error = jest.fn();

// isValidInstance tests.
test("DOM element contained in an object is an HTMLElement", () => {
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance(HTMLElement, { div })).toBe(true);
});

test("String contained in an object is _not_ an HTMLElement", () => {
  expect(isValidInstance(HTMLElement, { string: "not an HTMLElement" })).toBe(
    false
  );
});

test("DOM element _not_ contained in an object returns false", () => {
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  expect(isValidInstance(HTMLElement, div)).toBe(false);
});

// isValidType tests.
test("String contained in an object is a string", () => {
  expect(isValidType("string", { string: "A string." })).toBe(true);
});

test("NUmber contained in an object is _not_ a string", () => {
  expect(isValidType("string", { number: 123 })).toBe(false);
});

test("String _not_ contained in an object returns false", () => {
  expect(isValidType("string", "A string.")).toBe(false);
});
