/**
 * Test the isValidInstance() function in validate.js to make sure the expected values are returned.
 */

import { describe, test, expect } from "vitest";
import { isValidInstance } from "../../src/validate";

describe("isValidInstance", () => {
  // Declare the element.
  document.body.innerHTML = "<div></div>";
  const div = document.querySelector("div");

  test("returns true when checking if a DOM element as an HTMLElement", () => {
    const check = isValidInstance(HTMLElement, { div });

    expect(check.status).toBeTruthy();
    expect(check.error).toBeNull();
  });

  test("returns false when checking if a DOM element as a Function", () => {
    const check = isValidInstance(Function, { div });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'div must be an instance of Function. "object" given.'
    );
  });

  test("returns false when checking if a DOM element as an invalid constructor", () => {
    const check = isValidInstance("HTMLElement", { div });

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      "Right-hand side of 'instanceof' is not an object"
    );
  });

  test("returns false when checking if a DOM element, _not_ contained in an object, as an HTMLElement", () => {
    const check = isValidInstance(HTMLElement, div);

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      'align must be an instance of HTMLElement. "string" given.'
    );
  });

  test("returns false when checking if a DOM element, _not_ contained in an object, as an invalid constructor", () => {
    const check = isValidInstance("HTMLElement", div);

    expect(check.status).toBeFalsy();
    expect(check.error.message).toBe(
      "Right-hand side of 'instanceof' is not an object"
    );
  });
});
