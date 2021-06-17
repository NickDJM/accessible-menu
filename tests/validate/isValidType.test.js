/**
 * Test the isValidType() function in validate.js to make sure the expected values are returned.
 */

import { isValidType } from "../../src/validate";

describe("isValidType", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare string.
  const string = "A string.";

  test("returns true when checking if a string is a string", () => {
    expect(isValidType("string", { string })).toBeTrue();
  });

  test("returns false when checking if a string is a number", () => {
    expect(isValidType("number", { string })).toBeFalse();
  });

  test("returns false when checking if a string is an invalid type", () => {
    expect(isValidType(123, { string })).toBeFalse();
  });

  test("returns false when checking if a string, _not_ contained in an object, is a string", () => {
    expect(isValidType("string", string)).toBeFalse();
  });

  test("returns false when checking if a string, _not_ contained in an object, is an invalid trype", () => {
    expect(isValidType(123, string)).toBeFalse();
  });
});
