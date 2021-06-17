/**
 * Test the isValidInstance() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isValidInstance } from "../../src/validate";

describe("isValidInstance", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare the element.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  test("returns true when checking if a DOM element as an HTMLElement", () => {
    expect(isValidInstance(HTMLElement, { div })).toBeTrue();
  });

  test("returns false when checking if a DOM element as a Function", () => {
    expect(isValidInstance(Function, { div })).toBeFalse();
  });

  test("returns false when checking if a DOM element as an invalid constructor", () => {
    expect(isValidInstance("HTMLElement", { div })).toBeFalse();
  });

  test("returns false when checking if a DOM element, _not_ contained in an object, as an HTMLElement", () => {
    expect(isValidInstance(HTMLElement, div)).toBeFalse();
  });

  test("returns false when checking if a DOM element, _not_ contained in an object, as an invalid constructor", () => {
    expect(isValidInstance("HTMLElement", div)).toBeFalse();
  });
});
