/**
 * Test the isValidClassList() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isValidClassList } from "../../src/validate";

// Valid values that are classes.
test("Testing a single string as a class list returns true", () => {
  // Declare classes.
  const classes = "class";

  expect(isValidClassList({ classes })).toBe(true);
});
test("Testing an array of strings as a class list returns true", () => {
  // Declare classes.
  const classes = ["class", "other-class"];

  expect(isValidClassList({ classes })).toBe(true);
});

// Valid values that are _not_ classes.
test("Testing a single number as a class list returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare classes.
  const classes = 123;

  expect(isValidClassList({ classes })).toBe(false);
});
test("Testing an array of numbers as a class list returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare classes.
  const classes = [123, 321];

  expect(isValidClassList({ classes })).toBe(false);
});
test("Testing an array of strings and numbers as a class list returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare classes.
  const classes = ["class", 123];

  expect(isValidClassList({ classes })).toBe(false);
});

// Invalid values.
test("Testing a string, _not_ contained in an object, as a class list returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare classes.
  const classes = "class";

  expect(isValidClassList(classes)).toBe(false);
});
test("Testing an array of strings, _not_ contained in an object, as a class list returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare classes.
  const classes = ["class", "other-class"];

  expect(isValidClassList(classes)).toBe(false);
});
