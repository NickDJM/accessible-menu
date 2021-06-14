/**
 * Test the isValidState() function in validate.js to make sure the expected values are returned.
 */

import { isValidState } from "../../src/validate";

// Valid state options.
const validStates = ["none", "self", "child"];

// Valid states.
test.each(validStates)(
  "Checking if '%s' is a valid state returns true",
  (state) => {
    expect(isValidState({ state })).toBe(true);
  }
);

// Usupported state.
test("Checking if an unsupported state is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidState({ state: "unsupported" })).toBe(false);
});

// Invalid state.
test("Checking is a supported state, _not_ in an object, is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidState("none")).toBe(false);
});
