/**
 * Test the isValidEvent() function in validate.js to make sure the expected values are returned.
 */

import { isValidEvent } from "../../src/validate";

describe("isValidEvent", () => {
  // Valid event options.
  const validEvents = ["none", "mouse", "keyboard", "character"];

  test.each(validEvents)("returns true if '%s' is passed", (event) => {
    const check = isValidEvent({ event });

    expect(check.status).toBeTrue();
    expect(check.error).toBeNull();
  });

  test("returns false if an unsupported event is passed", () => {
    const check = isValidEvent({ event: "unsupported" });

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'event must be one of the following values: none, mouse, keyboard, character. "unsupported" given.'
    );
  });

  test("returns false if a supported event, _not_ in an object, is passed", () => {
    const check = isValidEvent("none");

    expect(check.status).toBeFalse();
    expect(check.error.message).toBe(
      'Values given to isValidEvent() must be inside of an object. "string" given.'
    );
  });
});
