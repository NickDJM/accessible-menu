/**
 * Tests for the isTag() function.
 */

import { describe, it, expect } from "vitest";
import { isTag } from "../../src/validate.js";

describe("isTag", () => {
  // Test that a paragraph element is a 'p' tag.
  it("should return true when checking if a paragraph element is a 'p' tag", () => {
    const element = document.createElement("p");

    expect(isTag("p", { element })).toBeTruthy();
  });

  // Test that multiple paragraph elements are 'p' tags.
  it("should return true when checking if multiple paragraph elements are 'p' tags", () => {
    const element1 = document.createElement("p");
    const element2 = document.createElement("p");

    expect(isTag("p", { element1, element2 })).toBeTruthy();
  });

  // Test that a div element is not a 'p' tag.
  it("should return false when checking if a div element is a 'p' tag", () => {
    const element = document.createElement("div");

    expect(isTag("p", { element })).toBeFalsy();
  });

  // Test that multiple div elements are not 'p' tags.
  it("should return false when checking if multiple div elements are 'p' tags", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");

    expect(isTag("p", { element1, element2 })).toBeFalsy();
  });

  // Test that a mixed div and paragraph element are not 'p' tags.
  it("should return false when checking if a mixed div and paragraph element are 'p' tags", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("p");

    expect(isTag("p", { element1, element2 })).toBeFalsy();
  });

  // Test passing an invalid tag.
  it("should return false when checking for an invalid tag", () => {
    const element = document.createElement("p");

    expect(isTag(1, { element })).toBeFalsy();
  });

  // Test passing an invalid element.
  it("should return false when checking for an invalid element", () => {
    const element = "string";

    expect(isTag("p", { element })).toBeFalsy();
  });

  // Test passing both an invalid tag and element.
  it("should return false when checking for an invalid tag and element", () => {
    const element = "string";

    expect(isTag(1, { element })).toBeFalsy();
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const element = document.createElement("p");

    expect(isTag("p", element)).toBeFalsy();
  });
});
