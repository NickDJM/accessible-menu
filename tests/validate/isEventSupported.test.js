/**
 * Test the isEventSupported() function in validate.js to make sure the expected values are returned.
 *
 * @deprecated Will be removed in v4.
 *
 * @jest-environment jsdom
 */

import { isEventSupported } from "../../src/validate";

describe("isEventSupported", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<button></button>";
  const element = document.querySelector("button");

  test("returns true when checking for 'mouseup' on a <button>", () => {
    expect(isEventSupported("mouseup", element)).toBeTrue();
  });

  test("returns false when checking for an unsupported event on a <button>", () => {
    expect(isEventSupported("unsupportedEvent", element)).toBeFalse();
  });

  test("returns false when checking for an invalid event on a <button>", () => {
    expect(isEventSupported(123, element)).toBeFalse();
  });

  test("returns false when checking for 'mouseup' on a non-HTMLElement", () => {
    expect(isEventSupported("mouseup", "button")).toBeFalse();
  });

  test("returns false when checking for an invalid event on a non-HTMLElement", () => {
    expect(isEventSupported(123, "button")).toBeFalse();
  });
});
