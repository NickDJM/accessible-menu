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
      expect(result.errors).toHaveLength(0);
    }
  );

  // Test for an invalid state.
  it("should return false when checking if an invalid state is a valid state", () => {
    const state = "invalid";
    expect(() => {
      isValidState({ state });
    }).toThrow(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const state = "none";
    expect(() => {
      isValidState(state);
    }).toThrow(TypeError);
  });

  // Test that shouldThrow will throw on invalid values.
  it("should throw the first error when shouldThrow is true", () => {
    expect(() => {
      isValidState({ state: "invalid" }, { shouldThrow: true });
    }).toThrow(TypeError);
  });

  // Test that shouldThrow can be disabled.
  it("should not throw when shouldThrow is false", () => {
    const result = isValidState({ state: "invalid" }, { shouldThrow: false });

    expect(result.status).toBeFalsy();
    expect(result.errors[0]).toBeInstanceOf(TypeError);
  });
});
