/**
 * Test the isValidEvent() function in validate.js to make sure the expected values are returned.
 */

import { isValidEvent } from "../../src/validate";

// Valid event options.
const validEvents = ["none", "mouse", "keyboard", "character"];

// Valid events.
test.each(validEvents)(
  "Checking if '%s' is a valid event returns true",
  (event) => {
    expect(isValidEvent({ event })).toBe(true);
  }
);

// Usupported event.
test("Checking if an unsupported event is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidEvent({ event: "unsupported" })).toBe(false);
});

// Invalid event.
test("Checking is a supported event, _not_ in an object, is valid returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isValidEvent("none")).toBe(false);
});
