/**
 * Test the isValidState() function in validate.js to make sure the expected values are returned.
 */

import { isValidState } from "../../src/validate";

describe("isValidState", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Valid state options.
  const validStates = ["none", "self", "child"];

  test.each(validStates)("returns true if '%s' is passed", (state) => {
    expect(isValidState({ state })).toBeTrue();
  });

  test("returns false if an unsupported state is passed", () => {
    expect(isValidState({ state: "unsupported" })).toBeFalse();
  });

  test("returns false if a supported state, _not_ in an object, is passed", () => {
    expect(isValidState("none")).toBeFalse();
  });
});
