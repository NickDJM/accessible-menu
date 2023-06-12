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
      expect(result.error).toBeNull();
    }
  );

  // Test for an invalid hover type.
  it("should return false when checking if an invalid hover type is a valid hover type", () => {
    const hoverType = "invalid";
    const result = isValidHoverType({ hoverType });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const hoverType = "off";
    const result = isValidHoverType(hoverType);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
