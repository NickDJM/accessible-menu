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
  it("should return false when checking if a non-DOM element is an HTMLElement", () => {
    const element = "string";
    const result = isValidInstance(HTMLElement, { element });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
