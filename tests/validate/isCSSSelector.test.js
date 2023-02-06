/**
 * Test the isCSSSelector() function in validate.js to make sure the expected values are returned.
 */

import { isCSSSelector } from "../../src/validate";

describe("isCSSSelector", () => {
  test("returns true when passed a string", () => {
    const check = isCSSSelector({ selector: "div" });

    expect(check.status).toBeTrue();
    expect(check.error).toBeNull();
  });

  test("returns false when passed a number", () => {
    const check = isCSSSelector({ selector: 123 });

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'selector must be a valid CSS selector. "123" given.'
    );
  });

  test("returns false when passed a string that is _not_ in an object", () => {
    const check = isCSSSelector("div");

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'Values given to isCSSSelector() must be inside of an object. "string" given.'
    );
  });
});
