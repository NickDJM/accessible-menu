/**
 * Tests for the isValidState() function.
 */

import { describe, it, expect } from "vitest";
import { isValidState } from "../../src/validate.js";

describe("isValidState", () => {
  // Test for all valid states.
  const states = ["none", "self", "child"];
  it.each(states)(
    "should return true when checking if %p is a valid state",
    (state) => {
      const result = isValidState({ state });

      expect(result.status).toBeTruthy();
      expect(result.error).toBeNull();
    }
  );

  // Test for an invalid state.
  it("should return false when checking if an invalid state is a valid state", () => {
    const state = "invalid";
    const result = isValidState({ state });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const state = "none";
    const result = isValidState(state);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
