/**
 * Test the isTag() function in validate.js to make sure the expected values are returned.
 */

import { describe, test, expect } from "vitest";
import { isTag } from "../../src/validate";

describe("isTag", () => {
  // Declare element.
  document.body.innerHTML = "<div><p></p></div>";
  const element = document.querySelector("p");
  // Tag/element match.
  test("returns true when checking if a <p> tag is a 'p' tag", () => {
    expect(isTag("p", { element })).toBeTruthy();
  });

  // Tag/element mismatch.
  test("returns false when checking if a <p> tag is a 'div' tag", () => {
    expect(isTag("div", { element })).toBeFalsy();
  });

  // Invalid tag
  test("returns false when checking if a <p> tag is an invalid tag", () => {
    expect(isTag(123, { element })).toBeFalsy();
  });

  // Non-HTMLElement.
  test("returns false when checking if a non-HTMLElement is a 'p' tag", () => {
    expect(isTag("p", { element: "p" })).toBeFalsy();
  });

  // Invalid tag/non-HTMLElement.
  test("returns false when checking if a non-HTMLElement is an invalid tag", () => {
    expect(isTag(123, { element: "p" })).toBeFalsy();
  });

  // Invalid element.
  test("returns false when checking if a <p> tag, _not_ contained in an object, is a 'p' tag", () => {
    expect(isTag("p", element)).toBeFalsy();
  });

  // Invalid tag/element.
  test("returns false when checking if a <p> tag, _not_ contained in an object, is an invalid tag", () => {
    expect(isTag("p", "p")).toBeFalsy();
  });
});
