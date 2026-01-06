/**
 * Tests for the isValidHoverType() function.
 */

import { describe, it, expect } from "vitest";
import { isValidHoverType } from "../../src/validate.js";

describe("isValidHoverType", () => {
  // Test for all valid hover types.
  const hoverTypes = ["off", "on", "dynamic"];
  it.each(hoverTypes)(
    "should return true when checking if %p is a valid hover type",
    (hoverType) => {
      const result = isValidHoverType({ hoverType });

      expect(result.status).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    }
  );

  // Test for an invalid hover type.
  it("should return false when checking if an invalid hover type is a valid hover type", () => {
    const hoverType = "invalid";
    expect(() => {
      isValidHoverType({ hoverType });
    }).toThrow(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const hoverType = "off";
    expect(() => {
      isValidHoverType(hoverType);
    }).toThrow(TypeError);
  });

  // Test that shouldThrow will throw on invalid values.
  it("should throw the first error when shouldThrow is true", () => {
    expect(() => {
      isValidHoverType({ hoverType: "invalid" }, { shouldThrow: true });
    }).toThrow(TypeError);
  });

  // Test that shouldThrow can be disabled.
  it("should not throw when shouldThrow is false", () => {
    const result = isValidHoverType(
      { hoverType: "invalid" },
      { shouldThrow: false }
    );

    expect(result.status).toBeFalsy();
    expect(result.errors[0]).toBeInstanceOf(TypeError);
  });
});
