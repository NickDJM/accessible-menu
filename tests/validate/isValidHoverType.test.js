/**
 * Test the isValidHoverType() function in validate.js to make sure the expected values are returned.
 */

import { describe, test, expect } from "vitest";
import { isValidHoverType } from "../../src/validate";

describe("isValidHoverType", () => {
  // Valid hover type options.
  const validTypes = ["off", "on", "dynamic"];

  test.each(validTypes)("returns true if '%s' is passed", (type) => {
    const check = isValidHoverType({ type });

    expect(check.status).toBeTruthy();
    expect(check.error).toBeNull();
  });

  test("returns false if an unsupported hover type is passed", () => {
    const check = isValidHoverType({ type: "unsupported" });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'type must be one of the following values: off, on, dynamic. "unsupported" given.'
    );
  });

  test("returns false is a supported hover type, _not_ in an object, is passed", () => {
    const check = isValidHoverType("none");

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'Values given to isValidHoverType() must be inside of an object. "string" given.'
    );
  });
});
