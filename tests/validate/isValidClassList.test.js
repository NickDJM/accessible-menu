/**
 * Test the isValidClassList() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isValidClassList } from "../../src/validate";

describe("isValidClassList", () => {
  // Mock console.error.
  console.error = jest.fn();

  const singleClass = "class";
  const multipleClasses = ["class", "other-class"];

  test("returns true when passed a single string", () => {
    expect(isValidClassList({ singleClass })).toBeTrue();
  });

  test("returns true when passed an array of strings", () => {
    expect(isValidClassList({ multipleClasses })).toBeTrue();
  });

  test("returns false when passed a single number", () => {
    expect(isValidClassList({ classes: 123 })).toBeFalse();
  });

  test("returns false when passed an array of numbers", () => {
    expect(isValidClassList({ classes: [123, 321] })).toBeFalse();
  });

  test("returns false when passed an array of strings and numbers", () => {
    expect(isValidClassList({ classes: ["class", 123] })).toBeFalse();
  });

  test("returns false when passed a string that is _not_ contained in an object", () => {
    expect(isValidClassList(singleClass)).toBeFalse();
  });

  test("returns false when passed an array of strings that is _not_ contained in an object", () => {
    expect(isValidClassList(multipleClasses)).toBeFalse();
  });
});
