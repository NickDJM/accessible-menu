/**
 * Test the isValidHoverType() function in validate.js to make sure the expected values are returned.
 */

import { isValidHoverType } from "../../src/validate";

describe("isValidHoverType", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Valid hover type options.
  const validTypes = ["off", "on", "dynamic"];

  test.each(validTypes)("returns true if '%s' is passed", (type) => {
    expect(isValidHoverType({ type })).toBeTrue();
  });

  test("returns false if an unsupported hover type is passed", () => {
    expect(isValidHoverType({ type: "unsupported" })).toBeFalse();
  });

  test("returns false is a supported hover type, _not_ in an object, is passed", () => {
    expect(isValidHoverType("none")).toBeFalse();
  });
});
