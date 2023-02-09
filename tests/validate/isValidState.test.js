/**
 * Test the isValidState() function in validate.js to make sure the expected values are returned.
 */

import { describe, test, expect } from "vitest";
import { isValidState } from "../../src/validate";

describe("isValidState", () => {
  // Valid state options.
  const validStates = ["none", "self", "child"];

  test.each(validStates)("returns true if '%s' is passed", (state) => {
    const check = isValidState({ state });

    expect(check.status).toBeTruthy();
    expect(check.error).toBeNull();
  });

  test("returns false if an unsupported state is passed", () => {
    const check = isValidState({ state: "unsupported" });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'state must be one of the following values: none, self, child. "unsupported" given.'
    );
  });

  test("returns false if a supported state, _not_ in an object, is passed", () => {
    const check = isValidState("none");

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'Values given to isValidState() must be inside of an object. "string" given.'
    );
  });
});
