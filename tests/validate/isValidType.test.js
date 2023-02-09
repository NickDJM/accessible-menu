/**
 * Test the isValidType() function in validate.js to make sure the expected values are returned.
 */

import { describe, test, expect } from "vitest";
import { isValidType } from "../../src/validate";

describe("isValidType", () => {
  // Declare string.
  const string = "A string.";

  test("returns true when checking if a string is a string", () => {
    const check = isValidType("string", { string });

    expect(check.status).toBeTruthy();
    expect(check.error).toBeNull();
  });

  test("returns false when checking if a string is a number", () => {
    const check = isValidType("number", { string });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'string must be a number. "string" given.'
    );
  });

  test("returns false when checking if a string is an invalid type", () => {
    const check = isValidType(123, { string });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe('string must be a 123. "string" given.');
  });

  test("returns false when checking if a string, _not_ contained in an object, is a string", () => {
    const check = isValidType("string", string);

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'Values given to isValidType() must be inside of an object. "string" given.'
    );
  });

  test("returns false when checking if a string, _not_ contained in an object, is an invalid trype", () => {
    const check = isValidType(123, string);

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'Values given to isValidType() must be inside of an object. "string" given.'
    );
  });
});
