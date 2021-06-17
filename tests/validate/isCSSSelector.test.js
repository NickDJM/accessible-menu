/**
 * Test the isCSSSelector() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isCSSSelector } from "../../src/validate";

describe("isCSSSelector", () => {
  // Mock console.error.
  console.error = jest.fn();

  test("returns true when passed a string", () => {
    expect(isCSSSelector({ selector: "div" })).toBeTrue();
  });

  test("returns false when passed a number", () => {
    expect(isCSSSelector({ selector: 123 })).toBeFalse();
  });

  test("returns false when passed a string that is _not_ in an object", () => {
    expect(isCSSSelector("div")).toBeFalse();
  });
});
