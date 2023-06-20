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
    expect(result.error).toBeNull();
  });

  // Test checking for multiple HTMLElements.
  it("should return true when checking if multiple DOM elements are HTMLElements", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    const result = isValidInstance(HTMLElement, { element1, element2 });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test checking for a non-HTMLElement.
  it("should return false when checking if a non-DOM element is an HTMLElement", () => {
    const element = "string";
    const result = isValidInstance(HTMLElement, { element });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test checking for multiple non-HTMLElements.
  it("should return false when checking if multiple non-DOM elements are HTMLElements", () => {
    const element1 = "string";
    const element2 = "string";
    const result = isValidInstance(HTMLElement, { element1, element2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test checking for a mixed HTMLElement and non-HTMLElement.
  it("should return false when checking if a mixed DOM element and non-DOM element are HTMLElements", () => {
    const element1 = document.createElement("div");
    const element2 = "string";
    const result = isValidInstance(HTMLElement, { element1, element2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test pasing a non-valid constructor.
  it("should return false when checking for a non-valid constructor", () => {
    const element = document.createElement("div");
    const result = isValidInstance("string", { element });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object as the elements parameter.
  it("should return false when passing a non-object as the elements parameter", () => {
    const element = document.createElement("div");
    const result = isValidInstance(HTMLElement, element);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
