/**
 * Tests for the isCSSSelector() function.
 */

import { describe, it, expect } from "vitest";
import { isCSSSelector } from "../../src/validate.js";

describe("isCSSSelector", () => {
  // Test a valid CSS selector.
  it("should return true when checking if a valid CSS selector is a valid CSS selector", () => {
    const selector = "div";
    const result = isCSSSelector({ selector });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test multiple valid CSS selectors.
  it("should return true when checking if multiple valid CSS selectors are valid CSS selectors", () => {
    const selector1 = "div";
    const selector2 = "div";
    const result = isCSSSelector({ selector1, selector2 });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test an invalid CSS selector.
  it("should return false when checking if an invalid CSS selector is a valid CSS selector", () => {
    const selector = 1;
    const result = isCSSSelector({ selector });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test multiple invalid CSS selectors.
  it("should return false when checking if multiple invalid CSS selectors are valid CSS selectors", () => {
    const selector1 = 1;
    const selector2 = 1;
    const result = isCSSSelector({ selector1, selector2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test a mixed valid and invalid CSS selector.
  it("should return false when checking if a mixed valid and invalid CSS selector is a valid CSS selector", () => {
    const selector1 = "div";
    const selector2 = 1;
    const result = isCSSSelector({ selector1, selector2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const selector = "div";
    const result = isCSSSelector(selector);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
