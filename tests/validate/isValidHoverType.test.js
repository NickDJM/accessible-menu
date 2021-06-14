/**
 * Test the isValidHoverType() function in validate.js to make sure the expected values are returned.
 */

import { isValidHoverType } from "../../src/validate";

// Valid hover type options.
const validTypes = ["off", "on", "dynamic"];

// Valid hover types.
test.each(validTypes)(
  "Checking if '%s' is a valid hover type returns true",
  (type) => {
    expect(isValidHoverType({ type })).toBe(true);
  }
);

// Usupported hover type.
test("Checking if an unsupported hover type is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidHoverType({ type: "unsupported" })).toBe(false);
});

// Invalid hover type.
test("Checking is a supported hover type, _not_ in an object, is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidHoverType("none")).toBe(false);
});
