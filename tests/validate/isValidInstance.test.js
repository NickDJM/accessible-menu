/**
 * Tests for the isValidInstance() function.
 */

import { describe, it, expect } from "vitest";
import { isValidInstance } from "../../src/validate.js";

describe("isValidInstance", () => {
  // Test checking for an HTMLElement.
  it("should return true when checking if a DOM element is an HTMLElement", () => {
    const element = document.createElement("div");
    const result = isValidInstance(HTMLElement, { element });

    expect(result.status).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  // Test checking for multiple HTMLElements.
  it("should return true when checking if multiple DOM elements are HTMLElements", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const result = isValidInstance(HTMLElement, { element1, element2 });

    expect(result.status).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  // Test checking for a non-HTMLElement.
  it("should return false when checking if a non-DOM element is an HTMLElement", () => {
    const element = "string";
    expect(() => {
      isValidInstance(HTMLElement, { element });
    }).toThrow(TypeError);
  });

  // Test checking for multiple non-HTMLElements.
  it("should return false when checking if multiple non-DOM elements are HTMLElements", () => {
    const element1 = "string";
    const element2 = "string";
    expect(() => {
      isValidInstance(HTMLElement, { element1, element2 });
    }).toThrow(TypeError);
  });

  // Test checking for a mixed HTMLElement and non-HTMLElement.
  it("should return false when checking if a mixed DOM element and non-DOM element are HTMLElements", () => {
    const element1 = document.createElement("div");
    const element2 = "string";
    expect(() => {
      isValidInstance(HTMLElement, { element1, element2 });
    }).toThrow(TypeError);
  });

  // Test passing a non-valid constructor.
  it("should return false when checking for a non-valid constructor", () => {
    const element = document.createElement("div");
    expect(() => {
      isValidInstance("string", { element });
    }).toThrow(TypeError);
  });

  // Test passing a non-object as the elements parameter.
  it("should return false when passing a non-object as the elements parameter", () => {
    const element = document.createElement("div");
    expect(() => {
      isValidInstance(HTMLElement, element);
    }).toThrow(TypeError);
  });

  // Test that shouldThrow will throw on invalid values.
  it("should throw the first error when shouldThrow is true", () => {
    expect(() => {
      isValidInstance(
        HTMLElement,
        { element: "string" },
        { shouldThrow: true }
      );
    }).toThrow(TypeError);
  });

  // Test that shouldThrow can be disabled.
  it("should not throw when shouldThrow is false", () => {
    const result = isValidInstance(
      HTMLElement,
      { element: "string" },
      { shouldThrow: false }
    );

    expect(result.status).toBeFalsy();
    expect(result.errors[0]).toBeInstanceOf(TypeError);
  });
});
