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
      expect(result.error).toBeNull();
    }
  );

  // Test for an invalid event.
  it("should return false when checking if an invalid event is a valid event", () => {
    const event = "invalid";
    const result = isValidEvent({ event });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const event = "none";
    const result = isValidEvent(event);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
