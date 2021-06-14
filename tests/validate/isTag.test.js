/**
 * Test the isTag() function in validate.js to make sure the expected values are returned.
 *
 * @jest-environment jsdom
 */

import { isTag } from "../../src/validate";

// Tag/element match.
test("Checking if a <p> tag is a 'p' tag returns true", () => {
  // Declare element.
  document.body.innerHTML = "<div><p></p></div>";
  const element = document.querySelector("p");

  expect(isTag("p", { element })).toBe(true);
});

// Tag/element mismatch.
test("Checking if a <p> tag is a 'div' tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<div><p></p></div>";
  const element = document.querySelector("p");

  expect(isTag("div", { element })).toBe(false);
});

// Invalid tag
test("Checking if a <p> tag is an invalid tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<div><p></p></div>";
  const element = document.querySelector("p");

  expect(isTag(123, { element })).toBe(false);
});

// Non-HTMLElement.
test("Checking if a non-HTMLElement is a 'p' tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isTag("p", { element: "p" })).toBe(false);
});

// Invalid tag/non-HTMLElement.
test("Checking if a non-HTMLElement is an invalid tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isTag(123, { element: "p" })).toBe(false);
});

// Invalid element.
test("Checking if a <p> tag, _not_ contained in an object, is a 'p' tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  // Declare element.
  document.body.innerHTML = "<div><p></p></div>";
  const element = document.querySelector("p");

  expect(isTag("p", element)).toBe(false);
});

// Invalid tag/element.
test("Checking if a <p> tag, _not_ contained in an object, is an invalid tag returns false", () => {
  // Mock console.error.
  console.error = jest.fn();

  expect(isTag("p", "p")).toBe(false);
});
