/**
 * Test the isValidType function in validate.js to make sure the expected values are returned.
 */

import { isValidType } from "../../src/validate";

// Type/element match.
test("Testing a string as a string returns true", () => {
  // Declare string.
  const string = "A string.";

  expect(isValidType("string", { string })).toBe(true);
});

// Type/element mismatch.
test("Testing a string as a number returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare string.
  const string = "A string.";

  expect(isValidType("number", { string })).toBe(false);
});

// Invalid type.
test("Testing a string as an invalid type returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare string.
  const string = "A string.";

  expect(isValidType(123, { string })).toBe(false);
});

// Invalid element.
test("Testing a string, _not_ contained in an object, as a string returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare string.
  const string = "A string.";

  expect(isValidType("string", string)).toBe(false);
});

// Invalid
test("Testing a string, _not_ contained in an object, as an invalid trype returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare string.
  const string = "A string.";

  expect(isValidType(123, string)).toBe(false);
});
