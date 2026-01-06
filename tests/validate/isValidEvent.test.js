/**
 * Tests for the isValidEvent() function.
 */

import { describe, it, expect } from "vitest";
import { isValidEvent } from "../../src/validate.js";

describe("isValidEvent", () => {
  // Test for all valid events.
  const events = ["none", "mouse", "keyboard", "character"];
  it.each(events)(
    "should return true when checking if %p is a valid event",
    (event) => {
      const result = isValidEvent({ event });

      expect(result.status).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    }
  );

  // Test for an invalid event.
  it("should return false when checking if an invalid event is a valid event", () => {
    const event = "invalid";
    expect(() => {
      isValidEvent({ event });
    }).toThrow(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const event = "none";
    expect(() => {
      isValidEvent(event);
    }).toThrow(TypeError);
  });

  // Test that shouldThrow will throw on invalid values.
  it("should throw the first error when shouldThrow is true", () => {
    expect(() => {
      isValidEvent({ event: "invalid" }, { shouldThrow: true });
    }).toThrow(TypeError);
  });

  // Test that shouldThrow can be disabled.
  it("should not throw when shouldThrow is false", () => {
    const result = isValidEvent({ event: "invalid" }, { shouldThrow: false });

    expect(result.status).toBeFalsy();
    expect(result.errors[0]).toBeInstanceOf(TypeError);
  });
});
