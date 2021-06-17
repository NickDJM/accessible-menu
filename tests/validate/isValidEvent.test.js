/**
 * Test the isValidEvent() function in validate.js to make sure the expected values are returned.
 */

import { isValidEvent } from "../../src/validate";

describe("isValidEvent", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Valid event options.
  const validEvents = ["none", "mouse", "keyboard", "character"];

  test.each(validEvents)("returns true if '%s' is passed", (event) => {
    expect(isValidEvent({ event })).toBeTrue();
  });

  test("returns false if an unsupported event is passed", () => {
    expect(isValidEvent({ event: "unsupported" })).toBeFalse();
  });

  test("returns false if a supported event, _not_ in an object, is passed", () => {
    expect(isValidEvent("none")).toBeFalse();
  });
});
