/**
 * Tests for the isQuerySelector() function.
 */

import { describe, it, expect } from "vitest";
import { isQuerySelector } from "../../src/validate.js";

describe("isQuerySelector", () => {
  // Test a valid query selector.
  it("should return true when checking if a valid query selector is a valid query selector", () => {
    const selector = "div";
    const result = isQuerySelector({ selector });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test multiple valid query selectors.
  it("should return true when checking if multiple valid query selectors are valid query selectors", () => {
    const selector1 = "div";
    const selector2 = "div";
    const result = isQuerySelector({ selector1, selector2 });

    expect(result.status).toBeTruthy();
    expect(result.error).toBeNull();
  });

  // Test an invalid query selector.
  it("should return false when checking if an invalid query selector is a valid query selector", () => {
    const selector = 1;
    const result = isQuerySelector({ selector });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test multiple invalid query selectors.
  it("should return false when checking if multiple invalid query selectors are valid query selectors", () => {
    const selector1 = 1;
    const selector2 = 1;
    const result = isQuerySelector({ selector1, selector2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test a mixed valid and invalid query selector.
  it("should return false when checking if a mixed valid and invalid query selector is a valid query selector", () => {
    const selector1 = "div";
    const selector2 = 1;
    const result = isQuerySelector({ selector1, selector2 });

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });

  // Test passing a non-object.
  it("should return false when checking for a non-object", () => {
    const selector = "div";
    const result = isQuerySelector(selector);

    expect(result.status).toBeFalsy();
    expect(result.error).toBeInstanceOf(TypeError);
  });
});
