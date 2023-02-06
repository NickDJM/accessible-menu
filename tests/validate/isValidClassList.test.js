/**
 * Test the isValidClassList() function in validate.js to make sure the expected values are returned.
 */

import { isValidClassList } from "../../src/validate";

describe("isValidClassList", () => {
  const singleClass = "class";
  const multipleClasses = ["class", "other-class"];

  test("returns true when passed a single string", () => {
    const check = isValidClassList({ singleClass });

    expect(check.status).toBeTrue();
    expect(check.error).toBeNull();
  });

  test("returns true when passed an array of strings", () => {
    const check = isValidClassList({ multipleClasses });

    expect(check.status).toBeTrue();
    expect(check.error).toBeNull();
  });

  test("returns false when passed a single number", () => {
    const check = isValidClassList({ classes: 123 });

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      "classes must be a string or an array of strings. number given."
    );
  });

  test("returns false when passed an array of numbers", () => {
    const check = isValidClassList({ classes: [123, 321] });

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      "classes must be a string or an array of strings. An array containing non-strings given."
    );
  });

  test("returns false when passed an array of strings and numbers", () => {
    const check = isValidClassList({ classes: ["class", 123] });

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      "classes must be a string or an array of strings. An array containing non-strings given."
    );
  });

  test("returns false when passed a string that is _not_ contained in an object", () => {
    const check = isValidClassList(singleClass);

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'Values given to isValidClassList() must be inside of an object. "string" given.'
    );
  });

  test("returns false when passed an array of strings that is _not_ contained in an object", () => {
    const check = isValidClassList(multipleClasses);

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'Values given to isValidClassList() must be inside of an object. "object" given.'
    );
  });
});
