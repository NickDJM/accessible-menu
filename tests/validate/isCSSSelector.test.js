/**
 * Test the isCSSSelector() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isCSSSelector } from "../../src/validate";

// Valid values that are CSS selectors.
test("Testing a string as a CSS selector returns true", () => {
  // Declare selector.
  const selector = "div";

  expect(isCSSSelector({ selector })).toBe(true);
});

// Invalid values that are _not_ CSS selectors.
test("Testing a number as a CSS selector returns false", () => {
  // Declare selector.
  const selector = 123;

  expect(isCSSSelector({ selector })).toBe(false);
});

// Invalid values.
test("Testing a string, _not_ in an object, as a CSS selector returns false", () => {
  // Declare selector.
  const selector = "div";

  expect(isCSSSelector(selector)).toBe(false);
});
